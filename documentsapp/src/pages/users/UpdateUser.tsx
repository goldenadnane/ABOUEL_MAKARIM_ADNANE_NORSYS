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


const UpdateUser = () => {
    const { userId } = useParams();
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/users/${userId}`);
            const existingUser = response.data;
            setUsername(existingUser.username);

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            const updatedUser = {
                username: username,
            };

            const response = await axios.put(`http://localhost:8081/users/update/${userId}`, updatedUser);

            if (response.status === 200) {
                console.log('User updated successfully');
                window.location.href = "http://localhost:5173/users/";
            } else {
                console.error('Error updating user:', response.data);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <Grid container spacing={2} justifyContent={"center"}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Update User
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
                    onClick={handleUpdateUser}
                    style={{ marginTop: '20px' }}
                >
                    Update User
                </Button>
            </Paper>
        </Grid>
    );
};

export default UpdateUser;
