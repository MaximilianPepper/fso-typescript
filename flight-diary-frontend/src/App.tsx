import { useState, useEffect } from "react";
import axios from "axios";
import { NewDiaryEntry, DiaryEntry, Weather, Visibility } from "./types";
import Entry from "./components/Entry";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [weather, setWeather] = useState<Weather | "">("");
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
        <label htmlFor="date">date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div>
          visibility:
          <label htmlFor="great">
            great
            <input
              type="radio"
              id="great"
              name="visibility"
              value="great"
              onChange={(e) => setVisibility(e.target.value as Visibility)}
              checked={visibility === "great"}
            />
          </label>
          <label htmlFor="good">
            Good
            <input
              type="radio"
              id="good"
              name="visibility"
              value="good"
              onChange={(e) => setVisibility(e.target.value as Visibility)}
              checked={visibility === "good"}
            />
          </label>
          <label htmlFor="ok">
            Ok
            <input
              type="radio"
              id="ok"
              name="visibility"
              value="ok"
              onChange={(e) => setVisibility(e.target.value as Visibility)}
              checked={visibility === "ok"}
            />
          </label>
          <label htmlFor="poor">
            Poor
            <input
              type="radio"
              id="poor"
              name="visibility"
              value="poor"
              onChange={(e) => setVisibility(e.target.value as Visibility)}
              checked={visibility === "poor"}
            />
          </label>
        </div>
        <div>
          weather:
          <label htmlFor="sunny">
            sunny
            <input
              type="radio"
              id="sunny"
              name="weather"
              value="sunny"
              onChange={(e) => setWeather(e.target.value as Weather)}
              checked={weather === "sunny"}
            />
          </label>
          <label htmlFor="rainy">
            rainy
            <input
              type="radio"
              id="rainy"
              name="weather"
              value="rainy"
              onChange={(e) => setWeather(e.target.value as Weather)}
              checked={weather === "rainy"}
            />
          </label>
          <label htmlFor="cloudy">
            cloudy
            <input
              type="radio"
              id="cloudy"
              name="weather"
              value="cloudy"
              onChange={(e) => setWeather(e.target.value as Weather)}
              checked={weather === "cloudy"}
            />
          </label>
          <label htmlFor="stormy">
            stormy
            <input
              type="radio"
              id="stormy"
              name="weather"
              value="stormy"
              onChange={(e) => setWeather(e.target.value as Weather)}
              checked={weather === "stormy"}
            />
          </label>
          <label htmlFor="windy">
            windy
            <input
              type="radio"
              id="windy"
              name="weather"
              value="windy"
              onChange={(e) => setWeather(e.target.value as Weather)}
              checked={weather === "windy"}
            />
          </label>
        </div>
        <div>
          comment
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
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
