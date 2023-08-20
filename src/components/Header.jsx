import Link from "next/link";
export default function Header() {
  return (
    <header className=" bg-transparent">
      <nav className="flex items-center">
        <div>
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-center">
            Minertia
          </h1>
        </div>
        <ul className="flex gap-5 [&>li]:font-bold items-center">
          <li>
            <Link href={"#"}>HOME</Link>
          </li>
          <li>
            <Link href={"#"}>ABOUT</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
