'use client';

import { createContext, useContext } from 'react';

type ArticleContextValue = {
  category: string;
};

const ArticleContext = createContext<ArticleContextValue | null>(null);

export function ArticleProvider({
  category,
  children,
}: {
  category: string;
  children: React.ReactNode;
}) {
  return (
    <ArticleContext.Provider value={{ category }}>
      {children}
    </ArticleContext.Provider>
  );
}

export function useArticleContext(): ArticleContextValue | null {
  return useContext(ArticleContext);
}
