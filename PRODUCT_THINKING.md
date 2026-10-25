# Product Thinking & System Design

**Product:** Fomi Atelier Professional Studio (`/workspace`)  
**Role:** Senior Frontend Engineer & Product Architect  
**Project:** Fomi AI Content Generation Workspace Technical Assessment (Part B)

---

## 1. The Problem & Target User

### The Target User
The target user is a **senior concept artist, creative director, or production designer** working in film pre-visualization, high-end game development, or digital advertising (e.g., A24, Blur Studio, Riot Games, Wieden+Kennedy). They:
- Spend **4 to 8 hours a day** inside generative suites.
- Are **signed in** and returning to an **in-progress, multi-day master project** (e.g., *"Solaria: Neo-Kyoto Chronicles v2.4"*).
- Produce **series and sequences**, not isolated single images.
- Value **repeatability, style coherence, fine-grained delta inspection, and keyboard ergonomics** over flashy single-click gimmicks.

### The Problem
Every prevailing AI image tool (Midjourney, Krea, Leonardo, OpenArt, Higgsfield, Magnific) forces users into one of two flawed paradigms:
1. **The Ephemeral Slot Machine (Chat Stream / Infinite Grid):** Generations are treated as disposable casino spins. If you explore 40 variations of character lighting, your earlier promising concepts are pushed off-screen and lost in an unorganized scroll. 
2. **Context Amnesia Across Sessions:** Returning to a project requires manually re-entering character prompts, copying hex codes from Figma, and hunting for seeds. There is no concept of a "Project Memory" or shared creative genome.
3. **Inability to Compare Variations with Rigor:** When evaluating two candidate generations, users are forced to toggle between browser tabs or screenshot images into Photoshop to inspect differences in hands, eyes, or composition.
4. **Tool-Heavy Clutter:** Traditional interfaces sacrifice 50% of the screen to sliders, knobs, accordions, and ads, squeezing the artwork into a secondary viewport.

---

## 2. The Three Most Important UX Decisions (and Why)

### Decision 1: The Workspace Is the Hero (Radical Interface Decoupling)
* **What we did:** We removed permanent 400px side control panels from the main canvas. The canvas expands edge-to-edge, and the generation controls reside in a non-intrusive, floating bottom dock that stays collapsed during inspection and expands on keypress `/`.
* **Why:** In professional creative tools (Blender, Figma, Davinci Resolve), the canvas is the holy ground. When a creative director is evaluating cinematic framing, their eye must not be distracted by persistent CFG sliders or negative prompt boxes. Controls should appear only in the moment of intent and vanish upon execution.

### Decision 2: The Branching Directed Acyclic Graph (DAG) Creative Timeline
* **What we did:** Instead of a destructive linear history or a flat grid, every generation is an immutable node in a tree graph. Selecting any node displays its exact prompt delta from its parent (e.g., `+ added intense golden rim lighting`) and enables one-click branching via `F` (Fork).
* **Why:** Creative discovery is non-linear. An artist explores lighting down Branch A, decides it’s too dark, returns to the parent node from 2 hours prior, and forks Branch B to explore weather effects. Traditional tools destroy this lineage; our DAG preserves every fork non-destructively.

### Decision 3: Keyboard-First Command Palette (`Cmd+K` / `Ctrl+K`)
* **What we did:** Implemented an omnipresent Command Palette providing instant access to engine models, aspect ratios, branch forking, compare modes, seed rolling, and project DNA injection with zero mouse movement.
* **Why:** Professionals develop muscle memory. Reaching for a mouse to click a dropdown select 300 times a day causes friction and cognitive drag. Power users operate at the speed of thought: `Cmd+K` → `Fork` → `Enter`.

---

## 3. Features Intentionally Left Out (and Why)

1. **Social Community Feeds & Public Likes within the Canvas:**
   * *Why omitted:* Professional studio work is proprietary, under NDA, and demands deep flow. Public upvote buttons, follower feeds, and Discord-style activity bars clutter the screen and pull artists out of deep creative focus.
2. **Ad-Hoc 20-Slider Control Bloat (CLIP Skip, Denoising Strength, ETA, Latent Noise Multipliers):**
   * *Why omitted:* Raw parameter overload gives the illusion of control while actually degrading creative velocity. We abstracted engine fine-tuning into curated model profiles and exposed only the high-leverage controls: Prompt Delta, Seed, CFG Guidance, and Lens Framing.
3. **Cluttered Infinite Canvas with Freeform Sticky Notes:**
   * *Why omitted:* While freeform spatial whiteboards (like Miro) sound appealing, in generative practice they devolve into messy, unorganized pinboards. Structured DAG branching provides strict parent-child lineage while maintaining spatial clarity.

---

## 4. Competitive Analysis: Inspirations, Strengths & Opportunities

### 1. Krea.ai
* **What I liked:** Ultra-fast real-time canvas feedback and clean, modern typography.
* **What I improved:** Krea's real-time mode lacks non-destructive versioning. If you paint a stroke or change a word, the previous state evaporates. Fomi Pro preserves every state as a retrievable node.

### 2. Higgsfield.ai & Magnific.ai
* **What I liked:** Exceptional motion framing and high-resolution upscaling fidelity.
* **What I improved:** Higgsfield isolates video from static generation. Fomi Pro treats video and imagery as interchangeable leaf nodes on the same timeline (e.g., Shot 4 is an image, forked into Shot 5 as a Wan 2.1 cinematic camera pan).

### 3. Git & Linear
* **What I liked:** Immutable commits, pull-request diffing, and keyboard command ergonomics.
* **What I improved:** Translated code version control concepts into visual generative art: visual branch graphs, before/after wipe diffs, and prompt commit messages ("Delta from parent").

---

## 5. What I’d Do with Another Month

1. **Latent Vector Interpolation & Slider Blending:** Allow users to drag a slider between any two sibling nodes to generate an in-between hybrid (50% Node 3A mist + 50% Node 3B action stance).
2. **Multi-User Real-Time Co-Branching (Figma-Style Multiplayer):** Enable an art director in London and a concept artist in Los Angeles to navigate the same DAG tree simultaneously, starring hero shots and leaving timestamped spatial pins.
3. **Automated Storyboard & Shotlist Export:** Generate high-resolution director pitch decks, contact sheets, and XML timeline files directly exportable to Premiere Pro and Final Cut.
4. **LoRA & Subject Weighting Training Dock:** Upload 10 reference photos of a bespoke film prop or actor directly to the Project Memory drawer to fine-tune a project-exclusive adapter on the fly.

---

## 6. The Single Differentiating Workflow

### **The Non-Destructive Branching Creative Timeline with Project Memory DNA**

The core breakthrough of this workspace is that **an idea is never lost and context is never re-typed**:

1. **Non-Destructive Lineage (DAG):** When exploring art directions, every generation records its ancestor node, prompt delta, seed, and settings. Artists can freely explore extreme stylistic branches without fear of losing their baseline.
2. **Interactive Swipe Curtain Diffing (`C`):** Comparing two outputs is not a guesswork toggle. A split wipe curtain allows the artist to drag across the image and evaluate pixel-level changes in lighting, anatomy, and grain.
3. **Persistent Project Memory DNA (`M`):** Returning to a project after days or weeks, the studio retains the project's character anchors, cohesive color palette tokens, and cinematographic style specifications. With one click, the system suggests the next shot in narrative continuity.

---

## 7. Design Trade-Offs

| Area | What We Prioritized | What We Simplified | What We Removed |
| :--- | :--- | :--- | :--- |
| **Workspace Layout** | Full-bleed hero canvas and clear visual hierarchy | Compact floating dock instead of multiple heavy tool sidebars | Redundant model advertisement banners and promotional badges |
| **History & Tree** | Directed Acyclic Graph (DAG) with explicit parent-child lineage | Grouped branch columns rather than a chaotic 360° node-wire spiderweb | Ephemeral infinite linear vertical scrolling |
| **Controls & Inputs** | Keyboard command palette (`⌘K`) and rapid shortcuts (`1`, `2`, `3`, `F`, `C`, `S`, `/`) | Minimalist prompt dock that expands only when requested | Complex technical matrixes of obscure diffusion samplers |
| **Inspection** | Interactive side-by-side wipe diff with parameter delta comparison | Single-click hero starring (`S`) | Destructive "Replace" operations that overwrite history |
| **Continuity** | Persistent Character & Style Memory DNA | Quick token injection pills (`+ Akira Anchor`, `+ Palette Glow`) | Manual copying and pasting of recurring character prompts |

---

*Authored for the Fomi Atelier Technical Assessment submission.*
