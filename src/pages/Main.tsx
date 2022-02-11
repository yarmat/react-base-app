import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {AuthRouteNames} from "../router/auth";
import {DashboardRouteNames} from "../router/dashboard";
import {Layout, Row, Col, Space, Button,  Typography} from "antd";
import Footer from "../components/Footer";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Main: FC = () => {
    const {isAuth} = useTypedSelector(state => state.auth);

    return (
        <Layout className="h-100">
            <Layout.Content className="content-section">
                <Row justify={"center"} align={"middle"} style={{height: '100%'}}>
                    <Col>
                        <Typography.Title level={1}>Task Manager</Typography.Title>

                        <Row justify={"center"}>
                            <Space>
                                {isAuth
                                    ?
                                    <Button type="primary">
                                        <Link to={DashboardRouteNames.TASK}>Dashboard</Link>
                                    </Button>
                                    :
                                    <>
                                        <Button type="primary">
                                            <Link to={AuthRouteNames.LOGIN}>Login</Link>
                                        </Button>
                                        <Button type="primary">
                                            <Link to={AuthRouteNames.REGISTER}>Register</Link>
                                        </Button>
                                    </>
                                }
                            </Space>
                        </Row>
                    </Col>
                </Row>
            </Layout.Content>
            <Layout.Footer>
                <Footer />
            </Layout.Footer>
        </Layout>
    );
};

export default Main;
