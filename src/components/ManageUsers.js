import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/global.css';

const ManageUsers = () => {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        const [usersResponse, rolesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${auth.token}` },
          }),
          axios.get('http://localhost:5000/api/users/roles', {
            headers: { Authorization: `Bearer ${auth.token}` },
          })
        ]);
        setUsers(usersResponse.data.users);
        setRoles(rolesResponse.data.roles);
      } catch (error) {
        console.error('Error fetching users or roles:', error);
      }
    };

    fetchUsersAndRoles();
  }, [auth.token]);

  const handleRoleChange = async (userId, roleId) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}/role`, { roleId }, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setUsers(users.map(user => user.id === userId ? { ...user, role_id: roleId } : user));
      alert('User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editingUser.id}`, { email: editingUser.email }, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
      setEditingUser(null);
      alert('User details updated successfully');
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update user details');
    }
  };

  const handleChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editingUser.email}
                    onChange={handleChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <select
                    name="role_id"
                    value={editingUser.role_id}
                    onChange={handleChange}
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.role_name}</option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={user.role_id}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.role_name}</option>
                    ))}
                  </select>
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <>
                    <button onClick={handleUpdateUser}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditUser(user)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
