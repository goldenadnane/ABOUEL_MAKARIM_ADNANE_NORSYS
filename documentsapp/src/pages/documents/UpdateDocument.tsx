import React, { useState, useEffect } from 'react';
import {
    Grid,
    TextField,
    Button,
    Paper,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const UpdateDocument = () => {
    const { documentId } = useParams();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [metadata, setMetadata] = useState('');

    useEffect(() => {
        if (documentId) {
            fetchDocumentData();
        }
    }, [documentId]);

    const fetchDocumentData = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/documents/${documentId}`);
            const existingDocument = response.data;

            setName(existingDocument.name);
            setType(existingDocument.type);
            setCreationDate(existingDocument.creationDate);
            setMetadata(JSON.stringify(existingDocument.metadata));
        } catch (error) {
            console.error('Error fetching document data:', error);
        }
    };

    const handleUpdateDocument = async () => {
        try {
            const metadataObj = JSON.parse(metadata);
            const updatedDocument = {
                name: name,
                type: type,
                creationDate: creationDate,
                metadata: metadataObj,
            };

            const response = await axios.put(`http://localhost:8081/documents/update/${documentId}`, updatedDocument);

            if (response.status === 200) {
                console.log('Document updated successfully');
                window.location.href = "http://localhost:5173/documents/";
            } else {
                console.error('Error updating document:', response.data);
            }
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Update Document
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
                onClick={handleUpdateDocument}
                style={{ marginTop: '20px' }}
            >
                Update Document
            </Button>
        </Paper>
    );
};

export default UpdateDocument;
