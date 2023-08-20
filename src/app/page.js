"use client";
import Image from "next/image";
import OpenSea from "public/assets/opensea.svg";
import Spline3dCard from "@/components/Spline3dCard";
import { Button } from "@/components/ui/get-started-btn";

export default function Home() {
  return (
    <main className="w-full h-fit">
      <section className="flex flex-col justify-center items-center w-full h-[100vh] p-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-center md:px-5 xl:text-5xl 2xl:text-6xl">
          Harness the power of Stable Diffusion.
        </h1>
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight my-5 text-center md:px-12 2xl:text-2xl">
          Generate NFTs and mint them on your favourite marketplace.
        </h4>
        <Button>
          <a href="https://minertiaxyz.netlify.app">Get Started</a>
        </Button>
      </section>
      <section className="h-fit bg-background grid content-around p-4 xl:grid-cols-2 xl:grid-rows-1 xl:items-center xl:text-left 2xl:justify-items-center 2xl:pr-28">
        <div className="h-[35rem] mt-10 mb-[2.5rem] 2xl:w-[30rem]">
          <Spline3dCard src="https://prod.spline.design/gxtlNPynwC8VB93j/scene.splinecode" />
        </div>
        <div className=" 2xl:pl-14">
          <h1 className="red-text-gradient text-transparent bg-clip-text text-[2.5rem] font-extrabold tracking-tight leading-[3rem] text-center mb-10 xl:text-left 2xl:text-6xl">
            Generate mindblowing NFTs with the power of Stable Diffusion.
          </h1>
          <p className="text-lg leading-7 font-medium text-center mb-10 md:p-4 xl:text-left xl:mb-0 xl:p-[0_1rem_0_0] 2xl:text-xl">
            Minertia uses Stable diffusion to make beautiful NFTs, with just one
            prompt.
          </p>
        </div>
      </section>
      <section className=" bg-slate-900 bg-[radial-gradient(at_0%_24%,rgb(12,74,110)_0,transparent_100%)]">
        <div className="h-screen flex flex-col justify-center items-center p-4 gap-[9rem] 2xl:gap-[6rem]">
          <Image src={OpenSea} alt="logo" width={250} />
          <div className="text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center 2xl:text-6xl">
              Mint them NFTs on OpenSea.
            </h1>
            <p className="text-lg leading-7 font-medium mb-2 p-8 2xl:text-xl">
              Connect your wallet, list your NFT, and start earning!
            </p>
            <Button variant="blue">
              <a href="https://minertiaxyz.netlify.app">TRY NOW</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
