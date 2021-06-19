import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PageHeader from '../../components/PageHeader';
import useTable from '../../components/useTable';
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
} from '@material-ui/core';
import * as employeeService from '../../services/employeeService';
import Controls from '../../components/controls/Controls';
import { InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Popup from '../../components/Popup';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  },
}));

const headCells = [
  {
    id: 'fullName',
    label: 'Employee Name',
  },
  {
    id: 'email',
    label: 'Email Address (Personal)',
  },
  {
    id: 'mobile',
    label: 'Mobile Number',
  },
  {
    id: 'department',
    label: 'Department',
  },
  { id: 'actions', label: 'Actions', disableSort: true },
];

export default function Employees() {
  const classes = useStyles();

  const [records, setRecords] = useState(employeeService.getAllEmployees());

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const {
    TblHeader,
    TblContainer,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (event) => {
    let target = event.target;

    setFilterFn({
      fn: (items) => {
        if (target.value == '') {
          return items;
        } else {
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value.toLowerCase())
          );
        }
      },
    });
  };

  const addOrEdit = (employee, resetForm) => {
    if (employee.id === 0) {
      employeeService.insertEmployees(employee);
    } else {
      employeeService.updateEmployees(employee);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(employeeService.getAllEmployees());
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  return (
    <>
      <PageHeader
        title="New Employee"
        subTitle="Form Design with Validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            className={classes.searchInput}
            label="Search Employees"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <Controls.Button
            className={classes.newButton}
            text="Add New"
            onClick={() => {
              setRecordForEdit(null);
              setOpenPopup(true);
            }}
            variant="outlined"
            startIcon={<AddIcon />}
          />
        </Toolbar>
        <TblContainer>
          <TblHeader />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton color="secondary">
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />

        {/*  */}
        <Popup
          openPopup={openPopup}
          title="Employee Form"
          setOpenPopup={setOpenPopup}
        >
          <EmployeeForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
        </Popup>
      </Paper>
    </>
  );
}
