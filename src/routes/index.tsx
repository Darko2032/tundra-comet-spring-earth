import { createFileRoute } from "@tanstack/react-router";
import { BriefingReader } from "@/components/briefing/reader";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <BriefingReader />;
}
