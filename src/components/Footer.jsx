import Link from "next/link";
export default function Footer() {
  return (
    <footer className="flex h-80 text-center p-4 justify-between flex-col bg-black text-white">
      <div className="flex flex-col lg:mt-20">
        <h1 className=" bg-clip-text text-transparent bg-gradient-to-tr purple-text-gradient scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl text-center">
          Minertia.
        </h1>
        <h4 className="text-lg font-bold xl:text-xl">
          Generate. Mint. Repeat.
        </h4>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-24">
        <div className="flex gap-6 [&>a]:font-bold text-sm">
          <Link href="#home">HOME</Link>
          <Link href="https://minertiaxyz.netlify.app/about">ABOUT</Link>
          <Link href="#contact">CONTACT</Link>
        </div>
        <p className="text-sm">
          Built with 💖 and <strong>Shadcn UI</strong> +{" "}
          <strong>Next.js.</strong>
        </p>
      </div>
    </footer>
  );
}
