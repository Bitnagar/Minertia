"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { File } from "nft.storage";
import { uploadArtToIpfs } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ButtonLoading } from "@/components/ui/ButtonLoading";

export default function Page() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [mintName, setMintName] = useState("");
  const [mintDesc, setMintDesc] = useState("");
  const [mintAdd, setMintAdd] = useState("");

  const [imageBlob, setImageBlob] = useState("");

  const [willMint, setWillMint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let [mintInputs, setMintInputs] = useState(0);

  const { toast } = useToast();

  const generateArt = async () => {
    if (prompt.length <= 2) {
      toast({
        variant: "destructive",
        title: "Image generation failed.",
        description: "Please enter a prompt larger than 2 characters.",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE}}`,
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
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Oops! Rate Limit Exceeded.",
        description: "Sorry! Please try again in a few minutes.",
      });
    }
  };

  const mintNft = async () => {
    if (mintName && mintDesc && mintAdd) {
      setIsLoading(true);
      try {
        const imageURL = await uploadArtToIpfs(file);
        if (imageURL) {
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
                Authorization: process.env.NEXT_PUBLIC_NFT_PORT,
              },
            }
          );
          if (response) {
            toast({
              title: "NFT Minted.✅",
              description: "Check your OpenSea account for more details.",
            });
            setIsLoading(false);
          } else throw Error("Something Went Wrong.");
        }
      } catch (err) {
        toast({
          variant: "destructive",
          title: `Invalid Address.`,
          description: "Try checking your wallet address.",
        });
        setIsLoading(false);
        setMintInputs(0);
      }
    } else {
      setMintInputs(0);
      toast({
        title: "Inputs Incomplete.",
        description: "Please provide Name, Description and Wallet address.",
      });
    }
  };
  return (
    <section className=" flex flex-col justify-center items-center w-full h-screen  p-8 xl:flex-row xl:gap-40 ">
      {imageBlob ? (
        <Image
          className="fadeIn xl:w-[25rem] 2xl:w-[30rem] rounded-xl"
          src={imageBlob}
          alt={prompt}
          width={300}
          height={300}
        />
      ) : (
        <div className="flex flex-col justify-around items-center gap-5">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight 2xl:leading-[5rem] text-center mb-6 2xl:text-6xl purple-text-gradient bg-clip-text text-transparent bg-gradient-to-tr">
            Type your prompt to see the magic!
          </h1>
          <Input
            type="email"
            placeholder="Type your prompt here"
            name="prompt"
            className="text-black h-12 mb-6 text-sm font-medium 2xl:w-[40rem]"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex items-center flex-col gap-4 w-full px-8">
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button className="w-56 mb-4" onClick={generateArt}>
                GENERATE
              </Button>
            )}
          </div>
        </div>
      )}
      {imageBlob && !willMint && (
        <div className=" flex items-center flex-col gap-4 w-full xl:w-fit 2xl:w-2/5">
          <h1 className="scroll-m-20 text-sm font-normal italic tracking-tight pb-4 mt-3">
            {`"${prompt}"`}
          </h1>
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
            Ready to mint?
          </h1>
          <Button onClick={() => setWillMint(true)} className="w-56 2xl:w-3/4">
            MINT
          </Button>
          <Button onClick={() => setImageBlob("")} className="w-56 2xl:w-3/4">
            GO BACK
          </Button>
        </div>
      )}
      {willMint && (
        <div className="flex flex-col justify-center items-center w-full lg:w-3/5 2xl:w-2/5">
          <h1 className="scroll-m-20 text-sm font-normal italic tracking-tight pb-5 mt-3">
            {`"${prompt}"`}
          </h1>
          <h1 className="scroll-m-20  text-sm font-bold tracking-tight self-center mb-2">
            Please enter the following details:
          </h1>
          {mintInputs === 0 && (
            <Input
              placeholder="Type a name for your NFT."
              name="nft-name"
              className="text-black mb-6 text-base font-medium h-10 2xl:w-[40rem] slide-in"
              onChange={(e) => setMintName(e.target.value)}
              value={mintName}
            />
          )}
          {mintInputs === 1 && (
            <Input
              placeholder="Type the description for your NFT."
              name="nft-desc"
              className="text-black mb-6 text-base font-medium w-full h-10 2xl:w-[40rem] slide-in"
              onChange={(e) => setMintDesc(e.target.value)}
              value={mintDesc}
            />
          )}
          {mintInputs > 1 && (
            <Input
              placeholder="Type your Wallet address."
              name="nft-wallet-address"
              className="text-black mb-6 text-base font-medium w-full h-10 2xl:w-[40rem] slide-in"
              onChange={(e) => setMintAdd(e.target.value)}
              value={mintAdd}
            />
          )}

          {mintInputs <= 1 && (
            <Button
              onClick={() => {
                setMintInputs((prev) => prev + 1);
              }}
              className="w-56 mb-4 2xl:w-3/4"
            >
              NEXT →
            </Button>
          )}
          {mintInputs > 1 && !isLoading && (
            <Button onClick={mintNft} className="w-56 mb-4 2xl:w-3/4">
              MINT NOW!
            </Button>
          )}
          {mintInputs > 1 && isLoading && <ButtonLoading />}
          <Button
            onClick={() => {
              if (mintInputs === 0) {
                setWillMint(false);
                setImageBlob("");
              } else {
                setMintInputs((prev) => (prev = prev - 1));
              }
            }}
            className="w-56 2xl:w-3/4"
          >
            ← GO BACK
          </Button>
        </div>
      )}
    </section>
  );
}
