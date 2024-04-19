import React, { useState } from 'react';
import {
    Grid,
    TextField,
    Button,
    Paper,
    Typography,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import ErrorDialog from '../../components/ErrorDialog';

const AddDocumentForm = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [metadata, setMetadata] = useState('');
    const [error, setError] = useState('');
    const [openErrorDialog, setOpenErrorDialog] = useState(false);

    const handleCloseErrorDialog = () => {
        setOpenErrorDialog(false);
    };

    const handleAddDocument = async () => {
        try {
            const metadataObj = JSON.parse(metadata);
            const newDocument = {
                name: name,
                type: type,
                creationDate: creationDate,
                metadata: metadataObj,
            };

            const response = await axios.post('http://localhost:8081/documents/add', newDocument);

            if (response.status === 200) {
                console.log('Document ajouté avec succès');
                setName('');
                setType('');
                setCreationDate('');
                setMetadata('');
                window.location.href = "http://localhost:5173/documents/";

            } else {
                console.error('Erreur lors de l\'ajout du document:', response.data);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du document:', error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 409) {
                    setError('A document with the same name already exists');
                } else {
                    setError('An unknown error occurred');
                }
            } else {
                setError('An unknown error occurred');
            }
            setOpenErrorDialog(true);
        }
    };

    return (
        <>
            <ErrorDialog open={openErrorDialog} onClose={handleCloseErrorDialog} errorMessag={error} />

            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Add New Document
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <TextField
                            variant="filled"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="filled"
                            label="Type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="filled"
                            label="Creation Date"
                            type="date"
                            value={creationDate}
                            onChange={(e) => setCreationDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="filled"
                            label="Metadata"
                            value={metadata}
                            onChange={(e) => setMetadata(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddDocument}
                    style={{ marginTop: '20px' }}
                >
                    Add Document
                </Button>
            </Paper>
        </>
    );
};

export default AddDocumentForm;
