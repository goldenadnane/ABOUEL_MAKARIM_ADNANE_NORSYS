import React, { useState } from 'react';
import {
    Grid,
    TextField,
    Button,
    Paper,
    Typography,
} from '@mui/material';
import axios from 'axios';

const AddUser = () => {
    const [username, setUsername] = useState('');


    const handleAddUser = async () => {
        try {

            const newUser = {
                username: username,
            };

            const response = await axios.post('http://localhost:8081/users/add', newUser);

            if (response.status === 200) {
                console.log('Utilisateur ajouté avec succès');
                setUsername('');
                window.location.href = "http://localhost:5173/users/";

            } else {
                console.error('Erreur lors de l\'ajout de l\'utilisateur:', response.data);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
    };

    return (
        <Grid container spacing={2} justifyContent={"center"}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Add New User
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            variant="filled"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                        />
                    </Grid>

                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddUser}
                    style={{ marginTop: '20px' }}
                >
                    Add User
                </Button>
            </Paper>
        </Grid>
    );
};

export default AddUser;
