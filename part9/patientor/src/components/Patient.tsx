import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../types';
import EntryDetails from './entry';

const SinglePatient = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/patients/${id}`)
      .then((response) => setPatient(response.data as Patient));
  }, [id]);
  console.log(patient);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const response = await axios.get('http://localhost:3001/api/diagnoses');
      setDiagnoses(response.data);
    };
    fetchDiagnoses();
  }, []);

  if (!patient) {
    return <p>loading...</p>;
  }
  const findDiagnosis = (code: string) => {
    return diagnoses.find((diagnosis) => diagnosis.code === code);
  };

  return (
    <div>
      <h2> {patient.name} </h2>
      <p>gender: {patient.gender}</p>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h4>entries</h4>
      {patient.entries.map((e) => (
        <fieldset key={e.id}>
          <div>
            <EntryDetails entry={e} />

            {e.diagnosisCodes?.map((code) => {
              const diagnosis = findDiagnosis(code);
              return (
                <li key={code}>
                  {code} {diagnosis?.name}
                </li>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
};
export default SinglePatient;
