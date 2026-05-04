/**
 * 新規記事ひな型生成スクリプト
 * Usage: npx tsx scripts/new-post.ts <slug>
 */

import fs from 'node:fs';
import path from 'node:path';

const slug = process.argv[2];

if (!slug) {
  console.error('Usage: npx tsx scripts/new-post.ts <slug>');
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];

const template = `---
title: ""
slug: ${slug}
description: ""
publishedAt: ${today}
updatedAt: ${today}
category: 介護
tags: []
sources: []
hasAffiliate: false
disclaimer: true
author: ""
---

`;

const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.mdx`);

if (fs.existsSync(filePath)) {
  console.error(`Error: ${filePath} already exists`);
  process.exit(1);
}

fs.writeFileSync(filePath, template, 'utf-8');
console.log(`Created: ${filePath}`);
