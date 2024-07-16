import express from "express";

import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("diagnose router");
  const data = diagnoseService.getEntries();
  res.send(data);
});

export default router;
