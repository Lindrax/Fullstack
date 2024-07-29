import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../types';
import EntryDetails from './entry';
import EntryForm from './entryForm';

const SinglePatient = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [type, setType] = useState<string | null>(null);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/patients/${id}`)
      .then((response) => setPatient(response.data as Patient));
  }, [id, update]);
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
  console.log(type);
  return (
    <div>
      <h2> {patient.name} </h2>
      <p>gender: {patient.gender}</p>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h4>add entry</h4>
      type: <button onClick={() => setType('Hospital')}>Hospital</button>{' '}
      <button onClick={() => setType('Occupational')}>Occupational</button>
      <button onClick={() => setType('HealthCheck')}>Healthcheck</button>
      <EntryForm
        type={type as string}
        id={id as string}
        patient={patient}
        set={setUpdate}
      />
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
