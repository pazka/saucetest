import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { getSwapQuotes } from "../../apis/0xApi/zeroXApi";
import { useQuoteStore } from "../../states/quoteState";
import { useTokenStore } from "../../states/tokenState";
import { CustomToken } from "./CustomToken";
import { QuoteDisplay } from "./QuoteDisplay";
import { TokenMeta } from "./TokenMeta";

const RenderToken = ({ token }: { token: DexScreener }) => <>
    <h3>Selected Token</h3>
    <h4>{token.chainId}</h4>
    <img src={token.icon} style={{ width: 25, height: 25 }} alt={"icon"} />
</>


export const SwapForm = () => {
    const { token, locked, tokenMeta, setToken,setTokenMeta, setLocked } = useTokenStore();
    const { quote, setQuote } = useQuoteStore();
    const [amount, setAmount] = useState<string>("1000000000000000");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null);
        setQuote();
    }, [token])
    
    const handleGetQuote = async (isBuy: boolean) => {
        if (!token) return;
        const response = await getSwapQuotes(token.tokenAddress, isBuy, amount)

        if (!response) return

        if (!response.expectedOutAmount) {
            setError((response.quoteData as QuoteError).reason + " " + (response.quoteData as QuoteError).validationErrors?.map(x => x.reason).join(", "));
            return;
        }

        setQuote(response as Quote);
    }
    
    const handleClose = () => {
        setLocked(false);
        setToken();
        setTokenMeta();
    }

    return (
        < >
            <h2>Swap {token && locked && <Button onClick={handleClose}>X</Button>}</h2>
            <div>
                {token && !locked && <RenderToken token={token} />}
                {token && <TokenMeta address={token?.tokenAddress} />}
                {!token && !tokenMeta && <CustomToken />}
            </div>
            {locked && <div className="swap-form">
                <label >AMOUNT</label><Input onChange={e => setAmount(e.target.value)} value={amount} />
                <Button onClick={x => handleGetQuote(true)}>BUY ?</Button>
                <Button onClick={x => handleGetQuote(false)}>SELL ?</Button>
            </div>}
            {error && <h3>{error}</h3>}
            {quote && <QuoteDisplay />}
        </>
    );
};