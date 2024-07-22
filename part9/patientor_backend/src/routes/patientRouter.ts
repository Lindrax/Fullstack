import express from "express";
import toNewPatientEntry from "../utils";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("patient router");
  const data = patientService.getEntries();
  res.send(data);
});

router.get("/:id", (req, res) => {
  const data = patientService.getAll();

  console.log(req.params.id);
  const patient = data.find((p) => p.id === req.params.id);
  console.log(patient);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send("no patient found");
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
