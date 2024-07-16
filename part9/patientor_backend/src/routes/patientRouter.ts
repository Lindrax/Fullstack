import express from "express";

import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("patient router");
  const data = patientService.getEntries();
  res.send(data);
});

export default router;
