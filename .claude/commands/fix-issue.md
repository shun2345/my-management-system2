---
description: GitHub イシューを修正する
---

GitHub イシュー $ARGUMENTS を分析して修正する:

1. `gh issue view $ARGUMENTS` でイシューの詳細を取得
2. 問題を理解する(不明な点があれば質問する)
3. 関連ファイルをコードベースから探す
4. **plan mode に入って** 修正方針を提案する(承認まで編集禁止)
5. 承認されたら実装する
6. テストを書いて実行し、修正を検証する
7. lint と型チェックをパスさせる
8. Conventional Commits 形式でコミット
9. push して `gh pr create` で PR を作成(イシュー番号を本文に `Closes #N` で記載)
