import diagnosesData from "../data/diagnoses";
import patientData from "../data/patients";
import {
  Diagnoses,
  Patient,
  NonSensitivePatient,
  PatientWithoutId,
} from "../types";
import { v1 as uuid } from "uuid";
const getDiagnoses = (): Diagnoses[] => {
  return diagnosesData;
};

const getPatients = (): NonSensitivePatient[] => {
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

const findPatientById = (id: string) => {
  const patient = patientData.find((e) => e.id === id);
  return patient;
};

export default {
  getDiagnoses,
  addDiary,
  getPatients,
  addNewPatient,
  findPatientById,
};
