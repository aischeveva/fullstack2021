import React from "react";
import { HealthCheckEntry, Diagnosis } from "../types";
import { Container, Icon } from "semantic-ui-react";

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry, diagnosis: {[code: string]: Diagnosis}}> = ({ entry, diagnosis }) => {
    return (
        <Container>
            <p>{entry.date} <Icon name="medkit" /></p>
            <p><em>{entry.description}</em></p>
            <ul>
                {entry.diagnosisCodes?.map(code => (
                  <li key={code}>{code} {diagnosis[code]?.name}</li>
                ))}
            </ul>
            <p><strong>Health rating:</strong> {entry.healthCheckRating}</p>
            <p>diagnose by {entry.specialist}</p>
        </Container>
    );
};

export default HealthCheckEntryDetails;