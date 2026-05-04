import { AlertCircle } from 'lucide-react';

export function Disclaimer() {
  return (
    <div
      role="note"
      aria-label="免責事項"
      className="my-8 rounded-lg border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/70"
    >
      <div className="mb-2 flex items-center gap-2 font-semibold text-foreground/80">
        <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
        <span>免責事項</span>
      </div>
      <p>
        本記事は情報提供を目的としており、特定の行動を推奨するものではありません。個別の状況に応じた判断は、必ず専門家（ファイナンシャルプランナー、税理士、弁護士、司法書士等）にご相談ください。
      </p>
    </div>
  );
}
