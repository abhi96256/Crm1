import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { usersAPI } from '../services/api';
import './EmployeeManagement.css';

const EmployeeManagement = ({ onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee' // Default role
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getEmployees();
      setEmployees(response.data);
    } catch (error) {
      setError('Failed to fetch users');
      console.error('Fetch employees error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await usersAPI.createEmployee(formData);
      setSuccess(`${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} created successfully!`);
      setFormData({ name: '', email: '', password: '', role: 'employee' });
      setShowAddForm(false);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await usersAPI.delete(employeeId);
      setSuccess('User deleted successfully!');
      fetchEmployees(); // Refresh the list
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="employee-management-overlay">
      <div className="employee-management-content">
        <div className="employee-management-header">
          <h2>User Management</h2>
          <button className="employee-management-close" onClick={onClose}>×</button>
        </div>

        {error && <div className="employee-management-error">{error}</div>}
        {success && <div className="employee-management-success">{success}</div>}

        <div className="employee-management-actions">
          <button 
            className="employee-management-add-btn"
            onClick={() => setShowAddForm(true)}
          >
            <FaPlus /> Add User
          </button>
        </div>

        {showAddForm && (
          <div className="employee-management-form">
            <h3>Add New User</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter user name"
                />
              </div>
              
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter user email"
                />
              </div>
              
              <div className="form-group">
                <label>Role:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Password:</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter password (min 6 characters)"
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create User'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ name: '', email: '', password: '', role: 'employee' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="employee-management-list">
          <h3>Current Users ({employees.length})</h3>
          
          {loading && <div className="employee-management-loading">Loading users...</div>}
          
          {!loading && employees.length === 0 && (
            <div className="employee-management-empty">
              No users found. Add your first user above.
            </div>
          )}

          {!loading && employees.length > 0 && (
            <div className="employee-table">
              <div className="employee-table-header">
                <div className="employee-table-cell">Name</div>
                <div className="employee-table-cell">Email</div>
                <div className="employee-table-cell">Role</div>
                <div className="employee-table-cell">Status</div>
                <div className="employee-table-cell">Created</div>
                <div className="employee-table-cell">Actions</div>
              </div>
              
              {employees.map((employee) => (
                <div key={employee.id} className="employee-table-row">
                  <div className="employee-table-cell">
                    <div className="employee-name">
                      {employee.avatar && (
                        <img 
                          src={employee.avatar} 
                          alt={employee.name} 
                          className="employee-avatar"
                        />
                      )}
                      {employee.name}
                    </div>
                  </div>
                  <div className="employee-table-cell">{employee.email}</div>
                  <div className="employee-table-cell">
                    <span className={`role-badge ${employee.role || 'employee'}`}>
                      {employee.role ? employee.role.charAt(0).toUpperCase() + employee.role.slice(1) : 'Employee'}
                    </span>
                  </div>
                  <div className="employee-table-cell">
                    <span className={`status-badge ${employee.isActive ? 'active' : 'inactive'}`}>
                      {employee.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="employee-table-cell">
                    {formatDate(employee.createdAt)}
                  </div>
                  <div className="employee-table-cell">
                    <div className="employee-actions">
                      <button 
                        className="action-btn edit-btn"
                        title="Edit Employee"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteEmployee(employee.id)}
                        title="Delete Employee"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement; 