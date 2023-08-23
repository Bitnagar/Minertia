import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NFTStorage } from "nft.storage";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const cleanupIPFS = (url) => {
  if (url.includes("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
};

export const uploadArtToIpfs = async (imageFile) => {
  try {
    const nftstorage = new NFTStorage({
      token: process.env.NEXT_PUBLIC_NFT_STORAGE,
    });

    const store = await nftstorage.store({
      name: "AI NFT",
      description: "AI generated NFT",
      image: imageFile,
    });

    return cleanupIPFS(store.data.image.href);
  } catch (err) {
    toast({
      variant: "destructive",
      title: "IPFS failed.",
      description: "Something went wrong. Please Retry!",
    });
  }
};
