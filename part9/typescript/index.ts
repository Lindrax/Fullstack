import express from "express";
const app = express();
import _calculateBmi from "./bmiCalculator";
import _calculateExercises from "./exerciseCalculator";
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (reg, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { height, weight } = reg.query;
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send({ error: "malformatted input" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = _calculateBmi(Number(height), Number(weight));
  return res.send(result);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const array = daily_exercises.map(Number);
  console.log(array);
  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "missing parameters" });
  }
  const targetNumber = Number(target);
  if (
    isNaN(targetNumber) ||
    !Array.isArray(array) ||
    array.some((num) => isNaN(Number(num)))
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = _calculateExercises(array, targetNumber);
  console.log(result);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
