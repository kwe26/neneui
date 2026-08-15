import Renderer from "@/components/Daikon";

export default async function Home() {
  const response = await fetch("http://localhost:3500/ui/main");
  const tree = await response.json();

  return (
    <Renderer node={tree} />
  );
}