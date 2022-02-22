import patientsData from '../../data/patients.json';
import { NonSensitivePatientEntry, Patient } from '../types';

const patients: Array<Patient> = patientsData;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getPatientsNonSensitive = (): Array<NonSensitivePatientEntry> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};


export default {
    getPatients,
    getPatientsNonSensitive
  };