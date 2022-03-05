import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: { patient_id: string, entry: Entry };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_ENTRY":
      const patient_id: string = action.payload.patient_id;
      const entry = action.payload.entry;
      const patient: Patient = state.patients[patient_id];
      return {
        ...state,
        patients: {
          ...state.patients,
          [patient_id]: {...patient, entries: [...patient.entries, entry]}

        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST", 
    payload: patientList
  };
};

export const addPatient = (patient: Patient): Action => {
  return { 
    type: "ADD_PATIENT", 
    payload: patient 
  };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList
  };
};

export const addEntry = (patient_id: string, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      patient_id: patient_id,
      entry: entry
    }
  };
};
