'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import fetchUtil from '@/utils/fetchUtil';

import { TextField, Button, CircularProgress } from '@mui/material';
import ErrorText from '@/components/prompt/ErrorText';
import SuccessText from '@/components/prompt/SuccessText';

import styles from '@/app/styles/profile/EditProfilePage.module.css';

const EditProfilePage = () => {
    const [firstName, setFirstName] = useState({ value: '', error: false, helperText: '' });
    const [middleName, setMiddleName] = useState({ value: '', error: false, helperText: '' });
    const [lastName, setLastName] = useState({ value: '', error: false, helperText: '' });
    const [contactNumber, setContactNumber] = useState({ value: '', error: false, helperText: '' });
    const [address, setAddress] = useState({ value: '', error: false, helperText: '' });
    const [password, setPassword] = useState({ value: '', error: false, helperText: '' });
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => {
        let hasError = false;
        if (!firstName.value) {
          hasError = true;
          setFirstName({ ...firstName, error: true, helperText: 'Cannot be empty.' });
        }
  
        if (!middleName.value) {
          hasError = true;
          setMiddleName({ ...middleName, error: true, helperText: 'Cannot be empty.' });
        }
  
        if (!lastName.value) {
          hasError = true;
          setLastName({ ...lastName, error: true, helperText: 'Cannot be empty.' });
        }
  
        if (!/^[0-9]+$/.test(contactNumber.value)) {
          hasError = true;
          setContactNumber({ ...contactNumber, error: true, helperText: 'Invalid contact number.' });
        }
  
        if (!address.value) {
          hasError = true;
          setAddress({ ...address, error: true, helperText: 'Cannot be empty.' });
        }
  
        return hasError;
    };

    const validatePassword = () => {
        if (!password.value) {
            setPassword({ ...password, error: true, helperText: 'Cannot be empty.' });
            return true;
        } else if (password.value.length <= 6) {
            setPassword({ ...password, error: true, helperText: 'Password should at least be 6 characters.'});
            return true;
        }
        return false;
    };

    const onSaveProfile = () => {
        setFirstName({ ...firstName, error: false, helperText: '' });
        setMiddleName({ ...middleName, error: false, helperText: '' });
        setLastName({ ...lastName, error: false, helperText: '' });
        setContactNumber({ ...contactNumber, error: false, helperText: '' });
        setAddress({ ...address, error: false, helperText: '' });

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
                        first_name: firstName.value,
                        middle_name: middleName.value,
                        last_name: lastName.value,
                        contact_num: contactNumber.value,
                        address: address.value
                    })
                });

                setSuccess('Successfully updated profile');
            } catch(error) {
                setError('Internal Server Error. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (validateForm()) return;
        else saveProfile();
    };

    const onSavePassword = () => {
        setPassword({ ...password, error: false, helperText: '' });
        const savePassword = async () => {
            setLoading(true);
            setError('');
            setSuccess('');
            try {
                const res = await fetchUtil('/password', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password: password.value })
                });

                setSuccess('Successfully updated password');
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (validatePassword()) return;
        else savePassword();
    }

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await fetchUtil('/profile');
                const { first_name, middle_name, last_name, contact_num, address: addr } = await res.json();

                setFirstName({ ...firstName, value: first_name });
                setMiddleName({ ...middleName, value: middle_name });
                setLastName({ ...lastName, value: last_name });
                setContactNumber({ ...contactNumber, value: contact_num });
                setAddress({ ...address, value: addr });
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
                    <TextField disabled={loading} label="First Name" value={firstName.value} error={firstName.error} helperText={firstName.helperText} onChange={ (event) => {
                        setFirstName({ ...firstName, value: event.target.value });
                    }} />
                    <TextField disabled={loading} label="Middle Name" value={middleName.value} error={middleName.error} helperText={middleName.helperText} onChange={ (event) => {
                        setMiddleName({ ...middleName, value: event.target.value });
                    }} />
                    <TextField disabled={loading} label="Last Name" value={lastName.value} error={lastName.error} helperText={lastName.helperText} onChange={ (event) => {
                        setLastName({ ...lastName, value: event.target.value });
                    }} />
                    <TextField disabled={loading} label="Contact Number" value={contactNumber.value} error={contactNumber.error} helperText={contactNumber.helperText} onChange={ (event) => {
                        setContactNumber({ ...contactNumber, value: event.target.value });
                    }} />
                    <TextField disabled={loading} label="Address" value={address.value} error={address.error} helperText={address.helperText} onChange={ (event) => {
                        setAddress({ ...address, value: event.target.value });
                    }} />
                    <Button disabled={loading} variant="contained" onClick={onSaveProfile}>Save Profile</Button>
                </div>
                <div className={styles['password-form-container']}>
                    <h4>Change Password</h4>
                    <TextField disabled={loading} label="New Password" value={password.value} error={password.error} helperText={password.helperText} onChange={ (event) => {
                        setPassword({ ...password, value: event.target.value });
                    }} type="password" />
                    <Button disabled={loading} variant="contained" onClick={onSavePassword}>Change Password</Button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EditProfilePage;