import { Table } from "antd";
import { useQuery } from "react-query";
import { getTokenListings } from "../apis/dexScreener/tokensApi";

export const PublicHomePage = () => {
    const { isLoading, data, error } = useQuery('getAlchemyData', getTokenListings, {
        cacheTime: 1000 * 60 * 60
    })

    const columns = [
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            render: (_ : any, {url,icon} : DexScreener) => <a href={url} target="_blank" rel="noopener noreferrer"><img src={icon}  alt="icon" style={{ width: 24, height: 24 }}/></a>
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
            render: (links: Link[]) => (
                <ul>
                    {links.filter(x => x).map((link, index) => (
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
        <Table dataSource={data} columns={columns} />;
    </div>)
}