import patientsData from '../../data/patients.json';
import { NewPatient, PublicPatient, Patient } from '../types';
import {v1 as uuid} from 'uuid';
import toNewPatient from '../utils';

const patients: Patient[] = patientsData.map(obj => {
    const object = toNewPatient(obj) as Patient;
    object.id = obj.id;
    return {...object, entries: []};
});

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsNonSensitive = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
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
  
    patients.push(newPatient);
    return newPatient;
};


export default {
    getPatients,
    getPatientsNonSensitive,
    addPatient
  };