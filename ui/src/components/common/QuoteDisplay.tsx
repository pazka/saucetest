import { useQuoteStore } from "../../states/quoteState";

export const QuoteDisplay = () => {
    const {quote} = useQuoteStore();
    
    if(!quote) return null;
    
    return (<div className="quote-display">
        <h3>Expected Out Amount</h3>
        <h4>{quote.expectedOutAmount.toLocaleString()}</h4>
        <h3>Quote Data</h3>
        <pre>{JSON.stringify(quote.quoteData, null, 2)}</pre>
    </div>
    );
}