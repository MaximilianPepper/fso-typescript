import express from "express";
import patientService from "../services/patientService";
import checkNewPatient from "../utils";
import { checkNewEntry } from "../utils";

const router = express.Router();

router.get("/diagnoses", (_req, res) => {
  const data = patientService.getDiagnoses();
  res.send(data);
});
router.get("/", (_req, res) => {
  const data = patientService.getPatients();
  res.send(data);
});
router.post("/", (req, res) => {
  try {
    const newPatient = checkNewPatient(req.body);
    const addedPatient = patientService.addNewPatient(newPatient); // this will have id
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
router.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = checkNewEntry(req.body);
    const updatedPatientEntry = patientService.addNewEntry(id, newEntry);
    res.json(updatedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const data = patientService.findPatientById(id);
  res.send(data);
});
export default router;
