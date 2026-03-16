const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 2424;

app.use(cors());
app.use(express.json());

const usersFilePath = path.join(__dirname, 'users.json');
const studentsFilePath = path.join(__dirname, 'students.json');

app.get("/", (req, res) => {
  res.send("Server is running");
});

// ================= USERS =================

// GET users
app.get('/users', (req, res) => {
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading users.');
    res.json(JSON.parse(data || "[]"));
  });
});

// ADD user
app.post('/users', (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).send('ID, name and email are required.');
  }

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    let users = [];
    if (!err && data) {
      users = JSON.parse(data);
    }

    // Check for duplicate ID
    const exists = users.find(u => Number(u.id) === Number(id));
    if (exists) return res.status(400).send('User ID already exists.');

    users.push({ id: Number(id), name, email });

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).send('Error saving user');
      res.json({ message: 'User added successfully' });
    });
  });
});

// EDIT user
app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedData = req.body;

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    let users = JSON.parse(data || "[]");
    const index = users.findIndex(u => u.id === id);

    if (index === -1) return res.status(404).send('User not found');

    users[index] = { ...users[index], ...updatedData };

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).send('Error updating user');
      res.send('User updated successfully');
    });
  });
});

// DELETE user
app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading users.');
    let users = JSON.parse(data || "[]");
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).send('User not found');

    users.splice(index, 1);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).send('Error deleting user');
      res.send('User deleted successfully');
    });
  });
});

// ================= STUDENTS =================

// GET students
app.get('/students', (req, res) => {
  fs.readFile(studentsFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading students.');
    res.json(JSON.parse(data || "[]"));
  });
});

// ADD student
app.post('/students', (req, res) => {
  const student = {
    id: Number(req.body.id),
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    course: req.body.course,
    year: req.body.year
  };

  if (!student.id || !student.firstName || !student.lastName || !student.course || !student.year) {
    return res.status(400).send('All student fields are required.');
  }

  fs.readFile(studentsFilePath, 'utf8', (err, data) => {
    let students = [];
    if (!err && data) students = JSON.parse(data);

    // Check for duplicate ID
    const exists = students.find(s => s.id === student.id);
    if (exists) return res.status(400).send('Student ID already exists.');

    students.push(student);

    fs.writeFile(studentsFilePath, JSON.stringify(students, null, 2), (err) => {
      if (err) return res.status(500).send('Error saving student');
      res.status(201).json({ message: 'Student added successfully' });
    });
  });
});

// EDIT student
app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedData = req.body;

  fs.readFile(studentsFilePath, 'utf8', (err, data) => {
    let students = JSON.parse(data || "[]");
    const index = students.findIndex(s => s.id === id);

    if (index === -1) return res.status(404).send('Student not found');

    students[index] = { ...students[index], ...updatedData };

    fs.writeFile(studentsFilePath, JSON.stringify(students, null, 2), (err) => {
      if (err) return res.status(500).send('Error updating student');
      res.send('Student updated successfully');
    });
  });
});

// DELETE student
app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  fs.readFile(studentsFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading students.');
    let students = JSON.parse(data || "[]");
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return res.status(404).send('Student not found');

    students.splice(index, 1);
    fs.writeFile(studentsFilePath, JSON.stringify(students, null, 2), (err) => {
      if (err) return res.status(500).send('Error deleting student');
      res.send('Student deleted successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});