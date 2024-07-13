import express from "express";
const app = express();
import _calculateBmi from "./bmiCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (reg, res) => {
  const { height, weight } = reg.query;
  const result = _calculateBmi(Number(height), Number(weight));
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
