# Phase 5 Component Specification: Accounting Impact (`AccountingImpact`)

> **Parent PRD:** [`PRD-connected-process.md`](./PRD-connected-process.md) — Section 3.6 & Phase 5  
> **Target Route:** `/connected-process#dampak-akuntansi`  
> **Component Directory:** `src/app/components/connected-process/sections/accounting-impact/`  
> **Asset Directory:** `public/images/connected-process/accounting-impact/`  
> **Status:** Specification Ready for Implementation

---

## 1. Objective & Architectural Context

The **Accounting Impact** (`AccountingImpact`) component implements **Milestone 3 (`DAMPAK AKUNTANSI` / `#dampak-akuntansi`)** on the `/connected-process` showcase page. Its purpose is to visually demonstrate to CFOs, Accounting Leaders, and Operations Directors how operational source documents automatically map through the Chart of Accounts (COA) posting cascade into formal financial statements—accompanied by an enterprise accounting policy disclaimer.

### 1.1 Naming & Codebase Alignment
To stay 100% consistent with Phases 3 and 4 (`SatuData`, `TransactionFlow`, `RoleReports`):
- **Class Name:** `AccountingImpact` *(drops the `Section` suffix used provisionally in the high-level PRD, matching `SatuData`, `TransactionFlow`, and `RoleReports`)*
- **Selector:** `app-accounting-impact`
- **Files:**
  - `src/app/components/connected-process/sections/accounting-impact/accounting-impact.ts`
  - `src/app/components/connected-process/sections/accounting-impact/accounting-impact.html`
  - `src/app/components/connected-process/sections/accounting-impact/accounting-impact.spec.ts`
- **Interactivity Scope:** Purely declarative, static architectural pipeline showcase (no local signal state, tabs, or dropdowns needed).

### 1.2 Page Mounting Order (`connected-process.html`)
> **Critical Placement Rule:** Phase 3 mounted `<app-role-reports />` (`#laporan`) early before Phases 4 and 5 existed. When mounting `<app-accounting-impact />`, it **must be inserted between `<app-transaction-flow />` and `<app-role-reports />`** so the vertical scroll sequence matches `ProcessTabs` (`SATU DATA` → `ALUR TRANSAKSI` → `DAMPAK AKUNTANSI` → `LAPORAN` → `PETA LENGKAP`):

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
  <app-subfooter />
</main>
```

---

## 2. Visual Anatomy & Layout Blueprint

```text
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  ProcessSectionShell (sectionId="dampak-akuntansi", rounded-3xl white outer card)        │
│                                                                                          │
│                             Operasional Berjalan                                         │
│                             Pembukuan Mengikuti                                          │
│               ───────────────────────────────────────────────── (#365AD2, h-0.5)         │
│            Dokumen yang sudah memenuhi tahap pencatatan menghasilkan dampak              │
│               akuntansi berdasarkan konfigurasi akun dan kebijakan perusahaan.           │
│                                                                                          │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│  Stage (Periwinkle Linear Gradient: 322.37deg, #EDF3FB -> rgba(178,204,245,0.91) ->      │
│         #C3D7F7)                                                                         │
│                                                                                          │
│  ┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────┐ │
│  │ Dokumen Sumber          │       │ Posting & Pemetaan COA  │       │ Hasil Keuangan  │ │
│  │ Termasuk General Journal│       │ Transaksi dapat...      │       │ Kinerja...      │ │
│  │ dan adjustment bila...  │       │                         │       │                 │ │
│  │ ┌────┬────────────────┐ │       │    ┌───────────────┐    │       │ ┌────┬────────┐ │ │
│  │ │ 🧾 │Customer Invoice│ │       │    │    Jurnal     │    │       │ │ 📊 │Laba... │ │ │
│  │ └────┴────────────────┘ │       │    └───────┬───────┘    │       │ └────┴────────┘ │ │
│  │ ┌────┬────────────────┐ │       │            ↓            │       │ ┌────┬────────┐ │ │
│  │ │ 📄 │Supplier Invoice│ │  ──►  │    ┌───────────────┐    │  ──►  │ │ 📑 │Neraca  │ │ │
│  │ └────┴────────────────┘ │       │    │ Trial Balance │    │       │ └────┴────────┘ │ │
│  │ ┌────┬────────────────┐ │       │    └───────┬───────┘    │       │ ┌────┬────────┐ │ │
│  │ │ 🏭 │Inventory & Mfg │ │       │            ↓            │       │ │ 🪙 │Arus Kas│ │ │
│  │ └────┴────────────────┘ │       │    ┌───────────────┐    │       │ └────┴────────┘ │ │
│  │ ┌────┬────────────────┐ │       │    │General Ledger │    │       │ ┌────┬────────┐ │ │
│  │ │ ✉️ │Receipt & Paymt │ │       │    └───────────────┘    │       │ │ 📋 │Subledg.│ │ │
│  │ └────┴────────────────┘ │       │                         │       │ └────┴────────┘ │ │
│  └─────────────────────────┘       └─────────────────────────┘       └─────────────────┘ │
│                                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │ Penting: Alur ini menggambarkan hubungan proses dan data. Jenis jurnal, titik       │ │
│  │ posting, pengakuan pendapatan/biaya, serta format laporan disesuaikan dengan...     │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Design Tokens & Element Specifications

### 3.1 `ProcessSectionShell` Configuration
Wrap the component template in `<app-process-section-shell>` using these exact bindings:

| Input | Value | Rationale |
| :--- | :--- | :--- |
| `sectionId` | `"dampak-akuntansi"` | Anchors to `ProcessTabs` tab ID `dampak-akuntansi` and sets `aria-labelledby="dampak-akuntansi-heading"`. |
| `[title]` | `'CONNECTED_PROCESS.ACCOUNTING_IMPACT.TITLE' \| translate` | Renders 2-line `Inter Variable` SemiBold (`600`) `46px` (`lg:text-[46px]`) `#23244E` heading via `whitespace-pre-line`. |
| `[description]` | `'CONNECTED_PROCESS.ACCOUNTING_IMPACT.DESCRIPTION' \| translate` | Renders 2-line `DM Sans Variable` Regular (`400`) `14px` `#23244E` description beneath the `#365AD2` divider bar. |
| `titleMaxWidthClass` | `"max-w-xl sm:max-w-2xl lg:max-w-[640px]"` | Prevents unintended early wrapping while preserving the intentional 2-line lockup across `id` and `en`. |
| `descriptionMaxWidthClass` | `"max-w-xl sm:max-w-2xl lg:max-w-[760px]"` | Wraps the Indonesian copy cleanly after `"konfigurasi"` so both lines sit slightly inset inside the `max-w-214` (`856px`) blue divider line, matching the reference design 1:1. |
| `stageBgClass` | `"bg-[linear-gradient(322.37deg,#EDF3FB_-7.13%,rgba(178,204,245,0.91)_36.2%,#C3D7F7_96.88%)]"` | **Design Refinement:** Replaces the flat `bg-[#EBF2FD]` placeholder in the initial PRD with the actual diagonal periwinkle linear gradient from the design reference (matching `SatuData`'s blue stage gradient: `#DFE9F9`/`#EDF3FB` bottom-right → `#BAD1F6` center → `#C3D7F7` top-left). |

---

### 3.2 Stage Inner Wrapper & Shared Width Alignment
In the reference design, the **bottom policy disclaimer banner** spans the **exact same left-to-right width** as the outer edges of Column 1 through Column 3 (`~1155px` inside a `1253px` card shell, with `~19px` vertical gap between the 3-column row and the disclaimer card).

- **Stage Content Wrapper:**
  ```html
  <div class="w-full max-w-290 mx-auto flex flex-col gap-4 sm:gap-5 py-2 sm:py-3 lg:py-4">
    <!-- 1. 3-Column Architectural Pipeline Grid -->
    <!-- 2. Bottom Policy Disclaimer Box -->
  </div>
  ```

---

### 3.3 3-Column Pipeline Grid & Horizontal/Responsive Directional Arrows

- **Grid Container (`data-testid="accounting-pipeline-grid"`):**
  - **Desktop (`lg:` and up):** 5-track CSS Grid so all 3 white cards maintain strictly equal width (`1fr`) and equal stretched height (`items-stretch`), separated by auto-sized arrow tracks:
    ```text
    grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-2.5 sm:gap-3 lg:gap-0
    ```
  - **Mobile / Tablet (`< lg`):** Stacks in a single vertical column (`Col 1` → `↓` → `Col 2` → `↓` → `Col 3`).
- **Inter-Column Directional Arrows (2 instances: Col 1 → Col 2, and Col 2 → Col 3):**
  - **Wrapper (`data-testid="pipeline-arrow"`):**
    ```text
    flex items-center justify-center py-1 sm:py-1.5 lg:py-0 lg:px-5 xl:px-7 select-none
    ```
  - **SVG Arrow Graphic:**
    - Dimensions: `w-8 h-4 sm:w-9.5 sm:h-4.5` (`38px × 18px` on desktop)
    - Color: `#1C73E8` (`text-[#1C73E8]`)
    - Responsive rotation: `rotate-90 lg:rotate-0` (points **right `→`** on desktop `lg:+` and **down `↓`** when columns stack vertically below `lg:`)
    - Accessibility: `aria-hidden="true"`
    - Path geometry (`viewBox="0 0 38 18"`):
      ```html
      <svg
        viewBox="0 0 38 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-4 sm:w-9.5 sm:h-4.5 text-[#1C73E8] rotate-90 lg:rotate-0 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M2 9H35M35 9L27.5 2M35 9L27.5 16"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      ```

---

### 3.4 White Column Card Frame & Header Baseline Synchronization
All 3 columns (`Dokumen Sumber`, `Posting & Pemetaan COA`, `Hasil Keuangan`) share the same outer card container and aligned header block so that the first item in every column (`Customer Invoice`, `Jurnal`, `Laba Rugi`) starts at the **exact same vertical Y coordinate** on desktop:

- **Column Card Container (`<article>`):**
  ```text
  bg-[#FDFDFD] rounded-[8px] p-4 sm:p-5 lg:px-5 lg:py-5 shadow-[0_4px_20px_rgba(35,36,78,0.06)] border border-white/70 flex flex-col justify-start
  ```
- **Column Header Wrapper:**
  ```text
  mb-3.5 sm:mb-4 lg:min-h-[58px] flex flex-col justify-start text-left
  ```
- **Column Title (`<h3>`):**
  - Font: `DM Sans Variable` (`font-dm-sans`), Bold (`700`), `#23244E`
  - Size: `text-lg sm:text-[19px] lg:text-[20px] leading-snug tracking-tight mb-1.5`
- **Column Subtitle (`<p>`):**
  - Font: `DM Sans Variable` (`font-dm-sans`), Regular (`400`), `#23244E` (`text-[#23244E]/90`)
  - Size: `text-[10px] sm:text-[10.5px] lg:text-[10.5px] leading-[1.38] tracking-normal`
  - Column 1 width modifier: apply `max-w-[215px]` on Column 1's subtitle so *"Termasuk General Journal dan adjustment bila diperlukan"* wraps onto 2 balanced lines matching the design reference; Columns 2 and 3 span full card inner width (`w-full`) and wrap naturally onto 2 lines.

---

### 3.5 Column 1 (`Dokumen Sumber`) & Column 3 (`Hasil Keuangan`) — Icon Pill Rows
Columns 1 and 3 each display an unordered list (`<ul>`) of **4 pill items** with a distinctive **double-bordered left icon compartment**:

- **List Container (`<ul>`):**
  ```text
  flex flex-col gap-2.25 w-full
  ```
- **Individual Pill Item (`<li>`):**
  - Outer Pill Frame:
    ```text
    bg-white rounded-[8px] border border-[#23244E] min-h-[35px] sm:min-h-[36px] flex items-stretch overflow-hidden
    ```
  - **Left Icon Compartment (Inset Blue Frame inside Left End of Pill):**
    - Visual inspection of the reference design shows a `44px`-wide white icon cell at the left end of each pill framed by an inner `#5B94E8` blue border (rounded on the left corners to nest cleanly inside the `#23244E` outer border, with a crisp `#5B94E8` vertical divider separating the icon from the label):
      ```text
      w-11 shrink-0 flex items-center justify-center bg-white border-[1.5px] border-[#5B94E8] rounded-l-[7px] select-none
      ```
    - Attribute: `aria-hidden="true"`
    - Icon `<img>` (via `NgOptimizedImage`):
      ```text
      w-5 h-5 sm:w-5.5 sm:h-5.5 object-contain select-none pointer-events-none
      ```
  - **Right Text Label (`<span>`):**
    - Font: `DM Sans Variable` (`font-dm-sans`), Regular (`400`), `#23244E`
    - Classes:
      ```text
      px-3 sm:px-3.5 py-1.5 flex items-center font-dm-sans font-normal text-xs sm:text-[13.5px] lg:text-[14px] text-[#23244E] leading-snug tracking-normal text-left
      ```

---

### 3.6 Column 2 (`Posting & Pemetaan COA`) — Vertical Accounting Cascade
Column 2 renders a centered vertical sequence (`<ol>`) of **3 bordered boxes** (`Jurnal` → `Trial Balance` → `General Ledger`) joined border-to-border by **2 vertical downward blue arrows (`↓`)**:

- **Ordered List Container (`<ol>`):**
  ```text
  flex flex-col items-center justify-start w-full
  ```
- **List Item (`<li>`):**
  ```text
  w-full flex flex-col items-center
  ```
- **Stage Box (`<div>`):**
  - Width & Height: Centered, narrower than the full column card (`~197px`–`210px` wide inside the `~326px` card; `42px` min-height), matching the reference design proportions:
    ```text
    w-full max-w-[200px] sm:max-w-[210px] min-h-[42px] px-4 py-2 bg-white rounded-[8px] border border-[#23244E] flex items-center justify-center text-center
    ```
  - Label (`<span>`):
    - Font: `DM Sans Variable` (`font-dm-sans`), Bold (`700`), `#23244E`
    - Size: `text-base sm:text-[17px] lg:text-[18px] leading-tight tracking-tight`
- **Flush Vertical Downward Connector Arrow (`@if (!$last)`):**
  - Height: `26px` (`h-6.5`) with **zero vertical margin** so the vertical shaft starts directly from the bottom `#23244E` border of the upper box and the arrowhead tip meets the top `#23244E` border of the lower box:
    ```html
    @if (!last) {
      <div
        data-testid="coa-vertical-arrow"
        class="h-6.5 flex items-center justify-center text-[#1C5BDD] select-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 18 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4.5 h-6.5"
        >
          <path
            d="M9 0V24.5M9 24.5L3.5 19M9 24.5L14.5 19"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    }
    ```

---

### 3.7 Bottom Policy Disclaimer Box
- **Container (`data-testid="accounting-disclaimer"`):**
  ```text
  w-full bg-[#FDFDFD] rounded-[8px] px-5 py-4 sm:px-6 sm:py-4.5 lg:px-7 lg:py-4.5 shadow-[0_4px_20px_rgba(35,36,78,0.04)] border border-white/70
  ```
- **Paragraph (`<p>`):**
  - Font: `DM Sans Variable` (`font-dm-sans`), Regular (`400`), `#23244E`
  - Size & Alignment: `text-xs sm:text-sm lg:text-[14.5px] text-[#23244E] leading-relaxed tracking-normal text-left`
  - Content structure:
    ```html
    <p
      data-testid="accounting-disclaimer-text"
      class="font-dm-sans font-normal text-xs sm:text-sm lg:text-[14.5px] text-[#23244E] leading-relaxed tracking-normal text-left"
      style="font-family: var(--font-dm-sans, 'DM Sans Variable', sans-serif);"
    >
      <strong class="font-bold">{{ disclaimerLabelKey | translate }}</strong>
      {{ ' ' + (disclaimerTextKey | translate) }}
    </p>
    ```

---

## 4. Static SVG Icon Assets Specification

Per `AGENTS.md` (*"Use `NgOptimizedImage` for all static images"*), all 8 pill icons must be stored as clean static `.svg` files under `public/images/connected-process/accounting-impact/` and rendered via `<img [ngSrc]="..." [width]="..." [height]="..." alt="" />`.

All 8 icons use the **SOFICloud Duotone Blue Gradient** visual language established in `public/images/connected-process/transaction-flow/`:
- **Primary Fill Gradient:** Vertical `linearGradient` from `#1E3AE1` (`0%`) → `#1D74D9` at `stop-opacity="0.55"` (`~58%`) → `#D8E3F7` (`100%`).
- **Secondary Accent / Badge Fill:** Solid `#619AEA`.

| # | Column | Item (ID / EN) | Target File Path (`public/images/connected-process/accounting-impact/`) | Intrinsic Size (`W × H`) | Visual Motif Description |
| :-: | :--- | :--- | :--- | :---: | :--- |
| 1 | Col 1 | `Customer Invoice` | `customer-invoice.svg` *(reuse exact vector from `../transaction-flow/invoice.svg`)* | `33 × 37` | Document sheet with 4 horizontal rounded bars + bottom-right circular `$` coin badge (`#619AEA`). |
| 2 | Col 1 | `Supplier Invoice` | `supplier-invoice.svg` | `32 × 36` | Document sheet with top-left folded corner ear (`#619AEA`) and 3 horizontal text bars (short top-right bar, 2 full-width bars). |
| 3 | Col 1 | `Inventory & Manufacturing` | `inventory-manufacturing.svg` | `36 × 32` | Industrial factory silhouette with tall left chimney stack, 3 sawtooth roof peaks on the right, and 3 small rectangular factory windows. |
| 4 | Col 1 | `Receipt & Payment` | `receipt-payment.svg` | `36 × 30` | Closed mail envelope with crisp flap lines + top-right overlapping circular `!` badge (`#619AEA`). |
| 5 | Col 3 | `Laba Rugi` / `Profit & Loss` | `profit-loss.svg` | `34 × 34` | 3 vertical bar-chart columns below an angled trend line with directional arrowhead (`#619AEA`). |
| 6 | Col 3 | `Neraca` / `Balance Sheet` | `balance-sheet.svg` | `33 × 37` | Document sheet with 4 horizontal rounded bars + bottom-right circular checkmark (`✓`) badge (`#619AEA`). |
| 7 | Col 3 | `Arus Kas` / `Cash Flow` | `cash-flow.svg` | `36 × 32` | Stack of 5 horizontal cylindrical coins on the left with a 6th coin leaning diagonally against the right side (`#619AEA`). |
| 8 | Col 3 | `Subledger AP / AR` | `subledger-apar.svg` | `33 × 37` | Document sheet with 4 horizontal rounded bars + bottom-right circular minus (`−`) subledger badge (`#619AEA`). |

---

## 5. Component TypeScript API & Data Model (`accounting-impact.ts`)

Follows all `AGENTS.md` Angular v22 rules:
- Standalone by default (**do not** set `standalone: true`).
- `OnPush` change detection by default (**do not** set `changeDetection: ChangeDetectionStrategy.OnPush`).
- Strict TypeScript interfaces with `readonly` fields and zero `any`.

```typescript
import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';

export interface AccountingPillItem {
  readonly id: string;
  readonly labelKey: string;
  readonly iconSrc: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
}

export interface AccountingPostingStep {
  readonly id: string;
  readonly labelKey: string;
}

@Component({
  selector: 'app-accounting-impact',
  imports: [ProcessSectionShell, TranslatePipe, NgOptimizedImage],
  templateUrl: './accounting-impact.html',
})
export class AccountingImpact {
  readonly col1TitleKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.TITLE';
  readonly col1SubtitleKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.SUBTITLE';

  readonly sourceDocuments: readonly AccountingPillItem[] = [
    {
      id: 'customer-invoice',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.ITEMS.0',
      iconSrc: '/images/connected-process/accounting-impact/customer-invoice.svg',
      iconWidth: 33,
      iconHeight: 37,
    },
    {
      id: 'supplier-invoice',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.ITEMS.1',
      iconSrc: '/images/connected-process/accounting-impact/supplier-invoice.svg',
      iconWidth: 32,
      iconHeight: 36,
    },
    {
      id: 'inventory-manufacturing',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.ITEMS.2',
      iconSrc: '/images/connected-process/accounting-impact/inventory-manufacturing.svg',
      iconWidth: 36,
      iconHeight: 32,
    },
    {
      id: 'receipt-payment',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.ITEMS.3',
      iconSrc: '/images/connected-process/accounting-impact/receipt-payment.svg',
      iconWidth: 36,
      iconHeight: 30,
    },
  ];

  readonly col2TitleKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_2.TITLE';
  readonly col2SubtitleKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_2.SUBTITLE';

  readonly postingSteps: readonly AccountingPostingStep[] = [
    {
      id: 'journal',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_2.ITEMS.0',
    },
    {
      id: 'trial-balance',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_2.ITEMS.1',
    },
    {
      id: 'general-ledger',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_2.ITEMS.2',
    },
  ];

  readonly col3TitleKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_3.TITLE';
  readonly col3SubtitleKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_3.SUBTITLE';

  readonly financialResults: readonly AccountingPillItem[] = [
    {
      id: 'profit-loss',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_3.ITEMS.0',
      iconSrc: '/images/connected-process/accounting-impact/profit-loss.svg',
      iconWidth: 34,
      iconHeight: 34,
    },
    {
      id: 'balance-sheet',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_3.ITEMS.1',
      iconSrc: '/images/connected-process/accounting-impact/balance-sheet.svg',
      iconWidth: 33,
      iconHeight: 37,
    },
    {
      id: 'cash-flow',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_3.ITEMS.2',
      iconSrc: '/images/connected-process/accounting-impact/cash-flow.svg',
      iconWidth: 36,
      iconHeight: 32,
    },
    {
      id: 'subledger-apar',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_3.ITEMS.3',
      iconSrc: '/images/connected-process/accounting-impact/subledger-apar.svg',
      iconWidth: 33,
      iconHeight: 37,
    },
  ];

  readonly disclaimerLabelKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.DISCLAIMER_LABEL';
  readonly disclaimerTextKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.DISCLAIMER_TEXT';
}
```

---

## 6. Internationalization (`public/i18n/*.json`) Audit & Line-Break Adjustment

### 6.1 Existing Dictionary Status
The `CONNECTED_PROCESS.ACCOUNTING_IMPACT` namespace **already exists** across all 5 locale files (`id.json`, `en.json`, `ja.json`, `ko.json`, `zh.json`) with identical schema keys:
- `TITLE`
- `DESCRIPTION`
- `COLUMN_1.{TITLE, SUBTITLE, ITEMS[0..3]}`
- `COLUMN_2.{TITLE, SUBTITLE, ITEMS[0..2]}`
- `COLUMN_3.{TITLE, SUBTITLE, ITEMS[0..3]}`
- `DISCLAIMER_LABEL`
- `DISCLAIMER_TEXT`

> **Array Index Resolution Note:** `@ngx-translate/core` v18 natively resolves dot-separated numeric array indices (e.g., `CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.ITEMS.0`) via `getValue()`. Using `.ITEMS.0` through `.ITEMS.3` binds cleanly to each item's specific SVG icon without restructuring or breaking the existing `ITEMS` arrays across the 5 locale files.

### 6.2 Required `TITLE` Line-Break Update
In `public/i18n/id.json` and `public/i18n/en.json`, `CONNECTED_PROCESS.ACCOUNTING_IMPACT.TITLE` is currently a single-line string, whereas the design reference specifies an explicit 2-line heading lockup (matching `SATU_DATA.TITLE`, `TRANSACTION_FLOW.TITLE`, and `ROLE_REPORTS.TITLE` which use `\n` with `ProcessSectionShell`'s `whitespace-pre-line`):

- **`public/i18n/id.json`:**
  - Before: `"TITLE": "Operasional Berjalan Pembukuan Mengikuti"`
  - After: `"TITLE": "Operasional Berjalan\nPembukuan Mengikuti"`
- **`public/i18n/en.json`:**
  - Before: `"TITLE": "Operations Run, Accounting Follows"`
  - After: `"TITLE": "Operations Run,\nAccounting Follows"`

*(All remaining copy in `id.json`, `en.json`, `ja.json`, `ko.json`, and `zh.json` already matches the reference screenshot word-for-word.)*

---

## 7. Accessibility Requirements (WCAG 2.1 AA & AXE)

1. **Heading Hierarchy (No Skipped Levels):**
   - Section Landmark: `<section id="dampak-akuntansi" aria-labelledby="dampak-akuntansi-heading">` with `<h2 id="dampak-akuntansi-heading">` rendered by `ProcessSectionShell`.
   - Column Cards: Each of the 3 `<article>` cards uses an `<h3>` for its column heading (`Dokumen Sumber`, `Posting & Pemetaan COA`, `Hasil Keuangan`).
2. **Semantic List Structure:**
   - Column 1 (`Dokumen Sumber`) and Column 3 (`Hasil Keuangan`) use `<ul aria-labelledby="col-1-heading">` / `<ul aria-labelledby="col-3-heading">` since their 4 items represent grouped sets of documents/reports.
   - Column 2 (`Posting & Pemetaan COA`) uses `<ol aria-labelledby="col-2-heading">` since `Jurnal` → `Trial Balance` → `General Ledger` is an ordered accounting sequence.
3. **Decorative Graphics & Screen Reader Hygiene:**
   - Every pill icon compartment carries `aria-hidden="true"` and its `<img>` carries `alt=""` because the adjacent visible text (`Customer Invoice`, `Laba Rugi`, etc.) already provides the complete accessible name.
   - Both inter-column horizontal arrows (`→`) and both Column 2 vertical arrows (`↓`) carry `aria-hidden="true"`.
4. **Color Contrast Verification (WCAG AA ≥ 4.5:1 Text, ≥ 3:1 UI/Graphical Boundaries):**
   - Primary Navy Text (`#23244E`) on `#FDFDFD` / `#FFFFFF` cards & pills: **`14.5 : 1`** (Passes WCAG AAA).
   - Navy Pill & Stage Borders (`#23244E`) on `#FDFDFD`: **`14.5 : 1`** (Passes WCAG AA non-text contrast).
   - Blue Icon Frame Border (`#5B94E8`) & Directional Arrows (`#1C73E8` / `#1C5BDD`): Decorative visual accents/connectors; `#1C5BDD` on `#FDFDFD` achieves **`5.4 : 1`** and `#1C73E8` on `#C3D7F7` achieves **`3.05 : 1`**.

---

## 8. Test Specification & `data-testid` Contract

### 8.1 Recommended `data-testid` Hooks
| `data-testid` | Element | Purpose in Unit Tests |
| :--- | :--- | :--- |
| `accounting-pipeline-grid` | 3-column + 2-arrow grid container | Assert responsive grid structure (`lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]`). |
| `accounting-col-source` | Column 1 `<article>` | Scope queries for `Dokumen Sumber` heading, subtitle, and 4 source document pills. |
| `accounting-col-coa` | Column 2 `<article>` | Scope queries for `Posting & Pemetaan COA` heading, subtitle, 3 ordered boxes, and 2 vertical arrows. |
| `accounting-col-results` | Column 3 `<article>` | Scope queries for `Hasil Keuangan` heading, subtitle, and 4 financial statement pills. |
| `pipeline-arrow` | Inter-column arrow wrappers (×2) | Verify exactly 2 directional connectors exist with `aria-hidden="true"` and `rotate-90 lg:rotate-0`. |
| `coa-vertical-arrow` | Column 2 vertical arrows (×2) | Verify exactly 2 downward arrows connect the 3 COA boxes (`N - 1` rule). |
| `accounting-disclaimer` | Bottom policy disclaimer container | Verify `bg-[#FDFDFD] rounded-[8px]` styling, bold `Penting:` label, and policy disclaimer copy. |

### 8.2 Unit Tests Required (`accounting-impact.spec.ts`)
Following the testing pattern in [`transaction-flow.spec.ts`](./src/app/components/connected-process/sections/transaction-flow/transaction-flow.spec.ts) (using `TestBed`, `provideTranslateService`, and `provideCustomImageLoader()`):
1. **Component Creation & Shell Inputs:** Verifies `AccountingImpact` mounts `ProcessSectionShell` with `sectionId="dampak-akuntansi"`, the periwinkle linear gradient `stageBgClass`, `titleMaxWidthClass`, `descriptionMaxWidthClass`, and translated 2-line `h2` title + description.
2. **Column 1 (`Dokumen Sumber`):** Verifies `h3` title, subtitle, 4 `ul > li` pill items (`Customer Invoice`, `Supplier Invoice`, `Inventory & Manufacturing`, `Receipt & Payment`), and 4 `img` elements referencing `/images/connected-process/accounting-impact/*.svg`.
3. **Column 2 (`Posting & Pemetaan COA`):** Verifies `h3` title, subtitle, 3 ordered `ol > li` boxes (`Jurnal`, `Trial Balance`, `General Ledger`) in bold typography, and **exactly 2** `[data-testid="coa-vertical-arrow"]` connectors (`!$last`).
4. **Column 3 (`Hasil Keuangan`):** Verifies `h3` title, subtitle, 4 `ul > li` pill items (`Laba Rugi`, `Neraca`, `Arus Kas`, `Subledger AP / AR`), and 4 `img` elements referencing `/images/connected-process/accounting-impact/*.svg`.
5. **Inter-Column Directional Arrows:** Verifies **exactly 2** `[data-testid="pipeline-arrow"]` elements with `aria-hidden="true"` and mobile-to-desktop rotation classes (`rotate-90`, `lg:rotate-0`).
6. **Bottom Policy Disclaimer:** Verifies `[data-testid="accounting-disclaimer"]` renders `<strong>Penting:</strong>` and the full policy disclaimer text.
7. **Locale Switching (`id` → `en`):** Verifies switching `TranslateService` to `'en'` updates headings and items (`Source Documents`, `COA Mapping & Posting`, `Financial Statements`, `Profit & Loss`, `Important:`).

### 8.3 Page Integration Test Update (`connected-process.spec.ts`)
Update `src/app/pages/connected-process/connected-process.spec.ts`:
- Assert `<app-accounting-impact>` is rendered.
- Assert `<app-accounting-impact>` appears **after** `<app-transaction-flow>` and **before** `<app-role-reports>` in the `<main>` DOM tree.

---

## 9. Sequential Implementation Checklist (For Execution Session)

- [x] **Step 5.1 — Create SVG Icon Assets:**
  - Create `public/images/connected-process/accounting-impact/` containing all 8 duotone gradient SVGs (`customer-invoice.svg`, `supplier-invoice.svg`, `inventory-manufacturing.svg`, `receipt-payment.svg`, `profit-loss.svg`, `balance-sheet.svg`, `cash-flow.svg`, `subledger-apar.svg`).
- [ ] **Step 5.2 — Update `TITLE` Line Breaks in `public/i18n/id.json` & `public/i18n/en.json`:**
  - Update `CONNECTED_PROCESS.ACCOUNTING_IMPACT.TITLE` to include `\n` for the 2-line heading lockup.
- [ ] **Step 5.3 — Implement `AccountingImpact` Component (`src/app/components/connected-process/sections/accounting-impact/`):**
  - Implement `accounting-impact.ts` and `accounting-impact.html` following Sections 3–5 of this spec.
- [ ] **Step 5.4 — Mount in `ConnectedProcess` Page:**
  - Import `AccountingImpact` in `src/app/pages/connected-process/connected-process.ts` and place `<app-accounting-impact />` between `<app-transaction-flow />` and `<app-role-reports />` in `connected-process.html`.
- [ ] **Step 5.5 — Unit & Integration Tests + Verification Gate 5:**
  - Create `accounting-impact.spec.ts`, update `connected-process.spec.ts`, update Phase 5 checkboxes in `PRD-connected-process.md`, and run `npm test` + `npm run build` with zero errors.
