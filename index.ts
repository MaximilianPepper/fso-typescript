import express from "express";
import calculateBmi from "./bmicalculator";
import calculateExercise, { ArgInterface } from "./excerciseCalculator";

const app = express();
app.use(express.json());
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  const h = Number(height);
  const w = Number(weight);
  if (!weight || !height || isNaN(h) || isNaN(w)) {
    return res.json({ error: "malformatted parameters" });
  }

  if (h <= 0 || w <= 0) {
    return res.status(400).send("Height and weight must be positive numbers");
  }
  const result = calculateBmi(h, w);
  return res.send({
    weight: w,
    height: h,
    bmi: result,
  });
});
app.post("/excersises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: ArgInterface = req.body as ArgInterface;
  if (!body)
    return res.json({
      error: "invalid format",
    });
  if (!body.daily_exercises || !body.target)
    return res.json({ error: "parameter missing" });
  const result = calculateExercise(body);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
