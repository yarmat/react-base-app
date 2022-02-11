import React, {FC} from 'react';
import {Link, Outlet} from 'react-router-dom';
import {Layout as BaseLayout, Row, Col, Menu} from 'antd';
import Footer from "../../components/Footer";
import {PublicRouteNames} from "../../router/public";

const Layout: FC = () => {
    return (
        <BaseLayout className="h-100">
            <BaseLayout.Header>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key={PublicRouteNames.MAIN}>
                        Main
                        <Link to={PublicRouteNames.MAIN} />
                    </Menu.Item>
                </Menu>
            </BaseLayout.Header>
            <BaseLayout.Content className="content-section">
                <Row align="middle" justify="center">
                    <Col span={24} lg={4}>
                        <Outlet />
                    </Col>
                </Row>
            </BaseLayout.Content>
            <BaseLayout.Footer>
                <Footer />
            </BaseLayout.Footer>
        </BaseLayout>
    );
};

export default Layout;
