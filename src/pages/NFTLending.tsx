import { useActiveAccount } from "thirdweb/react";
import { ShieldCheck, Image as ImageIcon, Lock, Unlock, AlertTriangle } from "lucide-react";

export default function NFTLending() {
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">NFT-Collateral Lending</h1>
        <p className="text-gray-400 max-w-md mb-8">
          Connect your wallet to use your premium NFTs as collateral for instant loans from our partner liquidity pools.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">NFT-Collateral Lending</h1>
        <p className="text-gray-400">Lock your NFTs securely in our smart contracts to access liquidity without selling.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Eligible NFTs */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Eligible Assets in Wallet</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mock NFT 1 */}
            <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-orange-500/50 transition-colors">
              <div className="aspect-square bg-gray-800 relative">
                <img 
                  src="https://picsum.photos/seed/nft1/400/400" 
                  alt="Bored Ape #1234" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                  Floor: 12.5 ETH
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1">Bored Ape #1234</h3>
                <p className="text-sm text-gray-400 mb-4">BAYC Collection</p>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl mb-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Max Loan (40% LTV)</div>
                    <div className="font-medium text-green-400">5.0 ETH</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 mb-1">Interest</div>
                    <div className="font-medium">4.5% APR</div>
                  </div>
                </div>
                
                <button className="w-full py-2.5 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-colors">
                  Get Loan Offer
                </button>
              </div>
            </div>

            {/* Mock NFT 2 */}
            <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-orange-500/50 transition-colors">
              <div className="aspect-square bg-gray-800 relative">
                <img 
                  src="https://picsum.photos/seed/nft2/400/400" 
                  alt="Azuki #8888" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                  Floor: 4.2 ETH
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1">Azuki #8888</h3>
                <p className="text-sm text-gray-400 mb-4">Azuki Collection</p>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl mb-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Max Loan (50% LTV)</div>
                    <div className="font-medium text-green-400">2.1 ETH</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 mb-1">Interest</div>
                    <div className="font-medium">5.2% APR</div>
                  </div>
                </div>
                
                <button className="w-full py-2.5 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-colors">
                  Get Loan Offer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Collateral & Info */}
        <div className="space-y-6">
          <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Active Collateral</h2>
            
            <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-white/10 rounded-xl">
              <Lock className="w-8 h-8 text-gray-500 mb-3" />
              <p className="text-sm text-gray-400">No NFTs currently locked as collateral.</p>
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
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

          <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
            <h3 className="font-medium mb-4">How it works</h3>
            <ul className="space-y-4 text-sm text-gray-400">
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
