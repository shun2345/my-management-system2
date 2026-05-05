import * as runtime from "react/jsx-runtime";
import { Citation } from "@/components/mdx/Citation";
import { AffiliateCard } from "@/components/mdx/AffiliateCard";
import { Disclaimer } from "@/components/mdx/Disclaimer";
import { PRBadge } from "@/components/mdx/PRBadge";
import { Callout } from "@/components/mdx/Callout";
import { ExpertCTA } from "@/components/mdx/ExpertCTA";
import { KeyPoints } from "@/components/mdx/KeyPoints";
import { Figure } from "@/components/mdx/Figure";
import { Example } from "@/components/mdx/Example";

const mdxComponents = {
  Citation,
  AffiliateCard,
  Disclaimer,
  PRBadge,
  Callout,
  ExpertCTA,
  KeyPoints,
  Figure,
  Example,
};

type MDXContentProps = {
  code: string;
};

export function MDXContent({ code }: MDXContentProps) {
  const fn = new Function(code);
  const { default: MDXComponent } = fn({ ...runtime });
  return MDXComponent({ components: mdxComponents });
}
