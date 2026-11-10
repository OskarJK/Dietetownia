import Link from "next/link";

const FOOTER_LINKS = [
  { label: "O mnie", href: "/" },
  { label: "Przepisy", href: "/przepisy" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-peat px-6 py-10 text-beige">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">🥑</span>
          <span className="font-script text-[1.4rem]">Dietetownia</span>
        </div>

        <p className="font-script text-[1.1rem] italic opacity-70">
          Zrozumieć ♡ Wesprzeć ♡ Działać ♡ Razem dla zdrowia
        </p>

        <div className="flex gap-6 text-[0.8rem]">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="opacity-70 hover:opacity-100">
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-[0.7rem] opacity-40">
          © {new Date().getFullYear()} Sandra Dąbrowska. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}