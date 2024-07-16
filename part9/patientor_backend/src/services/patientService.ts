import patientsData from "../../data/patients";

import { nonSsnPatient } from "../types";

const patients: nonSsnPatient[] = patientsData;

const getEntries = (): nonSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
};
