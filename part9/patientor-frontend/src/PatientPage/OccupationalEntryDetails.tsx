import React from "react";
import { OccupationalHealthcareEntry, Diagnosis } from "../types";
import { Container, Icon } from "semantic-ui-react";

const OccupationalEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry, diagnosis: {[code: string]: Diagnosis}}> = ({ entry, diagnosis }) => {
    return (
        <Container>
            <p>{entry.date} <Icon name="book" /> <em>{entry.employerName}</em></p>
            <p><em>{entry.description}</em></p>
            <ul>
                {entry.diagnosisCodes?.map(code => (
                  <li key={code}>{code} {diagnosis[code]?.name}</li>
                ))}
            </ul>
            {entry.sickLeave && <p><strong>Sick leave:</strong> {entry.sickLeave?.startDate} -- {entry.sickLeave?.endDate}</p>}
            <p>diagnose by {entry.specialist}</p>
        </Container>
    );
};

export default OccupationalEntryDetails;