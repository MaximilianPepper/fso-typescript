import diagnosesData from "../data/diagnoses";
import patientData from "../data/patients";
import { Diagnoses, Patient, Patients, PatientWithoutId } from "../types";
import { v1 as uuid } from "uuid";
const getDiagnoses = (): Diagnoses[] => {
  return diagnosesData;
};

const getPatients = (): Patients[] => {
  return patientData;
};
const addDiary = () => {
  return null;
};
// this adds the id
const addNewPatient = (patient: PatientWithoutId): Patient => {
  const id = uuid();
  const newPatient = { ...patient, id: id };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getDiagnoses,
  addDiary,
  getPatients,
  addNewPatient,
};
