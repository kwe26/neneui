import Renderer from "@/components/Daikon";
import { type WidgetNode } from "@/lib/core";

export const dynamic = "force-dynamic";

export default async function Home() {
  let tree: WidgetNode | null = null;
  let errorMsg: string | null = null;

  try {
    const response = await fetch("http://localhost:3500/ui/main", {
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}: ${response.statusText}`);
    }
    tree = await response.json();
  } catch (err: any) {
    errorMsg = err?.message || "Could not connect to NeneUI Server at http://localhost:3500/ui/main";
  }

  if (errorMsg || !tree) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full p-6 bg-card border border-border rounded-2xl shadow-xl flex flex-col gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center text-xl font-bold">
            !
          </div>
          <h2 className="text-lg font-semibold">NeneUI Server Offline</h2>
          <p className="text-sm text-muted-foreground">
            {errorMsg}
          </p>
          <div className="bg-muted p-3 rounded-lg text-xs font-mono text-left overflow-x-auto">
            <code>bun run index.ts</code>
          </div>
          <p className="text-xs text-muted-foreground">
            Run the server on port 3500 and refresh this page.
          </p>
        </div>
      </div>
    );
  }

  return <Renderer node={tree} />;
}