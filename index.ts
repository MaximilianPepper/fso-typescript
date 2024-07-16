import express from "express";
const app = express();
import calculateBmi from "./bmicalculator";

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
