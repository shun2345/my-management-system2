import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { SITE_NAME, CATEGORIES, FOOTER_LINKS } from '@/lib/navigation';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-brand-navy text-brand-cream dark:bg-card dark:text-foreground">
      <div className="mx-auto max-w-[1120px] px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-heading font-bold">{SITE_NAME}</p>
            <p className="mt-2 text-sm text-brand-cream/70 dark:text-muted-foreground">
              親の介護・相続・終活・家計に関する公的制度と一般情報をわかりやすく解説するメディアです。
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">カテゴリ</p>
            <ul className="mt-2 space-y-2">
              {CATEGORIES.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-sm text-brand-cream/70 transition-colors hover:text-brand-cream dark:text-muted-foreground dark:hover:text-foreground"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">サイト情報</p>
            <ul className="mt-2 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-cream/70 transition-colors hover:text-brand-cream dark:text-muted-foreground dark:hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className="my-6 bg-brand-cream/20 dark:bg-border" />
        <div className="flex flex-col items-center gap-2 text-center text-xs text-brand-cream/60 dark:text-muted-foreground">
          <p>
            本サイトは情報提供を目的としており、個別の状況に応じた助言は専門家にご相談ください。
          </p>
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}</p>
        </div>
      </div>
    </footer>
  );
}
