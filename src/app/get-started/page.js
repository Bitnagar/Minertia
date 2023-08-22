"use client";
import { useState } from "react";
import axios from "axios";
import { NFTStorage } from "nft.storage";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [mintName, setMintName] = useState("");
  const [mintDesc, setMintDesc] = useState("");
  const [mintAdd, setMintAdd] = useState("");

  const [imageBlob, setImageBlob] = useState("");
  const [willMint, setWillMint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const generateArt = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5`,
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_FACE}}`,
          },
          method: "POST",
          inputs: prompt,
        },
        { responseType: "blob" }
      );
      // convert blob to a image file type
      const file = new File([response.data], "image.png", {
        type: "image/png",
      });

      // saving the file in a state
      setFile(file);
      const url = URL.createObjectURL(response.data);
      setImageBlob(url);
      setIsLoading(false);
    } catch (err) {
      if (err) {
        setIsLoading(false);
        toast({
          title: "Something went wrong!",
          description: "Something went wrong. Please Retry!",
        });
      }
    }
  };

  const cleanupIPFS = (url) => {
    if (url.includes("ipfs://")) {
      return url.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
  };

  const uploadArtToIpfs = async () => {
    try {
      const nftstorage = new NFTStorage({
        token: process.env.NFT_STORAGE,
      });

      const store = await nftstorage.store({
        name: "AI NFT",
        description: "AI generated NFT",
        image: file,
      });

      return cleanupIPFS(store.data.image.href);
    } catch (err) {
      toast({
        title: "Something went wrong!",
        description: "Something went wrong. Please Retry!",
      });
      return null;
    }
  };

  const mintNft = async () => {
    if (mintName && mintDesc) {
      try {
        const imageURL = await uploadArtToIpfs();

        // mint as an NFT on nftport
        const response = await axios.post(
          `https://api.nftport.xyz/v0/mints/easy/urls`,
          {
            file_url: imageURL,
            chain: "polygon",
            name: mintName,
            description: mintDesc,
            mint_to_address: mintAdd,
          },

          {
            headers: {
              Authorization: process.env.NFT_PORT,
            },
          }
        );
        const data = await response.data;
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      toast({
        title: "Inputs Incomplete.",
        description: "Please provide Name, Description and Wallet address.",
      });
    }
  };
  return (
    <section className="flex flex-col justify-center items-center w-full h-screen ">
      {imageBlob ? (
        <Image src={imageBlob} alt={imageBlob} width={350} height={350} />
      ) : (
        <div className="flex flex-col justify-around items-center gap-5 px-9">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-center mb-6">
            Type your prompt to see the magic!
          </h1>
          <Input
            type="email"
            placeholder="Type your prompt here"
            name="prompt"
            className="text-black h-12 mb-6 text-lg font-medium"
            onClick={(e) => setPrompt(e.target.value)}
          />
          <div className="flex items-center flex-col gap-4 w-full px-8">
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button className="w-full" onClick={generateArt}>
                GENERATE
              </Button>
            )}
          </div>
        </div>
      )}
      {imageBlob && !willMint && (
        <div className=" flex items-center flex-col gap-4 w-full px-8 mt-8">
          <Button onClick={() => setWillMint(true)} className="w-full">
            MINT
          </Button>
          <Button onClick={() => setImageBlob("")} className="w-full">
            GO BACK
          </Button>
        </div>
      )}
      {willMint && (
        <div>
          <Input
            placeholder="mint address"
            name="mint address"
            className="text-black h-12 mb-6 text-lg font-medium"
            onClick={(e) => setMintAdd(e.target.value)}
          />
          <Input
            placeholder="Mint name"
            name="Mint name"
            className="text-black h-12 mb-6 text-lg font-medium"
            onClick={(e) => setMintName(e.target.value)}
          />
          <Input
            placeholder="Mint Desc"
            name="Mint Desc"
            className="text-black h-12 mb-6 text-lg font-medium"
            onClick={(e) => setMintDesc(e.target.value)}
          />
          <Button onClick={mintNft} className="w-full mb-4">
            PROCEED
          </Button>

          <Button
            onClick={() => {
              setWillMint(false);
              setImageBlob("");
            }}
            className="w-full"
          >
            GO BACK
          </Button>
        </div>
      )}
    </section>
  );
}
