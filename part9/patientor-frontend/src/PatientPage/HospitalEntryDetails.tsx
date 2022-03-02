import React from "react";
import { Diagnosis, HospitalEntry } from "../types";
import { Container, Icon } from "semantic-ui-react";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry, diagnosis: {[code: string]: Diagnosis}}> = ({ entry, diagnosis }) => {
    return (
        <Container>
            <p>{entry.date} <Icon name="hospital" /></p>
            <p><em>{entry.description}</em></p>
            <ul>
                {entry.diagnosisCodes?.map(code => (
                  <li key={code}>{code} {diagnosis[code]?.name}</li>
                ))}
            </ul>
            <p>Discharged on {entry.discharge.date}: <em>{entry.discharge.criteria}</em></p>
            <p>diagnose by {entry.specialist}</p>
        </Container>
    );
};

export default HospitalEntryDetails;