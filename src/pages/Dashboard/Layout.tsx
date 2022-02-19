import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import {
    Layout as BaseLayout
} from "antd";
import DashboardHeader from "../../components/DashboardHeader";
import Footer from "../../components/Footer";

const Layout: FC = () => {
    return (
        <BaseLayout className="h-100">
            <BaseLayout.Header>
                <DashboardHeader />
            </BaseLayout.Header>
            <BaseLayout.Content className="content-section">
                <Outlet/>
            </BaseLayout.Content>
            <BaseLayout.Footer>
                <Footer />
            </BaseLayout.Footer>
        </BaseLayout>
    );
};

export default Layout;
