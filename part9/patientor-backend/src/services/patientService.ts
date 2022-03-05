import patients from '../../data/patients';
import { NewPatient, PublicPatient, Patient, Entry, NewEntry } from '../types';
import {v1 as uuid} from 'uuid';
import { toNewPatient } from '../utils';

let patientsData: Patient[] = patients.map(obj => {
    const object = toNewPatient(obj) as Patient;
    object.id = obj.id;
    object.entries = obj.entries;
    return object;
});

const getPatients = (): Patient[] => {
    return patientsData;
};

const getPatientsNonSensitive = (): PublicPatient[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patient: NewPatient): Patient => {
    const id: string = uuid();
    const newPatient: Patient = {
      id: id,
      entries: [],
      ...patient
    };
  
    patientsData.push(newPatient);
    return newPatient;
};

const addEntry = ( patient_id: string, entry: NewEntry): Entry => {
    const id: string = uuid();
    const newEntry: Entry = {
        id: id,
        ...entry
    };

    patientsData = patientsData.map(patient => {
        if(patient.id === patient_id) return {...patient, entries: [...patient.entries, newEntry]};
        else return patient;
    });
    
    return newEntry;
};


export default {
    getPatients,
    getPatientsNonSensitive,
    addPatient,
    addEntry
  };