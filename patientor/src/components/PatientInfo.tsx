import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types";
import { useEffect, useState } from "react";
const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
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
  return (
    <>
      {patient && (
        <>
          <h2>{patient.name}</h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </>
      )}
    </>
  );
};
export default PatientInfo;
