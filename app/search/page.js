import DashboardLayout from "../components/layouts/DashboardLayout";

import LotTable from "../components/search/LotTable";

const LotSearchPage = () => {
    return (
        <DashboardLayout userType="admin">
            <h2 style={{ marginBottom: 20 }}>Viewing All Lots</h2>
            <LotTable />
        </DashboardLayout>
    );
};

export default LotSearchPage;