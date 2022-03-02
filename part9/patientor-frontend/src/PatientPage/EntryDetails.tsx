import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalEntryDetails from "./OccupationalEntryDetails";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";

const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }) => {
    const [{ diagnosis }] = useStateValue();

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const divStyle = {
        border: "double",
        margin: "5px"
      };

    switch (entry.type) {
        case 'Hospital':
            return <div style={divStyle}><HospitalEntryDetails entry={entry} diagnosis={diagnosis} /></div>;
        case 'OccupationalHealthcare':
            return <div style={divStyle}><OccupationalEntryDetails entry={entry} diagnosis={diagnosis} /></div>;
        case 'HealthCheck':
            return <div style={divStyle}><HealthCheckEntryDetails entry={entry} diagnosis={diagnosis}/></div>;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;