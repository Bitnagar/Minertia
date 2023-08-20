import Link from "next/link";
export default function Header() {
  return (
    <header className=" bg-transparent p-5 2xl:px-40">
      <nav className="flex items-center justify-between">
        <div>
          <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight text-center 2xl:text-3xl">
            Minertia
          </h1>
        </div>
        <ul className="flex gap-5 [&>li]:font-bold [&>li]:text-sm  items-center 2xl:[&>li]:text-base">
          <li>
            <Link href="/" id="home">
              HOME
            </Link>
          </li>
          <li>
            <Link href="https://minertiaxyz.netlify.app/about" id="about">
              ABOUT
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
