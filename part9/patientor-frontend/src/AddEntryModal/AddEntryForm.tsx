import React from "react";
import { Formik } from "formik";

import { TypeOption } from "./FormField";
import { HealthCheckEntry, HospitalEntry } from "../types";
import { useStateValue } from "../state";

import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";


type HealthCheckFormValues = Omit<HealthCheckEntry, 'id'>;
type HospitalFormValues = Omit<HospitalEntry, 'id'>;

export type EntryFormValues = HealthCheckFormValues | HospitalFormValues;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health check entry" },
  { value: "Hospital", label: "Hospital Entry" },
  { value: "OccupationalHealthcare", label: "Occupational healthcare entry" }
];

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        description: "",
        specialist: "",
        type: "HealthCheck",
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        switch(values.type){
          case "HealthCheck":
            return (
              <HealthCheckForm
                diagnosis={Object.values(diagnosis)}
                typeOptions={typeOptions}
                isValid={isValid}
                dirty={dirty}
                setFieldValue={setFieldValue} 
                setFieldTouched={setFieldTouched}
                onCancel={onCancel}
              />
            );
          case "Hospital":
            return (
              <HospitalForm
                diagnosis={Object.values(diagnosis)}
                typeOptions={typeOptions}
                isValid={isValid}
                dirty={dirty}
                setFieldValue={setFieldValue} 
                setFieldTouched={setFieldTouched}
                onCancel={onCancel}
              />
            );
        }
      }}
    </Formik>
  );
};

export default AddEntryForm;
