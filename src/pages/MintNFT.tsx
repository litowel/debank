import { useState } from "react";
import { useActiveAccount, useActiveWalletChain, useSendTransaction } from "thirdweb/react";
import { getContract } from "thirdweb";
import { mintTo } from "thirdweb/extensions/erc721";
import { client } from "../client";
import { ImagePlus, Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function MintNFT() {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const { mutateAsync: sendTransaction, isPending: isMinting } = useSendTransaction();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ImagePlus className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Mint NFT</h1>
        <p className="text-gray-400 max-w-md mb-8">
          Connect your wallet to create and mint your own digital assets directly to the blockchain.
        </p>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSuccess(false);

    if (!file) {
      setError("Please select an image");
      return;
    }

    if (!chain) {
      setError("Please connect your wallet to a network");
      return;
    }

    const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
    if (!contractAddress) {
      setError("NFT Contract Address is not configured. Please set VITE_NFT_CONTRACT_ADDRESS in your environment variables.");
      return;
    }

    try {
      const contract = getContract({
        client,
        chain,
        address: contractAddress,
      });

      const transaction = mintTo({
        contract,
        to: account.address,
        nft: {
          name,
          description,
          image: file,
        },
      });

      await sendTransaction(transaction);
      
      setIsSuccess(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setPreviewUrl(null);
        setFile(null);
        setName("");
        setDescription("");
        (document.getElementById('mint-form') as HTMLFormElement)?.reset();
      }, 3000);
    } catch (err: any) {
      console.error("Minting failed:", err);
      setError(err.message || "Failed to mint NFT. Make sure you have permission and enough funds.");
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Mint NFT</h1>
        <p className="text-gray-400">Create a new digital asset and add it to your collection.</p>
      </div>

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 md:p-8">
        <form id="mint-form" onSubmit={handleMint} className="space-y-6">
          
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-500">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Asset Image</label>
            <div className="relative group">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                required
              />
              <div className={`w-full aspect-video md:aspect-[21/9] rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-colors ${previewUrl ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/10'}`}>
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="font-medium mb-1">Click or drag image to upload</p>
                    <p className="text-sm text-gray-500">Supports JPG, PNG, GIF, WEBP up to 10MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input 
                id="name"
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Genesis Pass #001" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50 transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
              <textarea 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your digital asset..." 
                rows={4}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50 transition-colors resize-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isMinting || isSuccess}
            className={`w-full py-4 font-medium rounded-xl flex items-center justify-center transition-all ${
              isSuccess 
                ? 'bg-green-500 text-white' 
                : isMinting
                  ? 'bg-white/10 text-white cursor-not-allowed'
                  : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Successfully Minted!
              </>
            ) : isMinting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Minting to Blockchain...
              </>
            ) : (
              'Mint NFT'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
