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
  const { values, setValues, handleInputChange } = useForm(initialFValues);

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
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
            onChange={handleInputChange}
            items={genderItems}
            options={employeeService.getDepartmentCollection()}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
