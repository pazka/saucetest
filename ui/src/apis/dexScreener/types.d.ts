interface DexScreener {
    url: string;
    chainId: string;
    tokenAddress: string;
    icon: string;
    header: string;
    description: string;
    links: Link[];
}

interface Link {
    type: string;
    label: string;
    url: string;
}