import { Button, Input } from "antd";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/internal/userApi";
import { displayNotification } from "../common/notifyUser";
import { LogoutButton } from "../components/User/LogoutButton";
import { useUserStore } from "../states/userState";

export const LoginPage = () => {
    const { user, setUser } = useUserStore();
    const [email, setEmail] = useState('alice@example.com');
    const [password, setPassword] = useState('password');
    const navigate = useNavigate();

    const { status, data, error, isLoading, refetch } = useQuery('login', () => login(email, password), {
        enabled: false,
        refetchOnWindowFocus: false,
    });

    const handleLogin = async () => {
        await refetch();
    };

    useEffect(() => {
        if (status === 'success') {
            setUser(data.responseObject);
            navigate('/');
        }
        if (status === 'error') {
            displayNotification("Login failed");
        }
    }, [data]);

    if (user) {
        return <div>Welcome, {user.name} <LogoutButton />  </div>;
    }

    return (
        <div>
            <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {!isLoading && <Button disabled={isLoading} onClick={handleLogin}>Login</Button>}
            {isLoading && <Loader />}
        </div>
    );
};