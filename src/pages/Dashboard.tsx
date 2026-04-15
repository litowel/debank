import { useActiveAccount, useActiveWalletChain, useWalletBalance, useReadContract } from "thirdweb/react";
import { ArrowUpRight, ArrowDownRight, Activity, Wallet, CreditCard, Image as ImageIcon } from "lucide-react";
import { getContract } from "thirdweb";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { client } from "../client";

export default function Dashboard() {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();

  const { data: balance, isLoading: isBalanceLoading } = useWalletBalance({
    client,
    chain,
    address: account?.address,
  });

  const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
  const contract = contractAddress && chain ? getContract({
    client,
    chain,
    address: contractAddress,
  }) : undefined;

  const { data: nfts, isLoading: isNftsLoading } = useReadContract(getOwnedNFTs, {
    contract: contract as any,
    owner: account?.address as string,
    queryOptions: {
      enabled: !!contract && !!account?.address,
    }
  });

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/10 border border-white/10">
          <Wallet className="w-10 h-10 text-zinc-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Welcome to NovaFi</h1>
        <p className="text-zinc-400 max-w-md mb-8 text-lg">
          Connect your wallet to access payments, swaps, instant funding, and NFT-collateral lending.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-zinc-400">Welcome back, {account.address.slice(0, 6)}...{account.address.slice(-4)}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/50 border border-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400 font-medium">Wallet Balance</h3>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Wallet className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <div className="text-4xl font-light tracking-tight mb-2">
            {isBalanceLoading ? "..." : `${Number(balance?.displayValue || 0).toFixed(4)} ${balance?.symbol || ''}`}
          </div>
          <div className="flex items-center text-sm text-zinc-400">
            <span>On {chain?.name || 'Unknown Network'}</span>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400 font-medium">Owned NFTs</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ImageIcon className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div className="text-4xl font-light tracking-tight mb-2">
            {isNftsLoading ? "..." : (nfts?.length || 0)}
          </div>
          <div className="flex items-center text-sm text-orange-500">
            <span>Available for collateral</span>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400 font-medium">Active Loans</h3>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CreditCard className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <div className="text-4xl font-light tracking-tight mb-2">
            $0.00
          </div>
          <div className="flex items-center text-sm text-zinc-400">
            <span>No active loans</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-zinc-900/50 border border-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-semibold">Your NFTs</h2>
        </div>
        <div className="p-6">
          {isNftsLoading ? (
            <div className="text-center text-zinc-500">Loading NFTs...</div>
          ) : nfts && nfts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {nfts.map((nft) => (
                <div key={nft.id.toString()} className="bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-orange-500/50 transition-colors group">
                  <div className="aspect-square overflow-hidden">
                    {nft.metadata.image ? (
                      <img src={nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')} alt={nft.metadata.name || `NFT #${nft.id}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-zinc-500" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-zinc-950/50 backdrop-blur-md">
                    <div className="font-medium text-sm truncate">{nft.metadata.name || `Token #${nft.id}`}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-zinc-500 py-8">
              No NFTs found in this collection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
