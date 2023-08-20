"use client";
import { Button } from "@/components/ui/get-started-btn";
import OpenSea from "public/assets/opensea.svg";
import Image from "next/image";
import Spline3dCard from "@/components/Spline3dCard";
export default function Home() {
  return (
    <main className="w-full h-fit">
      <section className="flex flex-col justify-center items-center w-full h-[100vh] ">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          Harness the power of Stable Diffusion.
        </h1>
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight my-5">
          Generate NFTs and mint them on your favourite marketplace.
        </h4>
        <Button>Get Started</Button>
      </section>
      <section className="flex w-full h-[100vh] justify-center items-center p-5 bg-background">
        <div className="w-[60%] h-full">
          <Spline3dCard src="https://prod.spline.design/gxtlNPynwC8VB93j/scene.splinecode" />
        </div>
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold leading-5 tracking-tight lg:text-5xl text-left text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-300 via-rose-400 to-rose-900">
            Generate mindblowing NFTs with the power of Stable Diffusion.
          </h1>
          <p className="text-black dark:text-foreground text-lg leading-7 [&:not(:first-child)]:mt-6">
            Minertia uses Stable diffusion AI model to make beautiful NFTs, with
            just one prompt.
          </p>
        </div>
      </section>
      <section className="flex w-full h-[100vh] justify-center items-center p-5 bg-slate-900 bg-[radial-gradient(at_0%_24%,rgb(12,74,110)_0,transparent_100%)]">
        <div className="flex gap-[10rem]">
          <Image src={OpenSea} alt="logo" width={250} />
          <div className="">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
              Mint them NFTs on OpenSea.
            </h1>
            <p className="text-lg leading-7 [&:not(:first-child)]:mt-6 mb-5">
              Connect your wallet, list your NFT, and start earning!
            </p>
            <Button variant="blue">TRY NOW</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
