import { FileText } from 'lucide-react';

export function Disclaimer() {
  return (
    <div
      role="note"
      aria-label="免責事項"
      className="my-8 border-t border-b border-brand-mist bg-brand-mist/50 dark:border-border dark:bg-muted/50 px-4 py-4"
    >
      <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-foreground/80">
        <FileText className="size-4 shrink-0" aria-hidden="true" />
        <span>免責事項</span>
      </div>
      <p className="text-[13px] leading-[1.7] text-semantic-muted">
        本記事は情報提供を目的としており、特定の行動を推奨するものではありません。個別の状況に応じた判断は、必ず専門家（ファイナンシャルプランナー、税理士、弁護士、司法書士等）にご相談ください。
      </p>
    </div>
  );
}
