import Link from 'next/link';
import { SITE_NAME, CATEGORIES } from '@/lib/navigation';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold">
          {SITE_NAME}
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {category.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
