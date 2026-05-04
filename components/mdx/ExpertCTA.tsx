type ExpertCategory = 'kaigo' | 'souzoku' | 'shukatsu' | 'okane';

type ExpertCTAProps = {
  category: ExpertCategory;
};

const messages: Record<ExpertCategory, string> = {
  kaigo: '介護に関する具体的なご相談は、お住まいの地域包括支援センターや介護の専門家にご相談ください。',
  souzoku: '相続に関する具体的なご相談は、税理士・弁護士・司法書士等の専門家にご相談ください。',
  shukatsu: '終活に関する具体的なご相談は、終活カウンセラーや専門家にご相談ください。',
  okane: '家計やお金に関する具体的なご相談は、ファイナンシャルプランナー等の専門家にご相談ください。',
};

export function ExpertCTA({ category }: ExpertCTAProps) {
  return (
    <div className="my-8 rounded-lg border-2 border-foreground/20 p-6 text-center">
      <p className="font-semibold">専門家に相談しませんか？</p>
      <p className="mt-2 text-sm text-foreground/70">{messages[category]}</p>
    </div>
  );
}
