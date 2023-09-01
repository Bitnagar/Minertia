"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import MintNFT from "@/components/MintNFT";

export default function Page({ params }) {
  const prompt = decodeURI(params.prompt);
  const [imageUrl, setImageUrl] = useState("");
  const [willMint, setWillMint] = useState("");
  const { toast } = useToast();
  const [UUID, setUUID] = useState();
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE}`,
            },
            body: prompt,
          }
        );
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
          const imgId = url.substring(url.lastIndexOf("/") + 1, url.length);
          setUUID(imgId);
        } else {
          toast({
            variant: "destructive",
            title: "Something went Hugging Face API!",
            description: "Please try again after few minutes!",
          });
          return;
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: "Something went wrong. Please Retry!",
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col justify-center items-center w-full min-h-screen p-8 lg:flex-row lg:gap-20 xl:gap-40">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={prompt}
          width={200}
          height={200}
          className="fadeIn rounded-xl w-[20rem] xl:w-[25rem] 2xl:w-[35rem]"
        />
      ) : (
        <div className=" w-[20rem] xl:w-[25rem] 2xl:w-[35rem] h-[20rem] xl:h-[25rem] 2xl:h-[35rem] flex justify-center items-center rounded-xl skeleton "></div>
      )}
      <div className=" flex items-center flex-col gap-4 w-fit 2xl:w-2/5">
        {!willMint ? (
          <>
            <h1 className="scroll-m-20 text-sm font-normal tracking-tight pb-4 mt-3 text-purple-700 1xl:text-base">
              <strong>{imageUrl ? "Generated: " : "Generating: "}</strong>
              {`"${prompt}"`}
            </h1>
            <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
              {imageUrl ? "Ready to mint?" : "Please wait..."}
            </h1>
            {imageUrl ? (
              <>
                <Button
                  onClick={() => setWillMint(true)}
                  className="w-56 2xl:w-3/4"
                >
                  MINT NOW
                </Button>
                <Button className="w-56 2xl:w-3/4">
                  <Link href={"/generate"} className="w-56 2xl:w-3/4">
                    ← HOME
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button className="w-56 2xl:w-3/4" disabled>
                  <Link href={`${pathname}/${UUID}`} className="w-56 2xl:w-3/4">
                    MINT NOW
                  </Link>
                </Button>
                <Button className="w-56 2xl:w-3/4" disabled>
                  <Link href={"/generate"} className="w-56 2xl:w-3/4">
                    ← HOME
                  </Link>
                </Button>
              </>
            )}
          </>
        ) : (
          <MintNFT img={imageUrl} />
        )}
      </div>
    </section>
  );
}
