import {
  Card,
  Paper,
  Typography,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import React from 'react';
import Controls from './controls/Controls';
import { InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fdfdff',
  },
  pageHeader: {
    padding: theme.spacing(2),
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(1),
    color: '#3c44b1',
  },
  pageTitle: {
    flexGrow: 1,
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6',
    },
  },
}));

export default function PageHeader(props) {
  const classes = useStyles();
  const {
    title,
    subTitle,
    icon,
    handleSearch,
    setRecordForEdit,
    setOpenPopup,
  } = props;
  return (
    <Paper elevation={0} square className={classes.classes}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
        <Toolbar>
          <Controls.Input
            className={classes.searchInput}
            label="Search Employees"
            size="small"
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
      </div>
    </Paper>
  );
}
