import Link from "next/link";
import Image from "next/image";

/** The "Vaanii" wordmark + logo, used in the nav, footer, and auth cards. */
export function BrandMark({ className = "brand" }: { className?: string }) {
  return (
    <Link href="/" className={className}>
      <Image
        src="/vaanii-mark.png"
        alt=""
        width={28}
        height={28}
        className="brand__mark"
        priority
      />
      Vaanii
    </Link>
  );
}
