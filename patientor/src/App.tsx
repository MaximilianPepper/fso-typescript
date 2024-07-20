import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { EntryWithoutId, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/PatientInfo";
import { AxiosError } from "axios";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const addEntry = async (id: string, entry: EntryWithoutId) => {
    console.log("addEntry called with:", { id, entry });
    try {
      const patientEntry = await patientService.createEntry(id, entry);
      console.log("API call result:", patientEntry);

      setPatients((prevPatients) =>
        prevPatients.map((p) => (p.id === patientEntry.id ? patientEntry : p))
      );
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          const e = error.response.data;
          if (typeof e === "string") {
            setError(e);
            setTimeout(() => setError(null), 5000);
          } else {
            console.log("error.response.data should be a string");
          }
        } else {
          console.log(
            "An Axios error occurred, but no response data is available"
          );
        }
      } else {
        console.log(error);
        console.log("An unknown error occurred");
      }
    }
  };

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/:id"
              element={
                <PatientInfo
                  addEntry={addEntry}
                  patients={patients}
                  error={error}
                />
              }
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}
