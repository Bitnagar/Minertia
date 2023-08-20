import Link from "next/link";
export default function Footer() {
  return (
    <footer className="flex bg-background h-[20rem] text-center p-4 justify-between flex-col">
      <div className="flex flex-col gap-9">
        <div>
          <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl text-center bg-clip-text text-transparent bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-cyan-200 to-pink-500">
            Minertia.
          </h1>
          <h4 className="text-lg font-bold xl:text-xl">
            Generate. Mint. Repeat.
          </h4>
        </div>
        <div className="flex flex-col justify-around [&>a]:font-bold gap-5">
          <Link href="#home">HOME</Link>
          <Link href="#about">ABOUT</Link>
          <Link href="#contact">CONTACT</Link>
        </div>
      </div>
      <p className="text-sm">
        Built with 💖 and <strong>Shadcn UI</strong> + <strong>Next.js.</strong>
      </p>
    </footer>
  );
}
