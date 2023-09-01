"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Input } from "./ui/input";
import { File } from "nft.storage";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { uploadArtToIpfs } from "@/lib/utils";
import { ButtonLoading } from "./ui/ButtonLoading";

export default function MintNFT({ img }) {
  const file = new File([img], "image.png", {
    type: "image/png",
  });
  const [inputs, setInputs] = useState({
    "name": "",
    "desc": "",
    "wallet": "",
  });
  const [displayInput, setDisplayInput] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const { toast } = useToast();

  const mintNft = async () => {
    setIsMinting(true);
    if (inputs.name && inputs.desc && inputs.wallet) {
      try {
        const imageURL = await uploadArtToIpfs(file);
        if (imageURL) {
          // mint as an NFT on nftport
          const response = await axios.post(
            `https://api.nftport.xyz/vy/urls`,
            {
              file_url: imageURL,
              chain: "polygon",
              name: inputs.name,
              description: inputs.desc,
              mint_to_address: inputs.wallet,
            },
            {
              headers: {
                Authorization: process.env.NEXT_PUBLIC_NFT_PORT,
              },
            }
          );
          if (response.status === 200) {
            toast({
              title: "NFT Minted.✅",
              description: "Check your OpenSea account for more details.",
            });
            setIsMinting(false);
          } else {
            toast({
              variant: "destructive",
              title: "Some error occurred in API.",
              description: "Please try again later.",
            });
            return;
          }
        } else {
          setIsMinting(false);
          toast({
            variant: "destructive",
            title: " IPFS Error.",
            description:
              "Some error occurred while uploading NFT to IPFS. Please try again later.",
          });
          return;
        }
      } catch (err) {
        setIsMinting(false);
        toast({
          variant: "destructive",
          title: `Invalid Address.`,
          description: "Try checking your wallet address.",
        });
      }
    } else {
      setIsMinting(false);
      toast({
        title: "Inputs Incomplete.",
        description: "Please provide Name, Description and Wallet address.",
      });
    }
  };
  return (
    <>
      <h1 className="scroll-m-20  text-base font-bold tracking-tight self-center mb-2">
        Please enter the following details:
      </h1>
      {displayInput === 0 && (
        <Input
          placeholder="Type a name for your NFT."
          name="nft-name"
          className="text-black mb-6 text-base font-medium h-10 2xl:w-[40rem] slide-in"
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          value={inputs.name}
        />
      )}
      {displayInput === 1 && (
        <Input
          placeholder="Type the description for your NFT."
          name="nft-desc"
          className="text-black mb-6 text-base font-medium w-full h-10 2xl:w-[40rem] slide-in"
          onChange={(e) => setInputs({ ...inputs, desc: e.target.value })}
          value={inputs.desc}
        />
      )}
      {displayInput > 1 && (
        <Input
          placeholder="Type your Wallet address."
          name="nft-wallet-address"
          className="text-black mb-6 text-base font-medium w-full h-10 2xl:w-[40rem] slide-in"
          onChange={(e) => setInputs({ ...inputs, wallet: e.target.value })}
          value={inputs.wallet}
        />
      )}
      <div className="w-full lg:w-2/5 2xl:w-3/5 text-center">
        {displayInput <= 1 ? (
          <Button
            onClick={() => setDisplayInput((prev) => prev + 1)}
            className="w-56 mb-4 2xl:w-3/4"
          >
            NEXT →
          </Button>
        ) : isMinting ? (
          <ButtonLoading className="w-56 mb-4 2xl:w-3/4">
            Please wait...
          </ButtonLoading>
        ) : (
          <Button onClick={mintNft} className="w-56 mb-4 2xl:w-3/4">
            MINT NOW!
          </Button>
        )}
        {displayInput >= 1 ? (
          <Button
            onClick={() => setDisplayInput((prev) => prev - 1)}
            className="w-56 2xl:w-3/4"
          >
            ← GO BACK
          </Button>
        ) : (
          <Button className="w-56 mb-4 2xl:w-3/4">
            <Link href={"/generate"} className="w-56 2xl:w-3/4">
              ← GENERATE MORE
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}
