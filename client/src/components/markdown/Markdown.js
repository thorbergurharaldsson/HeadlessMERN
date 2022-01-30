import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function HtmlMarkdown({ children }) {
	return <Markdown rehypePlugins={[rehypeRaw]} children={children} />;
}
