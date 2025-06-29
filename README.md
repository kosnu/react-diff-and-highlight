# React Diff and Highlight

Reactコンポーネントで、2つの文字列の差分（Diff）を行単位で分かりやすく表示し、特定の文字列にハイライトを付与できるライブラリです。

## 特徴

- **行単位のDiff表示**: 2つの文字列（a,
  b）を比較し、追加・削除・変更行を色分けして表示します。
- **ハイライト機能**:
  文字列の配列を指定し、該当する部分にハイライトを適用できます。
- **TypeScript対応**
- **カスタマイズ可能なスタイル**

## インストール

TODO

## 使い方

```tsx
import { DiffHighlighter } from "react-diff-and-highlight";

const a = `Hello\nWorld\nGoodbye`;
const b = `Hello\nReact\nWorld\nGoodbye!`;
const highlights = ["React", "Goodbye!"];

<DiffHighlighter
  a={a}
  b={b}
  highlights={highlights}
/>;
```

## Props

| Prop       | 型       | 説明                         |
| ---------- | -------- | ---------------------------- |
| a          | string   | 比較元の文字列               |
| b          | string   | 比較先の文字列               |
| highlights | string[] | ハイライトしたい文字列の配列 |

## スタイルカスタマイズ

CSS Modulesでスタイルを上書きできます。デフォルトのクラス名例:

- `.dh-root`
- `.dh-line`
- `.dh-line[data-line-type="added"]`
- `.dh-line[data-line-type="removed"]`
- `.dh-highlight`
