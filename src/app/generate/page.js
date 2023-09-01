"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const [prompt, setPrompt] = useState("");

  function checkAndForward() {
    if (prompt.length <= 2) {
      toast({
        variant: "destructive",
        title: "Image generation failed.",
        description: "Please enter a prompt larger than 2 characters.",
      });
      return;
    } else {
      router.push(`${pathname}/${encodeURI(prompt)}`);
    }
  }
  return (
    <section className="flex flex-col justify-center items-center w-full h-screen  p-8 xl:flex-row xl:gap-40 ">
      <div className="flex flex-col justify-around items-center">
        <h1 className="scroll-m-20 text-4xl leading-[3rem] font-extrabold tracking-tight 2xl:leading-[5rem] text-center mb-6 2xl:text-6xl purple-text-gradient bg-clip-text text-transparent bg-gradient-to-tr">
          Type your prompt to see the magic!
        </h1>
        <Input
          type="text"
          placeholder="Type your prompt here"
          name="prompt"
          className="text-black h-12 mb-6 text-sm font-medium 2xl:w-[40rem]"
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <div className="flex items-center flex-col gap-4 w-full px-8">
          <Button className="w-56 mb-4" onClick={checkAndForward}>
            GENERATE
          </Button>
        </div>
      </div>
    </section>
  );
}
