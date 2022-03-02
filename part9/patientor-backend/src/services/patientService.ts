import patients from '../../data/patients';
import { NewPatient, PublicPatient, Patient } from '../types';
import {v1 as uuid} from 'uuid';
import toNewPatient from '../utils';

const patientsData: Patient[] = patients.map(obj => {
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


export default {
    getPatients,
    getPatientsNonSensitive,
    addPatient
  };