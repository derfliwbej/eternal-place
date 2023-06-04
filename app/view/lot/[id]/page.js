'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import LotImage from '@/components/LotImage';
import ErrorDialog from '@/components/prompt/ErrorDialog';
import { CircularProgress, Divider } from '@mui/material';
import DeceasedTable from './DeceasedTable';

import fetchUtil from '@/utils/fetchUtil';

const LotHeader = ({ lot }) => {
    if (lot.is_mausoleum) return (
        <h2>{`Mausoleum ${lot.lot_num}`}</h2>
    );
    else return (
        <h2>{`Block ${lot.block}, Section ${lot.section}, Lot ${lot.lot_num}`}</h2>
    );
};

const ViewLotPage = ({ params }) => {
    const { id } = params;

    const [lot, setLot] = useState({ id: null, block: null, section: null, lot_num: null, has_light: null, deceased_list: [] });
    const [loading, setLoading] = useState(true);
    const [errorDialog, setErrorDialog] = useState({ title: '', message: '' });
    const [showError, setShowError] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect( () => {
        const makeRequest = async () => {
            try {
                setLoading(true);
                const res = await fetchUtil(`/user/lot?id=${id}`);
                const lot = await res.json();

                setLot(lot);
            } catch (error) {
                setHasError(true);
                setErrorDialog({ title: 'Error', message: error.message });
                setShowError(true);
            } finally {
                setLoading(false);
            }
        };

        makeRequest();
    }, []);

    return (
        <DashboardLayout userType="admin">
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress />
                </div>
            ) : (hasError || (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <LotHeader lot={lot} />
                    </div>

                    <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <LotImage path={lot.image_path} alt="Lot Image" size={500} />
                    </div>

                    <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>

                    <h2>List of Deceased Persons</h2>

                    <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>

                    <DeceasedTable rows={lot.deceased_list} />
                </>
            ))}
            <ErrorDialog title={errorDialog.title} message={errorDialog.message} open={showError} setOpen={setShowError} />
        </DashboardLayout>
    );
};

export default ViewLotPage;