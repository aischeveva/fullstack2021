import { Gender, NewPatient, NewEntry, HealthCheckRating, SickLeave, Discharge } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + name);
    }
  
    return name;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
    }
  
    return ssn;
};


const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }

    return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};
  
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, occupation: unknown, gender: unknown };

export const toNewPatient = ({ name, ssn, dateOfBirth, occupation, gender }: Fields): NewPatient => {
  const newPatient: NewPatient = {
      name: parseName(name),
      ssn: parseSSN(ssn),
      dateOfBirth: parseDate(dateOfBirth),
      occupation: parseOccupation(occupation),
      gender: parseGender(gender)
  };

  return newPatient;
};

const parseType = (type: unknown): string => {
    if (!type || !isString(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }
    return type;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
      throw new Error('Incorrect or missing description: ' + description);
    }
  
    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
      throw new Error('Incorrect or missing specialist: ' + specialist);
    }
  
    return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(Number(param));
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isRating(rating)) {
        throw new Error('Incorrect or missing health check rating: ' + rating);
      }
    
    return rating;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
    if (!codes || !Array.isArray(codes) || !codes.every(code => isString(code))){
        throw new Error('Incorrect or missing diagnosis codes: ' + codes);
    }

    return codes as string[];
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
      throw new Error('Incorrect or missing employer name: ' + employerName);
    }
  
    return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (!sickLeave || !(typeof sickLeave === 'object') 
    || !('startDate' in sickLeave) || !('endDate' in sickLeave) ) {
        throw new Error('Incorrect or missing sick leave: ' + sickLeave);
    }

    return sickLeave as SickLeave;
}; 

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || !(typeof discharge === 'object') 
    || !('date' in discharge) || !('criteria' in discharge) ) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }

    return discharge as Discharge;
}; 

type EntryFields = { type: unknown, description: unknown, date: unknown, 
    specialist: unknown, diagnosisCodes?: unknown, healthCheckRating?: unknown, 
    employerName?: unknown, sickLeave?: unknown, discharge?: Discharge};


export const toNewEntry = (props: EntryFields): NewEntry => {
    const type = parseType(props.type);

    const entry = {
        description: parseDescription(props.description),
        date: parseDate(props.date),
        specialist: parseSpecialist(props.specialist)
    };

    switch (type) {
        case 'HealthCheck':
            let newHealthCheckEntry: NewEntry = {
                ...entry,
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheckRating(props.healthCheckRating)
            }; 
            if(props.diagnosisCodes){
                newHealthCheckEntry = {
                    ...newHealthCheckEntry,
                    diagnosisCodes: parseDiagnosisCodes(props.diagnosisCodes)
                };
            }
            return newHealthCheckEntry;
        case 'OccupationalHealthcare':
            let newOccupationalEntry: NewEntry = {
                ...entry,
                type: 'OccupationalHealthcare',
                employerName: parseEmployerName(props.employerName),
                sickLeave: parseSickLeave(props.sickLeave)
            };
            if(props.diagnosisCodes){
                newOccupationalEntry = {
                    ...newOccupationalEntry,
                    diagnosisCodes: parseDiagnosisCodes(props.diagnosisCodes)
                };
            }
            return newOccupationalEntry;
        case 'Hospital':
            let newHospitalEntry: NewEntry = {
                ...entry,
                type: 'Hospital',
                discharge: parseDischarge(props.discharge)
            };
            if(props.diagnosisCodes){
                newHospitalEntry= {
                    ...newHospitalEntry,
                    diagnosisCodes: parseDiagnosisCodes(props.diagnosisCodes)
                };
            }
            return newHospitalEntry;
        default:
            throw new Error('Unrecognized type: ' + type);
    }
};