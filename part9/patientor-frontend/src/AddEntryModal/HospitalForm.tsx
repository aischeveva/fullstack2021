import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Form, FormikProps } from "formik";
import { TextField, SelectField, TypeOption, NumberField, DiagnosisSelection } from "./FormField";
import { Diagnosis } from "../types";

const HospitalForm = ({diagnosis, typeOptions, isValid, dirty, setFieldValue, setFieldTouched, onCancel}: {
    diagnosis: Diagnosis[],
    typeOptions: TypeOption[],
    isValid: boolean,
    dirty: boolean,
    setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"],
    setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"],
    onCancel: () => void
  }) => {
    return (<Form className="form ui">
    <Field
      label="Date"
      placeholder="YYYY-MM-DD"
      name="date"
      component={TextField}
    />
    <Field
      label="Description"
      placeholder="Description"
      name="description"
      component={TextField}
    />
    <Field
      label="Specialist"
      placeholder="Specialist"
      name="specialist"
      component={TextField}
    />
    <Field
      label="Health check rating"
      placeholder="0"
      name="healthCheckRating"
      component={NumberField}
    />
    <SelectField
      label="Type"
      name="type"
      options={typeOptions}
    />
    <Field
      label="Discharge date"
      placeholder="YYYY-MM-DD"
      name="discharge.date"
      component={TextField}
    />
    <Field
      label="Discharge criteria"
      placeholder="Criteria"
      name="discharge.criteria"
      component={TextField}
    />
    <DiagnosisSelection 
      diagnoses={ Object.values(diagnosis) }
      setFieldValue={ setFieldValue }
      setFieldTouched={ setFieldTouched }
    />
    <Grid>
      <Grid.Column floated="left" width={5}>
        <Button type="button" onClick={onCancel} color="red">
          Cancel
        </Button>
      </Grid.Column>
      <Grid.Column floated="right" width={5}>
        <Button
          type="submit"
          floated="right"
          color="green"
          disabled={!dirty || !isValid}
        >
          Add
        </Button>
      </Grid.Column>
    </Grid>
  </Form>);
};

export default HospitalForm;