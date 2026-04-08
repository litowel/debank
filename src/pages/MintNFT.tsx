import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { ImagePlus, Upload, Loader2, CheckCircle2 } from "lucide-react";

export default function MintNFT() {
  const account = useActiveAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMinting(true);
    
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      setIsSuccess(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setPreviewUrl(null);
        (document.getElementById('mint-form') as HTMLFormElement)?.reset();
      }, 3000);
    }, 2500);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Mint NFT</h1>
        <p className="text-gray-400">Create a new digital asset and add it to your collection.</p>
      </div>

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 md:p-8">
        <form id="mint-form" onSubmit={handleMint} className="space-y-6">
          
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
                placeholder="e.g. Genesis Pass #001" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50 transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
              <textarea 
                id="description"
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
