import React, { useState, useEffect, useRef } from 'react';
import { Container, Table, Button, Spinner, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Navbar } from './Navbar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import * as AdminUserService from '../services/AdminUserService';

export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const toastShown = useRef({ success: false, error: false });
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
        // Cleanup function to reset the ref when component unmounts
        return () => {
            toastShown.current = { success: false, error: false };
        };
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await AdminUserService.getAllUsers();
            setUsers(data);
            
            // Only show success toast if it hasn't been shown yet
            if (!toastShown.current.success) {
                toast.success('Users fetched successfully');
                toastShown.current.success = true;
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            // Only show error toast if it hasn't been shown yet
            if (!toastShown.current.error) {
                toast.error('Failed to load users');
                toastShown.current.error = true;
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowEditModal(true);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await AdminUserService.deleteUser(userId);
                toast.success('User deleted successfully');
                fetchUsers(); // Refresh the list
            } catch (error) {
                console.error('Error deleting user:', error);
                toast.error('Failed to delete user');
            }
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await AdminUserService.updateUser(editingUser.id, editingUser);
            toast.success('User updated successfully');
            setShowEditModal(false);
            fetchUsers(); // Refresh the list
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user');
        }
    };

    return (
        <div className="users-page">
            <style>
                {`
                    .users-page {
                        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                        min-height: 100vh;
                        padding-bottom: 3rem;
                    }
                    .table-container {
                        background: white;
                        border-radius: 15px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                        padding: 20px;
                        margin-top: 20px;
                    }
                    .action-buttons {
                        display: flex;
                        gap: 10px;
                    }
                    .action-button {
                        padding: 5px 10px;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .edit-button {
                        background-color: #ffc107;
                        border: none;
                        color: white;
                    }
                    .delete-button {
                        background-color: #dc3545;
                        border: none;
                        color: white;
                    }
                `}
            </style>

            <Navbar />

            <Container>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Manage Users</h2>
                </div>

                <div className="table-container">
                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-2">Loading users...</p>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-muted">No users found</p>
                        </div>
                    ) : (
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Date of Birth</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{format(new Date(user.dob), 'dd/MM/yyyy')}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <Button 
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() => handleEdit(user)}
                                                    className="action-button edit-button"
                                                >
                                                    <FaEdit /> Edit
                                                </Button>
                                                <Button 
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(user.id)}
                                                    className="action-button delete-button"
                                                >
                                                    <FaTrash /> Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </Container>

            {/* Edit User Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editingUser?.firstName || ''}
                                onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editingUser?.lastName || ''}
                                onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={editingUser?.email || ''}
                                onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                value={editingUser?.dob || ''}
                                onChange={(e) => setEditingUser({...editingUser, dob: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                value={editingUser?.role || ''}
                                onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                                required
                            >
                                <option value="ROLE_USER">User</option>
                                <option value="ROLE_ADMIN">Admin</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
} 