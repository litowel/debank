import { useActiveAccount } from "thirdweb/react";
import { HeartHandshake, Plus, Copy, ExternalLink } from "lucide-react";

export default function Donations() {
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <HeartHandshake className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Donations & Campaigns</h1>
        <p className="text-gray-400 max-w-md mb-8">
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
          <p className="text-gray-400">Create and manage your public donation links.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-colors">
          <Plus className="w-5 h-5" />
          New Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campaign 1 */}
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">Creator Fund</h3>
            <span className="px-2.5 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">Active</span>
          </div>
          <p className="text-gray-400 text-sm mb-6">Support my open-source web3 projects and tutorials.</p>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Raised</span>
              <span className="font-medium">$1,250.00 / $5,000.00</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-1/4 rounded-full"></div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors text-sm">
              <Copy className="w-4 h-4" />
              Copy Link
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors text-sm">
              <ExternalLink className="w-4 h-4" />
              View Page
            </button>
          </div>
        </div>

        {/* Campaign 2 */}
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">Coffee Tip Jar</h3>
            <span className="px-2.5 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">Active</span>
          </div>
          <p className="text-gray-400 text-sm mb-6">A simple tip jar for anyone who wants to buy me a coffee.</p>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Received</span>
              <span className="font-medium">12 Tips ($60.00)</span>
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors text-sm">
              <Copy className="w-4 h-4" />
              Copy Link
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors text-sm">
              <ExternalLink className="w-4 h-4" />
              View Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
