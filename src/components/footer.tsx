import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-6 text-sm text-muted-foreground">
        <p>WorkBot</p>
        <nav className="flex gap-4">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <Link href="/settings" className="hover:text-foreground">
            Settings
          </Link>
        </nav>
      </div>
    </footer>
  );
}
