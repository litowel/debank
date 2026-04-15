import { useActiveAccount, useActiveWalletChain, useSendTransaction } from "thirdweb/react";
import { HeartHandshake, Plus, Copy, ExternalLink, Loader2 } from "lucide-react";
import { prepareTransaction, toWei } from "thirdweb";
import { client } from "../client";
import { useState } from "react";

export default function Donations() {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const { mutateAsync: sendTransaction } = useSendTransaction();
  
  const [donatingTo, setDonatingTo] = useState<string | null>(null);

  const handleDonate = async (campaignId: string) => {
    if (!account || !chain) return;
    
    setDonatingTo(campaignId);
    try {
      // Create a transaction to send 0.001 native token (e.g. ETH/MATIC) as a donation
      const tx = prepareTransaction({
        to: account.address, // In a real app, this would be the campaign creator's address
        value: toWei("0.001"),
        chain,
        client,
      });
      
      await sendTransaction(tx);
      alert("Donation successful! Thank you for your support.");
    } catch (error) {
      console.error("Donation failed:", error);
    } finally {
      setDonatingTo(null);
    }
  };

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/10 border border-white/10">
          <HeartHandshake className="w-10 h-10 text-zinc-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Donations & Campaigns</h1>
        <p className="text-zinc-400 max-w-md mb-8 text-lg">
          Connect your wallet to create shareable donation links and manage fundraising campaigns.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Donations</h1>
          <p className="text-zinc-400">Create and manage your public donation links.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-colors">
          <Plus className="w-5 h-5" />
          New Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campaign 1 */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col backdrop-blur-sm hover:border-white/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">Creator Fund</h3>
            <span className="px-2.5 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">Active</span>
          </div>
          <p className="text-zinc-400 text-sm mb-6">Support my open-source web3 projects and tutorials.</p>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-400">Raised</span>
              <span className="font-medium">$1,250.00 / $5,000.00</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-1/4 rounded-full"></div>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <button 
              onClick={() => handleDonate("creator-fund")}
              disabled={donatingTo === "creator-fund"}
              className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
            >
              {donatingTo === "creator-fund" ? <Loader2 className="w-5 h-5 animate-spin" /> : <HeartHandshake className="w-5 h-5" />}
              Donate 0.001 {chain?.nativeCurrency?.symbol || "ETH"}
            </button>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors text-sm">
                <Copy className="w-4 h-4" />
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Campaign 2 */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col backdrop-blur-sm hover:border-white/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">Coffee Tip Jar</h3>
            <span className="px-2.5 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">Active</span>
          </div>
          <p className="text-zinc-400 text-sm mb-6">A simple tip jar for anyone who wants to buy me a coffee.</p>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-400">Received</span>
              <span className="font-medium">12 Tips ($60.00)</span>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <button 
              onClick={() => handleDonate("coffee-tip")}
              disabled={donatingTo === "coffee-tip"}
              className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
            >
              {donatingTo === "coffee-tip" ? <Loader2 className="w-5 h-5 animate-spin" /> : <HeartHandshake className="w-5 h-5" />}
              Tip 0.001 {chain?.nativeCurrency?.symbol || "ETH"}
            </button>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors text-sm">
                <Copy className="w-4 h-4" />
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
