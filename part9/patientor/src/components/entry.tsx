import React from 'react';
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkIcon from '@mui/icons-material/Work';

const HospEntry: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <p>
        {entry.date} <LocalHospitalIcon />{' '}
      </p>
      <i>{entry.description}</i>
      <p>Diagnosis: </p>
    </div>
  );
};

const OccupationalEntry: React.FC<{ entry: OccupationalHealthcareEntry }> = ({
  entry,
}) => {
  return (
    <div>
      <p>
        {entry.date} <WorkIcon /> {entry.employerName}
      </p>
      <i>{entry.description}</i>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

const HealthEntry: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div>
      <p>
        {entry.date} <MedicalInformationIcon />{' '}
      </p>
      <i>{entry.description}</i>
      <p>health rating: {entry.healthCheckRating}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return <HospEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
