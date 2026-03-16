import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Box, TextField, Button, Typography, Paper,
  Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';

function Users() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [userIdToEdit, setUserIdToEdit] = useState(null);

  useEffect(() => fetchUsers(), []);

  const fetchUsers = () => {
    axios.get('http://localhost:2424/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  const resetForm = () => {
    setId('');
    setName('');
    setEmail('');
    setUserIdToEdit(null);
    setMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { id: Number(id), name, email };

    if (userIdToEdit !== null) {
      // Edit user
      axios.put(`http://localhost:2424/users/${userIdToEdit}`, payload)
        .then(() => {
          setMessage('User updated successfully');
          fetchUsers();
          resetForm();
        })
        .catch(err => setMessage(err.response?.data || err.message));
    } else {
      // Add new user
      axios.post('http://localhost:2424/users', payload)
        .then(() => {
          setMessage('User added successfully');
          fetchUsers();
          resetForm();
        })
        .catch(err => {
          if (err.response?.status === 400) {
            setMessage('User with ID already exists');
          } else {
            setMessage(err.response?.data || err.message);
          }
        });
    }
  };

  const handleEdit = (user) => {
    setId(user.id);
    setName(user.name);
    setEmail(user.email);
    setUserIdToEdit(user.id);
    setMessage('');
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:2424/users/${id}`)
      .then(() => {
        setMessage('User deleted successfully');
        fetchUsers();
      })
      .catch(() => setMessage('Failed to delete user'));
  };

  const handleCancel = () => resetForm();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4">{userIdToEdit ? 'Edit User' : 'Add User'}</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}
        >
          <TextField
            label="ID"
            type="number"
            value={id}
            onChange={e => setId(e.target.value)}
            required
            disabled={userIdToEdit !== null}
          />
          <TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              {userIdToEdit ? 'Update' : 'Add'}
            </Button>
            {userIdToEdit && <Button variant="outlined" onClick={handleCancel}>Cancel</Button>}
          </Box>
        </Box>

        {message && <Typography color="error">{message}</Typography>}

        <Typography variant="h5" sx={{ mt: 4 }}>Users List</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No users available</TableCell>
              </TableRow>
            ) : (
              users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(user)}
                      style={{ marginRight: '8px' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
//example take
export default Users;