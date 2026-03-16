import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";

function Students() {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    course: "",
    year: "",
  });

  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [studentIdToEdit, setStudentIdToEdit] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:2424/students")
      .then((res) => setStudents(res.data))
      .catch((err) => setMessage("Failed to fetch students"));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      id: "",
      firstName: "",
      middleName: "",
      lastName: "",
      course: "",
      year: "",
    });
    setStudentIdToEdit(null);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formData, id: Number(formData.id) };

    if (studentIdToEdit !== null) {
      // Edit student
      axios
        .put(`http://localhost:2424/students/${studentIdToEdit}`, payload)
        .then(() => {
          setMessage("Student updated successfully!");
          fetchStudents();
          resetForm();
        })
        .catch((err) => {
          setMessage(
            err.response?.data || "Error updating student"
          );
        });
    } else {
      // Add new student
      axios
        .post("http://localhost:2424/students", payload)
        .then(() => {
          setMessage("Student added successfully!");
          fetchStudents();
          resetForm();
        })
        .catch((err) => {
          if (err.response?.status === 400) {
            // Duplicate ID
            setMessage("Student with ID already exists");
          } else {
            setMessage(err.response?.data || "Error adding student");
          }
        });
    }
  };

  const handleEdit = (student) => {
    setFormData({
      id: student.id,
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      course: student.course,
      year: student.year,
    });
    setStudentIdToEdit(student.id);
    setMessage("");
  };

  const handleCancel = () => resetForm();

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:2424/students/${id}`)
      .then(() => {
        setMessage("Student deleted successfully");
        fetchStudents();
      })
      .catch(() => {
        setMessage("Failed to delete student");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Paper style={{ padding: "20px", marginBottom: "30px" }}>
        <Typography variant="h6">
          {studentIdToEdit ? "Edit Student" : "Add Student"}
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <TextField
            label="Student ID"
            name="id"
            type="number"
            value={formData.id}
            onChange={handleChange}
            required
            disabled={studentIdToEdit !== null}
          />
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Middle Name"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
          <TextField
            label="Year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />

          {studentIdToEdit ? (
            <div style={{ display: "flex", gap: "16px" }}>
              <Button type="submit" variant="contained">
                Update Student
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button type="submit" variant="contained">
              Add Student
            </Button>
          )}
        </form>

        {message && (
          <Typography style={{ marginTop: "10px", color: "red" }}>
            {message}
          </Typography>
        )}
      </Paper>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Middle Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No students available
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.middleName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.year}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(student)}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Students;