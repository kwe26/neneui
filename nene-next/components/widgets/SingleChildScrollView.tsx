import Renderer from "../Daikon";

interface WidgetNode {
  id: string;
  name: string;
  props: any;
}

interface SingleChildScrollViewProps {
  child: WidgetNode;
  physics?: string;
  scrollDirection?: "vertical" | "horizontal";
  reverse?: boolean;
}

export default function SingleChildScrollViewWidget({
  child,
  physics = "scroll",
  scrollDirection = "vertical",
  reverse = false,
}: SingleChildScrollViewProps) {
  let classes = "";

  if (physics === "never_scroll") {
    classes = "overflow-hidden";
  } else {
    classes =
      scrollDirection === "horizontal"
        ? "overflow-x-auto overflow-y-hidden"
        : "overflow-y-auto overflow-x-hidden";
  }

  if (reverse) {
    classes +=
      scrollDirection === "horizontal"
        ? " flex flex-row-reverse"
        : " flex flex-col-reverse";
  }

  return (
    <div className={classes}>
      <Renderer node={child} />
    </div>
  );
}