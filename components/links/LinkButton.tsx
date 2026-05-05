import type { ReactNode } from 'react'
import Link from 'next/link'

type LinkButtonProps = {
  href: string
  icon?: ReactNode
  label: string
  description?: string
  external?: boolean
  className?: string
}

export function LinkButton({
  href,
  icon,
  label,
  description,
  external = false,
  className = '',
}: LinkButtonProps) {
  const baseStyles =
    'flex w-full items-center gap-3 rounded-md border border-brand-mist bg-card px-4 py-3 text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy'

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{label}</span>
        {description && (
          <span className="block text-xs text-muted-foreground">
            {description}
          </span>
        )}
      </span>
      {external && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5zm7.5-3a.75.75 0 0 1 .75-.75H18a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V4.06l-7.22 7.22a.75.75 0 1 1-1.06-1.06l7.22-7.22H11.75a.75.75 0 0 1-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${className}`}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={`${baseStyles} ${className}`}>
      {content}
    </Link>
  )
}
