# Perunkirjoitus Automation - Quick Summary

**Added:** February 20, 2026  
**Location:** Death of a Close Person event (homepage) + PERUNKIRJOITUS-AUTOMATION.md

---

## 📋 What is Perunkirjoitus?

**Finnish estate inventory** - legal document required within 3 months of death listing:
- All assets (bank accounts, real estate, vehicles, securities, personal property)
- All liabilities (loans, debts, mortgages, unpaid bills)
- Heirs and their legal shares
- Valuations as of date of death

---

## 😞 Current Reality

| Metric | Manual Process |
|--------|---------------|
| **Time** | 6-8 weeks |
| **Heir Effort** | 20-40 hours |
| **Legal Fees** | €1,500-3,000 |
| **Pages** | 40-60 pages |
| **Accuracy** | ~85% (human errors) |
| **Missed Assets** | 5-10% of cases |

**Problems:**
- Hunt for accounts across banks separately
- Hire appraiser for real estate (€500-2,000)
- Lawyer drafts document (€1,500-3,000)
- Tax Office manual review (4-8 weeks)
- Complex legal terminology
- High stress during grief

---

## ✅ Automated Vision

### 6-Day Process:

**Day 1:** Death event → AI Estate Agent activated  
**Day 1-2:** Automatic asset discovery (all banks, registries via Data Spaces)  
**Day 2-3:** Automatic liability discovery (credit registry, mortgage holders)  
**Day 3:** AI valuation (real estate, vehicles, securities)  
**Day 3-4:** Heir calculation (Rules as Code - inheritance law automated)  
**Day 4-5:** AI drafts complete 40-page perunkirjoitus  
**Day 5:** Heirs review on phone/tablet → e-sign (1-2 hours)  
**Day 6:** Auto-filed → Tax Office AI verifies → approved in 24 hours  

### Results:

| Metric | Automated |
|--------|-----------|
| **Time** | 6 days |
| **Heir Effort** | 2-3 hours |
| **Legal Fees** | €0 |
| **Accuracy** | 99%+ |
| **Missed Assets** | <1% |

**Time Savings:** 87% faster (6 days vs 6-8 weeks)  
**Effort Savings:** 93% less work (2-3 hrs vs 20-40 hrs)  
**Cost Savings:** €1,500-3,000 per estate  
**National Savings:** €30-50M annually (20,000 deaths/year)

---

## 🔧 How It Works

### Data Sources (Automatic Queries):
1. **Financial Data Space** → all bank accounts (Nordea, OP, Danske, etc.)
2. **Euroclear Finland** → securities with date-of-death prices
3. **ETK (Pension Registry)** → accrued pension rights
4. **Insurance Federation** → all policies
5. **Maanmittauslaitos** → real estate + mortgages
6. **Traficom** → vehicles with valuations
7. **PRH** → business shares
8. **Vero (Tax Office)** → debts/refunds
9. **Bisnode/UC** → credit report (loans, credit cards)

### AI Processing:
- **Asset aggregation:** Combines data from 9+ sources
- **Valuation:** AI analyzes real estate comps, applies Traficom prices for vehicles
- **Heir calculation:** Rules API applies Perintökaari (inheritance law)
- **Document generation:** 40-page legal document in proper Finnish with law citations
- **Verification:** Cross-checks data across sources, flags anomalies

### Heir Review:
- EUDI Wallet notification
- Expandable sections (click to see details)
- Source verification (e.g., "€23,450 [Source: Nordea API 2026-02-15]")
- Add missed items manually
- E-signature (eIDAS-compliant)

### Tax Office:
- Receives structured data (JSON) + PDF
- AI verifies against own databases
- Instant validation or flagged discrepancies
- 24-hour approval (vs 4-8 weeks)

---

## 🏗️ Infrastructure Required

**All 10 Capabilities Used:**
1. ⚡ Event-Driven (death triggers workflow)
2. 📱 EUDI Wallet (heir authentication, review, e-signature)
3. 🤖 Agentic AI (orchestration, document drafting)
4. 🌐 Data Spaces (financial, property, healthcare)
5. 🔗 Interop Platform (semantic data alignment)
6. ⚖️ Rules as Code (inheritance law calculations)
7. 🔌 API Catalog (standardized queries to registries)
8. ✅ Trust Registry (verify data source authority)
9. 🔐 Zero-Knowledge (privacy-preserving heir authorization)
10. 🏢 Business Wallet (if deceased owned companies)

---

## ⚖️ Legal Changes Needed

**Current:**
- ✅ Heirs can access deceased's data (Perintökaari allows)
- ✅ E-signatures accepted (eIDAS regulation)
- ❌ Tax Office only accepts PDF (not structured data)
- ❌ AI-generated documents not explicitly recognized

**Required:**
1. **Tax Office APIs:** Accept JSON + PDF submissions
2. **AI recognition:** Accept AI-drafted perunkirjoitus if human-verified
3. **Data Space authorization:** Heirs get automatic API access (time-limited)
4. **Standardized formats:** Banks/registries provide structured data

---

## 📊 Example Output

```
PERUNKIRJOITUS
Vainaja: Matti Meikäläinen (010145-1234), kuollut 2026-02-15

VARAT (Assets):
• Kiinteistö: Mannerheimintie 5, Helsinki (€187,000) [Lähde: MML]
• Pankkitili: Nordea FI12 3456 (€23,450) [Lähde: Nordea API]
• Osakesalkku: Nordnet (€15,200) [Lähde: Euroclear]
• Ajoneuvo: Toyota Corolla 2018 (€8,500) [Lähde: Traficom]
• Irtaimisto: (€5,000) [Arvio]
Yhteensä: €239,150

VELAT (Liabilities):
• Asuntolaina: OP Bank (€52,000) [Lähde: OP API]
• Kulutusluotto: Santander (€3,200) [Lähde: Bisnode]
Yhteensä: €55,200

NETTOVARALLISUUS: €183,950

PERILLISET (Heirs):
• Puoliso: Maija Meikäläinen (50% + kotitalousvähennys)
• Lapsi 1: Pekka Meikäläinen (25%)
• Lapsi 2: Liisa Meikäläinen (25%)

Allekirjoitettu sähköisesti: 2026-02-21
Toimitettu Verohallinnolle: 2026-02-21 14:35
[AI-Generated, Human-Verified, Legally Binding]
```

---

## 🚀 Deployment Path

**Phase 1 (2026-2027):** Pilot with 100 estates → validate accuracy  
**Phase 2 (2027-2028):** Opt-in (heirs choose AI vs lawyer)  
**Phase 3 (2028+):** Default option for simple estates  

---

## 💡 Key Benefits

**For Families:**
- Removes bureaucratic burden during grief
- Saves 20-40 hours of work
- Saves €1,500-3,000
- 99%+ accuracy (vs human errors)
- Transparent (see data sources)

**For Government:**
- 24-hour approvals (vs 4-8 weeks)
- Better compliance (no missed 3-month deadlines)
- Structured data enables analytics
- Detects hidden assets (fraud prevention)

**For Society:**
- €30-50M saved annually
- Equal access (rich and poor get same service)
- Innovation: Creates estate tech market

---

## 🔗 Full Documentation

- **Technical Details:** `PERUNKIRJOITUS-AUTOMATION.md` (13KB, complete reference)
- **Live Scenario:** https://jgmikael.github.io/realdigitalization/ → Death of a Close Person event
- **Death Event Section:** Expanded with day-by-day perunkirjoitus automation

---

**Status:** ✅ Vision documented and published

**Last Updated:** February 20, 2026  
**Repository:** https://github.com/jgmikael/realdigitalization
