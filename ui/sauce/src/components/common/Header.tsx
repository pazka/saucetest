import { Layout } from 'antd';
import React from 'react';
import { LoginButton } from '../User/LoginButton';
const { Header } = Layout;

const AppHeader: React.FC = () => {
    return (
        <Layout>
            <Header>
                <h1>
                    Sauce Trial
                </h1>
                <LoginButton />
            </Header>
        </Layout>
    );
};

export default AppHeader;