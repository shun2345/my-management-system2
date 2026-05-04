export type { Post } from "@/.velite";

export type PostCategory = "介護" | "相続" | "終活" | "お金";

export type PostSource = {
  title: string;
  url: string;
  accessedAt: string;
};
