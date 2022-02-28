import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(patientService.getPatients().find(patient => patient.id === id));
    res.send(patientService.getPatients().find(patient => patient.id === id));
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatient(req.body);
    
        const addedEntry = patientService.addPatient(newPatient);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;