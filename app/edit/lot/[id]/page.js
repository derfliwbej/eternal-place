'use client';
import DashboardLayout from '@/app/components/layouts/DashboardLayout';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import fetchUtil from '@/utils/fetchUtil';

import LotTomb from '@/app/components/edit/lot/LotTomb';
import LotOwners from '@/app/components/edit/lot/LotOwners';
import LotImage from '@/app/components/LotImage';

import { Divider, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ViewLotPage = ({ params }) => {
    const { id } = params;

    const [lot, setLot] = useState({});
    const [owners, setOwners] = useState([]);
    const [tombs, setTombs] = useState([]);

    const handleAddTomb = () => {
        // TODO: API Call for adding tomb then getting the id from the backend
        setTombs(current => [...current, { id: 0, deceased_list: [] }]);
    };

    const deleteTomb = (id) => {
        const newTombs = tombs.filter( (tomb) => tomb.id !== id);
        setTombs(newTombs);
    };

    return (
        <DashboardLayout userType="admin">
            <h2>Block 1, Section A, Lot 3</h2>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* TODO: Image view and upload */}
                    <LotImage src="/pantheon.jpg" alt="Lot Image" size={500} />
                </div>
            </div>

            <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>

            <LotOwners owners={owners} />

            <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>

            <div style={{ display: 'flex '}}>
                <h2>Lot Tombs</h2>
                <Button sx={{ marginLeft: 3 }} variant="contained" startIcon={<AddIcon />} onClick={handleAddTomb}>
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
        </DashboardLayout>
    );
};

export default ViewLotPage;