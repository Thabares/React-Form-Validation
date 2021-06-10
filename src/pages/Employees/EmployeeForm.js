import { Grid } from "@material-ui/core";
import React from "react";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as employeeService from "../../services/employeeService";
const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

export default function EmployeeForm() {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      //to check if the value is present in fieldvalues object
      temp.fullName = fieldValues.fullName ? "" : "This field is required";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is invalid";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 character is required";
    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length != 0 ? "" : "This field is required";
    setErrors({ ...temp });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, resetForm, handleInputChange } =
    useForm(initialFValues, true, validate);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) employeeService.insertEmployees(values);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            name="mobile"
            label="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            name="city"
            label="City"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            value={values.gender}
            label="Gender"
            name="gender"
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            value={values.departmentId}
            label="Department"
            name="departmentId"
            error={errors.departmentId}
            onChange={handleInputChange}
            items={genderItems}
            options={employeeService.getDepartmentCollection()}
          />
          <Controls.DatePicker
            value={values.hireDate}
            label="Hire Date"
            name="hireDate"
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            value={values.isPermanent}
            label="Permanent Employee"
            name="isPermanent"
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button text="Submit" type="submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
