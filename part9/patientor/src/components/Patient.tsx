import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";

const SinglePatient = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/patients/${id}`)
      .then((response) => setPatient(response.data as Patient));
  }, [id]);
  console.log(patient);
  if (!patient) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h2> {patient.name} </h2>
      <p>gender: {patient.gender}</p>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};
export default SinglePatient;
