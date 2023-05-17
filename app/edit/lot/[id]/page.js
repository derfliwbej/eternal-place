'use client';
import DashboardLayout from '@/app/components/layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import fetchUtil from '@/utils/fetchUtil';
import ErrorDialog from '@/app/components/prompt/ErrorDialog';

import LotTomb from '@/app/components/edit/lot/LotTomb';
import LotOwners from '@/app/components/edit/lot/LotOwners';
import LotImage from '@/app/components/LotImage';

import { Divider, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ViewLotPage = ({ params }) => {
    const { id } = params;

    const [lot, setLot] = useState({});
    const [owners, setOwners] = useState([]);
    const [tombs, setTombs] = useState([]);
    const [initialLoad, setInitialLoad] = useState(false);
    const [addingTomb, setAddingTomb] = useState(false);
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

    const deleteTomb = (id) => {
        const newTombs = tombs.filter( (tomb) => tomb.id !== id);
        setTombs(newTombs);
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
                            <h2>Block {lot.block}, Section {lot.section}, Lot {lot.lot_num}</h2>
                            <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {/* TODO: Image view and upload */}
                                    <LotImage src="/pantheon.jpg" alt="Lot Image" size={500} />
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
                                        <LotTomb id={tomb.id} deceasedList={tomb.deceased_list} deleteTomb={deleteTomb} />
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