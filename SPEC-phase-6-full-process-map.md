# Phase 6 Component Specification: Full Process Map (`FullProcessMap`)

> **Parent PRD:** [`PRD-connected-process.md`](./PRD-connected-process.md) — Section 3.8 & Phase 6  
> **Target Route:** `/connected-process#peta-lengkap`  
> **Component Directory:** `src/app/components/connected-process/sections/full-process-map/`  
> **Asset Directory:** `public/images/connected-process/full-process-map/` (30 static SVGs serving 31 nodes)  
> **Status:** Specification Ready for Implementation

---

## 1. Objective & Architectural Context

The **Full Process Map** (`FullProcessMap`) component implements **Milestone 5 (`PETA LENGKAP` / `#peta-lengkap`)**—the culminating architectural showcase section on the `/connected-process` page. It presents a comprehensive, razor-sharp enterprise ERP process blueprint showing how **Purchasing & Accounts Payable (Blue)**, **Manufacturing & Costing (Teal)**, and **Sales & Accounts Receivable (Red)** converge into the **General Ledger, Trial Balance, and Financial Statement Outputs (Teal)**.

### 1.1 Naming & Codebase Alignment
To stay 100% consistent with Phases 3–5 (`SatuData`, `TransactionFlow`, `AccountingImpact`, `RoleReports`) and [`AGENTS.md`](./AGENTS.md):
- **Class Name:** `FullProcessMap` *(drops the provisional `Section` suffix from the high-level PRD, matching `SatuData`, `TransactionFlow`, `AccountingImpact`, and `RoleReports`)*
- **Selector:** `app-full-process-map`
- **Files:**
  - `src/app/components/connected-process/sections/full-process-map/full-process-map.ts`
  - `src/app/components/connected-process/sections/full-process-map/full-process-map.html`
  - `src/app/components/connected-process/sections/full-process-map/full-process-map.spec.ts`
- **Angular v22 Conventions (`AGENTS.md`):**
  - Standalone by default (**must NOT** specify `standalone: true`).
  - `OnPush` change detection by default (**must NOT** specify `changeDetection: ChangeDetectionStrategy.OnPush`).
  - Signal-based local UI state (`signal()`) for mouse drag-to-pan on narrow viewports; no `@HostBinding` or `@HostListener`; no `ngClass` or `ngStyle`; `NgOptimizedImage` for all 31 static SVG node icons.

### 1.2 Page Mounting Order (`connected-process.html`)
Mount `<app-full-process-map />` as the 5th and final milestone section immediately **after `<app-role-reports />` and before `<app-subfooter />`**, completing the 5-tab vertical scroll sequence of `ProcessTabs` (`SATU DATA` → `ALUR TRANSAKSI` → `DAMPAK AKUNTANSI` → `LAPORAN` → `PETA LENGKAP`):

```html
<main
  id="main-content"
  class="min-h-screen bg-[#F8FAFC] flex flex-col w-full selection:bg-[#365AD2] selection:text-white"
>
  <app-hero />
  <app-process-tabs />
  <app-satu-data />
  <app-transaction-flow />
  <app-accounting-impact />
  <app-role-reports />
  <app-full-process-map />
  <app-subfooter />
</main>
```

---

## 2. Visual Anatomy & Layout Blueprint

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ProcessSectionShell (sectionId="peta-lengkap", rounded-3xl white outer card)                            │
│                                                                                                          │
│                                   Lihat Hubungan Proses                                                  │
│                                       Lebih Lengkap                                                      │
│                 ───────────────────────────────────────────────────────── (#365AD2, h-0.5)               │
│          Diagram ini merangkum alur pembelian, produksi, penjualan, General Ledger, dan keluaran         │
│                             laporan sebagai referensi kemampuan produk.                                  │
│                                                                                                          │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  Stage (Diagonal Sage-Teal Gradient: 135deg, #C9DEDE -> #A3D0D0 -> #DBE8E8)                              │
│  [Mobile/Tablet < xl only]: ↔ Gulir horizontal untuk melihat peta lengkap                                │
│                                                                                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  Inner Diagram Canvas (1120 × 728 px, rounded-2xl, radial ice-blue #CFE0F9 -> #EAF2FD)             │  │
│  │                                                                                                    │  │
│  │  [Purchase Req.]     [Purchase Return] ──► [A/P Debit Note] ────────────► [A/P Statement]          │  │
│  │         │                    ▲                       ┌──────────────────►       ▲                  │  │
│  │         ▼                    │                       ▼                          │                  │  │
│  │  [Purchase Quot.]    [Goods Receipt]   ──► [Supplier Invoice] ──► [Payment] ────┘                  │  │
│  │         │                    │                       │                │                            │  │
│  │         ▼                    │                       │   ┌────────────┘                            │  │
│  │  [Purchase Order] ───────────┘                       │   │                                         │  │
│  │                              │                       │   │                     ┌─► [COGS]          │  │
│  │  [BOM & Routing]             │         [General Journal] │                     │                   │  │
│  │                              │                  │    │   │                ┌────┼─► [Profit Loss]   │  │
│  │  [Planning]                  ▼                  ▼    ▼   ▼                │    │                   │  │
│  │                       [Manufacturing] ◄═► [General Ledger] ──► [Trial Balance] ──► [Balance Sheet] │  │
│  │  [Mfg. Order]                ▲                  ▲        ▲                │    │                   │  │
│  │                              │                  │        │                └────┼─► [Cash Flow]     │  │
│  │  [Mfg. Process]              │            [Adjustment]   │                     │                   │  │
│  │                              │                           │                     └─────────┐         │  │
│  │  [Std. Costing]              │                           │     ┌───────────────────────┐ │         │  │
│  │                              │                           │     │                       │ │         │  │
│  │  [Sales Order]    ──► [Packing List & DO] ──► [Customer Invoice] ──────────────► [Receive]         │  │
│  │                                │                                 ╲                                 │  │
│  │                                ▼                                  ╲───────────►                    │  │
│  │  [Sales Quotation]──► [Return]            ──► [A/R Credit Note]  ─────────────► [A/R Statement]    │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Design Tokens & Element Specifications

### 3.1 `ProcessSectionShell` Configuration
Wrap the component template in `<app-process-section-shell>` using these exact bindings:

| Input | Value | Rationale |
| :--- | :--- | :--- |
| `sectionId` | `"peta-lengkap"` | Anchors to `ProcessTabs` tab ID `peta-lengkap` and sets `aria-labelledby="peta-lengkap-heading"`. |
| `[title]` | `'CONNECTED_PROCESS.FULL_PROCESS_MAP.TITLE' \| translate` | Renders the 2-line `Inter Variable` SemiBold (`600`) `46px` (`lg:text-[46px]`) `#23244E` heading via `whitespace-pre-line`. |
| `[description]` | `'CONNECTED_PROCESS.FULL_PROCESS_MAP.DESCRIPTION' \| translate` | Renders the 2-line `DM Sans Variable` Regular (`400`) `14px` `#23244E` description beneath the `#365AD2` divider bar. |
| `titleMaxWidthClass` | `"max-w-xl sm:max-w-2xl lg:max-w-[660px]"` | Preserves the intentional 2-line lockup (`"Lihat Hubungan Proses\nLebih Lengkap"`) cleanly across locales. |
| `descriptionMaxWidthClass` | `"max-w-xl sm:max-w-2xl lg:max-w-[740px]"` | Wraps the Indonesian subtitle onto 2 balanced lines breaking naturally after `"sebagai"`, inset slightly inside the `max-w-214` (`856px`) blue divider line per Figma. |
| `stageBgClass` | `"bg-[linear-gradient(135deg,#C9DEDE_0%,#A3D0D0_48%,#DBE8E8_100%)]"` | **Design Refinement:** Upgrades the flat `bg-[#DDEAE6]` PRD placeholder to the exact multi-stop sage-teal diagonal gradient sampled from the Figma stage (`#C9DEDE` top-left → `#A3D0D0` upper-right/lower-left → `#DBE8E8` bottom-right). |

---

### 3.2 Responsive Viewport & Inner Diagram Canvas (`1120 × 728` Coordinate System)

At desktop `xl:` (`≥ 1280px`), `ProcessSectionShell` yields `1216px` card width minus `80px` (`xl:p-10`) horizontal stage padding = **`1136px`** available stage width. Defining the architectural canvas at an exact **`1120px × 728px` (`w-280 h-182`)** logical box ensures:
1. **Zero horizontal overflow at `xl:` (`1280px+`):** The entire 31-node map displays natively in full view (`mx-auto`) without a scrollbar.
2. **Zero subpixel drift between HTML cards and SVG connectors:** Both the HTML node container (`relative w-280 h-182`) and the unified SVG connector layer (`<svg viewBox="0 0 1120 728">`) share the exact same `1120 × 728` 1:1 coordinate space across all viewports.
3. **Smooth pan/scroll below `xl:` (`< 1280px`):** On laptops, tablets, and mobile screens, an outer `overflow-x-auto` viewport provides native touch momentum scrolling, keyboard horizontal arrow scrolling (`tabindex="0"` + `role="region"`), mouse drag-to-pan, and a localized scroll hint badge (`xl:hidden`).

- **Mobile/Tablet Scroll Hint Pill (`data-testid="fpm-scroll-hint"`, visible `< xl`):**
  ```html
  <div
    data-testid="fpm-scroll-hint"
    class="xl:hidden flex items-center justify-center mb-3 select-none"
  >
    <span
      class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-xs border border-white/80 shadow-[0_2px_10px_rgba(35,36,78,0.06)] font-dm-sans font-medium text-xs text-[#23244E]"
      style="font-family: var(--font-dm-sans, 'DM Sans Variable', sans-serif);"
    >
      <svg
        viewBox="0 0 20 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-2.5 text-[#139496] shrink-0"
        aria-hidden="true"
      >
        <path
          d="M4.5 2L1 6L4.5 10M15.5 2L19 6L15.5 10M1 6H19"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      {{ scrollHintKey | translate }}
    </span>
  </div>
  ```

- **Scrollable Region Viewport (`data-testid="fpm-scroll-viewport"`):**
  - Attributes: `role="region"`, `[attr.aria-label]="ariaRegionLabelKey | translate"`, `tabindex="0"` *(required by AXE `scrollable-region-focusable` rule)*.
  - Classes:
    ```text
    w-full overflow-x-auto overscroll-x-contain pb-2 xl:pb-0 xl:overflow-x-visible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365AD2] focus-visible:ring-offset-2 rounded-2xl
    ```
  - Dynamic cursor bindings when below `xl:`:
    - `[class.cursor-grab]="!isDragging()"`
    - `[class.cursor-grabbing]="isDragging()"`
    - `[class.select-none]="isDragging()"`
    - `xl:cursor-default`

- **Inner Diagram Canvas Card (`data-testid="fpm-canvas"`):**
  - Dimensions: `relative w-280 h-182 mx-auto shrink-0 rounded-2xl border border-white/80 shadow-[0_6px_28px_rgba(35,36,78,0.07)] overflow-hidden`
  - Background: Subtle radial ice-blue/periwinkle gradient sampled directly from Figma (`#CFE0F9` center → `#DCE8FB` mid → `#EAF2FD` outer corners):
    ```text
    bg-[radial-gradient(56%_60%_at_50%_54%,#CFE0F9_0%,#DCE8FB_56%,#EAF2FD_100%)]
    ```

---

### 3.3 Node Card Anatomy (`184px × 44px` Uniform 3-Layer Badge Card)

Every single one of the **31 process nodes** has identical outer card dimensions (`184px × 44px` / `w-46 h-11`) and uses a signature **3-layer badge-and-pill construction** observed at 4× magnification in Figma:

```text
    (-4px, +4px) Offset Back Shadow Tile (48 × 44 px)
   ┌ ─ ─ ─ ─ ─
   │  ┌───────────┬───────────────────────────────────┐
   │  │           │                                   │
   │  │   [SVG]   │  Purchase                         │  44px (h-11)
   │  │   Icon    │  Requisition                      │
    ─ ┼───────────┘                                   │
      └───────────────────────────────────────────────┘
       ◄── 48px ─► ◄───────────── 136px ─────────────►
       ◄─────────────────── 184px (w-46) ────────────►
```

1. **Layer 1 — Offset Back Shadow Tile (Behind Left Icon Badge):**
   - Positioned at `-left-1 top-1 w-12 h-11` (`-4px` left, `+4px` down, `48px × 44px`).
   - Corner radii: `rounded-tl-[7px] rounded-bl-[7px] rounded-br-[12px] rounded-tr-none`.
   - `aria-hidden="true"`, solid stream shadow color (`z-0`).
2. **Layer 2 — Main White Label Card Frame:**
   - Spans the full `184px × 44px` (`relative z-10 w-full h-full bg-white rounded-[6px] border flex items-stretch`).
   - `1px` solid border colored by stream (`border-[#1C73F0]`, `border-[#139496]`, or `border-[#E4212F]`).
3. **Layer 3 — Front Gradient Icon Badge (Inside Left End of Card):**
   - Dimensions: `w-12 shrink-0 flex items-center justify-center select-none -my-px -ml-px` (`48px` wide, flush with top/left/bottom outer edge of the `1px` card border).
   - Corner radii:
     - Top-Left: `rounded-tl-[7px]`
     - Top-Right: `rounded-tr-none` *(sharp 90° top-right corner flush with top border)*
     - Bottom-Left: `rounded-bl-[7px]`
     - Bottom-Right: `rounded-br-[12px]` *(signature curved fold sweeping into the white label area)*
   - Vertical linear gradient fill by stream theme (see Section 3.4).
   - `aria-hidden="true"`.
   - Icon `<img>` (via `NgOptimizedImage`):
     - `class="w-full h-full p-1 object-contain select-none pointer-events-none"` (scales SVG icons to comfortably fill ~80%–85% of the `48px × 44px` badge with 4px padding inset per Figma, eliminating HiDPI srcset halving).
4. **Right Label Compartment (`<span>`):**
   - Classes:
     ```text
     flex-1 min-w-0 pl-2.5 pr-2 py-1 flex items-center font-dm-sans font-bold text-[11px] leading-[1.18] tracking-[-0.01em] text-[#23244E] text-left whitespace-pre-line
     ```
   - Inline font guarantee matching existing sections:
     `style="font-family: var(--font-dm-sans, 'DM Sans Variable', sans-serif); font-weight: 700;"`

---

### 3.4 Stream Color Palette Tokens (Sampled from Figma & Exported SVGs)

Note that the `manufacturing` and `general-ledger` logical streams share the **Teal** visual theme, while `purchasing` uses **Blue** and `sales` uses **Red**:

| Visual Theme | Applied Streams | Front Badge Vertical Gradient | Offset Shadow Tile | Card Border (`1px`) | SVG Connector & Arrowhead |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **`blue`** | `purchasing` (9 nodes) | `linear-gradient(180deg, #1C37E1 0%, #386FDB 68%, #588BE1 100%)` | `#004FC1` | `#1C73F0` | `#1C73F0` |
| **`teal`** | `manufacturing` (6 nodes) & `general-ledger` (8 nodes) | `linear-gradient(180deg, #0D9596 0%, #0EA7A9 65%, #10BABC 100%)` | `#0C7F80` | `#139496` | `#139496` |
| **`red`** | `sales` (8 nodes) | `linear-gradient(180deg, #A5131A 0%, #C61A25 65%, #E4212F 100%)` | `#C31924` | `#E4212F` | `#E4212F` |

---

## 4. Complete Asset Inventory & 31-Node Coordinate Table (`1120 × 728` Canvas)

All **30 static SVG files** in `public/images/connected-process/full-process-map/` map to the **31 diagram nodes** below (`customer-invoice-balance-sheet.svg` is intentionally shared by Node #22 `Balance Sheet` and Node #28 `Customer Invoice`; its paths are pure `fill="white"`, so it renders seamlessly on both Teal and Red badges).

Every node has width **`184`** (`w-46`) and height **`44`** (`h-11`). Coordinates `(x, y)` denote the top-left corner of the main `184 × 44` card (its offset shadow extends `4px` left to `x - 4` and `4px` down to `y + 48`).

### 4.1 Stream 1: Purchasing & AP (`streamId: 'purchasing'`, Theme: `'blue'`, 9 Nodes)

| # | Node ID | Default Label (`id` / `en`) | SVG File (`public/images/connected-process/full-process-map/`) | Intrinsic `W × H` | `x` | `y` |
| :-: | :--- | :--- | :--- | :---: | :-: | :-: |
| 1 | `purchase-requisition` | `Purchase\nRequisition` | `purchase-requisition.svg` | `29 × 35` | `32` | `28` |
| 2 | `purchase-quotation` | `Purchase\nQuotation` | `purchase-quotation.svg` | `29 × 35` | `32` | `93` |
| 3 | `purchase-order` | `Purchase\nOrder` | `purchase-order.svg` | `34 × 28` | `32` | `158` |
| 4 | `purchase-return` | `Purchase Return` | `purchase-return.svg` | `35 × 35` | `294` | `58` |
| 5 | `ap-debit-note` | `A/P Debit Note` | `ap-debit.svg` | `31 × 34` | `534` | `58` |
| 6 | `ap-statement` | `A/P Statement` | `ap-statement.svg` | `26 × 33` | `832` | `58` |
| 7 | `goods-receipt` | `Goods Receipt` | `goods-receipt.svg` | `31 × 34` | `294` | `147` |
| 8 | `supplier-invoice` | `Supplier Invoice` | `supplier-invoice.svg` | `27 × 33` | `534` | `147` |
| 9 | `payment` | `Payment` | `payment.svg` | `36 × 31` | `774` | `147` |

### 4.2 Stream 2: Manufacturing & Costing (`streamId: 'manufacturing'`, Theme: `'teal'`, 6 Nodes)

> **Design Note:** In Figma, the 5 left-column sub-module cards (`#10`–`#14`) form a clean vertical capability stack directly to the left of the central `Manufacturing` hub (`#15`) with **no connector lines** attached to `#10`–`#14`.

| # | Node ID | Default Label (`id` / `en`) | SVG File (`public/images/connected-process/full-process-map/`) | Intrinsic `W × H` | `x` | `y` |
| :-: | :--- | :--- | :--- | :---: | :-: | :-: |
| 10 | `bill-of-material` | `Bill Of Material &\nRouting` | `bill-of-material.svg` | `35 × 33` | `32` | `234` |
| 11 | `planning` | `Planning` | `planning.svg` | `32 × 32` | `32` | `299` |
| 12 | `manufacturing-order` | `Manufacturing\nOrder` | `manufacturing-order.svg` | `46 × 39` | `32` | `364` |
| 13 | `manufacturing-process` | `Manufacturing\nProcess` | `manufacturing-process.svg` | `33 × 33` | `32` | `429` |
| 14 | `standard-costing` | `Standard Costing\n& Variance` | `standard-costing.svg` | `29 × 32` | `32` | `494` |
| 15 | `manufacturing` | `Manufacturing` | `manufacturing.svg` | `35 × 33` | `254` | `364` |

### 4.3 Stream 3: General Ledger & Financial Output (`streamId: 'general-ledger'`, Theme: `'teal'`, 8 Nodes)

| # | Node ID | Default Label (`id` / `en`) | SVG File (`public/images/connected-process/full-process-map/`) | Intrinsic `W × H` | `x` | `y` |
| :-: | :--- | :--- | :--- | :---: | :-: | :-: |
| 16 | `general-journal` | `General Journal` | `general-journal.svg` | `30 × 33` | `412` | `274` |
| 17 | `general-ledger` | `General Ledger` | `general-ledger.svg` | `26 × 33` | `470` | `364` |
| 18 | `adjustment` | `Adjustment` | `adjustment.svg` | `36 × 33` | `412` | `454` |
| 19 | `trial-balance` | `Trial Balance` | `trial-balance.svg` | `37 × 28` | `686` | `364` |
| 20 | `cogs` | `COGS` | `cogs.svg` | `32 × 36` | `904` | `248` |
| 21 | `profit-loss` | `Profit Loss` | `profit-loss.svg` | `27 × 33` | `904` | `310` |
| 22 | `balance-sheet` | `Balance Sheet` | `customer-invoice-balance-sheet.svg` | `29 × 33` | `904` | `372` |
| 23 | `cash-flow` | `Cash Flow` | `cash-flow.svg` | `37 × 33` | `904` | `434` |

### 4.4 Stream 4: Sales & AR (`streamId: 'sales'`, Theme: `'red'`, 8 Nodes)

> **Design Note:** Notice that in Figma, `Sales Order` (`#24`) sits on the **upper** Sales row (`y = 574`) feeding `Packing List & Delivery Order`, while `Sales Quotation` (`#28`) sits on the **lower** Sales row (`y = 656`) pointing right into `Return`.

| # | Node ID | Default Label (`id` / `en`) | SVG File (`public/images/connected-process/full-process-map/`) | Intrinsic `W × H` | `x` | `y` |
| :-: | :--- | :--- | :--- | :---: | :-: | :-: |
| 24 | `sales-order` | `Sales Order` | `sales-order.svg` | `34 × 32` | `32` | `574` |
| 25 | `packing-list` | `Packing List &\nDelivery Order` | `packing-list.svg` | `39 × 25` | `294` | `574` |
| 26 | `customer-invoice` | `Customer Invoice` | `customer-invoice-balance-sheet.svg` | `29 × 33` | `556` | `574` |
| 27 | `receive` | `Receive` | `receive.svg` | `39 × 28` | `818` | `574` |
| 28 | `sales-quotation` | `Sales Quotation` | `sales-quotation.svg` | `33 × 33` | `32` | `656` |
| 29 | `return` | `Return` | `return.svg` | `37 × 34` | `294` | `656` |
| 30 | `ar-credit-note` | `A/R Credit Note` | `ar-credit.svg` | `30 × 34` | `556` | `656` |
| 31 | `ar-statement` | `A/R Statement` | `ar-statement.svg` | `33 × 35` | `818` | `656` |

---

## 5. Unified SVG Connector Overlay Specification (`34` Connectors)

Render a single decorative `<svg viewBox="0 0 1120 728" fill="none" aria-hidden="true" class="absolute inset-0 w-full h-full pointer-events-none z-0">` behind the node lists.

### 5.1 SVG Arrowhead `<defs>` Markers
Using `orient="auto-start-reverse"` allows a single filled triangular marker per color theme to serve both `marker-end` (unidirectional `→`) and `marker-start` + `marker-end` (bidirectional `↔`):

```html
<defs>
  <marker
    id="fpm-arrow-blue"
    viewBox="0 0 10 10"
    refX="8.5"
    refY="5"
    markerWidth="6"
    markerHeight="6"
    orient="auto-start-reverse"
  >
    <path d="M 1 1.2 L 8.8 5 L 1 8.8 Z" fill="#1C73F0" />
  </marker>
  <marker
    id="fpm-arrow-teal"
    viewBox="0 0 10 10"
    refX="8.5"
    refY="5"
    markerWidth="6"
    markerHeight="6"
    orient="auto-start-reverse"
  >
    <path d="M 1 1.2 L 8.8 5 L 1 8.8 Z" fill="#139496" />
  </marker>
  <marker
    id="fpm-arrow-red"
    viewBox="0 0 10 10"
    refX="8.5"
    refY="5"
    markerWidth="6"
    markerHeight="6"
    orient="auto-start-reverse"
  >
    <path d="M 1 1.2 L 8.8 5 L 1 8.8 Z" fill="#E4212F" />
  </marker>
</defs>
```

- **Connector Stroke Styling:** `stroke-width="1.75"`, `stroke-linecap="round"`, `stroke-linejoin="round"`.
- **Corner Radius Rule:** All 90° orthogonal bends use `r = 5px` quadratic Bezier curves (`Q`), and incoming arrowheads maintain a crisp `4px` clearance from card/shadow borders (`node.x - 8` on `-4px` left badge shadow edges; `node.y - 4` on top edges; `node.y + 48` on bottom edges).

### 5.2 Complete Verified Path Table (`34` Paths)

| # | Connector ID | Theme | Source → Target (Topology) | Markers | Exact Verified SVG `d` Attribute (`viewBox="0 0 1120 728"`) |
| :-: | :--- | :---: | :--- | :---: | :--- |
| 1 | `pr-to-pq` | `blue` | `Purchase Requisition` ↓ `Purchase Quotation` | `end` | `M 142 72 L 142 89` |
| 2 | `pq-to-po` | `blue` | `Purchase Quotation` ↓ `Purchase Order` | `end` | `M 142 137 L 142 154` |
| 3 | `po-to-gr` | `blue` | `Purchase Order` → `Goods Receipt` | `end` | `M 216 174 L 286 174` |
| 4 | `gr-to-pret` | `blue` | `Goods Receipt` ↑ `Purchase Return` | `end` | `M 398 147 L 398 106` |
| 5 | `pret-to-apdn` | `blue` | `Purchase Return` → `A/P Debit Note` | `end` | `M 478 80 L 526 80` |
| 6 | `apdn-to-aps` | `blue` | `A/P Debit Note` → `A/P Statement` (upper) | `end` | `M 718 76 L 824 76` |
| 7 | `gr-to-si` | `blue` | `Goods Receipt` → `Supplier Invoice` | `end` | `M 478 169 L 526 169` |
| 8 | `si-bi-aps` | `blue` | `Supplier Invoice` ↔ `A/P Statement` (stepped) | `both` | `M 594 143 L 594 127 Q 594 122 599 122 L 769 122 Q 774 122 774 117 L 774 95 Q 774 90 779 90 L 824 90` |
| 9 | `si-to-pay` | `blue` | `Supplier Invoice` → `Payment` | `end` | `M 718 169 L 766 169` |
| 10 | `pay-to-aps` | `blue` | `Payment` (right) ↱ `A/P Statement` (bottom) | `end` | `M 958 169 L 969 169 Q 974 169 974 164 L 974 106` |
| 11 | `gr-to-mfg` | `teal` | `Goods Receipt` ↓ `Manufacturing` | `end` | `M 362 191 L 362 360` |
| 12 | `pl-to-mfg` | `teal` | `Packing List & DO` ↑ `Manufacturing` | `end` | `M 362 574 L 362 412` |
| 13 | `mfg-bi-gl-top` | `teal` | `Manufacturing` ↔ `General Ledger` (upper) | `both` | `M 443 380 L 461 380` |
| 14 | `mfg-bi-gl-bot` | `teal` | `Manufacturing` ↔ `General Ledger` (lower) | `both` | `M 443 394 L 461 394` |
| 15 | `gj-to-gl` | `teal` | `General Journal` ↓ `General Ledger` | `end` | `M 526 318 L 526 360` |
| 16 | `adj-to-gl` | `teal` | `Adjustment` ↑ `General Ledger` | `end` | `M 526 454 L 526 412` |
| 17 | `si-to-gl` | `teal` | `Supplier Invoice` ↓ `General Ledger` | `end` | `M 622 191 L 622 360` |
| 18 | `pay-to-gl` | `teal` | `Payment` ↴ `General Ledger` (Z-stepped) | `end` | `M 886 191 L 886 217 Q 886 222 881 222 L 645 222 Q 640 222 640 227 L 640 360` |
| 19 | `ci-to-gl` | `teal` | `Customer Invoice` ↑ `General Ledger` | `end` | `M 632 574 L 632 412` |
| 20 | `gl-to-tb` | `teal` | `General Ledger` → `Trial Balance` | `end` | `M 654 386 L 678 386` |
| 21 | `tb-to-cogs` | `teal` | `Trial Balance` (`x=816`) ↱ `COGS` | `end` | `M 816 364 L 816 275 Q 816 270 821 270 L 896 270` |
| 22 | `tb-to-pl` | `teal` | `Trial Balance` (`x=844`) ↱ `Profit Loss` | `end` | `M 844 364 L 844 337 Q 844 332 849 332 L 896 332` |
| 23 | `tb-to-bs` | `teal` | `Trial Balance` → `Balance Sheet` | `end` | `M 870 394 L 896 394` |
| 24 | `tb-to-cf` | `teal` | `Trial Balance` (`x=844`) ↳ `Cash Flow` | `end` | `M 844 408 L 844 451 Q 844 456 849 456 L 896 456` |
| 25 | `rec-to-tb` | `teal` | `Receive` ↰ `Trial Balance` bottom (`x=816`) | `none` | `M 918 574 L 918 521 Q 918 516 913 516 L 821 516 Q 816 516 816 511 L 816 408` |
| 26 | `so-to-pl` | `red` | `Sales Order` → `Packing List & DO` | `end` | `M 216 596 L 286 596` |
| 27 | `sq-to-ret` | `red` | `Sales Quotation` → `Return` | `end` | `M 216 678 L 286 678` |
| 28 | `pl-to-ret` | `red` | `Packing List & DO` ↓ `Return` | `end` | `M 402 618 L 402 652` |
| 29 | `pl-to-ci` | `red` | `Packing List & DO` → `Customer Invoice` | `end` | `M 478 596 L 548 596` |
| 30 | `ret-to-arcn` | `red` | `Return` → `A/R Credit Note` | `end` | `M 478 678 L 548 678` |
| 31 | `ci-to-rec` | `red` | `Customer Invoice` → `Receive` | `end` | `M 740 596 L 810 596` |
| 32 | `ci-bridge-rec` | `red` | `Customer Invoice` ⊓ `Receive` (top bridge) | `none` | `M 656 574 L 656 555 Q 656 550 661 550 L 895 550 Q 900 550 900 555 L 900 574` |
| 33 | `ci-to-ars` | `red` | `Customer Invoice` ↘ `A/R Statement` (upper) | `end` | `M 740 604 L 793 667 Q 796 670 800 670 L 810 670` |
| 34 | `arcn-to-ars` | `red` | `A/R Credit Note` → `A/R Statement` (lower) | `end` | `M 740 682 L 810 682` |

---

## 6. Component TypeScript API & Data Model (`full-process-map.ts`)

```typescript
import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';

export type ProcessStreamId = 'purchasing' | 'manufacturing' | 'general-ledger' | 'sales';
export type ProcessTheme = 'blue' | 'teal' | 'red';
export type ConnectorMarkerMode = 'end' | 'both' | 'none';

export interface ProcessMapNode {
  readonly id: string;
  readonly streamId: ProcessStreamId;
  readonly theme: ProcessTheme;
  readonly labelKey: string;
  readonly iconSrc: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
  readonly x: number;
  readonly y: number;
}

export interface ProcessMapStreamGroup {
  readonly id: ProcessStreamId;
  readonly titleKey: string;
  readonly nodes: readonly ProcessMapNode[];
}

export interface ProcessMapConnector {
  readonly id: string;
  readonly theme: ProcessTheme;
  readonly d: string;
  readonly markers: ConnectorMarkerMode;
}

export interface ThemeVisualTokens {
  readonly badgeGradient: string;
  readonly shadowBgClass: string;
  readonly borderClass: string;
  readonly strokeHex: string;
  readonly markerUrl: string;
}
```

### 6.1 Pointer Drag-to-Pan Behavior (Mouse-Only Gated)
To give desktop/laptop windows narrower than `1280px` smooth click-and-drag panning without interfering with native iOS/Android touch momentum scrolling:
- `readonly scrollViewport = viewChild<ElementRef<HTMLElement>>('scrollViewport');`
- `readonly isDragging = signal(false);`
- Private tracking fields: `private dragStartX = 0;` and `private dragStartScrollLeft = 0;`
- `onPointerDown(event: PointerEvent): void`:
  - Only engage if `event.pointerType === 'mouse' && event.button === 0`.
  - Check `const el = this.scrollViewport()?.nativeElement; if (!el || el.scrollWidth <= el.clientWidth) return;`
  - Record `this.isDragging.set(true)`, `this.dragStartX = event.clientX`, `this.dragStartScrollLeft = el.scrollLeft`, and call `el.setPointerCapture?.(event.pointerId)`.
- `onPointerMove(event: PointerEvent): void`:
  - If `!this.isDragging()`, return.
  - Set `el.scrollLeft = this.dragStartScrollLeft - (event.clientX - this.dragStartX)`.
- `onPointerUp(event: PointerEvent): void`:
  - If `!this.isDragging()`, return.
  - Set `this.isDragging.set(false)` and call `el.releasePointerCapture?.(event.pointerId)`.

---

## 7. Internationalization (`public/i18n/*.json`) Specification

### 7.1 Existing Keys Already Present in All 5 Locale Files
`public/i18n/{id,en,ja,ko,zh}.json` already contain `CONNECTED_PROCESS.FULL_PROCESS_MAP`:
- `TITLE`
- `DESCRIPTION`
- `HINT_SCROLL`
- `STREAMS.{PURCHASING, MANUFACTURING, SALES, GENERAL_LEDGER}`

### 7.2 Required Dictionary Additions & Updates Across All 5 Locale Files (`id`, `en`, `ja`, `ko`, `zh`)

1. **2-Line `TITLE` Lockup Update (`id.json` & `en.json`):**
   - `id.json`: `"TITLE": "Lihat Hubungan Proses\nLebih Lengkap"` *(adds `\n` to match the 2-line Figma heading lockup via `ProcessSectionShell`'s `whitespace-pre-line`, consistent with `SATU_DATA`, `TRANSACTION_FLOW`, `ACCOUNTING_IMPACT`, and `ROLE_REPORTS`)*
   - `en.json`: `"TITLE": "See the Complete\nProcess Architecture"`

2. **Add `ARIA_REGION_LABEL` under `CONNECTED_PROCESS.FULL_PROCESS_MAP`:**
   - `id.json`: `"ARIA_REGION_LABEL": "Diagram arsitektur hubungan proses lengkap SOFICloud"`
   - `en.json`: `"ARIA_REGION_LABEL": "SOFICloud complete connected process architecture diagram"`
   - `ja.json`: `"ARIA_REGION_LABEL": "SOFICloud 全体業務プロセス連携アーキテクチャ図"`
   - `ko.json`: `"ARIA_REGION_LABEL": "SOFICloud 전체 프로세스 연계 아키텍처 다이어그램"`
   - `zh.json`: `"ARIA_REGION_LABEL": "SOFICloud 完整业务流程关联架构图"`

3. **Add `NODES` Dictionary (31 Keys) under `CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES`:**
   - In `id.json` and `en.json`, use the exact canonical SOFICloud ERP module names from Figma (preserving `\n` on the 8 two-line labels):
     ```json
     "NODES": {
       "PURCHASE_REQUISITION": "Purchase\nRequisition",
       "PURCHASE_QUOTATION": "Purchase\nQuotation",
       "PURCHASE_ORDER": "Purchase\nOrder",
       "PURCHASE_RETURN": "Purchase Return",
       "AP_DEBIT_NOTE": "A/P Debit Note",
       "AP_STATEMENT": "A/P Statement",
       "GOODS_RECEIPT": "Goods Receipt",
       "SUPPLIER_INVOICE": "Supplier Invoice",
       "PAYMENT": "Payment",
       "BILL_OF_MATERIAL": "Bill Of Material &\nRouting",
       "PLANNING": "Planning",
       "MANUFACTURING_ORDER": "Manufacturing\nOrder",
       "MANUFACTURING_PROCESS": "Manufacturing\nProcess",
       "STANDARD_COSTING": "Standard Costing\n& Variance",
       "MANUFACTURING": "Manufacturing",
       "GENERAL_JOURNAL": "General Journal",
       "GENERAL_LEDGER": "General Ledger",
       "ADJUSTMENT": "Adjustment",
       "TRIAL_BALANCE": "Trial Balance",
       "COGS": "COGS",
       "PROFIT_LOSS": "Profit Loss",
       "BALANCE_SHEET": "Balance Sheet",
       "CASH_FLOW": "Cash Flow",
       "SALES_ORDER": "Sales Order",
       "PACKING_LIST": "Packing List &\nDelivery Order",
       "CUSTOMER_INVOICE": "Customer Invoice",
       "RECEIVE": "Receive",
       "SALES_QUOTATION": "Sales Quotation",
       "RETURN": "Return",
       "AR_CREDIT_NOTE": "A/R Credit Note",
       "AR_STATEMENT": "A/R Statement"
     }
     ```
   - In `ja.json`, `ko.json`, and `zh.json`, populate identical `NODES` keys with concise localized ERP module labels (≤ 2 short lines so every label fits cleanly inside the `136px × 44px` text compartment without overflow) to preserve 100% schema parity across all 5 locale files (Phase 7 Step 7.3).

---

## 8. Accessibility Requirements (WCAG 2.1 AA & AXE)

1. **Heading & Landmark Hierarchy (Zero Skipped Heading Levels):**
   - Outer landmark: `<section id="peta-lengkap" aria-labelledby="peta-lengkap-heading">` with `<h2 id="peta-lengkap-heading">` rendered by `ProcessSectionShell`.
   - Inside the diagram canvas, render 4 logical stream groups (`purchasing`, `manufacturing`, `general-ledger`, `sales`). Each group renders a screen-reader-only `<h3 [id]="'fpm-stream-' + stream.id" class="sr-only">{{ stream.titleKey | translate }}</h3>` paired with `<ul [attr.aria-labelledby]="'fpm-stream-' + stream.id" class="m-0 p-0 list-none">`.
   - Because `<ul class="m-0 p-0 list-none">` has `position: static` (default), its `<li class="absolute w-46 h-11 ...">` children position themselves directly relative to the `relative w-280 h-182` canvas while preserving 100% native `list` / `listitem` semantics in VoiceOver, NVDA, and JAWS.
2. **Keyboard-Accessible Scrollable Region (`scrollable-region-focusable`):**
   - The `overflow-x-auto` viewport wrapper MUST carry `role="region"`, `[attr.aria-label]="ariaRegionLabelKey | translate"`, `tabindex="0"`, and a visible `focus-visible:ring-2 focus-visible:ring-[#365AD2]` ring so keyboard users can focus the viewport and pan horizontally via `ArrowLeft` / `ArrowRight`.
3. **Decorative Vector & Icon Hygiene:**
   - The unified 34-path connector `<svg>`, the scroll-hint arrow `<svg>`, every node's offset back shadow `<div>`, and every node's front icon badge `<div>` MUST carry `aria-hidden="true"`.
   - Every `<img [ngSrc]="node.iconSrc">` MUST carry `alt=""` because the adjacent `<span>` provides the complete accessible node name.
4. **Color Contrast Verification (WCAG 2.1 AA):**
   - Node label text (`#23244E`) on `#FFFFFF` node card fill: **`14.7 : 1`** (Passes WCAG AAA).
   - Scroll hint text (`#23244E`) on `bg-white/85` pill over `#B6D7D7` stage: **`> 12.5 : 1`** (Passes WCAG AAA).
   - Header title & description (`#23244E`) on `#FFFFFF` shell header: **`14.7 : 1`** (Passes WCAG AAA).

---

## 9. Test Specification & `data-testid` Contract

### 9.1 Required `data-testid` Hooks
| `data-testid` | Element | Purpose in Unit Tests |
| :--- | :--- | :--- |
| `fpm-scroll-hint` | Mobile/tablet scroll hint wrapper | Verify localized scroll hint renders and carries `xl:hidden`. |
| `fpm-scroll-viewport` | `overflow-x-auto` focusable region | Verify `role="region"`, `tabindex="0"`, `aria-label`, and pointer drag-to-pan state transitions. |
| `fpm-canvas` | `1120 × 728` inner diagram canvas | Scope queries for SVG connector layer, 4 stream lists, and 31 node cards. |
| `fpm-connectors-svg` | Unified `<svg viewBox="0 0 1120 728">` | Verify `aria-hidden="true"`, 3 `<marker>` definitions, and **exactly 34** `<path>` connectors (`10` blue, `15` teal, `9` red). |
| `fpm-stream-<streamId>` | Each stream `<ul>` (`purchasing`, `manufacturing`, `general-ledger`, `sales`) | Verify semantic grouping and exact per-stream node counts (`9`, `6`, `8`, `8`). |
| `fpm-node-<nodeId>` | Each `<li>` node card (31 total) | Verify exact `[style.left.px]`, `[style.top.px]`, translated label text, and SVG `<img src>` mapping. |

### 9.2 Unit Tests Required (`full-process-map.spec.ts`)
Following [`accounting-impact.spec.ts`](./src/app/components/connected-process/sections/accounting-impact/accounting-impact.spec.ts) (`TestBed`, `provideTranslateService`, `provideCustomImageLoader()`):
1. **Component Creation & Shell Bindings:** Asserts `ProcessSectionShell` receives `sectionId="peta-lengkap"`, the sage-teal diagonal gradient `stageBgClass`, `titleMaxWidthClass`, `descriptionMaxWidthClass`, and translated 2-line `h2` title + description.
2. **4 Semantic Stream Groups & 31 Nodes:** Asserts 4 `h3.sr-only` headings + 4 `ul[aria-labelledby]` lists containing `9 + 6 + 8 + 8 = 31` `<li>` node cards, each rendering an `<img>` pointing to `/images/connected-process/full-process-map/*.svg` with `alt=""`.
3. **Shared SVG Asset Verification:** Asserts both `fpm-node-customer-invoice` (Red theme) and `fpm-node-balance-sheet` (Teal theme) reference `/images/connected-process/full-process-map/customer-invoice-balance-sheet.svg`.
4. **Unified SVG Connector Layer:** Asserts `[data-testid="fpm-connectors-svg"]` has `aria-hidden="true"`, `viewBox="0 0 1120 728"`, 3 `<marker>` defs (`fpm-arrow-blue`, `fpm-arrow-teal`, `fpm-arrow-red`), and **34** connector `<path>` elements (including bidirectional markers on `si-bi-aps`, `mfg-bi-gl-top`, and `mfg-bi-gl-bot`, and markerless bridges `rec-to-tb` and `ci-bridge-rec`).
5. **Accessible Scroll Viewport & Pointer Drag-to-Pan:** Asserts `[data-testid="fpm-scroll-viewport"]` has `role="region"`, `tabindex="0"`, non-empty `aria-label`, and updates `isDragging()` cleanly across mouse `pointerdown` → `pointermove` → `pointerup` while ignoring `pointerType: 'touch'`.
6. **Locale Switching (`id` → `en`):** Asserts switching `TranslateService` to `'en'` updates the shell title, description, scroll hint, region `aria-label`, and stream headings.

### 9.3 Page Integration Test Update (`connected-process.spec.ts`)
Update [`src/app/pages/connected-process/connected-process.spec.ts`](./src/app/pages/connected-process/connected-process.spec.ts):
- Assert `<app-full-process-map>` is rendered.
- Assert `<main>` children appear in exact milestone order:
  `['app-hero', 'app-process-tabs', 'app-satu-data', 'app-transaction-flow', 'app-accounting-impact', 'app-role-reports', 'app-full-process-map', 'app-subfooter']`.

---

## 10. Sequential Implementation Checklist (For Execution Session)

- [x] **Step 6.1 — Static SVG Assets (`public/images/connected-process/full-process-map/`):**
  - All 30 SVG icon assets are already placed and verified in `public/images/connected-process/full-process-map/`.
- [ ] **Step 6.2 — Update `public/i18n/{id,en,ja,ko,zh}.json`:**
  - Add `\n` line break to `CONNECTED_PROCESS.FULL_PROCESS_MAP.TITLE` in `id.json` & `en.json`, and add `ARIA_REGION_LABEL` + `NODES` (all 31 node keys) across all 5 locale files.
- [ ] **Step 6.3 — Implement `FullProcessMap` Component (`src/app/components/connected-process/sections/full-process-map/`):**
  - Create `full-process-map.ts` and `full-process-map.html` implementing the `1120 × 728` canvas, 3-layer badge node cards, 34-path SVG connector overlay, and accessible horizontal scroll/drag viewport.
- [ ] **Step 6.4 — Mount into `ConnectedProcess` Page:**
  - Import `FullProcessMap` in `src/app/pages/connected-process/connected-process.ts` and mount `<app-full-process-map />` between `<app-role-reports />` and `<app-subfooter />` in `connected-process.html`.
- [ ] **Step 6.5 — Unit & Integration Tests + Verification Gate 6:**
  - Create `full-process-map.spec.ts`, update `connected-process.spec.ts`, check off Phase 6 in `PRD-connected-process.md`, and verify `npm test` + `npm run build` pass with zero errors.
