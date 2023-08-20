import Link from "next/link";
export default function Footer() {
  return (
    <footer className=" w-full h-[50vh] pt-5 pb-1 flex flex-col bg-black justify-between items-center">
      <div className="flex w-full justify-around">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl text-center bg-clip-text text-transparent bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-cyan-200 to-pink-500">
            Minertia.
          </h1>
          <h4 className="text-lg font-bold">Generate. Mint. Repeat.</h4>
        </div>
        <div className="flex gap-10 [&>a]:font-bold items-center">
          <Link href="#">HOME</Link>
          <Link href="#">ABOUT</Link>
          <Link href="#">CONTACT</Link>
        </div>
      </div>
      <p>
        Built with 💖 and <strong>Shadcn UI</strong> + <strong>Next.js.</strong>
      </p>
    </footer>
  );
}
