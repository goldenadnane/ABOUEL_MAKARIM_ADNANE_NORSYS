import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Grid,
    TextField,
    Button,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    IconButton,
    Tooltip
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useCurrentUser } from '../../libs/useCurrentUser';
import assets from '../../assets';
import ShareIcon from '@mui/icons-material/Share';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


interface Document {
    body: any;
    id: string;
    name: string;
    type: string;
    creationDate: string;
    metadata: Record<string, string>;

}

const DisplayDocuments = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeValue, setTypeValue] = useState('');
    const [metadataValue, setMetadataValue] = useState('');
    const [creationDateValue, setCreationDateValue] = useState('');
    const [documents, setDocuments] = useState<Document[]>([]);
    const { isManager } = useCurrentUser();



    useEffect(() => {
        fetchDocuments();
    }, [searchTerm, typeValue, metadataValue, creationDateValue]);

    const fetchDocuments = async () => {
        try {

            let url = 'http://localhost:8081/documents/all';

            const params: any = {};

            if (searchTerm) {
                url = 'http://localhost:8081/documents/search';
                params.name = searchTerm;
            }

            if (typeValue) {
                url = 'http://localhost:8081/documents/search';
                params.type = typeValue;
            }

            if (metadataValue) {
                url = 'http://localhost:8081/documents/search';
                params.metadata = encodeURIComponent(JSON.stringify(metadataValue));
            }

            if (creationDateValue) {
                url = 'http://localhost:8081/documents/search';
                params.creationDate = creationDateValue;
            }
            if (isManager) {
                params.role = 'manager';
            }



            const response = await axios.get<Document[]>(url, {
                params: params,
            });
            setDocuments(response.data);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };



    const handleSearch = async () => {
        fetchDocuments();
    };

    const handleAddDocument = async () => {

        window.location.href = "http://localhost:5173/documents/add";

    };

    const handleUpdateDocument = async (id: string) => {
        window.location.href = `http://localhost:5173/documents/update/${id}`;

    };

    const handleDeleteDocument = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8081/documents/delete/${id}`);
            console.log('Document deleted successfully');
            setDocuments(documents.filter(document => document.id !== id));
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    const handleDownloadDocument = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:8081/documents/download/${id}`, {
                responseType: 'blob',
            });

            const selectedDocument = documents.find(doc => doc.id === id);
            if (!selectedDocument) {
                console.error('Document not found');
                return;
            }

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const filename = `${selectedDocument.name}.${selectedDocument.type}`;

            const link = document.createElement('a') as HTMLAnchorElement;
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);

            link.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading document:', error);
        }
    };

    const handleShareDocument = (documentId: string) => {
        window.location.href = `http://localhost:5173/documents/share/${documentId}`;
    };
    



    return (
        <Grid container spacing={2}>
            <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={9} container spacing={2}>
                    <Grid item xs={3}>
                        <TextField
                            variant="filled"
                            label="Search by name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="filled"
                            label="Search by type"
                            value={typeValue}
                            onChange={(e) => setTypeValue(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="filled"
                            label="Search by metadata"
                            value={metadataValue}
                            onChange={(e) => setMetadataValue(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="filled"
                            label="Search by creation date"
                            type="date"
                            value={creationDateValue}
                            onChange={(e) => setCreationDateValue(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
             
            </Grid>

            <Grid item xs={12} container justifyContent="flex-start" spacing={1}>
                <Grid item xs={12} />



                <Button
                    variant="contained"
                    onClick={handleAddDocument}
                    startIcon={<CloudUploadIcon />}
                >
                    Add Document
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <TableContainer>
                        <Table aria-label="documents table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Creation Date</TableCell>
                                    <TableCell>Metadata</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {documents.map((document) => (
                                    <TableRow key={document.id}>
                                        <TableCell>
                                            {document.type === 'CSV' && (
                                                <img
                                                    alt={"logo"}
                                                    src={assets.images.csv}
                                                    style={{ width: "40px", height: "40px" }}
                                                />
                                            )}
                                            {document.type === 'PDF' && (
                                                <img
                                                    alt={"logo"}
                                                    src={assets.images.pdf}
                                                    style={{ width: "40px", height: "40px" }}
                                                />
                                            )}
                                            {document.type === 'TXT' && (
                                                <img
                                                    alt={"logo"}
                                                    src={assets.images.txt}
                                                    style={{ width: "40px", height: "40px" }}
                                                />)}
                                            {document.type === 'PPTX' && (
                                                <img
                                                    alt={"logo"}
                                                    src={assets.images.pptx}
                                                    style={{ width: "40px", height: "40px" }}
                                                />)}
                                            {document.type === 'WORD' && (
                                                <img
                                                    alt={"logo"}
                                                    src={assets.images.word}
                                                    style={{ width: "40px", height: "35px" }}
                                                />)}

                                        </TableCell>

                                        <TableCell>{document.name}</TableCell>
                                        <TableCell>{document.type}</TableCell>
                                        <TableCell>{document.creationDate}</TableCell>
                                        <TableCell>
                                            {Object.entries(document.metadata).map(([key, value]) => (
                                                <div key={key}>
                                                    <strong>{key}:</strong> {value}
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton onClick={() => handleUpdateDocument(document.id)}>
                                                    <EditIcon color="warning" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => handleDeleteDocument(document.id)}>
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Download">
                                                <IconButton onClick={() => handleDownloadDocument(document.id)}>
                                                    <CloudDownloadIcon color="primary" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Share">
                                                <IconButton onClick={() => handleShareDocument(document.id)}>
                                                    <ShareIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DisplayDocuments;
