import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";
import { addDiary } from "../services/diaryservice";
import axios from "axios";

const DiaryForm = () => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather | string>("");
  const [visibility, setVisibility] = useState<Visibility | string>("");
  const [comment, setComment] = useState("");
  const [alert, setAlert] = useState<null | string>(null);

  const createNewDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry: NewDiaryEntry = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    };

    console.log(newDiaryEntry);
    try {
      await addDiary(newDiaryEntry);
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
      setAlert("entry added");
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        setAlert(`${error.response?.data}`);
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <h2>Add New Entry</h2>
      {alert}
      <form onSubmit={createNewDiary}>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Visibility: </label>
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              {v}
              <input
                type="radio"
                name="visibility"
                checked={visibility === v}
                onChange={() => setVisibility(v as Visibility)}
              />
            </label>
          ))}
        </div>
        <div>
          <label>Weather: </label>
          {Object.values(Weather).map((w) => (
            <label key={w}>
              {w}
              <input
                type="radio"
                name="weather"
                checked={weather === w}
                onChange={() => setWeather(w as Weather)}
              />
            </label>
          ))}
        </div>
        <div>
          <label>Comment: </label>
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add diary</button>
      </form>
    </div>
  );
};

export default DiaryForm;
