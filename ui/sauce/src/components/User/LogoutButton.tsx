import { Button } from "antd";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveIndexDbPersistentData } from "../../lib/indexDb";
import { useUserStore } from "../../states/userState";

export const LogoutButton = () => {
    const { user, setUser } = useUserStore()
    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log('logging out')
        localStorage.setItem("token", "");
        setUser(null as any);
        await saveIndexDbPersistentData('user', null);
        navigate('/');
    }

    return <Button onClick={handleLogout}><LogOut /> logout</Button>
}