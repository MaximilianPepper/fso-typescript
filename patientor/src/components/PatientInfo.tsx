import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Diagnosis, Patient } from "../types";
import { useEffect, useState } from "react";
import DiagnosisInfo from "./DiagnosisInfo";
const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
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
  }, [id]);
  useEffect(() => {
    const fetchDiagnosis = async () => {
      const fetchedDiagnosis = await patientService.getDiagnosis();
      setDiagnosis(fetchedDiagnosis);
    };
    fetchDiagnosis();
  }, []);
  return (
    <>
      {patient && (
        <>
          <h2>{patient.name}</h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h3>entries</h3>
          {patient.entries &&
            patient.entries.map((e) => (
              <div key={e.id}>
                <p>
                  {e.date} {e.description}
                </p>
                <ul>
                  {e.diagnosisCodes &&
                    e.diagnosisCodes.map((d) => {
                      const found = diagnosis.find((obj) => obj.code === d);
                      return found ? (
                        <DiagnosisInfo key={d} diagnosis={found} />
                      ) : (
                        <p>diagnosis name not found</p>
                      );
                    })}
                </ul>
              </div>
            ))}
        </>
      )}
    </>
  );
};
export default PatientInfo;
