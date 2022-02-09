import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import {Layout as BaseLayout, Row, Col} from 'antd';

const Layout: FC = () => {
    return (
        <BaseLayout className="h-100">
            <BaseLayout.Content>
                <Row align="middle" justify="center" className="h-100">
                    <Col span={24} lg={4}>
                        <Outlet />
                    </Col>
                </Row>
            </BaseLayout.Content>
        </BaseLayout>
    );
};

export default Layout;
