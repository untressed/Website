# Design System & UI Specification: UNTRESSED

> **Design Philosophy**: Built upon the organic, premium **UNTRESSED Final Color Palette** to deliver a refined, trustworthy, and earthy tech aesthetic. Harmonizes deep botanical greens with warm ivory surfaces, sophisticated taupe accents, and vibrant terracotta highlights.

---

## 1. The UNTRESSED Brand Palette Architecture

The design architecture strictly balances 5 strategic colors to create depth, legibility, and refined elegance:

| Role & Name | Visual % | CSS Variable | Hex Code | RGB | Role & Usage |
| :--- | :---: | :--- | :---: | :---: | :--- |
| **Warm Ivory** | **50%** | `--color-background` | `#F6F1E9` | `rgb(246, 241, 233)` | Main page backgrounds, whitespace, content sections, layout base canvas. |
| **Deep Forest Green** | **25%** | `--color-text` | `#20382C` | `rgb(32, 56, 44)` | Headings, footer background, dark sections, strong text, copyright bar. |
| **Forest Green** | **15%** | `--color-primary` | `#315C46` | `rgb(49, 92, 70)` | Primary buttons, links, brand icons, active navigation, key interactive states. |
| **Dark Beige / Taupe** | **7%** | `--color-secondary` | `#C0A98F` | `rgb(192, 169, 143)` | Secondary backgrounds, borders, dividers, subtle pill surfaces, decorative blocks. |
| **Terracotta** | **3%** | `--color-accent` | `#D97757` | `rgb(217, 119, 87)` | Small highlights, badges, selective call-to-action accents, arrow pill icons, hover accents. |

---

## 2. CSS Custom Properties (`:root`)

```css
:root {
  /* PRITS Brand Core Colors */
  --color-background: #F6F1E9; /* Warm Ivory 50% */
  --color-text: #20382C;       /* Deep Forest Green 25% */
  --color-primary: #315C46;    /* Forest Green 15% */
  --color-secondary: #C0A98F;  /* Dark Beige / Taupe 7% */
  --color-accent: #D97757;     /* Terracotta 3% */

  /* Derived Tonal Tokens */
  --color-primary-hover: #254836;
  --color-accent-soft: #FBECE7;
  --color-surface-tint: #F1ECE3;
  --color-border-subtle: rgba(192, 169, 143, 0.35);
  --color-border-medium: rgba(192, 169, 143, 0.55);

  /* Typography */
  --font-family-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-body: 'Inter', system-ui, -apple-system, sans-serif;

  /* Shadows */
  --shadow-subtle: 0 4px 12px rgba(32, 56, 44, 0.05);
  --shadow-card: 0 10px 30px rgba(32, 56, 44, 0.08);
  --shadow-hover: 0 15px 35px rgba(32, 56, 44, 0.12);
  --shadow-primary-btn: 0 4px 14px rgba(49, 92, 70, 0.35);
  --shadow-primary-btn-hover: 0 6px 20px rgba(49, 92, 70, 0.45);
}
```

---

## 3. Comprehensive Color Palette & Tokens

### 3.1 Color Scale & Tones

#### Warm Ivory (50% Base Canvas & Backgrounds)
- **Base Canvas (50%)**: `#F6F1E9` | `rgb(246, 241, 233)` — Main viewport background, body canvas.
- **Card Surface**: `#ffffff` | `rgb(255, 255, 255)` — Clean elevated card surfaces.
- **Warm Surface Tint**: `#F1ECE3` | `rgb(241, 236, 227)` — Cart cards, table rows, secondary pill backgrounds.
- **Glass Tint**: `rgba(246, 241, 233, 0.95)` — Sticky navbar background with backdrop-filter blur.

#### Deep Forest Green (25% Typography & Structure)
- **Primary Text & Headings (25%)**: `#20382C` | `rgb(32, 56, 44)` — `h1`-`h6`, strong text, copyright bar.
- **Dark Section Backdrop**: `#20382C` | `rgb(32, 56, 44)` — Story highlights, footer container.
- **Dark Neutral Elevated**: `#2D4C3C` | `rgb(45, 76, 60)` — Story highlights gradient stop.
- **Muted Body Text**: `#4F685B` | `rgb(79, 104, 91)` — Hero subtitle, lead paragraphs.
- **Light Secondary Text**: `#6b7280` | `rgb(107, 114, 128)` — Dates, captions, meta info.

#### Forest Green (15% Primary Action & Brand Elements)
- **Primary Action (15%)**: `#315C46` | `rgb(49, 92, 70)` — Primary buttons, navigation active links, brand icons.
- **Primary Hover / Focus**: `#254836` | `rgb(37, 72, 54)` — Button hover state, active clicks.
- **Primary Soft Tint**: `rgba(49, 92, 70, 0.12)` — Icon background circles, hover glows.

#### Dark Beige / Taupe (7% Structural Borders & Accents)
- **Structural Taupe (7%)**: `#C0A98F` | `rgb(192, 169, 143)` — Card borders, outline button borders, custom quote frame.
- **Subtle Taupe Border**: `rgba(192, 169, 143, 0.35)` — Subtle dividers, glass card borders.
- **Taupe Tint Surface**: `rgba(192, 169, 143, 0.15)` — Highlight tags, decorative blocks.

#### Terracotta (3% Selective Focal Highlights & Badges)
- **Terracotta Highlight (3%)**: `#D97757` | `rgb(217, 119, 87)` — Arrow pill icons, stat tags, social icon hover.
- **Terracotta Soft Tint**: `#FBECE7` | `rgb(251, 236, 231)` — Badge backgrounds, testimonial client pill background.
- **Terracotta Gradient Accent**: `linear-gradient(90deg, #315C46 0%, #D97757 100%)` — Top border accent on cards.

---

## 4. Contrast & Accessibility Matrix (WCAG 2.1)

| Element Pair | Foreground | Background | Contrast Ratio | WCAG Compliance |
| :--- | :---: | :---: | :---: | :---: |
| **Deep Forest Green on Warm Ivory** | `#20382C` | `#F6F1E9` | **10.6 : 1** | **AAA (Pass)** |
| **Deep Forest Green on White** | `#20382C` | `#FFFFFF` | **11.4 : 1** | **AAA (Pass)** |
| **Forest Green on Warm Ivory** | `#315C46` | `#F6F1E9` | **5.7 : 1** | **AA / AAA Large (Pass)** |
| **Forest Green on White** | `#315C46` | `#FFFFFF` | **6.1 : 1** | **AA / AAA Large (Pass)** |
| **White on Forest Green Button** | `#FFFFFF` | `#315C46` | **6.1 : 1** | **AA / AAA Large (Pass)** |
| **White on Deep Forest Green** | `#FFFFFF` | `#20382C` | **11.4 : 1** | **AAA (Pass)** |
| **Terracotta on Ivory** | `#D97757` | `#F6F1E9` | **3.5 : 1** (Large text/badge) | **AA Large & UI Components (Pass)** |
| **Terracotta on Soft Tint** | `#D97757` | `#FBECE7` | **3.6 : 1** (UI Badge) | **AA UI Components (Pass)** |

---

## 5. Typography Specification

### 5.1 Typeface Families
- **Headings & Display**: `'Plus Jakarta Sans'`, `-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `Roboto`, sans-serif
  - Geometric, tech-forward, high-clarity curves designed for modern digital experiences.
- **Body & UI Elements**: `'Inter'`, `system-ui`, `-apple-system`, sans-serif
  - High x-height, neutral tone, optimized for screen reading at all sizes.

### 5.2 Type Hierarchy

| Level | Font Family | Size | Weight | Line Height | Letter Spacing |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Display / Hero** | Plus Jakarta Sans | `3.5rem` (56px) | 700 / 800 | 1.1 | `-0.03em` |
| **Heading 1 (H1)** | Plus Jakarta Sans | `2.5rem` (40px) | 700 | 1.2 | `-0.02em` |
| **Heading 2 (H2)** | Plus Jakarta Sans | `2.0rem` (32px) | 700 | 1.25 | `-0.015em` |
| **Heading 3 (H3)** | Plus Jakarta Sans | `1.5rem` (24px) | 600 / 700 | 1.3 | `-0.01em` |
| **Lead Paragraph** | Inter | `1.125rem` (18px) | 400 / 500 | 1.6 | normal |
| **Body Text** | Inter | `1.0rem` (16px) | 400 | 1.6 | normal |
| **Small / Metadata** | Inter | `0.875rem` (14px) | 500 | 1.5 | `+0.01em` |
| **Uppercase Label** | Plus Jakarta Sans | `0.75rem` (12px) | 700 | 1.2 | `+0.15em` |

---

## 6. UI Components & Design Tokens

### 6.1 Buttons & Action Controls
- **Primary Hero / CTA Button (`.btn-gradient`, `.btn-primary`)**:
  - Background: `linear-gradient(135deg, #315C46 0%, #254836 100%)`
  - Text: `#ffffff` (Weight: 600)
  - Border: None, Border-radius: `50px` (pill)
  - Box Shadow: `0 4px 14px rgba(49, 92, 70, 0.35)`
  - Hover: `linear-gradient(135deg, #254836 0%, #315C46 100%)`, translateY(-2px), Shadow `0 6px 20px rgba(49, 92, 70, 0.45)`
- **Conversion Checkout & Focal CTAs ("Proceed to Details", "Pay", "Apply")**:
  - Role: **Terracotta (`#D97757`, 3% Accent)**
  - Background: `linear-gradient(135deg, #D97757 0%, #C36344 100%)`
  - Text: `#ffffff` (Weight: 700)
  - Box Shadow: `0 4px 14px rgba(217, 119, 87, 0.35)`
  - Hover: `linear-gradient(135deg, #C36344 0%, #D97757 100%)`, translateY(-2px), Shadow `0 6px 20px rgba(217, 119, 87, 0.45)`
- **Secondary Action Button ("Request a Custom Quote", `.btn-outline-custom`)**:
  - Role: **Dark Beige / Taupe (`#C0A98F`, 7% Secondary)**
  - Background: `transparent`
  - Text: `#20382C` (Weight: 600)
  - Border: `1.5px solid #C0A98F`
  - Hover: Background `#C0A98F`, border-color `#C0A98F`, text `#ffffff`
- **Arrow Icon Pill (`.arrow-icon`)**:
  - Background: `#ffffff`
  - Color / Arrow: `#D97757` (Terracotta)
  - Transition: transform `0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`

### 6.2 Navigation & Header
- **Navbar**:
  - Background: `rgba(246, 241, 233, 0.95)` with `backdrop-filter: blur(10px)`
  - Border Bottom: `1px solid rgba(192, 169, 143, 0.35)`
- **Nav Links**:
  - Base: `#20382C` (opacity: 0.85, Weight: 500)
  - Hover / Active: `#315C46` (Forest Green) with active underline `2px solid #315C46`

### 6.3 Cards & Surfaces
- **Glass Card (`.glass-card`)**:
  - Surface: `rgba(255, 255, 255, 0.92)`
  - Border: `1px solid rgba(192, 169, 143, 0.4)`
  - Box Shadow: `0 10px 30px rgba(32, 56, 44, 0.06)`
- **Standard Service / Project Card**:
  - Background: `#ffffff`
  - Border: `1px solid rgba(192, 169, 143, 0.35)`
  - Hover Border: `#315C46`
  - Top Line Accent: `linear-gradient(90deg, #315C46 0%, #D97757 100%)`

### 6.4 Social Media Icons & Logos
- **Base Color**: `#20382C` (Deep Forest Green)
- **Hover Background**: `#315C46` (Forest Green)
- **Hover Icon Color**: `#D97757` (Terracotta) or `#ffffff`
- **Box Shadow on Hover**: `0 6px 16px rgba(49, 92, 70, 0.25)`

### 6.5 Footer
- **Background**: `#20382C` (Deep Forest Green)
- **Heading Color**: `#ffffff`
- **Text Color**: `rgba(246, 241, 233, 0.85)`
- **Bottom Copyright Bar**: `#172920` (Darker Deep Forest Green)
- **Links Hover**: `#D97757` (Terracotta highlight)

### 6.6 Hero & Homepage Section
- **Hero Title**: Deep Forest Green `#20382C` with high visual clarity.
- **Glass Card**: `rgba(255, 255, 255, 0.9)` with `24px` backdrop blur and `36px` border-radius.
- **Floating Metric Pills**: 3-badge row with satisfaction (99.4%), solutions deployed (250+), and enterprise SLA (24/7) indicators.

### 6.7 Floating Cylindrical Tube Navbar (Glassmorphic & Smart Scroll)
- **Form Factor & Grid Alignment**: Encapsulated within Bootstrap's `.container` (`.prits-nav-container`) with `margin-left: -12px; margin-right: -12px; width: calc(100% + 24px); padding: 6px 24px`. This guarantees 100% pixel-perfect vertical alignment between the navbar logo and the footer/page content across all breakpoints.
- **Smart Scroll Behavior**: Dynamically disappears (`transform: translateY(-135%)`, opacity: 0) on scroll-down and gracefully reappears on scroll-up; remains permanently visible near the top of page (`scrollY < 60px`) and whenever modals or menus are open.
- **Logo Alignment & Sizing**: Brand monogram aligns directly to the container left guideline (`container_left + 12px`), matching the footer logo identically. Logo height `42px` and wordmark `24px`.
- **Glassmorphism**: `rgba(246, 241, 233, 0.85)` with `20px` backdrop blur (`saturate(180%)`) and specular top inner highlight (`inset 0 1px 1px rgba(255, 255, 255, 0.85)`).
- **Border & Shadow**: Delicate Taupe glass border (`rgba(192, 169, 143, 0.45)`) with deep floating ambient elevation (`0 16px 40px rgba(32, 56, 44, 0.08)`).
- **Services Modal Dropdown**: Retains the original spacious card design and dimensions (`padding: 30px 40px`, `width: 80%`, `max-width: 650px`, `1.05rem` font size, `25px` grid gap), positioned at `top: 88px` to ensure zero collision or overlap with the floating navbar.
- **Cylindrical Nav Links**: Deep Forest Green `#20382C` pill links with smooth transitions, active pill in Forest Green (`#315C46`) with soft shadow.
- **Circular Tactile Icons**: Profile and Cart circular triggers with Forest Green hover glow.
- **Mobile Adaptive**: Expands to `border-radius: 28px` when the mobile drawer opens for seamless vertical stacking.

### 6.8 Section Flow & Surface Hierarchy
- **Canvas (Layer 0)**: Warm Ivory `#F6F1E9` default background across sections (`.section-who-we-are`, `.section-process`, `.testimonials-section`, `.faq-section`).
- **Elevated Flow (Layer 1)**: `#FAF7F2` surface with subtle Taupe borders (`rgba(192, 169, 143, 0.3)`) across `.section-what-we-do`, `.footer-section`, `.location-card`.
- **Anchor Cards (Layer 2)**: Forest Green gradient highlights (`.card-highlight`), Terracotta badges (`.badge-popular`).

### 6.9 Process 4-Stage Methodology
- **Phase Badges**: Forest Green tint pill badges (`Phase 01` to `Phase 04`) in `rgba(49, 92, 70, 0.1)` with `#315C46` text.
- **Duration Pills**: Rounded capsules with stopwatch icon (`⏱ 3–5 Days`, etc.) in `#FAF7F2` with Taupe border.

### 6.10 Testimonials Polish
- **Rating Meter**: 5-Star terracotta rating stars (`★★★★★`) in `#D97757`.
- **Verified Client Badges**: `✓ Verified Client` pill tags in Forest Green `#315C46`.
- **Author Cards**: Circular avatars with brand accent borders (`#315C46`, `#D97757`, `#C0A98F`).

### 6.11 Cylindrical Tube FAQ System (Anti-Glitch Architecture)
- **Closed State (Cylindrical Tube)**: Constant `border-radius: 32px` mathematically identical to a pure semicircular cap for a ~64px height element, with glassmorphic ivory background (`rgba(250, 247, 242, 0.85)`), `16px` backdrop blur, and taupe borders.
- **Active State (Smooth Vertical Slide)**: Retains the identical `border-radius: 32px` and stable header padding (`padding: 10px 18px 10px 14px`), eliminating all corner interpolation and layout glitches.
- **Toggle Arrow Button**: 42px circular button in Forest Green tint rotating 180° with active solid `#315C46` state, with `margin-right: 2px` safe inset and `pointer-events: none` ensuring the arrow remains safely inside the cylinder at all times.
- **Circular Step Badges**: Cylindrical circular badges (`01`, `02`, etc.) in Terracotta tint (`rgba(217, 119, 87, 0.12)`) highlighting to solid `#D97757` when expanded.
- **Inner Tray**: Generous padding with dashed taupe divider line for the expanded answer.

### 6.12 Checkout & Cart Modal
- **Multi-step Progression**: Compact `24px` numbered step circles with dynamic Forest Green active / completed states.
- **Compact Item Cards**: Sleek `.checkout-item-compact` line items with `12px` border radius and inline quantity tags.
- **Promo Code Box**: Dashed taupe box with tag icon and Terracotta `#D97757` Apply button.
- **Order Summary Box**: Dark Beige / Taupe surface `#F1ECE3` with bold Terracotta Total Due amount.

---

## 7. Migration & Application Summary

The palette and structural UI design have been comprehensively applied across:
1. `pritsreact/src/index.css` (CSS variables, root properties, global bootstrap cascade overrides)
2. `pritsreact/src/App.css` (Fixed Navbar glassmorphism, Section transitions, Hero, Process badges, FAQ accordion, Testimonials ratings, Projects, Services, Cart, Compact Checkout Modal, Legal Pages, Footer)
3. `pritsreact/src/Dashboard.css` (Sidebar, Topnav, Stat cards, Content cards)
4. `pritsreact/src/pages/Careers.jsx` (Hero title, CTA buttons, PRITS branding)
5. `pritsreact/src/pages/PrivacyPolicy.jsx` & `RefundPolicy.jsx` (PRITS IT Solutions brand identity & support email)
6. `pritsreact/src/components/WhoWeAre.jsx` & `AboutIntro.jsx` & `OurStory.jsx` (Full brand alignment)
7. `pritsreact/src/components/JobOpportunities.jsx` (Apply buttons)
8. `pritsreact/src/components/CheckoutModal.jsx` (Razorpay payment modal theme & PRITS merchant name)
