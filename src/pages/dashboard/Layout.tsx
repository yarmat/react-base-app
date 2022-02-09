import React, {FC} from 'react';
import {Outlet, useLocation, Link} from 'react-router-dom';
import {
    Layout as BaseLayout,
    Menu,
    Row,
    Col,
    Button
} from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import {DashboardRouteNames} from "../../router/dashboard";
import {PublicRouteNames} from "../../router/public";

const Layout: FC = () => {
    const location = useLocation();

    return (
        <BaseLayout className="h-100">
            <BaseLayout.Header>
                <Row justify="space-between" align="middle">
                    <Col flex="auto">
                        <Menu className="w-100" theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
                            <Menu.Item key={PublicRouteNames.MAIN}>
                                Main
                                <Link to={PublicRouteNames.MAIN} />
                            </Menu.Item>
                            <Menu.Item key={DashboardRouteNames.TASK}>Tasks</Menu.Item>
                        </Menu>
                    </Col>
                    <Col>
                        <Button type="primary" icon={<LogoutOutlined />} size="middle" />
                    </Col>
                </Row>
            </BaseLayout.Header>
            <BaseLayout.Content className="dashboard-content">
                <Outlet/>
            </BaseLayout.Content>
            <BaseLayout.Footer>
                Copyright © {new Date().getFullYear()} <a target="_blank" href="https://yarmat.su">yarmat.su</a>
            </BaseLayout.Footer>
        </BaseLayout>
    );
};

export default Layout;
