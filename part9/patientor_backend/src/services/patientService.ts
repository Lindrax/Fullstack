import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Entry, EntryWithoutId, NewPatientEntry } from '../types';

import { nonSsnPatient, Patient } from '../types';

const patients: Patient[] = patientsData;

const getEntries = (): nonSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getAll = (): Patient[] => {
  return patients;
};

const addEntry = (entry: EntryWithoutId, id: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  console.log('service', newEntry);
  const patient = patients.find((p) => p.id === id);
  console.log(patient);
  patient?.entries.push(newEntry);
  return newEntry;
  //findpatient and then push into patient.entries
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const NewPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(NewPatientEntry);
  return NewPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getAll,
  addEntry,
};
