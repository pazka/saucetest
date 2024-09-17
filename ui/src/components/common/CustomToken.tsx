import { Button, Input } from "antd";
import { useState } from "react";
import { getTokenMetaData } from "../../apis/alchemy/alchemyApi";
import { useTokenStore } from "../../states/tokenState";

export const CustomToken = () => {
    const [tmpToken, setTmpToken] = useState<string>("0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"); // default to usdc on base chain
    const { setLocked,setTokenMeta ,setToken} = useTokenStore();

    const handleSetCustomToken = async () => {
        if (!tmpToken) return;

        const res = await getTokenMetaData(tmpToken);
        if (!res) return;

        setToken({
            chainId: "ethereum",
            icon: "none",
            tokenAddress: tmpToken,
            url: "none",
            description: "none",
            links: [],
            header : "none"
        });
        setTokenMeta(res);
        setLocked(true);

    }

    return <>
        <Input placeholder="Enter Token Address" value={tmpToken} onChange={e => setTmpToken(e.target.value)} />
        <Button onClick={handleSetCustomToken}>Swap !</Button>
    </>
};
