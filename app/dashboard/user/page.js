'use client';
import DashboardLayout from '@/app/components/layouts/DashboardLayout';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const UserDashboard = () => {
    const navigations = [
        { text: 'Make transaction', route: '/transaction', icon: AttachMoneyIcon },
        { text: 'View transaction history', route: '/history', icon: ReceiptLongIcon },
        { text: 'Edit profile', route: '/profile',  icon: ModeEditIcon }
    ];
    
    return (
        <>
            <DashboardLayout navigations={navigations}>
                <span>Test</span>
            </DashboardLayout>
        </>
    );
};

export default UserDashboard;