import { useState } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../types";

type FormTypes = "Hospital" | "HealthCheck" | "OccupationalHealthcare";
interface EntryFormProps {
  diagnosis: Diagnosis[];
  closeForm(): void;
  addEntry(id: string, entry: EntryWithoutId): void;
  id: string;
}

const EntryForm = ({ diagnosis, closeForm, addEntry, id }: EntryFormProps) => {
  const [formType, setFormType] = useState<FormTypes>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSPecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [rating, setRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [criteria, setCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

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
    if (formType === "HealthCheck") {
      const newEntry: EntryWithoutId = {
        description: description,
        date: date,
        specialist: specialist,
        diagnosisCodes: diagnosisCodes,
        type: "HealthCheck",
        healthCheckRating: rating,
      };
      addEntry(id, newEntry);
      setRating(HealthCheckRating.Healthy);
    }
    if (formType === "Hospital") {
      const newEntry: EntryWithoutId = {
        description: description,
        date: date,
        specialist: specialist,
        diagnosisCodes: diagnosisCodes,
        type: "Hospital",
        discharge: { date: date, criteria: criteria },
      };
      addEntry(id, newEntry);
      setCriteria("");
    }
    if (formType === "OccupationalHealthcare") {
      const newEntry: EntryWithoutId = {
        description: description,
        date: date,
        specialist: specialist,
        diagnosisCodes: diagnosisCodes,
        type: "OccupationalHealthcare",
        employerName: employerName,
      };
      if (date1 && date2) {
        newEntry.sickLeave = { startDate: date1, endDate: date2 };
      }
      addEntry(id, newEntry);
      setEmployerName("");
      setDate2("");
      setDate1("");
    }

    // remember to cleanup state here
    setDescription("");
    setDate("");
    setSPecialist("");
    setDiagnosisCodes([]);
  };
  const handleFormTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormType(event.target.value as FormTypes);
    setCriteria("");
    setDate1("");
    setDate2("");
    setRating(HealthCheckRating.Healthy);
    setEmployerName("");
  };

  return (
    <div>
      <RadioGroup value={formType} onChange={handleFormTypeChange} row>
        <FormControlLabel
          value="Hospital"
          control={<Radio />}
          label="Hospital"
        />
        <FormControlLabel
          value="HealthCheck"
          control={<Radio />}
          label="HealthCheck"
        />
        <FormControlLabel
          value="OccupationalHealthcare"
          control={<Radio />}
          label="Occupational Healthcare"
        />
      </RadioGroup>
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
        {formType === "HealthCheck" && (
          <>
            {" "}
            <InputLabel style={{ marginTop: 20 }}>
              Health Check Rating:
            </InputLabel>
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
          </>
        )}
        {formType === "Hospital" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>Discharge:</InputLabel>
            <TextField
              label="Criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
            <TextField
              label="discharge date"
              fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}
        {formType === "OccupationalHealthcare" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>Discharge:</InputLabel>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="sick leave start date"
              fullWidth
              value={date1}
              onChange={({ target }) => setDate1(target.value)}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="sick leave end date"
              fullWidth
              value={date2}
              onChange={({ target }) => setDate2(target.value)}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}

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
