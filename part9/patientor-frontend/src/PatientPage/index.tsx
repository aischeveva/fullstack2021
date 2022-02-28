import React from "react";
import { useParams } from "react-router-dom";
import { addPatient, useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Container, Icon } from "semantic-ui-react";

const PatientPage = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const patient = patients[id];
    const icons = { female: 'venus', male: 'mars', other: 'transgender alternate'};
    const icon = icons[patient?.gender] as 'venus' | 'mars' | 'transgender alternate' | undefined;

    React.useEffect(() => {
        const fetchPatient = async () => {
          try {
            const { data: patientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(addPatient(patientFromApi));
          } catch (e) {
            console.error(e);
          }
        };

        if(!patient) {
            void fetchPatient();
        }
    }, [id, patient, dispatch]);

    return (
        <Container>
          <h3>{patient?.name} <Icon name={icon} /></h3>
          <p>ssn: {patient?.ssn}</p>
          <p>occupation: {patient?.occupation}</p>
        </Container>);


};

export default PatientPage;