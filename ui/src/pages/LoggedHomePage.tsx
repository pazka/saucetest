import { getTokenMetaData } from "../apis/alchemy/alchemyApi";
import { DexListing } from "../components/common/DexListing";
import { SwapForm } from "../components/common/SwapForm";
import { TokenWallet } from "../components/common/TokenWallet";
import { useTokenStore } from "../states/tokenState";
import { useUserStore } from "../states/userState";



export const LoggedHomePage = () => {
    const { user } = useUserStore();
    const { token, locked, setTokenMeta, setToken, setLocked } = useTokenStore();


    const handleRowHover = (token?: DexScreener) => {
        if (locked) return;
        setToken(token);
    }

    const handleRowClick = async (token?: DexScreener) => {
        setToken(token);
        setLocked(token !== null);

        if (!token) {
            setTokenMeta();
        }else{
            const tokenMeta = await getTokenMetaData(token?.tokenAddress);
            setTokenMeta(tokenMeta);
        }

    }

    return (<div id="logged-home-page">
        <div id="selection">
            <DexListing onRowClick={handleRowClick} onRowHover={handleRowHover} />
        </div>
        <div id="swap-action">
            <TokenWallet />
            <SwapForm />
        </div>
    </div>
    );
};