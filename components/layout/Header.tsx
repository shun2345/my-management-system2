import Link from 'next/link';
import { SITE_NAME, CATEGORIES } from '@/lib/navigation';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-4">
        <Link href="/" className="font-heading text-lg font-bold text-brand-navy dark:text-primary">
          {SITE_NAME}
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex md:items-center md:gap-6">
            {CATEGORIES.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-navy dark:hover:text-primary"
              >
                {category.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
