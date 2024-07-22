import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients";
import { NewPatientEntry } from "../types";

import { nonSsnPatient, Patient } from "../types";

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
};
