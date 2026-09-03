import type { ReactNode } from "react";
import type { DiagramName } from "@/lib/briefing";
import { cn } from "@/lib/utils";

function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-rule bg-paper-2/60 p-3 sm:p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-xs font-medium tracking-wide text-accent">
      {children}
    </p>
  );
}

function Body({ children }: { children: ReactNode }) {
  return <p className="mt-1 font-sans text-sm leading-snug text-muted">{children}</p>;
}

export function Diagram({ name }: { name: DiagramName }) {
  switch (name) {
    case "cia":
      return (
        <figure className="my-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <Panel>
              <Label>Confidentiality</Label>
              <Body>Only authorized parties can read. Method: encryption.</Body>
            </Panel>
            <Panel>
              <Label>Integrity</Label>
              <Body>Data stay accurate unless authorized change. Method: checksums.</Body>
            </Panel>
            <Panel>
              <Label>Availability</Label>
              <Body>Reachable when needed. Method: redundancy.</Body>
            </Panel>
          </div>
          <figcaption className="mt-3 font-sans text-xs tracking-wide text-subtle">
            Figure 1. CIA triad — three properties of information.
          </figcaption>
        </figure>
      );
    case "ciana":
      return (
        <figure className="my-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              ["C", "Confidentiality"],
              ["I", "Integrity"],
              ["A", "Availability"],
              ["N", "Non-repudiation"],
              ["A", "Authentication"],
            ].map(([letter, title]) => (
              <Panel key={title} className="text-center">
                <p className="font-serif text-2xl text-accent">{letter}</p>
                <p className="mt-1 font-sans text-xs text-muted">{title}</p>
              </Panel>
            ))}
          </div>
          <figcaption className="mt-3 font-sans text-xs tracking-wide text-subtle">
            Figure 2. CIANA pentagon — CIA plus proof of act and proof of identity.
          </figcaption>
        </figure>
      );
    case "aaa":
      return (
        <figure className="my-8">
          <ol className="grid gap-3 sm:grid-cols-3">
            {[
              ["01", "Authenticate", "Prove who is asking."],
              ["02", "Authorize", "Bound what they may do."],
              ["03", "Account", "Record what they did."],
            ].map(([n, title, body]) => (
              <li key={title}>
                <Panel>
                  <p className="font-sans text-xs tabular-nums tracking-widest text-subtle">
                    {n}
                  </p>
                  <Label>{title}</Label>
                  <Body>{body}</Body>
                </Panel>
              </li>
            ))}
          </ol>
          <figcaption className="mt-3 font-sans text-xs tracking-wide text-subtle">
            Figure 3. AAA — the access lifecycle. Sequence, not a parallel set.
          </figcaption>
        </figure>
      );
    case "risk":
      return (
        <figure className="my-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <Panel>
              <Label>Threat</Label>
              <Body>A potential cause of harm — flood, attacker, disclosure, integrity event.</Body>
            </Panel>
            <Panel className="border-accent/30 bg-accent/5">
              <Label>Risk</Label>
              <Body>Exists only at the intersection. Either side alone is not risk.</Body>
            </Panel>
            <Panel>
              <Label>Vulnerability</Label>
              <Body>An internal weakness — bug, misconfig, missing patch, open door.</Body>
            </Panel>
          </div>
          <figcaption className="mt-3 font-sans text-xs tracking-wide text-subtle">
            Figure 4. Risk as intersection. Manage it by moving either side, or both.
          </figcaption>
        </figure>
      );
    case "factors":
      return (
        <figure className="my-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Know", "Knowledge", "A secret you remember."],
              ["Have", "Possession", "An object you present."],
              ["Are", "Inherence", "A trait of the body."],
              ["Do", "Action", "A distinctive behavior."],
              ["Where", "Location", "A place that must be true."],
            ].map(([k, title, body]) => (
              <Panel key={title}>
                <p className="font-sans text-xs tracking-widest text-subtle uppercase">
                  {k}
                </p>
                <Label>{title}</Label>
                <Body>{body}</Body>
              </Panel>
            ))}
          </div>
          <figcaption className="mt-3 font-sans text-xs tracking-wide text-subtle">
            Figure 5. Five authentication factor families. MFA combines unlike families.
          </figcaption>
        </figure>
      );
    case "categories":
      return (
        <figure className="my-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Technical", "Hardware and software mechanisms that reduce risk."],
              ["Managerial", "Governance, policy, and strategic planning. Also called administrative."],
              ["Operational", "Day-to-day procedures executed by people and process."],
              ["Physical", "Tangible measures that protect the asset in space."],
            ].map(([title, body]) => (
              <Panel key={title}>
                <Label>{title}</Label>
                <Body>{body}</Body>
              </Panel>
            ))}
          </div>
          <figcaption className="mt-3 font-sans text-xs tracking-wide text-subtle">
            Figure 6. Four control categories — the substance of the control.
          </figcaption>
        </figure>
      );
    case "types":
      return (
        <figure className="my-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              ["Preventive", "Stop the event."],
              ["Deterrent", "Make the attempt less attractive."],
              ["Detective", "Notice it as it happens."],
              ["Corrective", "Repair and restore."],
              ["Compensating", "Meet the need another way."],
              ["Directive", "Tell people what to do."],
            ].map(([title, body]) => (
              <Panel key={title}>
                <Label>{title}</Label>
                <Body>{body}</Body>
              </Panel>
            ))}
          </div>
          <figcaption className="mt-3 font-sans text-xs tracking-wide text-subtle">
            Figure 7. Six control types — the function of the control.
          </figcaption>
        </figure>
      );
    case "gap":
      return (
        <figure className="my-8">
          <ol className="grid gap-3 sm:grid-cols-4">
            {[
              ["1", "Scope", "Name the area under analysis."],
              ["2", "Data", "Capture the current state."],
              ["3", "Analyze", "Mark where it falls short."],
              ["4", "Plan", "Write the closing steps."],
            ].map(([n, title, body]) => (
              <li key={title}>
                <Panel>
                  <p className="font-sans text-xs tabular-nums tracking-widest text-subtle">
                    {n}
                  </p>
                  <Label>{title}</Label>
                  <Body>{body}</Body>
                </Panel>
              </li>
            ))}
          </ol>
          <figcaption className="mt-3 font-sans text-xs tracking-wide text-subtle">
            Figure 8. Gap analysis, then POA&M — diagnosis, then dated treatment.
          </figcaption>
        </figure>
      );
    case "zerotrust":
      return (
        <figure className="my-8">
          <div className="grid gap-3 md:grid-cols-2">
            <Panel>
              <Label>Control plane</Label>
              <ul className="mt-2 space-y-1.5 font-sans text-sm text-muted">
                <li>Adaptive identity</li>
                <li>Threat-scope reduction</li>
                <li>Policy-driven access control</li>
                <li>Secured zones</li>
              </ul>
            </Panel>
            <Panel>
              <Label>Data plane</Label>
              <ul className="mt-2 space-y-1.5 font-sans text-sm text-muted">
                <li>Subject / system</li>
                <li>Policy engine</li>
                <li>Policy administrator</li>
                <li>Policy enforcement point</li>
              </ul>
            </Panel>
          </div>
          <figcaption className="mt-3 font-sans text-xs tracking-wide text-subtle">
            Figure 9. Zero trust as two planes — course mapping. Default deny, then verify.
          </figcaption>
        </figure>
      );
    case "redundancy":
      return (
        <figure className="my-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Servers", "Load-balance or fail over."],
              ["Data", "Store more than one copy."],
              ["Network", "Keep an alternate path."],
              ["Power", "UPS and generators."],
            ].map(([title, body]) => (
              <Panel key={title}>
                <Label>{title}</Label>
                <Body>{body}</Body>
              </Panel>
            ))}
          </div>
          <figcaption className="mt-3 font-sans text-xs tracking-wide text-subtle">
            Figure 10. Four redundancy types that underwrite availability.
          </figcaption>
        </figure>
      );
    default:
      return null;
  }
}
