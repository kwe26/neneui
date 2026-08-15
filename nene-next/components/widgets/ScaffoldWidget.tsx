import Renderer from "../Daikon";


interface WidgetNode {
  appBar: any,
  body: any,
  drawer: any,
  preActions: any,
  floatingActionButton: any,
  bottom: any,
  backgroundColor: string,
}

export default function ScaffoldWidget(props: WidgetNode) {

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {props.appBar && <Renderer node={props.appBar} />}

      <main className="flex-1">
        <Renderer node={props.body} />
      </main>

      {props.bottom && <Renderer node={props.bottom} />}

      {props.floatingActionButton && (
        <div className="fixed bottom-6 right-6">
          <Renderer node={props.floatingActionButton} />
        </div>
      )}
    </div>
  );
}