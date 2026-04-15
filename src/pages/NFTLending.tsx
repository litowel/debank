import { useActiveAccount, useActiveWalletChain, useReadContract } from "thirdweb/react";
import { ShieldCheck, Image as ImageIcon, Lock, Unlock, AlertTriangle } from "lucide-react";
import { getContract } from "thirdweb";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { client } from "../client";

export default function NFTLending() {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();

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
          <ShieldCheck className="w-10 h-10 text-zinc-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">NFT-Collateral Lending</h1>
        <p className="text-zinc-400 max-w-md mb-8 text-lg">
          Connect your wallet to use your premium NFTs as collateral for instant loans from our partner liquidity pools.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">NFT-Collateral Lending</h1>
        <p className="text-zinc-400">Lock your NFTs securely in our smart contracts to access liquidity without selling.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Eligible NFTs */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Eligible Assets in Wallet</h2>
          
          {isNftsLoading ? (
            <div className="text-center py-12 text-zinc-400">Loading your NFTs from the blockchain...</div>
          ) : !contractAddress ? (
            <div className="text-center py-12 text-orange-500 bg-orange-500/10 rounded-2xl border border-orange-500/20">
              Please configure VITE_NFT_CONTRACT_ADDRESS in your environment variables to see your NFTs.
            </div>
          ) : nfts && nfts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nfts.map((nft) => (
                <div key={nft.id.toString()} className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden group cursor-pointer hover:border-orange-500/50 transition-colors backdrop-blur-sm">
                  <div className="aspect-square bg-zinc-950 relative overflow-hidden">
                    {nft.metadata.image ? (
                      <img 
                        src={nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')} 
                        alt={nft.metadata.name || `NFT #${nft.id}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5">
                        <ImageIcon className="w-12 h-12 text-zinc-500" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                      Eligible
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-1 truncate">{nft.metadata.name || `Token #${nft.id}`}</h3>
                    <p className="text-sm text-zinc-400 mb-4 truncate">{nft.metadata.description || 'No description'}</p>
                    
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl mb-4">
                      <div>
                        <div className="text-xs text-zinc-400 mb-1">Est. Loan Value</div>
                        <div className="font-medium text-green-400">0.5 ETH</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-zinc-400 mb-1">Interest</div>
                        <div className="font-medium">4.5% APR</div>
                      </div>
                    </div>
                    
                    <button className="w-full py-2.5 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-colors">
                      Get Loan Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-400 bg-zinc-900/50 rounded-2xl border border-white/5 backdrop-blur-sm">
              No eligible NFTs found in your wallet for this collection.
            </div>
          )}
        </div>

        {/* Right Column: Active Collateral & Info */}
        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-4">Active Collateral</h2>
            
            <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-white/10 rounded-xl">
              <Lock className="w-8 h-8 text-zinc-500 mb-3" />
              <p className="text-sm text-zinc-400">No NFTs currently locked as collateral.</p>
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-orange-500 mb-2">Liquidation Warning</h3>
                <p className="text-sm text-orange-500/80 leading-relaxed">
                  If the floor price of your collateral NFT drops below the liquidation threshold (typically 80% LTV), your NFT may be liquidated by the protocol to repay the lender pool.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="font-medium mb-4">How it works</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white text-xs">1</div>
                <p>Select an eligible NFT and review the loan terms provided by our partner liquidity pools.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white text-xs">2</div>
                <p>Lock your NFT in our secure smart contract vault.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white text-xs">3</div>
                <p>Receive funds instantly to your wallet.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white text-xs">4</div>
                <p>Repay the principal plus interest to unlock and retrieve your NFT.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
