import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";

import { getDiaries } from "./services/diaryservice";
import DiaryForm from "./components/diaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <DiaryForm />
      <h2>Diary entries</h2>
      {diaries.map((d) => (
        <div key={d.id}>
          <h3> {d.date} </h3>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
        </div>
      ))}
    </div>
  );
};
export default App;
