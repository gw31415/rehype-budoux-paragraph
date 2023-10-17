# rehype-budoux-paragraph

[BudouX](https://github.com/google/budoux/tree/main/javascript) を用いて `<p>`
タグの文章を分かち書きさせるプラグインです。

## インストール

```bash
npm install rehype-budoux-paragraph
```

rehypeのプラグインとして読みこんでください

```ts
import rehypeBudouxParagraph from "rehype-budoux-paragraph";

//...
{
  rehypePlugins: [rehypeBudouxParagraph];
}
//...
```

## 使いかた

デフォルトでは `<p>` タグ内で日本語の分かちがきがなされます。
中国語の分かち書きをしたい場合はプラグインのオプションの `lang` パラメータを
`zh-CN` または `zh-TW` にしてください。
