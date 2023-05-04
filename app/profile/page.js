'use client';
import { useState } from 'react';
import DashboardLayout from "../components/layouts/DashboardLayout";

import { TextField, Button } from '@mui/material';

import styles from '@/app/styles/profile/EditProfilePage.module.css';

const EditProfilePage = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <DashboardLayout userType="admin">
            <div className={styles['form-container']}>
                <h2>Edit Profile</h2>
                <TextField label="First Name" value={firstName} onChange={ (event) => {
                    setFirstName(event.target.value);
                }} />
                <TextField label="Middle Name" value={middleName} onChange={ (event) => {
                    setMiddleName(event.target.value);
                }} />
                <TextField label="Last Name" value={lastName} onChange={ (event) => {
                    setLastName(event.target.value);
                }} />
                <TextField label="Contact Number" value={contactNumber} onChange={ (event) => {
                    setContactNumber(event.target.value);
                }} />
                <TextField label="Address" value={address} onChange={ (event) => {
                    setAddress(event.target.value);
                }} />
                <TextField label="Username" value={username} onChange={ (event) => {
                    setUsername(event.target.value);
                }} />
                <TextField label="Password" value={password} onChange={ (event) => {
                    setPassword(event.target.value);
                }} />
                <Button variant="contained">Submit</Button>
            </div>
        </DashboardLayout>
    );
};

export default EditProfilePage;