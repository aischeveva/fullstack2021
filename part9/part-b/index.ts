/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!req.query.height || !req.query.weight || isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))){
        res.send({ error: 'malformatted parameters' });
        return;
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);

    res.send({ weight: weight, height: height, bmi: bmi });
});

app.post('/exercises', (req, res) => {
    console.log(req.body);
    const body = req.body;
    if (!body.daily_exercises || !body.target) {
        res.send({ error: "parameters missing" });
        return;
    }

    let daily_exercises: Array<number> = body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isNaN(Number(body.target)) || !daily_exercises.every((day: any) => !isNaN(Number(day)))){
        res.send({ error: 'malformatted parameters'});
        return;
    }

    const target = Number(body.target);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daily_exercises = daily_exercises.map((day: any) => Number(day));
    res.send(calculateExercises(daily_exercises, target));

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

