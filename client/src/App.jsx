import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    year: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.data) {
        setStudents(response.data.data);
      }
      setErrorMessage('');
    } catch {
      setErrorMessage('Failed to connect to backend server. Make sure the Express server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.department.trim() || !formData.year.trim()) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      if (editingId) {
        const response = await axios.put(`${API_URL}/${editingId}`, formData);
        setSuccessMessage(response.data.message || 'Student updated successfully!');
        setEditingId(null);
      } else {
        const response = await axios.post(API_URL, formData);
        setSuccessMessage(response.data.message || 'Student added successfully!');
      }

      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        year: ''
      });
      setErrorMessage('');
      fetchStudents();
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error saving student information.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleEditClick = (student) => {
    setEditingId(student._id);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      department: student.department,
      year: student.year
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      year: ''
    });
  };

  const handleDeleteClick = async (id, name) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      setSuccessMessage(response.data.message || 'Student deleted successfully!');
      
      if (editingId === id) {
        handleCancelEdit();
      }

      fetchStudents();
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error deleting student.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Student Management System</h1>
          <p className="subtitle">MERN Stack Minor Project (CRUD Application)</p>
        </div>
      </header>

      <main className="main-content">
        <section className="stats-section">
          <div className="stat-card">
            <span className="stat-label">Total Registered Students</span>
            <span className="stat-number">{students.length}</span>
          </div>
        </section>

        {successMessage && (
          <div className="alert alert-success">
            <span>{successMessage}</span>
            <button className="alert-close" onClick={() => setSuccessMessage('')}>&times;</button>
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-error">
            <span>{errorMessage}</span>
            <button className="alert-close" onClick={() => setErrorMessage('')}>&times;</button>
          </div>
        )}

        <section id="student-form" className="form-card">
          <div className="form-header">
            <h2>{editingId ? 'Edit Student Details' : 'Register New Student'}</h2>
            {editingId && (
              <p>Update the fields below and click "Update Student".</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Student Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select Department --</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Business Administration">Business Administration</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="year">Year of Study *</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select Year --</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-submit">
                {editingId ? 'Update Student' : 'Register Student'}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelEdit}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="table-card">
          <div className="table-header">
            <div>
              <h2>Registered Students List</h2>
              <p>View, search, edit, and delete student records stored in MongoDB.</p>
            </div>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search by student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                  &times;
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="loading-state">Loading students data...</div>
          ) : filteredStudents.length === 0 ? (
            <div className="empty-state">
              {students.length === 0
                ? 'No students registered yet. Use the form above to add your first student!'
                : `No student found matching "${searchTerm}".`}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id} className={editingId === student._id ? 'row-editing' : ''}>
                      <td className="id-cell" title={student._id}>
                        {student._id.slice(-6)}
                      </td>
                      <td className="font-semibold">{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      <td>
                        <span className="badge badge-dept">{student.department}</span>
                      </td>
                      <td>
                        <span className="badge badge-year">{student.year}</span>
                      </td>
                      <td className="actions-cell">
                        <button
                          className="btn-action btn-edit"
                          onClick={() => handleEditClick(student)}
                          title="Edit Student"
                        >
                          Edit
                        </button>
                        <button
                          className="btn-action btn-delete"
                          onClick={() => handleDeleteClick(student._id, student.name)}
                          title="Delete Student"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Student Management System - College Web Development Minor Project</p>
      </footer>
    </div>
  );
}

export default App;
