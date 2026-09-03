import { useEffect, useMemo, useState } from "react";
import {
  List,
  Printer,
  Search,
  Shield,
  X,
} from "lucide-react";
import { META, SECTIONS } from "@/lib/briefing";
import { DocumentArticle } from "@/components/briefing/document";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BriefingReader() {
  const [query, setQuery] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [activeId, setActiveId] = useState(SECTIONS[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SECTIONS;
    return SECTIONS.filter((s) => {
      const hay = `${s.title} ${s.kicker ?? ""} ${s.keywords}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("article section[id]"),
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id) setActiveId(id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTocOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
    setActiveId(id);
  };

  return (
    <div className="min-h-dvh bg-ink text-paper">
      <div
        className="no-print pointer-events-none fixed top-0 right-0 left-0 z-50 h-0.5 bg-ink-2"
        aria-hidden="true"
      >
        <div
          className="h-full bg-steel transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="no-print sticky top-0 z-40 border-b border-hairline bg-ink/92 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <span className="flex size-8 items-center justify-center rounded-md bg-ghost text-paper">
            <Shield className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-sans text-sm font-medium tracking-wide">
              Security Fundamentals
            </p>
            <p className="hidden truncate font-sans text-xs text-paper/55 sm:block">
              Brief {META.briefNo} · Objectives 1.1 and 1.2
            </p>
          </div>
          <div className="relative hidden w-56 md:block">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-paper/40"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a section"
              aria-label="Find a section"
              className="h-9 w-full rounded-md border border-hairline bg-ghost pr-3 pl-9 font-sans text-sm text-paper outline-none placeholder:text-paper/35 focus:border-steel"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open contents"
            onClick={() => setTocOpen(true)}
          >
            <List className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.print()}
            className="sm:hidden"
            aria-label="Print briefing"
          >
            <Printer className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="hidden sm:inline-flex"
          >
            <Printer className="size-3.5" />
            Print
          </Button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-4">
        <aside className="no-print hidden lg:block">
          <nav
            aria-label="Contents"
            className="toc-scroll sticky top-14 overflow-y-auto px-4 py-8"
          >
            <p className="px-2 font-sans text-xs tracking-widest text-paper/40 uppercase">
              Contents
            </p>
            <ol className="mt-3 space-y-0.5">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => jump(s.id)}
                    className={cn(
                      "flex w-full items-baseline gap-3 rounded-md px-2 py-2 text-left font-sans text-sm transition-colors duration-150",
                      activeId === s.id
                        ? "bg-ghost text-paper"
                        : "text-paper/55 hover:bg-ghost hover:text-paper",
                    )}
                  >
                    <span className="w-6 shrink-0 text-xs tabular-nums text-paper/35">
                      {s.num}
                    </span>
                    <span className="leading-snug">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            {query && filtered.length === 0 ? (
              <p className="mt-4 px-2 font-sans text-sm text-paper/45">
                No matching sections.
              </p>
            ) : null}
          </nav>
        </aside>

        <main id="brief" className="px-3 py-6 sm:px-6 sm:py-10 lg:col-span-3 lg:pr-8">
          <div className="print-paper rounded-xl bg-paper p-5 text-fg shadow-paper sm:rounded-2xl sm:p-10 lg:p-14">
            <DocumentArticle />
          </div>
        </main>
      </div>

      {tocOpen ? (
        <div className="no-print fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/70"
            aria-label="Close contents"
            onClick={() => setTocOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-80 max-w-full flex-col bg-ink-2 shadow-paper">
            <div className="flex h-14 items-center justify-between border-b border-hairline px-4">
              <p className="font-sans text-sm font-medium">Contents</p>
              <Button
                variant="ghost"
                size="iconSm"
                aria-label="Close contents"
                onClick={() => setTocOpen(false)}
              >
                <X className="size-4" />
              </Button>
            </div>
            <div className="border-b border-hairline p-3">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-paper/40"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find a section"
                  aria-label="Find a section"
                  className="h-11 w-full rounded-md border border-hairline bg-ghost pr-3 pl-9 font-sans text-sm text-paper outline-none placeholder:text-paper/35"
                />
              </div>
            </div>
            <ol className="flex-1 overflow-y-auto p-3">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => jump(s.id)}
                    className={cn(
                      "flex min-h-11 w-full items-center gap-3 rounded-md px-2 py-2 text-left font-sans text-sm",
                      activeId === s.id
                        ? "bg-ghost text-paper"
                        : "text-paper/70",
                    )}
                  >
                    <span className="w-6 text-xs tabular-nums text-paper/35">
                      {s.num}
                    </span>
                    {s.title}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}
    </div>
  );
}
