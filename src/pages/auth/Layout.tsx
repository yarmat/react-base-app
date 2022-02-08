import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import {Layout as BaseLayout, Row, Col} from 'antd';

const Layout: FC = () => {
    return (
        <BaseLayout style={{height:"100vh"}}>
            <BaseLayout.Content>
                <Row align="middle" justify="center" style={{height:"100vh"}}>
                    <Col span={24} lg={4}>
                        <Outlet />
                    </Col>
                </Row>
            </BaseLayout.Content>
        </BaseLayout>
    );
};

export default Layout;
