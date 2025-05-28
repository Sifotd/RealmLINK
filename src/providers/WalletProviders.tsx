'use client';

import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// 配置要连接的网络
const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
});

// 创建一个查询客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 重试次数
      staleTime: 5 * 60 * 1000, // 5分钟内数据被视为新鲜
    },
  },
});

export function WalletProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
        <WalletProvider 
          autoConnect={false} // 不自动连接
          preferredWallets={['Sui Wallet', 'Ethos Wallet', 'Suiet']} // 优先显示的钱包
        >
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
} 