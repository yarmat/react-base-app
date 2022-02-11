import React, {FC} from 'react';
import {Button, Col, Menu, Row} from "antd";
import {PublicRouteNames} from "../../router/public";
import {Link, useLocation} from "react-router-dom";
import {DashboardRouteNames} from "../../router/dashboard";
import {LogoutOutlined} from "@ant-design/icons";
import {useActions} from "../../hooks/useActions";

const DashboardHeader: FC = () => {
    const location = useLocation();
    const {logout} = useActions();

    return (
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
                <Button onClick={logout} type="primary" icon={<LogoutOutlined />} size="middle" />
            </Col>
        </Row>
    );
};

export default DashboardHeader;
