import {
  Diagnosis,
  discharge,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatientEntry,
  sickLeave,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'type' in object &&
    'description' in object &&
    'date' in object &&
    'specialist' in object
  ) {
    switch (object.type) {
      case 'Hospital':
        if ('discharge' in object) {
          let newEntry: EntryWithoutId = {
            type: 'Hospital',
            description: object.description as string,
            date: object.date as string,
            specialist: object.specialist as string,

            discharge: object.discharge as discharge,
          };
          if ('diagnosisCodes' in object) {
            newEntry = {
              ...newEntry,
              diagnosisCodes: parseDiagnosisCodes(object),
            };
            console.log('shit');
          }
          console.log('case', newEntry);
          return newEntry;
        }
        break;
      case 'OccupationalHealthcare':
        if ('employerName' in object) {
          let newEntry: EntryWithoutId = {
            type: 'OccupationalHealthcare',
            description: object.description as string,
            date: object.date as string,
            specialist: object.specialist as string,
            employerName: object.employerName as string,
          };
          if ('diagnosisCodes' in object) {
            newEntry = {
              ...newEntry,
              diagnosisCodes: parseDiagnosisCodes(object),
            };
          }
          if ('sickLeave' in object) {
            return { ...newEntry, sickLeave: object.sickLeave as sickLeave };
          }
          console.log('case', newEntry);
          return newEntry;
        }
        break;
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          let newEntry: EntryWithoutId = {
            type: 'HealthCheck',
            description: object.description as string,
            date: object.date as string,
            specialist: object.specialist as string,
            healthCheckRating: object.healthCheckRating as HealthCheckRating,
          };
          if ('diagnosisCodes' in object) {
            newEntry = {
              ...newEntry,
              diagnosisCodes: parseDiagnosisCodes(object),
            };
          }
          console.log('case', newEntry);
          return newEntry;
        }
        break;
    }
  }
  throw new Error('Incorrect data: a field missing');
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newPatient;
  }
  throw new Error('Incorrect data: a field missing');
};

export default toNewPatientEntry;
