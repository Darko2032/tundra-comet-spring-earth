export type Block =
  | { t: "p"; text: string }
  | { t: "lead"; text: string }
  | { t: "h3"; text: string }
  | { t: "h4"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "callout"; kicker: string; text: string }
  | { t: "quote"; text: string }
  | { t: "table"; headers: string[]; rows: string[][]; caption?: string }
  | { t: "diagram"; name: DiagramName }
  | { t: "defs"; items: { term: string; def: string }[] }
  | { t: "takeaways"; items: string[] }
  | { t: "grid"; items: { title: string; body: string }[] };

export type DiagramName =
  | "cia"
  | "ciana"
  | "aaa"
  | "risk"
  | "factors"
  | "categories"
  | "types"
  | "gap"
  | "zerotrust"
  | "redundancy";

export type Section = {
  id: string;
  num: string;
  title: string;
  kicker?: string;
  keywords: string;
  blocks: Block[];
};

export const META = {
  briefNo: "02",
  classification: "Training use",
  series: "Security fundamentals",
  title: "Fondamentaux de la sécurité",
  subtitle:
    "A synthesis of core security concepts, control taxonomies, risk, and zero-trust architecture",
  objectives: [
    {
      id: "1.1",
      text: "Compare and contrast different types of security controls",
    },
    {
      id: "1.2",
      text: "Summarize fundamental security concepts",
    },
  ],
  issued: "3 September 2026",
  source: "Section 2 — Fondamentaux de la sécurité",
};

export const SECTIONS: Section[] = [
  {
    id: "executive-summary",
    num: "00",
    title: "Executive Summary",
    kicker: "Critical takeaways",
    keywords:
      "executive summary takeaways cia ciana aaa risk zero trust controls",
    blocks: [
      {
        t: "lead",
        text: "The source material frames security as a dual mandate: protect information itself, and protect the systems that hold and process it. Five properties — confidentiality, integrity, availability, non-repudiation, and authentication — define what “secure” means. Three operational functions — authentication, authorization, and accounting — define how access is granted and overseen. Risk appears only where a threat can exploit a vulnerability. Controls are then classified on two independent axes: what they are made of, and what they are intended to do.",
      },
      {
        t: "p",
        text: "This briefing synthesizes those claims into a single argument. Security is not a product and not a single control. It is a system of properties, an access lifecycle, a risk equation, and a control lattice, closed by a verification architecture (zero trust) and a remediation method (gap analysis plus POA&M). The notes are pedagogical rather than operational: they simplify risk to a binary intersection, and they state zero-trust plane membership in two slightly different ways. Both limitations are flagged where they affect interpretation.",
      },
      {
        t: "takeaways",
        items: [
          "Information security protects data; information-systems security protects the computers, servers, and network devices that store and process that data. Confusing the asset with the container produces incomplete programs.",
          "The CIA triad is necessary but no longer sufficient as a teaching model. CIANA adds non-repudiation and authentication as first-class properties. AAA (authentication, authorization, accounting) is the operational loop that enforces those properties at the point of access.",
          "Risk is the intersection of threat and vulnerability. A threat with no corresponding weakness, or a weakness with no actor or event that can exploit it, yields no risk. Risk management is the practice of moving that intersection in the organization’s favor.",
          "Control category and control type are orthogonal. Category answers “what is it made of?” (technical, managerial, operational, physical). Type answers “what is it meant to do?” (preventive, deterrent, detective, corrective, compensating, directive). A firewall is typically technical and preventive; a camera sign is typically physical and deterrent.",
          "Each CIA property is implemented by five named methods. Availability is achieved principally through redundancy of servers, data, network paths, and power.",
          "Zero trust is not a product. It is a default-deny architecture implemented through a control plane (who may do what, under what policy) and a data plane (where those decisions are enforced).",
          "Gap analysis diagnoses the distance between current and desired posture. A Plan of Action and Milestones (POA&M) converts that diagnosis into owners, resources, and deadlines. Neither substitutes for the other.",
        ],
      },
    ],
  },
  {
    id: "scope",
    num: "01",
    title: "Scope of the security problem",
    kicker: "Two nested protections",
    keywords:
      "information security systèmes d'information data systems computers servers",
    blocks: [
      {
        t: "p",
        text: "The sources open by splitting a problem that is often treated as one. **Sécurité de l’information** (information security) is the protection of data and information against unauthorized access, modification, disruption, disclosure, and destruction. **Sécurité des systèmes d’information** (information-systems security) is the protection of the systems — computers, servers, network devices — that hold and process critical data.",
      },
      {
        t: "p",
        text: "The distinction is not academic. An encryption standard can keep a file confidential (information security) while the server that stores the ciphertext sits unpatched on a public network (systems security). Conversely, a hardened datacenter can still leak data through excessive access rights. A complete program must cover both the asset and its container.",
      },
      {
        t: "defs",
        items: [
          {
            term: "Information security",
            def: "Protection of data against unauthorized access, modification, disruption, disclosure, and destruction.",
          },
          {
            term: "Information-systems security",
            def: "Protection of the computing and network systems that store and process that data.",
          },
        ],
      },
      {
        t: "callout",
        kicker: "Implication",
        text: "Controls aimed only at “the network” or only at “the document” will fail in the gap between them. Objective 1.2’s fundamental concepts (CIA, AAA, non-repudiation) apply to both layers; objective 1.1’s control types are how those concepts are instantiated at each layer.",
      },
    ],
  },
  {
    id: "models",
    num: "02",
    title: "From CIA to CIANA, and the AAA loop",
    kicker: "Properties versus operations",
    keywords:
      "cia triad ciana pentagon triple a confidentiality integrity availability non-repudiation authentication authorization accounting",
    blocks: [
      {
        t: "p",
        text: "The notes present three overlapping models. They are not competitors. They answer different questions.",
      },
      {
        t: "h3",
        text: "The CIA triad — what must be true of information",
      },
      {
        t: "diagram",
        name: "cia",
      },
      {
        t: "ul",
        items: [
          "**Confidentiality** — information is accessible only to authorized personnel. Canonical method: encryption.",
          "**Integrity** — data remain accurate and unaltered except by authorized change. Canonical method: checksums.",
          "**Availability** — information and resources are accessible when needed. Canonical method: redundancy.",
        ],
      },
      {
        t: "h3",
        text: "The CIANA pentagon — CIA plus proof of act and proof of identity",
      },
      {
        t: "p",
        text: "CIANA extends CIA with two properties that CIA treated as supporting techniques rather than goals in their own right.",
      },
      {
        t: "diagram",
        name: "ciana",
      },
      {
        t: "ul",
        items: [
          "**Non-repudiation** — an action or event cannot later be denied by the parties involved. Canonical method: digital signatures.",
          "**Authentication** — the claimed identity of a user or system is verified before trust is extended.",
        ],
      },
      {
        t: "p",
        text: "The expansion is a teaching correction. CIA can be satisfied on paper while still leaving an organization unable to prove who sent a payment instruction, or unable to distinguish a legitimate session from a stolen one. CIANA makes those failures first-class.",
      },
      {
        t: "h3",
        text: "The AAA model — how access is actually run",
      },
      {
        t: "p",
        text: "If CIANA describes desired properties of information and actors, **Triple A** describes the operational sequence at the point of access. The notes’ original labels (authentication, autorisation, comptage) map to the standard English triad.",
      },
      {
        t: "diagram",
        name: "aaa",
      },
      {
        t: "defs",
        items: [
          {
            term: "Authentication",
            def: "Verification of the identity of a user or system (for example, password checks). Answers: who are you?",
          },
          {
            term: "Authorization",
            def: "Determination of the actions or resources an authenticated user may access (permissions). Answers: what may you do?",
          },
          {
            term: "Accounting",
            def: "Tracking of user activity and resource use for audit or billing. Answers: what did you do?",
          },
        ],
      },
      {
        t: "callout",
        kicker: "How the models lock together",
        text: "CIA/CIANA are the destination. AAA is the vehicle. Authentication serves the CIANA property of the same name and is the gate to authorization. Authorization is the principal control for confidentiality and integrity (who may read, who may write). Accounting is the evidence layer for non-repudiation and for detective controls. Availability is largely outside AAA; it is an infrastructure property, which is why the notes treat it through redundancy rather than through identity.",
      },
    ],
  },
  {
    id: "confidentiality",
    num: "03",
    title: "Confidentiality",
    kicker: "Keep it from those who should not see it",
    keywords:
      "confidentiality encryption access control data masking physical security training privacy compliance",
    blocks: [
      {
        t: "lead",
        text: "Confidentiality is the protection of information from unauthorized access and disclosure. Private or sensitive information must not be available to unauthorized individuals, entities, or processes.",
      },
      {
        t: "p",
        text: "The sources give three reasons it matters, and they are not interchangeable. **Personal privacy** is a rights and trust problem. **Business advantage** is a competitive problem (trade secrets, strategy, unreleased financials). **Regulatory compliance** is a legal problem (sector and privacy regimes that mandate protection of designated data). A control that satisfies one reason can fail the others: encrypting a laptop protects the business advantage of its files and may satisfy a regulation, but does nothing for privacy if the same data is over-shared inside the company.",
      },
      {
        t: "h3",
        text: "Five methods",
      },
      {
        t: "grid",
        items: [
          {
            title: "Encryption",
            body: "Conversion of data into a form unreadable without the correct key, so that possession of the bytes is not possession of the meaning.",
          },
          {
            title: "Access controls",
            body: "Strong user permissions so that only authorized personnel can reach given classes of data. This is authorization applied to confidentiality.",
          },
          {
            title: "Data masking",
            body: "Obscuring specific fields inside a database so unauthorized users cannot read them, while authorized users and legitimate processes still see authentic values.",
          },
          {
            title: "Physical security measures",
            body: "Protection of paper records (filing cabinets, rooms) and of the servers and workstations that hold digital copies. Confidentiality is not a purely logical problem.",
          },
          {
            title: "Training and awareness",
            body: "Regular instruction so that people — still the most common disclosure path — apply the other four methods instead of bypassing them.",
          },
        ],
      },
      {
        t: "callout",
        kicker: "Reading the set",
        text: "The five methods span all four control categories: encryption and masking are technical; access-control policy is managerial; training is operational; cabinets and server rooms are physical. Confidentiality that lives in only one category is brittle.",
      },
    ],
  },
  {
    id: "integrity",
    num: "04",
    title: "Integrity",
    kicker: "Keep it accurate unless an authorized party changes it",
    keywords:
      "integrity hashing digital signatures checksums access controls audits accuracy trust",
    blocks: [
      {
        t: "lead",
        text: "Integrity ensures that information remains accurate and unchanged from its original state, except when modified intentionally by an authorized person. It is a claim about correctness and reliability across the entire data lifecycle — at rest, in transit, and in use.",
      },
      {
        t: "p",
        text: "Three reasons are given. **Data accuracy** is the direct goal: decisions, transactions, and records must reflect reality. **Trust** is the second-order goal: once integrity failures are visible, users and counterparties stop relying on the system. **System operability** is the third: corrupted configurations, binaries, or reference data do not merely mislead; they stop systems from working.",
      },
      {
        t: "h3",
        text: "Five methods",
      },
      {
        t: "grid",
        items: [
          {
            title: "Hashing",
            body: "Conversion of data into a fixed-size value. Any change in the input produces a different digest, so integrity can be checked without revealing the original.",
          },
          {
            title: "Digital signatures",
            body: "Provide both integrity and authenticity. A signature that fails to verify means the message was altered or the claimed signer is wrong — or both.",
          },
          {
            title: "Checksums",
            body: "A method for verifying integrity during transmission. Weaker than cryptographic hashes for adversarial settings, still effective against accidental corruption on the wire.",
          },
          {
            title: "Access controls",
            body: "Only authorized people can modify data, reducing both accidental and malicious change. The same mechanism serves confidentiality; here the protected operation is write, not read.",
          },
          {
            title: "Regular audits",
            body: "Systematic review of logs and operations to confirm that only authorized changes occurred and that inconsistencies are corrected immediately.",
          },
        ],
      },
      {
        t: "callout",
        kicker: "Evidence versus prevention",
        text: "Hashing, signatures, and checksums detect or prove alteration. Access controls try to prevent it. Audits reconstruct it after the fact. An integrity program that only hashes files has evidence without a gate; one that only locks permissions has a gate without proof.",
      },
    ],
  },
  {
    id: "availability",
    num: "05",
    title: "Availability",
    kicker: "Be there when authorized users need it",
    keywords:
      "availability redundancy servers data network power continuity reputation",
    blocks: [
      {
        t: "lead",
        text: "Availability requires that information, systems, and resources remain accessible and operational when authorized users need them. The notes treat it as a business property, not a convenience: it underwrites continuity, customer trust, and organizational reputation.",
      },
      {
        t: "p",
        text: "Unlike confidentiality and integrity, which are often implemented with cryptographic and access-control tools, availability is implemented with **redundancy** — the duplication of critical components or functions in order to improve reliability. The design principle is simple: a single copy of anything important is a single point of failure.",
      },
      {
        t: "diagram",
        name: "redundancy",
      },
      {
        t: "defs",
        items: [
          {
            term: "Server redundancy",
            def: "Multiple servers in a load-balanced or failover configuration, so that overload or failure of one does not take the service away from users.",
          },
          {
            term: "Data redundancy",
            def: "Storing data in more than one place, so that loss or corruption of a single copy is recoverable.",
          },
          {
            term: "Network redundancy",
            def: "Alternate paths, so that if one path fails, traffic still flows.",
          },
          {
            term: "Power redundancy",
            def: "Backup sources such as generators and UPS systems, so that electrical failure does not become an information-availability failure.",
          },
        ],
      },
      {
        t: "callout",
        kicker: "The CIA trade-off the notes leave implicit",
        text: "Redundancy multiplies copies, paths, and machines. Each extra copy is another place confidentiality and integrity must be enforced. Availability controls that ignore that multiplication create a larger attack surface in the name of uptime. A complete program designs redundancy and access control together.",
      },
    ],
  },
  {
    id: "nonrepudiation",
    num: "06",
    title: "Non-repudiation",
    kicker: "No credible denial of the act",
    keywords:
      "non-repudiation digital signatures hash digest private key asymmetric authenticity accountability",
    blocks: [
      {
        t: "lead",
        text: "Non-repudiation supplies irrefutable evidence of participation in digital transactions. Individuals or entities cannot credibly deny their involvement or the authenticity of their acts.",
      },
      {
        t: "p",
        text: "The primary measure given is the **digital signature**, unique to each user in the digital domain. The notes specify a two-step construction:",
      },
      {
        t: "ol",
        items: [
          "The message is hashed to produce a digest — a fixed-size string of letters and numbers.",
          "That digest is encrypted with the user’s private key using asymmetric cryptography.",
        ],
      },
      {
        t: "p",
        text: "Verification inverts the second step with the signer’s public key and compares the result to a freshly computed hash of the received message. A match binds three claims at once: the message is unaltered (integrity), it was signed by the holder of the private key (authenticity of origin), and the signer is in a weak position to deny the act (non-repudiation). The notes state that these signatures guarantee both the authenticity of the message and the identity of the sender.",
      },
      {
        t: "p",
        text: "Three reasons are given for treating non-repudiation as a first-class property: it confirms the authenticity of digital transactions; it guarantees the integrity of critical communications; and it ensures accountability in digital processes. In other words, it is the property that makes CIA enforceable after the fact — the bridge from “the data are correct” to “this party is responsible.”",
      },
      {
        t: "callout",
        kicker: "Dependency the notes assume",
        text: "Non-repudiation collapses if private keys are shared, stolen, or poorly bound to legal identities. The cryptographic construction proves possession of a key, not possession of a person. Key protection, issuance, and revocation are therefore part of the control, not optional extras.",
      },
    ],
  },
  {
    id: "authentication",
    num: "07",
    title: "Authentication",
    kicker: "Prove the claim of identity",
    keywords:
      "authentication mfa knowledge possession inherence action location factors",
    blocks: [
      {
        t: "lead",
        text: "Authentication is the control that ensures individuals or entities are who they claim to be during a communication or transaction. It is listed both as a CIANA property and as the first function of AAA — a signal that the curriculum treats identity proof as foundational rather than ancillary.",
      },
      {
        t: "p",
        text: "Five factor families are enumerated. They are independent channels: a secret, an object, a body, a behavior, and a place. Strength comes from combining unlike channels, not from repeating the same one.",
      },
      {
        t: "diagram",
        name: "factors",
      },
      {
        t: "defs",
        items: [
          {
            term: "Something you know — knowledge",
            def: "Information the user can remember: passwords, PINs, answers. Cheap to deploy, cheap to steal, and shared too easily.",
          },
          {
            term: "Something you have — possession",
            def: "A physical item the user must present: token, smart card, phone running an authenticator. Possession can be lost or cloned; it cannot be merely forgotten.",
          },
          {
            term: "Something you are — inherence",
            def: "A unique physical or behavioral characteristic of the person: fingerprint, face, iris, voice. Difficult to transfer, not impossible to spoof, and unlike a password it cannot be rotated after a breach.",
          },
          {
            term: "Something you do — action",
            def: "A unique action that identifies the user: gait, keystroke dynamics, signature gesture. Behavioral, often continuous, and typically used as a supplement rather than a sole factor.",
          },
          {
            term: "Somewhere you are — location",
            def: "A geographic or network location that must be true before access is granted: geofence, known network, country restriction. A context factor, not an identity factor: it narrows who could be claiming the identity; it does not prove who is.",
          },
        ],
      },
      {
        t: "h3",
        text: "Multi-factor authentication",
      },
      {
        t: "p",
        text: "MFA is the requirement that users present more than one identification method. The security gain is real only when the methods are from different factor families. Two passwords are not MFA. A password plus a device prompt is. The notes give three reasons authentication (and by extension MFA) matters: preventing unauthorized access; protecting data and user privacy; and ensuring that resources are reachable only by valid users.",
      },
      {
        t: "callout",
        kicker: "Order of operations",
        text: "Authentication is necessary and not sufficient. A correctly authenticated user who is then over-authorized is still a confidentiality and integrity failure. MFA without authorization design is a stronger lock on the wrong door.",
      },
    ],
  },
  {
    id: "authorization",
    num: "08",
    title: "Authorization",
    kicker: "Decide what the proven identity may do",
    keywords:
      "authorization permissions privileges least privilege sensitive data integrity ux",
    blocks: [
      {
        t: "lead",
        text: "Authorization concerns the permissions and privileges granted to users or entities after they have been authenticated. It is the control that turns identity into a bounded set of actions.",
      },
      {
        t: "p",
        text: "The notes assign it three jobs. **Protect sensitive data** — the read side of confidentiality. **Maintain system integrity** — the write side of integrity, by refusing unauthorized change. **Create a smoother user experience** — a reminder that authorization is not only restriction; correctly scoped permissions reduce friction by showing people what they need and hiding what they should never touch.",
      },
      {
        t: "p",
        text: "Although the notes do not name “least privilege” in this section, the later zero-trust discussion of threat-scope reduction is the same idea: users receive only what their role requires. Authorization is where that idea is enforced. It is also where most real-world CIA failures concentrate — not at the login prompt, but in group memberships, inherited roles, and standing administrative rights.",
      },
    ],
  },
  {
    id: "accounting",
    num: "09",
    title: "Accounting",
    kicker: "Record what happened",
    keywords:
      "accounting audit trail syslog siem network analysis forensics compliance accountability",
    blocks: [
      {
        t: "lead",
        text: "Accounting is the control that ensures all user activity during a communication or transaction is tracked and recorded. In this curriculum it is not a finance function. It is the evidence system of security.",
      },
      {
        t: "p",
        text: "A robust accounting system is assigned five objectives. Together they explain why logs are not an afterthought: they are how an organization reconstructs, proves, optimizes, and deters.",
      },
      {
        t: "grid",
        items: [
          {
            title: "Create an audit trail",
            body: "A chronological record of user activity that can trace changes, unauthorized access, or anomalies to a source and a moment.",
          },
          {
            title: "Maintain regulatory compliance",
            body: "A complete register of user activity, which many regimes require as a condition of handling designated data.",
          },
          {
            title: "Enable forensic analysis",
            body: "Detailed ledgers and event logs that let investigators determine what happened, how, and how to stop a recurrence.",
          },
          {
            title: "Optimize resources",
            body: "Usage and allocation records that improve system performance and reduce cost — security telemetry with an operational dividend.",
          },
          {
            title: "Enforce user accountability",
            body: "Monitoring and recording that deters misuse and supports adherence to organizational policy. People behave differently when acts are attributable.",
          },
        ],
      },
      {
        t: "h3",
        text: "Technologies named",
      },
      {
        t: "defs",
        items: [
          {
            term: "Syslog servers",
            def: "Aggregate logs from network devices and systems so administrators can analyze patterns or anomalies in one place.",
          },
          {
            term: "Network analysis tools",
            def: "Capture and inspect traffic so operators can see what data actually moves on the network, not only what endpoints report.",
          },
          {
            term: "SIEM — Security Information and Event Management",
            def: "Real-time analysis of security alerts generated by hardware and software across the organization. SIEM is accounting plus correlation plus detection.",
          },
        ],
      },
      {
        t: "callout",
        kicker: "Where accounting sits in the lattice",
        text: "Syslog and packet capture are technical detective controls. A log-retention policy is managerial. Daily review of SIEM queues is operational. Accounting therefore occupies all three non-physical categories at once. It is also the practical implementation of non-repudiation for events that are not digitally signed — login, file access, configuration change.",
      },
    ],
  },
  {
    id: "risk",
    num: "10",
    title: "Threats, vulnerabilities, and risk",
    kicker: "Risk is an intersection, not a feeling",
    keywords:
      "threat vulnerability risk natural disaster cyberattack bugs patches physical security",
    blocks: [
      {
        t: "lead",
        text: "The notes define the three terms so that they cannot be used as synonyms — a common failure in both teaching and reporting. A threat is a potential cause of harm. A vulnerability is a weakness. Risk is where the two meet.",
      },
      {
        t: "diagram",
        name: "risk",
      },
      {
        t: "h3",
        text: "Threat",
      },
      {
        t: "p",
        text: "A threat is anything that could cause damage, loss, or compromise to information systems. The sources’ examples are deliberately mixed: they are not all “hackers.”",
      },
      {
        t: "ul",
        items: [
          "Natural disasters",
          "Cyberattacks",
          "Integrity violations of data",
          "Disclosure of confidential information",
        ],
      },
      {
        t: "p",
        text: "Two of those four (integrity violation, disclosure) are also CIA failures. The curriculum is classifying outcomes as threat events, not only external actors. That is useful: a flood and a ransomware crew are different origins of the same class of problem — loss of availability, integrity, or confidentiality.",
      },
      {
        t: "h3",
        text: "Vulnerability",
      },
      {
        t: "p",
        text: "A vulnerability is any weakness in design or implementation. The notes locate its origin in internal factors:",
      },
      {
        t: "ul",
        items: [
          "Software bugs",
          "Misconfigured software",
          "Poorly protected network devices",
          "Missing security patches",
          "Lack of physical security",
        ],
      },
      {
        t: "p",
        text: "The list is an operational checklist more than a taxonomy. Every item is something the organization can, in principle, change. Threats include events it cannot (earthquake); vulnerabilities are the conditions it allowed.",
      },
      {
        t: "h3",
        text: "Risk, and the binary rule",
      },
      {
        t: "quote",
        text: "If you have a threat but no vulnerability, or a vulnerability but no threat, then you have no risk.",
      },
      {
        t: "p",
        text: "This is the sharpest claim in the section, and it is pedagogically clean. An unpatched server (vulnerability) on a network with no path from any threat actor and no relevant natural hazard has no exploitable risk in this model. A sophisticated attacker (threat) facing a system with no applicable weakness has no risk to inflict. **Risk management** is then defined as finding ways to manipulate outcomes in your favor — reduce vulnerabilities, reduce exposure to threats, or both.",
      },
      {
        t: "callout",
        kicker: "Limit of the model",
        text: "The binary rule (risk exists / does not) is a teaching device. Operational programs still need likelihood and impact: two real risks are not equal. The notes do not develop that scoring. They establish the logical precondition — both sides of the intersection must be present — and stop. Treat the rule as a filter, not as a ranking method.",
      },
    ],
  },
  {
    id: "categories",
    num: "11",
    title: "Control categories",
    kicker: "What the control is made of — objective 1.1",
    keywords:
      "technical managerial administrative operational physical categories contrôles",
    blocks: [
      {
        t: "p",
        text: "The curriculum divides controls into four **categories**. Category is about the nature of the measure, not its purpose. The same purpose (for example, “stop unauthorized entry”) can be pursued with a badge system (technical), a visitor policy (managerial), a reception procedure (operational), or a locked door (physical).",
      },
      {
        t: "diagram",
        name: "categories",
      },
      {
        t: "defs",
        items: [
          {
            term: "Technical controls",
            def: "Technologies, hardware, and software mechanisms implemented to manage and reduce risk. Firewalls, encryption, MFA prompts, EDR, and access-control lists live here.",
          },
          {
            term: "Managerial controls",
            def: "Also called administrative controls. Strategic planning and governance of security: policies, standards, risk assessments, hiring rules, and the decision to accept, transfer, or treat risk.",
          },
          {
            term: "Operational controls",
            def: "Procedures and measures designed to protect data day to day. They are governed mainly by internal processes and human action: patch windows, backup jobs, log review, incident-response drills, onboarding checklists.",
          },
          {
            term: "Physical controls",
            def: "Tangible measures taken to protect assets: fences, locks, guards, cameras, Faraday cages, fire suppression, badge readers as door hardware rather than as identity systems.",
          },
        ],
      },
      {
        t: "p",
        text: "Two boundary problems are worth marking. First, a badge reader is physical at the door and technical in the identity backend; category follows the part of the control under discussion. Second, “operational” is not a synonym for “everything people do.” Managerial controls are also people-written. The difference is altitude: managerial controls decide and document; operational controls execute.",
      },
    ],
  },
  {
    id: "types",
    num: "12",
    title: "Control types",
    kicker: "What the control is meant to do — objective 1.1",
    keywords:
      "preventive deterrent detective corrective compensating directive types prévention dissuasion",
    blocks: [
      {
        t: "p",
        text: "Six **types** describe function — the moment in the attack or failure lifecycle that the control is aimed at. Type is independent of category. A preventive control may be a technical rule, a policy, a procedure, or a lock.",
      },
      {
        t: "diagram",
        name: "types",
      },
      {
        t: "defs",
        items: [
          {
            term: "Preventive",
            def: "Proactive measures put in place to counter potential threats or breaches before they occur. The preferred type when feasible: the incident does not happen.",
          },
          {
            term: "Deterrent",
            def: "Measures that discourage potential attackers by making the effort less attractive or more difficult. They work on calculation and fear, not on the technical possibility of the act. Visible cameras, sanctions policies, and login banners are typical.",
          },
          {
            term: "Detective",
            def: "Measures that monitor and alert the organization to malicious activity as it occurs or shortly after. They assume prevention will fail some of the time. IDS, SIEM, audits, and motion sensors belong here.",
          },
          {
            term: "Corrective",
            def: "Measures that mitigate damage and restore systems to a normal state after an incident: restore from backup, patch the exploited hole, reimage, revoke a compromised credential.",
          },
          {
            term: "Compensating",
            def: "Alternative measures used when primary controls are not feasible or not effective. They do not lower the requirement; they meet it by another path. Extra monitoring around an unpatchable legacy host is the classic case.",
          },
          {
            term: "Directive",
            def: "Measures that guide, inform, or mandate action, often rooted in policies or documents that set standards of behavior. Acceptable-use policies, security standards, and “authorized personnel only” notices are directive even when they have no enforcement teeth of their own.",
          },
        ],
      },
      {
        t: "h3",
        text: "The two axes together",
      },
      {
        t: "p",
        text: "Objective 1.1 is to compare and contrast types — but the notes also insist on categories. The useful comparison is a lattice, not a list. Every real control occupies one cell on each axis. Asking only “is this preventive?” hides whether the program is entirely technical and therefore blind to policy and people. Asking only “is this a policy?” hides whether the policy prevents, detects, or merely directs.",
      },
      {
        t: "table",
        caption:
          "Illustrative pairings — not an exhaustive catalog. Each cell is a different control, not a synonym.",
        headers: [
          "Type \\ Category",
          "Technical",
          "Managerial",
          "Operational",
          "Physical",
        ],
        rows: [
          [
            "Preventive",
            "Firewall allow-list",
            "Least-privilege policy",
            "Patch procedure",
            "Locked server cage",
          ],
          [
            "Deterrent",
            "Login warning banner",
            "Sanctions in the code of conduct",
            "Visible guard patrols",
            "Camera signage",
          ],
          [
            "Detective",
            "IDS / SIEM alerts",
            "Scheduled audit program",
            "Daily log review",
            "Motion sensors",
          ],
          [
            "Corrective",
            "Automated restore",
            "Incident-response plan executed",
            "Reimage playbook",
            "Fire suppression discharge",
          ],
          [
            "Compensating",
            "WAF in front of unpatched app",
            "Extra approval for a legacy process",
            "Dual control on a manual step",
            "Escort required if a badge is broken",
          ],
          [
            "Directive",
            "Acceptable-use interstitial",
            "Written security standard",
            "Standard operating procedure",
            "“Authorized personnel” notice",
          ],
        ],
      },
      {
        t: "callout",
        kicker: "Compare and contrast — the exam-useful distinctions",
        text: "Preventive stops the act; deterrent makes the actor less willing; detective notices the act; corrective repairs it; compensating replaces a blocked primary control; directive tells people what to do. Deterrent without detective is a bluff. Detective without corrective is an alarm with no one to call. Directive without any other type is a document. Compensating is not optional decoration — it is how real organizations meet a requirement they cannot meet directly.",
      },
    ],
  },
  {
    id: "gap",
    num: "13",
    title: "Gap analysis and POA&M",
    kicker: "From diagnosis to a dated plan",
    keywords:
      "gap analysis écarts poam plan of action milestones technical business cloud",
    blocks: [
      {
        t: "lead",
        text: "Gap analysis is the process of evaluating the difference between an organization’s current performance and its desired performance. In this curriculum it is the method that turns the control lattice and the risk intersection into a work program.",
      },
      {
        t: "p",
        text: "It is described as a tool for improving operations, processes, performance, or overall security posture. The notes give a four-step method and two basic flavors.",
      },
      {
        t: "diagram",
        name: "gap",
      },
      {
        t: "ol",
        items: [
          "**Define the scope.** State clearly which area or aspect of the organization is under analysis. An unbounded gap analysis produces unbounded findings.",
          "**Collect data.** Gather information about the current state — controls in place, coverage, ownership, evidence.",
          "**Analyze the data.** Identify where current performance falls short of the desired result. This is the actual “gap.”",
          "**Develop a plan.** Create concrete steps to close the distance between current and desired performance.",
        ],
      },
      {
        t: "h3",
        text: "Two flavors",
      },
      {
        t: "defs",
        items: [
          {
            term: "Technical gap analysis",
            def: "Focuses on current technical infrastructure. Identifies where technical capabilities cannot support optimal security solutions.",
          },
          {
            term: "Business gap analysis",
            def: "Evaluates current business processes. Identifies where they lack the capacity to fully exploit cloud-based solutions — a reminder that the notes treat cloud adoption as a process problem, not only a tooling problem.",
          },
        ],
      },
      {
        t: "h3",
        text: "Plan of Action and Milestones",
      },
      {
        t: "p",
        text: "POA&M is the structured framework for closing identified gaps. The notes give it three jobs:",
      },
      {
        t: "ul",
        items: [
          "Describe specific measures to remediate each vulnerability.",
          "Allocate resources effectively.",
          "Set deadlines for each remediation task to ensure accountability and progress.",
        ],
      },
      {
        t: "p",
        text: "Without POA&M, gap analysis is a report. With it, each finding becomes an owned, resourced, dated action. That is also how compensating controls should enter the record: as time-bounded substitutes, not as permanent exceptions that nobody revisits.",
      },
    ],
  },
  {
    id: "zero-trust",
    num: "14",
    title: "Zero trust",
    kicker: "Nobody is trusted by default",
    keywords:
      "zero trust zéro confiance control plane data plane adaptive identity pep policy engine",
    blocks: [
      {
        t: "lead",
        text: "Zero trust operates on the principle that nobody should be trusted by default. Every device, user, and transaction inside the network requires verification, regardless of origin. Perimeter location is not a credential.",
      },
      {
        t: "p",
        text: "To reach that state the notes specify two planes. The **control plane** is the framework of components that define, manage, and enforce policies for user and system access. The **data plane** is where an access request is evaluated and the allow/deny decision is executed. The first statement of the notes assigns four ideas to the control plane and four components to the data plane. That mapping is the one used here. A later restatement in the source mixes several control-plane ideas under a data-plane heading; that is treated as a note-taking inconsistency, not as a second architecture.",
      },
      {
        t: "diagram",
        name: "zerotrust",
      },
      {
        t: "h3",
        text: "Control plane — policy, identity, and containment",
      },
      {
        t: "defs",
        items: [
          {
            term: "Adaptive identity",
            def: "Real-time validation that takes into account user behavior, device, location, and other context — authentication that is continuous and situational, not a one-time password at the edge.",
          },
          {
            term: "Threat-scope reduction",
            def: "Users receive only what their job requires, shrinking the network’s attack surface and the “blast radius” of a breach. This is least privilege stated as an architectural goal.",
          },
          {
            term: "Policy-driven access control",
            def: "Access policies developed, managed, and enforced on the basis of roles and responsibilities — authorization as a governed object, not as ad-hoc permissions.",
          },
          {
            term: "Secured zones",
            def: "Isolated environments inside the network designed to host sensitive data, with assurance that policies are correctly applied. Segmentation as a confidentiality and blast-radius control.",
          },
        ],
      },
      {
        t: "h3",
        text: "Data plane — request, decision, enforcement",
      },
      {
        t: "defs",
        items: [
          {
            term: "Subject / system",
            def: "The individual or entity attempting access. The requester, not the policy.",
          },
          {
            term: "Policy engine",
            def: "Cross-checks the access request against predefined policies and produces the decision.",
          },
          {
            term: "Policy administrator",
            def: "Establishes and manages the access policies that the engine evaluates.",
          },
          {
            term: "Policy enforcement point",
            def: "The place where the decision to grant or deny is actually executed — the gate on the wire, the API, or the resource.",
          },
        ],
      },
      {
        t: "callout",
        kicker: "Alignment note",
        text: "NIST SP 800-207 places the policy engine and policy administrator in the control plane, and the policy enforcement point in the data plane. The course notes put PE, PA, and PEP together as data-plane components and keep “adaptive identity / threat scope / policy-driven access / secured zones” as control-plane ideas. For exam purposes, follow the course mapping. For design work, the NIST split is the clearer engineering model: decide in the control plane, enforce in the data plane.",
      },
      {
        t: "p",
        text: "Zero trust is the architectural expression of several earlier ideas at once: MFA and adaptive identity (authentication), policy-driven authorization and threat-scope reduction (least privilege), secured zones (physical/logical segmentation), and continuous verification instead of implied trust from network location. It does not replace CIA, AAA, or the control lattice. It is how those concepts are arranged when implied trust is no longer an acceptable design assumption.",
      },
    ],
  },
  {
    id: "conclusions",
    num: "15",
    title: "Conclusions",
    kicker: "What the sources commit you to",
    keywords:
      "conclusions implications program design synthesis judgment",
    blocks: [
      {
        t: "p",
        text: "Read as a whole, Section 2 is not a pile of definitions. It is a stack.",
      },
      {
        t: "ol",
        items: [
          "Decide what must be true of information (CIA, then CIANA).",
          "Install an access lifecycle that can enforce those properties (AAA, with five authentication factors and MFA).",
          "Name risk only where a threat can meet a vulnerability, and manage that intersection.",
          "Populate a control lattice of four categories by six types, rather than a flat list of tools.",
          "Measure the distance from current to desired state (gap analysis) and convert it into owned, dated work (POA&M).",
          "Assume no implicit trust (zero trust), splitting policy from enforcement.",
        ],
      },
      {
        t: "p",
        text: "Several conclusions follow with enough force to govern a program, not just an exam answer.",
      },
      {
        t: "h3",
        text: "Security is a system property",
      },
      {
        t: "p",
        text: "No single control in the notes is sufficient. Encryption without access control, hashing without authorization, MFA without accounting, or zero trust without a POA&M for the gaps it reveals, each fails a different property. The correct unit of analysis is the set of controls and the properties they jointly produce.",
      },
      {
        t: "h3",
        text: "The two taxonomies must stay orthogonal",
      },
      {
        t: "p",
        text: "Mixing category and type (“we have technical controls, so we are preventive”) is the most expensive confusion the section warns against, even when it does not say so outright. A SIEM is technical and detective. A clean-desk policy is managerial and preventive or directive depending on enforcement. Programs should be able to show coverage across both axes, including compensating controls where a primary cell cannot be filled.",
      },
      {
        t: "h3",
        text: "Availability is a design problem, not a monitoring problem",
      },
      {
        t: "p",
        text: "The notes locate availability in redundancy of servers, data, paths, and power. Detection of downtime is useful; it is not availability. The implication is capital and architecture, not dashboards.",
      },
      {
        t: "h3",
        text: "Accounting is the enforcement of every other property over time",
      },
      {
        t: "p",
        text: "Non-repudiation, detective controls, forensics, compliance, and user accountability all collapse without a record. Syslog, network analysis, and SIEM are named because they make the AAA loop closable. A control that cannot be evidenced is, for audit purposes, a control that does not exist.",
      },
      {
        t: "h3",
        text: "Zero trust is the default-deny restatement of AAA",
      },
      {
        t: "p",
        text: "Adaptive identity is authentication under changing context. Policy-driven access and threat-scope reduction are authorization under least privilege. The policy engine, administrator, and enforcement point are how those decisions are computed and applied. Secured zones limit blast radius when the previous layers fail. Nothing in the zero-trust section is foreign to the earlier pages; it is those pages with implied trust removed.",
      },
      {
        t: "h3",
        text: "What the notes do not settle",
      },
      {
        t: "ul",
        items: [
          "Risk is defined as presence/absence, not as likelihood × impact. Scoring, appetite, and residual risk are out of scope here.",
          "Control examples in this briefing’s lattice are illustrative. The source defines the axes; it does not populate every cell.",
          "Zero-trust plane membership is stated more cleanly at first than later in the notes. Exam answers should follow the course’s control-plane four / data-plane four split.",
          "Confidentiality, integrity, and availability each receive five methods; the lists overlap (access control appears twice) and are not ranked. Ranking is a local risk decision, not a universal order.",
        ],
      },
      {
        t: "quote",
        text: "The work of Section 2 is to stop treating security as a tool catalog. Properties, access, risk, controls, gaps, and verification are one argument. Programs that implement only the tools will still fail the argument.",
      },
    ],
  },
];
