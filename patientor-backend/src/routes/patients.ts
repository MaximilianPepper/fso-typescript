import express from "express";
import patientService from "../services/patientService";
const router = express.Router();

router.get("/diagnoses", (_req, res) => {
  const data = patientService.getDiagnoses();
  res.send(data);
});
router.get("/", (_req, res) => {
  const data = patientService.getPatients();
  res.send(data);
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
