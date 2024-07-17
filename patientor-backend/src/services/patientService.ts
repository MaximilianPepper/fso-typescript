import diagnosesData from "../data/diagnoses";
import patientData from "../data/patients";
import { Diagnoses, Patients } from "../types";
const getDiagnoses = (): Diagnoses[] => {
  return diagnosesData;
};

const getPatients = (): Patients[] => {
  return patientData;
};
const addDiary = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiary,
  getPatients,
};
