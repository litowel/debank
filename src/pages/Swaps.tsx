import { useActiveAccount } from "thirdweb/react";
import { ArrowDown, Settings, ArrowRightLeft } from "lucide-react";

export default function Swaps() {
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ArrowRightLeft className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Token Swaps</h1>
        <p className="text-gray-400 max-w-md mb-8">
          Connect your wallet to swap tokens instantly across multiple networks.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-[#151515] border border-white/10 rounded-3xl p-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-xl font-semibold">Swap</h2>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* You Pay */}
        <div className="bg-[#0a0a0a] rounded-2xl p-4 mb-1 border border-white/5">
          <div className="text-sm text-gray-400 mb-2">You pay</div>
          <div className="flex justify-between items-center">
            <input 
              type="text" 
              placeholder="0" 
              className="bg-transparent text-3xl font-light outline-none w-full"
            />
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors shrink-0">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">E</div>
              <span className="font-medium">ETH</span>
              <ArrowDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="text-sm text-gray-500 mt-2">Balance: 2.4 ETH</div>
        </div>

        {/* Swap Arrow */}
        <div className="relative h-2 flex items-center justify-center z-10">
          <button className="absolute w-10 h-10 bg-[#151515] border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors">
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

        {/* You Receive */}
        <div className="bg-[#0a0a0a] rounded-2xl p-4 mt-1 border border-white/5 mb-4">
          <div className="text-sm text-gray-400 mb-2">You receive</div>
          <div className="flex justify-between items-center">
            <input 
              type="text" 
              placeholder="0" 
              className="bg-transparent text-3xl font-light outline-none w-full"
              readOnly
            />
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors shrink-0">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">U</div>
              <span className="font-medium">USDC</span>
              <ArrowDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="text-sm text-gray-500 mt-2">Balance: 15,420.50 USDC</div>
        </div>

        <button className="w-full py-4 bg-white/10 text-white/50 font-medium rounded-2xl cursor-not-allowed">
          Enter an amount
        </button>
      </div>
    </div>
  );
}
