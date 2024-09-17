import { DexListing } from "../components/common/DexListing";
import { useTokenStore } from "../states/tokenState";


const renderToken = (token: DexScreener) => <>
    <h3>Selected Token</h3>
    <h4>{token.chainId}</h4>
    <img src={token.icon} style={{ width: 25, height: 25 }} alt={"icon"} />
</>


export const LoggedHomePage = () => {
    const { token, locked,setToken,setLocked } = useTokenStore();

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
        <div>
            <h2>Wallet</h2>
            
        </div>
        <div id="swap-action">
            <h2>Swap</h2>

            <div>
                {token ? renderToken(token) : null}
            </div>
        </div>
    </div>
    );
};