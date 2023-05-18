'use client';
import DashboardLayout from '@/app/components/layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import fetchUtil from '@/utils/fetchUtil';
import ErrorDialog from '@/app/components/prompt/ErrorDialog';

import LotTomb from '@/app/components/edit/lot/LotTomb';
import LotOwners from '@/app/components/edit/lot/LotOwners';
import LotImage from '@/app/components/LotImage';

import { Divider, Button, CircularProgress, Switch, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { createClient } from '@/utils/supabase-browser';
import { v4 as uuidv4 } from 'uuid';

const ViewLotPage = ({ params }) => {
    const { id } = params;

    const [lot, setLot] = useState({});
    const [owners, setOwners] = useState([]);
    const [tombs, setTombs] = useState([]);
    const [initialLoad, setInitialLoad] = useState(false);
    const [addingTomb, setAddingTomb] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [updatingLight, setUpdatingLight] = useState(false);
    const [errorDialog, setErrorDialog] = useState({ title : '', message: '' });
    const [showError, setShowError] = useState(false);

    const handleAddTomb = () => {
        const addTomb = async () => {
            try {
                setAddingTomb(true);
    
                const res = await fetchUtil(`/lot/tomb`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ lotID: id })
                });
    
                const tomb = await res.json();

                setTombs(current => [...current, tomb]);
            } catch(error) {
                setErrorDialog({ title: 'Error', message: error.message });
                setShowError(true);
            } finally {
                setAddingTomb(false);
            }
        };
        
        addTomb();
    };

    const handleDeleteTomb = (id) => {
        const newTombs = tombs.filter( (tomb) => tomb.id !== id);
        setTombs(newTombs);
    };

    const handleFileUpload = (event) => {
        const uploadFile = async () => {
            try {
                setUploading(true);
                const file = event.target.files[0];
                const fileName = uuidv4();

                const supabase = createClient();

                const { data: { path }, error } = await supabase
                    .storage
                    .from('lot_images')
                    .upload(fileName, file, {
                        cacheControl: '3600',
                        upsert: false
                    });

                const res = await fetchUtil(`/lot?id=${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image_path: path })
                });

                const lot = await res.json();

                setLot(lot);
                if (error) throw new Error(error.message);
            } catch (error) {
                setErrorDialog({ title: 'Error', message: error.message });
                setShowError(true);
            } finally {
                setUploading(false);
            }
        };
        
        uploadFile();
    };

    const handleSwitchChange = (event) => {
        const has_light = event.target.checked;
        const makeRequest = async () => {
            try {
                setUpdatingLight(true);
                const res = await fetchUtil(`/lot/light?id=${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ has_light })
                });

                setLot({ ...lot, has_light });
            } catch(error) {
                setErrorDialog({ title: 'Error', message: error.message });
                setShowError(true);
            } finally {
                setUpdatingLight(false);
            }
        };
        
        makeRequest();
    };

    useEffect( () => {
        const fetchLot = async () => {
            setInitialLoad(true);
            const res = await fetchUtil(`/lot?id=${id}`);

            const data = await res.json();

            setLot(data.lot);
            setOwners(data.owners);
            setTombs(data.tombs);

            setInitialLoad(false);
        };

        fetchLot();
    }, []);

    return (
        <DashboardLayout userType="admin">
            <>
                {
                    !initialLoad ? (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    {lot.is_mausoleum ? (
                                        <h2>Mausoleum {lot.lot_num}</h2>
                                    ) : (
                                        <h2>Block {lot.block}, Section {lot.section}, Lot {lot.lot_num}</h2>
                                    )}
                                </div>
                                <div>
                                    <FormControlLabel control={<Switch disabled={updatingLight} checked={lot.has_light} onChange={handleSwitchChange} />} label="Has Light" />
                                </div>
                            </div>
                            
                            <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>

                            <div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                                    {uploading ? <CircularProgress /> : <LotImage src={lot.image_path ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/lot_images/${lot.image_path}` : '/placeholder.png' } alt="Lot Image" size={500} />}
                            
                                    <Button disabled={uploading} variant="contained" component="label" startIcon={<CameraAltIcon />}>
                                        Upload File
                                        <input hidden type="file" onChange={handleFileUpload} accept=".jpg,.jpeg,.png"/>
                                    </Button>
                                </div>
                            </div>

                            <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>

                            <LotOwners lotID={id} owners={owners} />

                            <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>

                            <div style={{ display: 'flex '}}>
                                <h2>Lot Tombs</h2>
                                <Button disabled={addingTomb} sx={{ marginLeft: 3 }} variant="contained" startIcon={<AddIcon />} onClick={handleAddTomb}>
                                    Create New Tomb
                                </Button>
                            </div>
                            
                            <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>

                            {tombs.map( (tomb, i) => {
                                return (
                                    <div key={i}>
                                        <LotTomb id={tomb.id} deceasedList={tomb.deceased_list} deleteTomb={handleDeleteTomb} />
                                        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                    </div>
                                );
                            })}

                            <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>

                            <ErrorDialog title={errorDialog.title} message={errorDialog.message} open={showError} setOpen={setShowError} />
                        </>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                            <CircularProgress />
                        </div>
                    )
                }
            </>
        </DashboardLayout>
    );
};

export default ViewLotPage;