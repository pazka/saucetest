import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from "../../states/userState";
import { LogoutButton } from "./LogoutButton";

export const LoginButton = () => {

    const { user } = useUserStore();
    const navigate = useNavigate();

    if (user) {
        return <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        }}><span style={{ color: 'white' }}>{user.name}</span> <LogoutButton /></span>;
    }

    return (
        <span>
            <Button onClick={x => navigate('/login')}>Login</Button>
            <Button onClick={x => navigate('/register')}>Register</Button>
        </span>
    );
}