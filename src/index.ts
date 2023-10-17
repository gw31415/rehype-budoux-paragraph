import { Node } from "unist";
import { visit } from "unist-util-visit";
import {
	loadDefaultJapaneseParser,
	loadDefaultSimplifiedChineseParser,
	loadDefaultTraditionalChineseParser,
} from "budoux";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";

const jaParser = loadDefaultJapaneseParser();
const zhtParser = loadDefaultTraditionalChineseParser();
const zhcParser = loadDefaultSimplifiedChineseParser();

/**
 * The language of the text to which BudouX is applied.
 */
export type Language = "ja" | "zh-CN" | "zh-TW";

/**
 * Apply BudouX to paragraphs.
 */
export default function rehypeBudouxParagraph(
	options: {
		lang: Language;
	} = { lang: "ja" },
) {
	return (tree: Node) => {
		visit(tree, "element", (node: any) => {
			if (node.tagName === "p") {
				const processor = unified().use(rehypeStringify);
				let nodeText = "";
				for (const child of node.children) {
					nodeText += processor.stringify(child);
				}
				let value: string;
				switch (options.lang) {
					case "ja":
						value = jaParser.translateHTMLString(nodeText);
						break;
					case "zh-TW":
						value = zhtParser.translateHTMLString(nodeText);
						break;
					case "zh-CN":
						value = zhcParser.translateHTMLString(nodeText);
						break;
				}
				node.children = [
					{
						type: "raw",
						value: value,
					},
				];
			}
		});
	};
}
