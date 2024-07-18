import { useState, useEffect } from "react";
import axios from "axios";
import { NonSensitiveDiaryEntry } from "./types";
import Entry from "./components/Entry";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<NonSensitiveDiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => setDiaries(response.data));
  });
  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <Entry key={diary.id} diary={diary} />
      ))}
    </div>
  );
}

export default App;
