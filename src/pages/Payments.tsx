import { useActiveAccount } from "thirdweb/react";
import { Send, Download, Link as LinkIcon, QrCode, ArrowRightLeft } from "lucide-react";

export default function Payments() {
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ArrowRightLeft className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Payments & Transfers</h1>
        <p className="text-gray-400 max-w-md mb-8">
          Connect your wallet to send crypto, create payment links, and manage invoices.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Payments</h1>
        <p className="text-gray-400">Send, receive, and request crypto instantly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Send Action */}
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
            <Send className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Send Crypto</h3>
          <p className="text-gray-400 text-sm">Transfer tokens to any wallet address or ENS domain.</p>
        </div>

        {/* Receive Action */}
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
            <Download className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Receive</h3>
          <p className="text-gray-400 text-sm">View your wallet address and QR code to receive funds.</p>
        </div>

        {/* Payment Links */}
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
            <LinkIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Payment Links</h3>
          <p className="text-gray-400 text-sm">Create shareable links to request specific amounts from anyone.</p>
        </div>

        {/* Invoices */}
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Invoices</h3>
          <p className="text-gray-400 text-sm">Generate professional crypto invoices for your clients.</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden mt-8">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Transfers</h2>
          <button className="text-sm text-gray-400 hover:text-white">View All</button>
        </div>
        <div className="p-8 text-center text-gray-500">
          No recent transfers found.
        </div>
      </div>
    </div>
  );
}
