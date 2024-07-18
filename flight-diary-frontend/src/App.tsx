import { useState, useEffect } from "react";
import axios from "axios";
import { NewDiaryEntry, DiaryEntry, Weather, Visibility } from "./types";
import Entry from "./components/Entry";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => setDiaries(response.data));
  }, []);
  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry: NewDiaryEntry = {
        date: date,
        weather: weather as Weather,
        visibility: visibility as Visibility,
        comment: comment,
      };
      const response = await axios.post<DiaryEntry>(
        "http://localhost:3000/api/diaries",
        newEntry
      );
      setDiaries(diaries.concat(response.data));
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data);
        setTimeout(() => setError(""), 5000);
      } else {
        console.error("Unknown error: ", e);
      }
    }
  };
  return (
    <div>
      <h2>Add new Entry</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={addEntry}>
        date
        <input
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        visibility
        <input
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        />
        weather
        <input value={weather} onChange={(e) => setWeather(e.target.value)} />
        comment
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">add</button>
      </form>
      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <Entry key={diary.id} diary={diary} />
      ))}
    </div>
  );
}

export default App;
