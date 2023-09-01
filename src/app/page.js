"use client";
import Image from "next/image";
import OpenSea from "public/assets/opensea.svg";
import { Button } from "@/components/ui/get-started-btn";
import Link from "next/link";
import PhotoGrid from "@/components/PhotoGrid";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entires) => {
      entires.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("stagger-long");
        }
      });
    });
    observer.observe(document.getElementById("heading-2"));
  }, []);

  return (
    <main className="w-full h-full">
      <section className="flex flex-col justify-center items-center w-full h-screen p-4">
        <h1 className="stagger-short scroll-m-20 text-4xl font-extrabold tracking-tight text-center  bg-clip-text text-transparent bg-gradient-to-tr purple-text-gradient lg:text-5xl 2xl:text-6xl">
          Harness the power of <br className="xl:hidden"></br> Stable Diffusion.
        </h1>
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight my-5 text-center md:px-12 2xl:text-2xl">
          Generate NFTs and mint them on your favourite marketplace.
        </h4>
        <Button variant="custom">
          <Link href="/generate">GET STARTED</Link>
        </Button>
      </section>
      <section className=" w-full min-h-screen flex flex-col gap-10 bg-background px-8 py-20 2xl:flex-row 2xl:justify-center 2xl:gap-20">
        <div className="grid grid-cols-1 grid-rows-2 content-center place-items-center gap-4 lg:grid-cols-2 lg:w-fit lg:self-center lg:ml-[50px]">
          <PhotoGrid />
        </div>
        <div className="flex flex-col justify-center items-start w-fit">
          <h1
            id="heading-2"
            className=" orange-text-gradient text-transparent bg-clip-text text-4xl font-extrabold tracking-tight leading-[3rem] lg:px-10 text-center 1xl:px-60 2xl:text-left mb-10 lg:text-5xl 2xl:w-[54rem] 2xl:px-10"
          >
            Generate mindblowing Images and NFTs with the power of Stable
            Diffusion.
          </h1>
          <p className="text-lg 2xl:text-xl leading-7 font-medium text-center lg:self-center sm:px-10 2xl:self-start">
            Minertia uses Stable diffusion to make beautiful NFTs, with just one
            prompt.
          </p>
        </div>
      </section>
      <section className="w-full min-h-screen bg-blue-gradient  flex justify-center items-center">
        <div className=" flex flex-col justify-center items-center p-4 gap-16 2xl:gap-[6rem]">
          <Image src={OpenSea} alt="logo" width={250} />
          <div className="text-center">
            <h1 className="scroll-m-20 text-white text-4xl font-extrabold tracking-tight lg:text-5xl text-center 2xl:text-6xl">
              Mint them NFTs on OpenSea.
            </h1>
            <p className="text-lg text-white leading-7 font-medium mb-10 p-8 2xl:text-xl">
              Connect your wallet, list your NFT, and start earning!
            </p>
            <Button>
              <Link href="/generate">TRY NOW</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
