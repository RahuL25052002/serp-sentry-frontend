import React, { useState, useEffect, useRef } from 'react';
import { Container, Table, Spinner, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Navbar } from './Navbar';
import { format } from 'date-fns';
import Footer from './Footer';
import * as AdminUserService from '../services/AdminUserService';
import { FaTrash } from 'react-icons/fa';

export default function ViewAllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const toastShown = useRef({ success: false, error: false });

    useEffect(() => {
        fetchUsers();
        return () => {
            toastShown.current = { success: false, error: false };
        };
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await AdminUserService.getAllUsers();
            setUsers(data);
            if (!toastShown.current.success) {
                toast.success('Users fetched successfully');
                toastShown.current.success = true;
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            if (!toastShown.current.error) {
                toast.error('Failed to load users');
                toastShown.current.error = true;
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await AdminUserService.deleteUser(userId);
                toast.success('User deleted successfully');
                fetchUsers();
            } catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };

    const handleDeleteAll = async () => {
        if (window.confirm('Are you sure you want to delete ALL users?')) {
            try {
                setLoading(true);
                for (const user of users) {
                    await AdminUserService.deleteUser(user.id);
                }
                toast.success('All users deleted successfully');
                fetchUsers();
            } catch (error) {
                toast.error('Failed to delete all users');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
        <div className="users-page">
            <style>{`
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
            `}</style>
           
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>All Users</h2>
                    <Button variant="danger" onClick={handleDeleteAll} disabled={loading || users.length === 0}>
                        Delete All Users
                    </Button>
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
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(user.id)}
                                                className="action-button delete-button"
                                            >
                                                <FaTrash /> Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </Container>
        </div>
          <Footer/>
        </>
    );
} 