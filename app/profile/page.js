'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from "../components/layouts/DashboardLayout";
import fetchUtil from '@/utils/fetchUtil';

import { TextField, Button, CircularProgress } from '@mui/material';
import ErrorText from '@/app/components/prompt/ErrorText';
import SuccessText from '@/app/components/prompt/SuccessText';

import styles from '@/app/styles/profile/EditProfilePage.module.css';

const EditProfilePage = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const onSaveProfile = () => {
        const saveProfile = async () => {
            setLoading(true);
            setError('');
            setSuccess('');
            try {
                const res = await fetchUtil('/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        first_name: firstName,
                        middle_name: middleName,
                        last_name: lastName,
                        contact_num: contactNumber,
                        address
                    })
                });

                setSuccess('Successfully updated profile');
            } catch(error) {
                setError('Internal Server Error. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        saveProfile();
    };

    const onSavePassword = () => {
        setLoading(true);
        setError('');
        setSuccess('');
        const savePassword = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await fetchUtil('/password', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password })
                });

                setSuccess('Successfully updated password');
            } catch(error) {
                setError('Internal Server Error. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        savePassword();
    }

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await fetchUtil('/profile');
                const { first_name, middle_name, last_name, contact_num, address } = await res.json();

                setFirstName(first_name);
                setMiddleName(middle_name);
                setLastName(last_name);
                setContactNumber(contact_num);
                setAddress(address);
            } catch(error) {
                setError('Internal Server Error. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    return (
        <DashboardLayout userType="admin">
            <div className={styles['header-container']}>
                <h2>Edit Profile</h2>
                {loading && <CircularProgress size="1rem" sx={{ marginLeft: 3 }}/>}
            </div>
            <ErrorText>{error}</ErrorText>
            <SuccessText>{success}</SuccessText>
            <div className={styles['main-container']}>
                <div className={styles['profile-form-container']}>
                    <h4>Profile Details</h4>
                    <TextField disabled={loading} label="First Name" value={firstName} onChange={ (event) => {
                        setFirstName(event.target.value);
                    }} />
                    <TextField disabled={loading} label="Middle Name" value={middleName} onChange={ (event) => {
                        setMiddleName(event.target.value);
                    }} />
                    <TextField disabled={loading} label="Last Name" value={lastName} onChange={ (event) => {
                        setLastName(event.target.value);
                    }} />
                    <TextField disabled={loading} label="Contact Number" value={contactNumber} onChange={ (event) => {
                        setContactNumber(event.target.value);
                    }} />
                    <TextField disabled={loading} label="Address" value={address} onChange={ (event) => {
                        setAddress(event.target.value);
                    }} />
                    <Button disabled={loading} variant="contained" onClick={onSaveProfile}>Save Profile</Button>
                </div>
                <div className={styles['password-form-container']}>
                    <h4>Change Password</h4>
                    <TextField disabled={loading} label="New Password" value={password} onChange={ (event) => {
                        setPassword(event.target.value);
                    }} type="password" />
                    <Button disabled={loading} variant="contained" onClick={onSavePassword}>Change Password</Button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EditProfilePage;