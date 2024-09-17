import { useEffect } from "react";
import { useQuery } from "react-query";
import { getTokenMetaData } from "../../apis/alchemy/alchemyApi";

export const TokenMeta = ({ address }: {
    address: string;
}) => {
    const { isLoading, data, error,refetch } = useQuery('tokenMetaData', () => getTokenMetaData(address));
    
    useEffect(() => {
        refetch();
    }, [address]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: </div>;

    if(!data) return <div>No data</div>;
    
    return <div>
        <div>Symbol: {data.symbol}</div>
        <div>Name: {data.name}</div>
        <div>Decimals: {data.decimals}</div>
    </div>;

};