import axios from "axios";
import {
  Diagnosis,
  EntryWithoutId,
  Patient,
  PatientFormValues,
} from "../types";

import { apiBaseUrl } from "../constants";

const getDiagnosis = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/patients/diagnoses`
  );

  return data;
};

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (
  id: string,
  entry: EntryWithoutId
): Promise<Patient> => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  console.log("it posted the data", data);
  return data;
};

const getPatientById = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

export default {
  getAll,
  create,
  getPatientById,
  getDiagnosis,
  createEntry,
};
