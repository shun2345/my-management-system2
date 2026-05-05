'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SITE_NAME, CATEGORIES, FOOTER_LINKS } from '@/lib/navigation';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="メニューを開く">
          <Menu className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-row items-center justify-between">
          <DrawerTitle className="font-heading text-brand-navy dark:text-primary">
            {SITE_NAME}
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" aria-label="メニューを閉じる">
              <X className="size-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <nav className="flex flex-col px-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            カテゴリ
          </p>
          {CATEGORIES.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-foreground transition-colors hover:text-brand-navy dark:hover:text-primary"
            >
              {category.label}
            </Link>
          ))}
          <Separator className="my-4" />
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            サイト情報
          </p>
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
