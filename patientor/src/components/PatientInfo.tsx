import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Diagnosis, Patient, Gender, Entry, EntryWithoutId } from "../types";
import { useEffect, useState } from "react";
import DiagnosisInfo from "./DiagnosisInfo";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EntryForm from "./EntryForm";
import { Alert } from "@mui/material";
interface PatientInfoProps {
  addEntry(id: string, entry: EntryWithoutId): void;
  patients: Patient[];
  error: string | null;
}
const PatientInfo = ({ addEntry, patients, error }: PatientInfoProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const fetchedPatient = await patientService.getPatientById(id);
          setPatient(fetchedPatient);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPatient();
  }, [id, patients]);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const fetchedDiagnosis = await patientService.getDiagnosis();
      setDiagnosis(fetchedDiagnosis);
    };
    fetchDiagnosis();
  }, []);

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <>
            <LocalHospitalIcon />
            discharge date: {entry.discharge.date} criteria:
            {entry.discharge.criteria}
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            Employer: {entry.employerName}{" "}
            {entry.sickLeave && (
              <>
                sick leave start: {entry.sickLeave.startDate} ends:{" "}
                {entry.sickLeave.endDate}
              </>
            )}
          </>
        );
      case "HealthCheck":
        return <>Health rating: {entry.healthCheckRating}</>;
      default:
        return assertNever(entry);
    }
  };

  const closeForm = () => {
    setFormVisibility(false);
  };

  return (
    <>
      {patient && (
        <>
          <h2>
            {patient.name} {patient.gender === Gender.Female && <FemaleIcon />}
            {patient.gender === Gender.Male && <MaleIcon />}
          </h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          {error && <Alert severity="error">{error}</Alert>}
          {formVisibility && (
            <EntryForm
              diagnosis={diagnosis}
              closeForm={closeForm}
              addEntry={addEntry}
              id={patient.id}
            />
          )}
          <h3>entries</h3>
          {patient.entries &&
            patient.entries.map((e) => (
              <div
                style={{ border: "2px solid black", margin: "3px" }}
                key={e.id}
              >
                <p>
                  {e.date} <b>{e.description}</b>
                </p>
                <EntryDetails entry={e} />
                <ul>
                  {e.diagnosisCodes &&
                    e.diagnosisCodes.map((d) => {
                      const found = diagnosis.find((obj) => obj.code === d);
                      return found ? (
                        <DiagnosisInfo key={d} diagnosis={found} />
                      ) : null;
                    })}
                </ul>
                <p>diagnosed by {e.specialist}</p>
              </div>
            ))}
        </>
      )}
      <button onClick={() => setFormVisibility(true)}>add entry</button>
    </>
  );
};
export default PatientInfo;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
