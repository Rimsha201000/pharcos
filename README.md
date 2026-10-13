# PharmaGlow — AI-Powered Pharmacy & Cosmetics Management System

<div align="center">
  <img src="public/pharmaglow-logo.png" alt="PharmaGlow Logo" width="160" />
  <h3>Healthcare & Beauty Enterprise Management System</h3>
  <p><strong>Developed by Rimsha</strong> • <a href="mailto:rimsha201000@gmail.com">rimsha201000@gmail.com</a></p>
</div>

---

## 🌟 Executive Overview

**PharmaGlow** is a production-grade, responsive enterprise web application purpose-built for modern pharmacies and luxury cosmetic retail. It bridges clinical drug safety with high-speed cosmetic sales, utilizing automated **FEFO (First Expired, First Out)** batch dispensing, strict **Rx prescription verification**, real-time **Expiry Radar quarantine**, and bilingual **Voice AI Search (English & Urdu)** powered by Google Gemini.
## 🚀 Key Functional Modules

1. **Enterprise Management Architecture**:
   - Clean enterprise software login screen (no public promotional website or landing page).
   - Discreet Owner / Super Admin access via subtle "C" trigger near "© 2026".
   - Server-grade salted SHA-256 password verification with 8-hour persistent session.
   - Brute-force protection (lockout after repeated failed attempts).
   - Full role-based authorization: Owner, Admin, Pharmacist, Inventory Manager, Cashier, Staff.

2. **Sales Reporting & Analytics (Screenshot 1 Matching)**:
   - Date range selector (`Date Start` & `Date End`).
   - One-click Blue `Filter` and Green `Print` report generation.
   - Itemized sales ledger displaying Product, Brand, Category, Client Name, Client Email, Payment Method, Unit Price, Quantity, and Line Total.
   - Real-time `TOTAL SALES` aggregation.

3. **Order Management System (Screenshot 2 Matching)**:
   - "List of Orders" with configurable page size (`Show [10] entries`).
   - Real-time instant search by client name or order number.
   - Tabular view with `#`, `Date Order`, `Client`, `Total Amount`, `Paid` badge (`Yes`/`No`), `Status` badge (`Delivered`/`Pending`/`Cancelled`), and `Action` dropdown.

4. **Executive Dashboard (Screenshot 3 Matching)**:
   - 4 High-impact KPI stat cards:
     - **Total Stocks** (163+ items)
     - **Pending Orders**
     - **Total Sales Today**
     - **Registered Clients**
   - Translucent glassmorphic cards revealing the subtle 3D background with crisp high-contrast text.

5. **Brand & Company Directory (Screenshot 4 Matching)**:
   - Dedicated tabs for **Cosmetics & Beauty Brands** (AVON, LUX, L'Oréal, Nivea, Olay, MAC, etc.) and **Pharmaceutical Manufacturers** (GSK, Pfizer, Abbott, Novartis, Sanofi, Bayer, etc.).
   - Optional photo/image URL support for every brand and product.
   - Instant filtering by country, category, and active status.

6. **Staff Duty Schedule & Shift Assignment (Screenshot 5 Matching)**:
   - "Schedule of the week" with week navigation (`Week 38`).
   - 7-Day calendar rota (Monday to Sunday) showing assigned staff with shift tags (`Morning`, `Evening`, `Night`).
   - "Assign employee" modal with Shift selection, custom duty hours (e.g., 08:00 to 12:00), and available/trained employee picker.
   - `Automatic schedule` one-click optimization engine and `Load management`.

7. **Clinical Pharmacy & FEFO Dispensing**:
   - Comprehensive drug catalog: Generic name, Brand, Dosage form, Strength, Batch #, SKU, Barcode, Storage conditions, and Rx requirement flag.
   - Automated FEFO queueing ensuring batches nearing expiry are dispensed first to prevent spoilage.
   - Stock adjustments and CSV data export/import.

8. **Cosmetics & Beauty Matrix**:
   - Dedicated modules for Skincare, Makeup, Haircare, Fragrances, and Beauty Accessories.
   - Shade/Color swatches, bottle sizes, PAO (Period After Opening: 6M, 12M, 24M), optional product photo URL, and promotional discount engine.

9. **Expiry Radar & Zero-Tolerance Quarantine**:
   - Automated 4-tier expiry categorization:
     - **Tier 1 (Red)**: Expired or Quarantined (strictly prohibited from POS sales).
     - **Tier 2 (Amber)**: Critical (&le; 30 days remaining).
     - **Tier 3 (Teal)**: Approaching (31–90 days).
     - **Tier 4 (Green)**: Optimal shelf stability.
   - 1-Click batch Quarantine button that locks hazardous items from being billed.

10. **Rapid Point of Sale (POS) & Billing**:
    - Fast barcode scanner input and voice search right at the cash register.
    - **Prescription Check**: Automatically requires Doctor's Name and Rx Serial Number if controlled medications are in the cart.
    - Multiple payment modes: Cash, Card, EasyPaisa, and Bank Transfer.
    - Printable 80mm thermal tax invoice with barcode, breakdown, and developer credits.

11. **Bilingual Voice AI (English & Urdu)**:
    - Voice typing microphone powered by the Web Speech API with real-time waveform animation.
    - Instant language switch between **English (`en-US`)** and **Urdu (`ur-PK`)**.
    - Direct integration with Google Gemini AI for inventory intelligence, near-expiry alerts, daily sales, and supplier payables.

12. **Developer Watermark**:
    - Permanent watermark badge in the corner of all screens:  
      **Developed by Rimsha | Email: rimsha201000@gmail.com**

---

## 💻 Tech Stack

- **Framework**: React 19 + TypeScript + Vite 5
- **Styling**: Tailwind CSS + Desktop Software Glassmorphic Engine
- **Icons**: Lucide React
- **Voice Typing**: Web Speech API (`en-US` & `ur-PK`)
- **AI Engine**: Google Gemini Generative API + Grounded Local Analytics
- **Typography**: Plus Jakarta Sans, Outfit, and Noto Nastaliq Urdu

---

## 🛠️ Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start PharmaGlow Software**:
   ```bash
   run.bat
   # or
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   The production-ready output will be compiled into the `dist/` directory.

---

## 🚀 GitHub & Vercel Upload Instructions

The repository is organized to stay **well below 100 files** (~57 files total) so it can be uploaded directly to GitHub via web drag-and-drop or deployed instantly to Vercel:

### 1-Click GitHub Upload:
1. Double-click `OPEN_GITHUB_FOLDER.bat` in the project root.
2. The `UPLOAD_TO_GITHUB` folder opens automatically containing 57 clean files.
3. Press `Ctrl + A` to select all files and drag & drop them into your GitHub repository page.
4. Or use the pre-packaged `PharmaGlow-Clean-GitHub.zip` (0.96 MB).

### Vercel Deployment:
1. Connect your GitHub repository to [vercel.com](https://vercel.com).
2. Framework: **Vite**.
3. Build Command: `npm run build`, Output Directory: `dist`.
4. Deploy! Live in ~30 seconds.

---

## 🔐 Credentials & Access Matrix

### Discreet Owner / Super Admin Portal
- On the Login screen footer, click the subtle letter **`C`** right next to `© 2026`.
- **Master Password**: `admin123` (or `Owner@2026#Master`)
- **Optional 2FA PIN**: `2026`

### Staff Accounts (Normal Login Form)
| Role | Email | Password | Primary Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@pharmaglow.com` | `admin123` | Store Ops, Sales, Inventory, Reports |
| **Pharmacist** | `pharmacist@pharmaglow.com` | `admin123` | FEFO Medicines, Rx Verification, Expiry |
| **Inventory Manager** | `inventory@pharmaglow.com` | `admin123` | Batches, Suppliers, Purchasing |
| **Cashier** | `cashier@pharmaglow.com` | `admin123` | Rapid POS, Checkout, Customer Loyalty |
| **Staff** | `staff@pharmaglow.com` | `admin123` | Catalog Inquiries & Customer Guidance |

---

## 📜 Credits & Contact

- **Application**: PharmaGlow Pharmacy & Cosmetics Management System
- **Developer**: Rimsha
- **Email**: [rimsha201000@gmail.com](mailto:rimsha201000@gmail.com)
