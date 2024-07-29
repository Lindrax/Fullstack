import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { Patient } from '../types';

const EntryForm = ({
  id,
  type,
  patient,
  set,
}: {
  id: string;
  type: string;
  patient: Patient;
  set: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [spec, setSpec] = useState('');
  const [rate, setRate] = useState('');

  console.log(id);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const entry = {
      type: type,
      description: desc,
      date: date,
      specialist: spec,
      healthCheckRating: rate,
    };
    axios
      .post(`http://localhost:3001/api/patients/${id}/entries`, entry)
      .then((response) => {
        console.log(response.data);

        patient.entries.push(response.data);
        set(1);
      })
      .catch((error) => alert(error));
  };

  switch (type) {
    case 'HealthCheck':
      return (
        <fieldset style={{ border: '1px dashed' }}>
          <h4>New {type} entry</h4>
          <form onSubmit={handleSubmit}>
            <label>Description</label>
            <input value={desc} onChange={(e) => setDesc(e.target.value)} />
            <label>Date</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} />
            <label>Specialist</label>
            <input value={spec} onChange={(e) => setSpec(e.target.value)} />
            <label>Healthcheck rating</label>
            <input value={rate} onChange={(e) => setRate(e.target.value)} />
            <button type="submit">submit</button>
          </form>
        </fieldset>
      );
    case 'Occupational':
      return (
        <fieldset style={{ border: '1px dashed' }}>
          <h4>
            New {type} {id} entry
          </h4>
        </fieldset>
      );
    case 'Hospital':
      return (
        <fieldset style={{ border: '1px dashed' }}>
          <h4>
            New {type} {id} entry
          </h4>
        </fieldset>
      );
    default:
      return null;
  }
};
export default EntryForm;
