import React from "react";
import { useParams } from "react-router-dom";
import { addPatient, addEntry, useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { HealthCheckEntry, Patient } from "../types";
import { Container, Icon, Button } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

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

    const submitNewEntry = async (values: EntryFormValues) => {
      try {
        const { data: newEntry } = await axios.post<HealthCheckEntry>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          values
        );
        dispatch(addEntry(patient.id, newEntry));
        closeModal();
      } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
        setError(e.response?.data?.error || 'Unknown error');
      }
    };

    return (
        <Container>
          <h3>{patient?.name} <Icon name={icon} /></h3>
          <p>ssn: {patient?.ssn}</p>
          <p>occupation: {patient?.occupation}</p>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
          <h4>entries</h4>
          {patient?.entries.map(entry => (<EntryDetails key={entry.id} entry={entry} />))}
        </Container>);


};

export default PatientPage;