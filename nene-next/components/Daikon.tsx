import TextWidget from "@/components/widgets/TextWidget";
import ScaffoldWidget from "./widgets/ScaffoldWidget";
import SingleChildScrollViewWidget from "./widgets/SingleChildScrollView";

interface WidgetNode {
  id: string,
  name: string;
  props: any,
}

export default function Renderer({ node }: { node: WidgetNode }) {
    console.log(node);
  switch (node.name) {
    case "Scaffold":
        return <ScaffoldWidget {...node.props} />

    case "Text":
      return <TextWidget {...node.props} />;

    case "SingleChildScrollView":
        return <SingleChildScrollViewWidget {...node.props} />;

    case "Empty":
        return <p></p>

    default:
      return (
        <div className="text-red-500">
          Unknown widget: {node.name}
        </div>
      );
  }
}