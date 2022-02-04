import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <a>
        <Image src="/logo.png" alt="logo" height={100} width={149} />
      </a>
    </Link>
  );
}
