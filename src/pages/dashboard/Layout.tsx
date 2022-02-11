import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import {
    Layout as BaseLayout
} from "antd";
import DashboardHeader from "../../components/Dashboard/Header";
import DashboardFooter from "../../components/Dashboard/Footer";


const Layout: FC = () => {
    return (
        <BaseLayout className="h-100">
            <BaseLayout.Header>
                <DashboardHeader />
            </BaseLayout.Header>
            <BaseLayout.Content className="dashboard-content">
                <Outlet/>
            </BaseLayout.Content>
            <BaseLayout.Footer>
                <DashboardFooter />
            </BaseLayout.Footer>
        </BaseLayout>
    );
};

export default Layout;
