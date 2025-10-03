// app/page.tsx
'use client';

import { ConnectKitButton } from 'connectkit';
import { useAccount, useReadContract, useBalance } from 'wagmi';
import { formatEther } from 'viem';

const contractAddress = '0x8bcA757F3EB644d3263cDE6286E5E2F5ed8D5C60';
const contractABI = [
  { name: 'name', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'string' }] },
  { name: 'symbol', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'string' }] },
  { name: 'balanceOf', type: 'function', stateMutability: 'view', inputs: [{ type: 'address' }], outputs: [{ type: 'uint256' }] }
] as const;

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({ address });

  const { data: tokenName } = useReadContract({
    address: contractAddress, abi: contractABI, functionName: 'name',
  });
  const { data: tokenSymbol } = useReadContract({
    address: contractAddress, abi: contractABI, functionName: 'symbol',
  });
  const { data: tokenBalance } = useReadContract({
    address: contractAddress, abi: contractABI, functionName: 'balanceOf', args: [address!], query: { enabled: isConnected },
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-12 bg-gray-900 text-white">
      <div className="absolute top-8 right-8">
        <ConnectKitButton />
      </div>
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">欢迎来到 Okido Finance</h1>
        <p className="text-xl text-gray-400">去中心化房地产投资平台</p>
      </div>
      {isConnected && (
        <div className="mt-12 p-8 border border-gray-700 rounded-xl w-full max-w-2xl bg-gray-800 space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-6">账户信息</h2>
          <InfoRow label="网络状态:" value={<span className="font-mono text-green-400">已连接</span>} />
          <InfoRow label="你的钱包地址:" value={<span className="font-mono text-sm">{address}</span>} />
          <InfoRow label="你的 ETH 余额:" value={<span className="font-mono">{ethBalance ? `${parseFloat(ethBalance.formatted).toFixed(4)} ETH` : '加载中...'}</span>} />
          <hr className="border-gray-600 my-4" />
          <InfoRow label="房产代币名称:" value={<span className="font-mono">{tokenName ?? '加载中...'}</span>} />
          <InfoRow label="房产代币符号:" value={<span className="font-mono">{tokenSymbol ?? '加载中...'}</span>} />
          <InfoRow label="你持有的房产股份:" value={<span className="font-mono">{typeof tokenBalance === 'bigint' ? `${formatEther(tokenBalance)} ${tokenSymbol}` : '加载中...'}</span>} />
        </div>
      )}
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium text-gray-400">{label}</span>
      {value}
    </div>
  );
}