import { useState } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../types";

// u stopped here, uncomment and work on feature to have different type of form,
//then add the front and backend logic to add form

// type FormTypes = "Hospital" | "HealthCheck" | "OccupationalHealthcare";
interface EntryFormProps {
  diagnosis: Diagnosis[];
  closeForm(): void;
  addEntry(id: string, entry: EntryWithoutId): void;
  id: string;
}

const EntryForm = ({ diagnosis, closeForm, addEntry, id }: EntryFormProps) => {
  //const [formType, setFormType] = useState<FormTypes>("Hospital");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSPecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [rating, setRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    const { value } = event.target;

    // Ensure that the value is always an array
    const newValue = Array.isArray(value) ? value : [value];
    setDiagnosisCodes(newValue);
  };
  const handleRatingChange = (event: SelectChangeEvent<HealthCheckRating>) => {
    setRating(event.target.value as HealthCheckRating);
  };
  const addNewEntry = (event: React.FormEvent) => {
    event.preventDefault();

    const newEntry: EntryWithoutId = {
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: diagnosisCodes,
      type: "HealthCheck",
      healthCheckRating: rating,
    };
    console.log("here is newEntry", newEntry);
    // remember to cleanup state here

    addEntry(id, newEntry);
  };
  return (
    <div>
      <form onSubmit={addNewEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSPecialist(target.value)}
        />
        <TextField
          label="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          type="date"
          InputLabelProps={{ shrink: true }}
        />

        <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes:</InputLabel>
        <Select
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={handleChange}
          multiple
        >
          {diagnosis.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code}
            </MenuItem>
          ))}
        </Select>
        {/*here i call for additional entry based on type*/}
        <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes:</InputLabel>
        <InputLabel style={{ marginTop: 20 }}>Health Check Rating:</InputLabel>
        <Select
          label="Health Check Rating"
          fullWidth
          value={rating}
          onChange={handleRatingChange}
        >
          {Object.values(HealthCheckRating)
            .filter((value) => typeof value === "number")
            .map((value) => (
              <MenuItem key={value} value={value}>
                {HealthCheckRating[value as number]}
              </MenuItem>
            ))}
        </Select>
        {/*this is the end of type exclusive fields*/}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={closeForm}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EntryForm;
