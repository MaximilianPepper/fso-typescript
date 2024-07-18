import { NonSensitiveDiaryEntry } from "../types";

interface EntryProps {
  diary: NonSensitiveDiaryEntry;
}
const Entry = ({ diary }: EntryProps) => {
  return (
    <>
      <strong>{diary.date}</strong>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </>
  );
};
export default Entry;
