import { Button, Input } from "antd";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { createUser } from "../apis/internal/userApi";

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const { status, data, error, isLoading ,refetch} = useQuery('register', ()=> createUser(username,email,password),{
        enabled: false,
        refetchOnWindowFocus: false,
    });
    
    const handleRegister = async () => {
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }
        await refetch();
    };
    
    useEffect(() => {
        if(status === 'success'){
            alert("User created successfully");
        }
        if(status === 'error'){
            alert("User creation failed");
        }
    }, [data]);
    
    return (
        <div>
            <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
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
            <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!isLoading &&<Button disabled={isLoading} onClick={handleRegister}>Register</Button>}
            {isLoading && <Loader />}
        </div>
    );
}