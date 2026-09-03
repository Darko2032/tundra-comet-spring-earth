import { META, SECTIONS, type Block } from "@/lib/briefing";
import { Diagram } from "@/components/briefing/diagrams";
import { cn } from "@/lib/utils";

function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-medium text-fg">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "lead":
      return (
        <p className="font-serif text-xl leading-snug text-fg sm:text-2xl">
          <Rich text={block.text} />
        </p>
      );
    case "p":
      return (
        <p>
          <Rich text={block.text} />
        </p>
      );
    case "h3":
      return (
        <h3 className="mt-10 font-serif text-xl font-medium tracking-tight text-fg first:mt-0">
          {block.text}
        </h3>
      );
    case "h4":
      return (
        <h4 className="mt-8 font-sans text-sm font-medium tracking-wide text-accent">
          {block.text}
        </h4>
      );
    case "ul":
      return (
        <ul className="my-4 list-disc space-y-2 pl-5 marker:text-steel">
          {block.items.map((item) => (
            <li key={item}>
              <Rich text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="my-4 list-decimal space-y-2 pl-5 marker:font-sans marker:text-sm marker:text-steel">
          {block.items.map((item) => (
            <li key={item}>
              <Rich text={item} />
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside className="my-8 border-l-2 border-accent pl-4 sm:pl-5">
          <p className="font-sans text-xs font-medium tracking-widest text-accent uppercase">
            {block.kicker}
          </p>
          <p className="mt-2 text-fg">
            <Rich text={block.text} />
          </p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="my-8 font-serif text-xl leading-snug text-fg italic sm:text-2xl">
          {block.text}
        </blockquote>
      );
    case "defs":
      return (
        <dl className="my-6 divide-y divide-rule border-y border-rule">
          {block.items.map((item) => (
            <div
              key={item.term}
              className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-6"
            >
              <dt className="font-sans text-sm font-medium text-fg sm:col-span-1">
                {item.term}
              </dt>
              <dd className="text-muted sm:col-span-2">
                <Rich text={item.def} />
              </dd>
            </div>
          ))}
        </dl>
      );
    case "grid":
      return (
        <div className="my-6 grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-rule bg-paper-2/50 p-4"
            >
              <p className="font-sans text-sm font-medium text-fg">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                <Rich text={item.body} />
              </p>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <figure className="my-8">
          <div className="overflow-x-auto rounded-lg border border-rule">
            <table className="w-full border-collapse text-left font-sans text-xs sm:text-sm">
              <thead className="bg-paper-2">
                <tr>
                  {block.headers.map((h) => (
                    <th
                      key={h}
                      className="border-b border-rule px-3 py-2.5 font-medium text-fg"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row[0]} className="odd:bg-paper even:bg-paper-2/40">
                    {row.map((cell, i) => (
                      <td
                        key={`${row[0]}-${i}`}
                        className={cn(
                          "border-b border-rule px-3 py-2.5 text-muted",
                          i === 0 && "font-medium text-fg",
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption ? (
            <figcaption className="mt-3 font-sans text-xs tracking-wide text-subtle">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    case "diagram":
      return <Diagram name={block.name} />;
    case "takeaways":
      return (
        <ol className="my-8 space-y-4">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-4">
              <span className="font-sans text-xs tabular-nums tracking-widest text-subtle pt-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-fg">
                <Rich text={item} />
              </p>
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}

export function DocumentArticle() {
  return (
    <article className="prose-brief">
      <header className="border-b border-rule pb-10">
        <p className="font-sans text-xs font-medium tracking-widest text-accent uppercase">
          Brief {META.briefNo} · {META.series}
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-none tracking-tight text-fg sm:text-5xl">
          {META.title}
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-snug text-muted sm:text-xl">
          {META.subtitle}
        </p>
        <dl className="mt-8 grid gap-4 font-sans text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs tracking-widest text-subtle uppercase">
              Classification
            </dt>
            <dd className="mt-1 text-fg">{META.classification}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-widest text-subtle uppercase">Issued</dt>
            <dd className="mt-1 text-fg">{META.issued}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-widest text-subtle uppercase">Source</dt>
            <dd className="mt-1 text-fg">{META.source}</dd>
          </div>
        </dl>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {META.objectives.map((obj) => (
            <div key={obj.id} className="rounded-md border border-rule px-4 py-3">
              <p className="font-sans text-xs tracking-widest text-subtle uppercase">
                Objective {obj.id}
              </p>
              <p className="mt-1 font-sans text-sm text-fg">{obj.text}</p>
            </div>
          ))}
        </div>
      </header>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-32 border-b border-rule py-12 last:border-b-0 last:pb-0"
        >
          <p className="font-sans text-xs font-medium tracking-widest text-subtle uppercase">
            {section.num}
            {section.kicker ? ` · ${section.kicker}` : null}
          </p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight text-fg">
            {section.title}
          </h2>
          <div className="mt-6 space-y-5 font-serif text-base leading-relaxed text-fg sm:text-lg">
            {section.blocks.map((block, i) => (
              <BlockView key={`${section.id}-${i}`} block={block} />
            ))}
          </div>
        </section>
      ))}

      <footer className="mt-4 border-t border-rule pt-8 font-sans text-xs leading-relaxed text-subtle">
        <p>
          This briefing synthesizes Section 2 source notes (mixed French/English
          course material). OCR artifacts in the source — for example
          “Unedisponibilité,” “Uneuthentication,” “Uneuthorisation,” “Uncomptage”
          — are read as availability, authentication, authorization, and
          accounting. Control-plane / data-plane membership follows the source’s
          first, consistent statement of zero trust.
        </p>
      </footer>
    </article>
  );
}
