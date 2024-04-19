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

interface User {
    id: string;
    username: string;
}

const DisplayUsers = () => {

    const [users, setUsers] = useState<User[]>([]);


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            let url = 'http://localhost:8081/users/all';

            const response = await axios.get<User[]>(url, {
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = async () => {

        window.location.href = "http://localhost:5173/users/add";

    };

    const handleUpdateUser = async (id: string) => {
        window.location.href = `http://localhost:5173/users/update/${id}`;

    };

    const handleDeleteUser = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8081/users/delete/${id}`);
            console.log('User deleted successfully');
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    return (
        <Grid container spacing={2} justifyContent={"center"}>
            <Button
                variant="contained"
                onClick={handleAddUser}
                startIcon={<CloudUploadIcon />}
                style={{ marginTop: '14px' }}

            >
                Add User
            </Button>

            <Grid item xs={6}>
                <Paper>
                    <TableContainer>
                        <Table aria-label="users table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>UserName</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton onClick={() => handleUpdateUser(user.id)}>
                                                    <EditIcon color="warning" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => handleDeleteUser(user.id)}>
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Options">
                                                <IconButton>
                                                    <MoreVertIcon color="info" />
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

export default DisplayUsers;
