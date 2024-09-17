import { Button } from "antd";
import { DexListing } from "../components/common/DexListing";
import { TokenMeta } from "../components/common/TokenMeta";
import { TokenWallet } from "../components/common/TokenWallet";
import { useTokenStore } from "../states/tokenState";
import { useUserStore } from "../states/userState";


const RenderToken = ({ token }: { token: DexScreener }) => <>
    <h3>Selected Token</h3>
    <h4>{token.chainId}</h4>
    <img src={token.icon} style={{ width: 25, height: 25 }} alt={"icon"} />
</>


export const LoggedHomePage = () => {
    const { token, locked, setToken, setLocked } = useTokenStore();
    const { user } = useUserStore();


    const handleRowHover = (token?: DexScreener) => {
        if (locked) return;
        setToken(token);
    }

    const handleRowClick = (token?: DexScreener) => {
        setToken(token);
        setLocked(token !== null);
    }

    return (<div id="logged-home-page">
        <div id="selection">
            <DexListing onRowClick={handleRowClick} onRowHover={handleRowHover} />
        </div>
        <TokenWallet/>
        <div id="swap-action">
            <h2>Swap <Button onClick={x=>setLocked(false)}>X</Button></h2>
            
            <div>
                {token && locked && <TokenMeta address={token.tokenAddress} />}
                {token && !locked && <RenderToken token={token}/> }
            </div>
        </div>
    </div>
    );
};