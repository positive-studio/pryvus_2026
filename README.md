# Structure
```
Home [/]

Services [/services/]
 ├─ Web & SaaS Development [/services/web-saas-development/]
 │
 │   └─ Web & Mobile App Development [/web-mobile-app-development/]
 │
 ├─ E-commerce & Marketplaces [/services/ecommerce-marketplaces/]
 │
 │   └─ WooCommerce Speed Optimization [/woocommerce-speed/]
 │
 ├─ Education Platforms [/services/education-platforms/]
 │
 │   └─ LMS Custom Development [/lms-custom-development/]
 │
 ├─ UI/UX & Product Design [/services/ui-ux-product-design/]
 │
 └─ Support & Maintenance [/services/support-maintenance/]

Case Studies [/case-studies/]
 └─ Case Study (Template) [/case-studies/{case-slug}/]
     ├─ Challenge
     ├─ Solution
     ├─ Result
     ├─ Stack
     └─ Testimonial

Process [/process/]
 ├─ Discovery
 ├─ Architecture
 ├─ Design & Development
 ├─ QA & Launch
 └─ Support & Scaling

Company [/company/]
 ├─ About Pryvus [/company/about/]
 │   ├─ Mission & Values
 │   ├─ Engineering-first approach
 │   └─ Geography
 │
 ├─ Careers [/company/careers/]
 │
 └─ Contacts [/company/contacts/]

Blog [/blog/]
 ├─ Engineering [/blog/engineering/]
 ├─ Product [/blog/product/]
 ├─ UX / UI [/blog/ux-ui/]
 └─ Business [/blog/business/]

Get Estimate [/get-estimate/]
Contact [/contact/]

Legal
 ├─ Privacy Policy [/privacy-policy/]
 └─ Terms of Service [/terms-of-service/]

```

# 🎨 PRYVUS UI-KIT (2026)

## 1. Color Styles

### Background
- **BG / Primary** — `#0B0D10`
- **BG / Secondary** — `#11141A`
- **BG / Card** — `#151922`

### Text
- **Text / Primary** — `#F5F7FA`
- **Text / Secondary** — `#9AA0A6`
- **Text / Muted** — `#6F7682`

### Accent
- **Accent / Primary** — `#4C8DFF`
- **Accent / Hover** — `#3B7AE0`
- **Accent / Disabled** — `#2A3F66`

### Border
- **Border / Subtle** — `rgba(255,255,255,0.08)`
- **Border / Active** — `rgba(76,141,255,0.6)`

---

## 2. Typography Styles

**Font family:** `Inter`  
Fallback: `system-ui`

### Headings
- **H1** — `64 / 72`, Semibold
- **H2** — `48 / 56`, Semibold
- **H3** — `32 / 40`, Medium
- **H4** — `24 / 32`, Medium

### Body Text
- **Body / L** — `18 / 28`, Regular
- **Body / M** — `16 / 26`, Regular
- **Body / S** — `14 / 22`, Regular

### UI Text
- **Button / Text** — `16 / 20`, Medium
- **Label / Small** — `12 / 16`, Medium, Uppercase (+2%)

---

## 3. Spacing System

**Base unit:** `8px`

Allowed values:
- `8`
- `16`
- `24`
- `32`
- `48`
- `64`
- `80`
- `120`

### Section Padding
- **Desktop:** `120`
- **Tablet:** `80`
- **Mobile:** `48`

### Radius

- Radius / XS — 6px
- Radius / S  — 8px
- Radius / M  — 12px
- Radius / L  — 16px

---

## 4. Grid System

### Desktop
- Columns: `12`
- Max width: `1240`
- Gutter: `24`

### Tablet
- Columns: `8`
- Gutter: `20`

### Mobile
- Columns: `4`
- Gutter: `16`

---

## 5. Buttons

### Primary
- Background: `Accent / Primary`
- Text: `#FFFFFF`
- Radius: `10`
- Padding: `16 × 28`
- Hover: `Accent / Hover`

### Secondary
- Background: `transparent`
- Border: `Border / Active`
- Text: `Accent / Primary`

### Ghost
- Background: `none`
- Text: `Text / Primary`
- Hover: underline or subtle background

---

## 6. Cards

### Base Card
- Background: `BG / Card`
- Border: `Border / Subtle`
- Radius: `14`
- Padding: `32`

### Hover State
- Translate Y: `-4px`
- Shadow: `0 12 32 rgba(0,0,0,0.4)`
- Border: `Border / Active`

**Usage:**
- Services
- Case Studies
- Blog
- Related blocks

---

## 7. Forms

### Input
- Height: `48`
- Background: `BG / Secondary`
- Border: `Border / Subtle`
- Radius: `8`
- Text: `Text / Primary`

### Focus State
- Border: `Accent / Primary`
- Shadow: `0 0 0 2 rgba(76,141,255,0.2)`

---

## 8. Icons

- Style: Stroke only
- Grid: `24px`
- Stroke width: `1.5px`
- Color: `Text / Secondary`

---

## 9. Motion

### Tokens
- Duration: `200–300ms`
- Easing: `ease-out`

### Scroll Animations
- Fade in
- Translate Y: `12px`

---

## 10. Figma Naming Convention

### Examples
- `BG / Primary`
- `Text / Secondary`
- `Button / Primary / Default`

Consistent naming is required for clean dev-handoff and scaling.

---

## Status
UI-Kit **v1 locked**  
Ready for:
- Home
- Services
- Performance landing pages
- Blog
- Future scaling
