import { Wallet } from "lucide-react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getWalletEthBalance } from "../../apis/baseorg/baseorgApi";
import { useUserStore } from "../../states/userState";

export const TokenWallet = () => {
    const { user } = useUserStore();
    const { isLoading, data, error, refetch } = useQuery("walletBalance", () => getWalletEthBalance(user?.walletAddress ?? ""));

    useEffect(() => {
        refetch();
    }, [user?.walletAddress])

    return (<div>
        <h2><span style={{ display: "flex" }}><Wallet /> Wallet</span></h2>
        {isLoading ? <p>Loading...</p> : error ? <p>Error</p> : <p>{data} ETH</p>}
    </div>)
}