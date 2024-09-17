import { Table } from "antd";
import { useQuery } from "react-query";
import { getTokenListings } from "../../apis/dexScreener/tokensApi";

export const DexListing = (
    {
        onRowClick ,
        onRowHover 
    }: {
        onRowClick?: (data: DexScreener) => void,
        onRowHover?: (data?: DexScreener ) => void
    }) => {
    const { isLoading, data = [], error } = useQuery('token-listing', getTokenListings)

    const columns = [
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            render: (_: any, { url, icon }: DexScreener) => <a href={url} target="_blank" rel="noopener noreferrer"><img src={icon} alt="icon" style={{ width: 24, height: 24 }} /></a>
        },
        {
            title: 'Chain ID',
            dataIndex: 'chainId',
            key: 'chainId',
        },
        {
            title: 'Token Address',
            dataIndex: 'tokenAddress',
            key: 'tokenAddress',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Links',
            dataIndex: 'links',
            key: 'links',
            render: (links: Link[] = []) => (
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label ?? link.type}</a>
                        </li>
                    ))}
                </ul>
            ),
        },
    ];

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    return (<div>
        <Table 
        rowClassName={onRowClick ? 'dex-row' : 'dex-row clickabke'}
        onRow={(record, rowIndex) => {
            return {
                onClick: (event) => onRowClick && onRowClick(record),
                onMouseEnter: (event) => onRowHover && onRowHover(record), // mouse enter row
                onMouseLeave: (event) => onRowHover && onRowHover(),
            };
        }} dataSource={data} columns={columns} />;
    </div>)
}