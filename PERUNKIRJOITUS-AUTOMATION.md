# Perunkirjoitus (Estate Inventory) Automation

**Finnish Legal Requirement:** Perintökaari 40/1965  
**Deadline:** 3 months from date of death  
**Current Cost:** €1,500-3,000 (legal fees)  
**Current Time:** 20-40 hours (heir effort) + 2-4 weeks (lawyer) = 6-8 weeks total

---

## 📋 What is Perunkirjoitus?

**Estate inventory** (perunkirjoitus) is a comprehensive legal document listing:

1. **All assets** of the deceased:
   - Bank accounts, securities, pension accruals
   - Real estate, vehicles, business shares
   - Personal property, receivables, insurance

2. **All liabilities**:
   - Loans, mortgages, credit cards
   - Tax debts, unpaid bills
   - Guarantees given

3. **Heirs and their legal shares**:
   - Identification of all heirs (spouse, children, etc.)
   - Calculation of inheritance shares per Finnish law
   - Distribution of assets

4. **Valuations**:
   - Market values as of date of death
   - Professional appraisals where required

**Failure to file = Fines + probate delays + estate remains frozen**

---

## 😞 Current Manual Process (Painful)

### Step 1: Asset Discovery (2-3 Weeks)
- Heirs search through deceased's papers, emails, mail
- Contact every bank separately: "Did deceased have account?"
- Check land registry, vehicle registry, business registry manually
- Search for insurance policies, pension documents
- **Problem:** Easy to miss accounts → estate must be reopened later (expensive)

### Step 2: Liability Discovery (1-2 Weeks)
- Request credit reports
- Check mail for unpaid bills
- Contact mortgage holders
- Query Tax Office for debts
- **Problem:** Hidden liabilities discovered later → disputes

### Step 3: Valuation (1-2 Weeks)
- Real estate: Hire appraiser (€500-2,000)
- Vehicles: Look up Traficom average prices
- Securities: Get date-of-death closing prices
- Personal property: Estimate value
- **Problem:** Time-consuming, expensive

### Step 4: Legal Document Drafting (2-3 Weeks)
- Lawyer compiles 40-60 page document
- Multiple revisions with heirs
- Legal terminology, proper formatting
- **Problem:** Lawyer fees €1,500-3,000

### Step 5: Submission to Tax Office (4-8 Weeks Processing)
- Submit paper or PDF
- Tax Office manually reviews
- Back-and-forth if issues
- **Problem:** Slow, opaque process

### Total: 6-8 Weeks + €1,500-3,000 + 20-40 Hours Heir Time

---

## ✅ Automated Perunkirjoitus (Vision)

### Day 1: Death Event Triggers Automation
```
Hospital registers death → DVV issues death certificate (VC)
→ Event published: "PersonDeceased" (encrypted personal ID)
→ AI Estate Agent activated (with heir authorization via EUDI Wallet)
```

### Day 1-2: Automatic Asset Discovery

**AI Agent Queries (Parallel, via Data Spaces):**

1. **Financial Data Space:**
   - All banks simultaneously (single API call)
   - Returns: Every account (checking, savings, investment)
   - Balances as-of date-of-death
   - Co-owners, beneficiaries

2. **Securities Registry (Euroclear Finland):**
   - All stock/bond/fund holdings
   - Date-of-death valuations (closing prices)

3. **Pension Registry (ETK - Eläketurvakeskus):**
   - Accrued pension rights
   - Survivor pension eligibility

4. **Insurance Registry:**
   - Federation of Finnish Financial Services API
   - All policies (life, property, health)
   - Beneficiaries, payout amounts

5. **Land Registry (Maanmittauslaitos):**
   - Owned real estate
   - Co-owners, mortgages
   - Cadastral values

6. **Vehicle Registry (Traficom):**
   - Registered vehicles
   - Make/model/year → average price

7. **Business Registry (PRH):**
   - Company shares owned
   - Board positions
   - Ownership percentages

8. **Tax Office (Vero):**
   - Tax debts or refunds
   - Previous income (for valuation estimates)

**Result:** Complete asset list in 24-48 hours (vs 2-3 weeks manual)

---

### Day 2-3: Automatic Liability Discovery

**AI Agent Queries:**

1. **Credit Registry (Bisnode/UC):**
   - All loans, credit cards, payment plans

2. **Mortgage Holders:**
   - Linked to properties (automatic cross-reference)

3. **Utilities:**
   - Outstanding bills (electricity, water, telecom)

4. **Tax Office:**
   - Unpaid taxes, penalties, interest

5. **Guarantee Registry:**
   - If deceased guaranteed loans → liability

**Result:** Complete liability list in 24-48 hours (vs 1-2 weeks manual)

---

### Day 3: Automatic Valuation

**AI-Powered Valuation:**

1. **Real Estate:**
   - AI analyzes recent sales in area
   - Factors: size, condition, location, property type
   - Produces market value estimate (±5% accuracy)
   - **Edge cases:** Unusual properties → flag for manual appraisal

2. **Vehicles:**
   - Traficom average prices by make/model/year
   - Instant valuation

3. **Securities:**
   - Date-of-death closing prices (from Euroclear)
   - Automatic, accurate

4. **Personal Property:**
   - Standard deduction: €3,000-10,000 (typical household goods)
   - AI estimates based on income level, living situation
   - **Valuable items:** Art, antiques → AI flags for manual appraisal

**Result:** All valuations in 24 hours (vs 1-2 weeks + appraiser costs)

---

### Day 3-4: Heir Calculation (Rules as Code)

**Inheritance Law as Executable Rules:**

AI queries Rules API:
```json
POST /api/rules/calculate-inheritance
{
  "deceased": {
    "id": "010145-1234",
    "dateOfDeath": "2026-02-15"
  },
  "family": [
    {"relation": "spouse", "id": "020150-2345"},
    {"relation": "child", "id": "051280-3456"},
    {"relation": "child", "id": "101585-4567"}
  ]
}
```

**Rules API Response:**
```json
{
  "heirs": [
    {
      "id": "020150-2345",
      "relation": "spouse",
      "legalShare": "50% + household items priority",
      "amount": "€91,975"
    },
    {
      "id": "051280-3456",
      "relation": "child",
      "legalShare": "25%",
      "amount": "€45,987"
    },
    {
      "id": "101585-4567",
      "relation": "child",
      "legalShare": "25%",
      "amount": "€45,988"
    }
  ],
  "lawReferences": ["Perintökaari 3:1, 3:1a"],
  "specialCases": []
}
```

**Will Verification:**
- If will exists → query Testament Registry API
- Cross-check will provisions vs intestate succession
- Flag discrepancies for legal review

**Result:** Heir shares calculated in minutes (vs hours of legal research)

---

### Day 4-5: Document Generation

**AI Drafts Complete Perunkirjoitus (40+ Pages):**

**Sections Auto-Generated:**

1. **Deceased Information** (from DVV):
   - Name, personal ID, date of death, last address
   - Family status, occupation

2. **Heirs** (from population registry + Rules API):
   - Names, personal IDs, addresses
   - Legal shares, relationship to deceased

3. **Assets** (15-20 pages typically):
   - Detailed list with sources:
     * Bank accounts: "Nordea FI12 3456, €23,450 [Source: Nordea API 2026-02-15]"
     * Real estate: "Mannerheimintie 5, Helsinki, €187,000 [Source: AI valuation based on recent sales]"
     * Securities: "Nordnet portfolio, €15,200 [Source: Euroclear 2026-02-15 closing]"
     * Vehicles: "Toyota Corolla 2018, €8,500 [Source: Traficom avg. price]"
     * Personal property: "€5,000 [Standard household estimate]"

4. **Liabilities**:
   - Detailed list with sources:
     * "Asuntolaina OP Bank, €52,000 [Source: OP API]"
     * "Kulutusluotto Santander, €3,200 [Source: Bisnode credit report]"

5. **Net Estate**:
   - Assets - Liabilities = €183,950

6. **Distribution**:
   - Who gets what (per legal shares)

7. **Appendices** (20-30 pages):
   - Bank confirmations (as VCs/PDFs)
   - Property deeds
   - Vehicle registrations
   - Appraisals (if any)

**Language:** Proper legal Finnish, references to Perintökaari sections

**Result:** Complete draft in 24 hours (vs 2-3 weeks lawyer time)

---

### Day 5: Heir Review & Approval

**EUDI Wallet Notification:**
- "Perunkirjoitus ready for review"

**Review Interface (Mobile/Tablet):**
- Each section expandable
- Click bank name → see account details with source verification
- Click property → see valuation methodology, comparable sales

**Corrections:**
- Heir knows of missed asset → add manually
- AI re-calculates totals instantly

**AI Verification Checks:**
- "Unusual items detected:"
  * "Classic car valued at €50k (market data: €45k-55k). Confirm?"
  * "No pension accruals found. Verify if correct."

**E-Signature:**
- All heirs sign with qualified electronic signature (eIDAS-compliant)
- Legally binding, no wet signatures needed

**Time:** 1-2 hours for all heirs (vs 20-40 hours manual)

---

### Day 6: Submission & Approval

**Automatic Filing:**
```json
POST /api/vero/perunkirjoitus/submit
{
  "deceasedId": "010145-1234",
  "documentId": "PRNK-2026-12345",
  "assets": [...],
  "liabilities": [...],
  "heirs": [...],
  "signatures": [...]
}
```

**Tax Office AI Verification:**
1. Cross-check assets against bank reports (banks report directly)
2. Cross-check real estate against land registry
3. Cross-check liabilities against credit registry
4. Validate calculations

**Instant Validation:**
- If discrepancies: "We have record of account at Handelsbanken (€12,000), not in perunkirjoitus. Add?"
- Heir adds → resubmits
- If checks pass → **auto-approved in 24 hours** (vs 4-8 weeks)

---

## 📊 Comparison

| Metric | Manual (Today) | Automated (Vision) |
|--------|----------------|-------------------|
| **Total Time** | 6-8 weeks | 6 days |
| **Heir Effort** | 20-40 hours | 2-3 hours |
| **Legal Fees** | €1,500-3,000 | €0 |
| **Accuracy** | ~85% (human errors) | 99%+ (AI cross-checks) |
| **Missed Assets** | Common (5-10%) | Rare (<1%) |
| **Tax Office Processing** | 4-8 weeks | 24 hours |
| **Stress Level** | High (complex, unfamiliar) | Low (guided, automated) |

---

## 🔧 Infrastructure Requirements

### Data Sources (APIs):
- ✅ Financial Data Space (all banks)
- ✅ Euroclear Finland (securities)
- ✅ ETK (pension registry)
- ✅ Maanmittauslaitos (land registry)
- ✅ Traficom (vehicle registry)
- ✅ PRH (business registry)
- ✅ Vero (Tax Office)
- ✅ Bisnode/UC (credit registry)
- ✅ Insurance Federation

### Capabilities Used:
- ⚡ **Event-Driven:** Death event triggers workflow
- 📱 **EUDI Wallet:** Heir authentication, document review
- 🤖 **Agentic AI:** Estate agent orchestrates queries, drafts document
- 🌐 **Data Spaces:** Federated queries (financial, property, healthcare)
- ⚖️ **Rules as Code:** Inheritance law calculations
- ✅ **Trust Registry:** Verify data source authority
- 🔗 **Interop Platform:** Semantic data alignment

### Legal Framework:
- ✅ Heirs authorized to access deceased's data (Perintökaari)
- ✅ eIDAS qualified e-signatures (legally binding)
- ✅ GDPR audit trails (every data access logged)
- ✅ AI-generated documents accepted by Tax Office (legislative change needed)

---

## ⚖️ Legal Considerations

### Current Law:
- Perunkirjoitus must be "signed by heirs or their representatives"
- Tax Office accepts PDF submissions (no digital-native format yet)
- Lawyer signature optional (but common for credibility)

### Required Changes:
1. **Accept digital-native submissions:** JSON + PDF (not just PDF scans)
2. **Recognize AI-generated documents:** If human-verified and e-signed
3. **Authorize Data Space access:** Heirs get automatic API access to deceased's data (time-limited)
4. **Standardize data formats:** Banks/registries must provide structured data (not just PDFs)

### Legal Liability:
- **AI drafts, humans verify and sign**
- Heirs remain legally responsible for accuracy
- If AI misses asset → heirs liable (but audit trail shows good faith effort)
- Insurance possible: "Perunkirjoitus AI Errors & Omissions" policy

---

## 🚀 Deployment Roadmap

### Phase 1: Pilot (2026-2027)
- **Scope:** 100 volunteer estates
- **Goal:** Validate data access, AI accuracy
- **Result:** 95%+ accuracy, 80% time savings

### Phase 2: Opt-In (2027-2028)
- **Scope:** Heirs choose: manual lawyer or AI-assisted
- **Goal:** Scale to 1,000+ estates
- **Incentive:** Free (vs €1,500-3,000 lawyer)

### Phase 3: Default (2028+)
- **Scope:** AI-assisted becomes default option
- **Goal:** 50%+ of estates use automation
- **Fallback:** Complex estates (business ownership, foreign assets) → human review

---

## 💡 Benefits

### For Families:
- ✅ Grief support: Less bureaucracy during difficult time
- ✅ Time savings: 20-40 hours → 2-3 hours
- ✅ Cost savings: €1,500-3,000 → €0
- ✅ Accuracy: 99%+ (AI cross-checks prevent errors)
- ✅ Transparency: See exactly where data comes from

### For Government:
- ✅ Faster probate: 24-hour approvals (vs 4-8 weeks)
- ✅ Higher compliance: Automated = no missed deadlines
- ✅ Better data: Structured submissions enable analytics
- ✅ Reduced fraud: AI detects hidden assets

### For Society:
- ✅ Economic efficiency: €30M-50M saved annually (20,000 deaths/year × €1,500-2,500)
- ✅ Equal access: Rich and poor get same quality service
- ✅ Innovation: Creates market for estate tech services

---

## 📚 References

- **Perintökaari (Inheritance Act):** 40/1965, especially §§19-25 (perunkirjoitus requirements)
- **Tax Administration Act:** 1558/1995 (estate tax filing)
- **eIDAS Regulation:** EU 910/2014 (electronic signatures)
- **GDPR:** EU 2016/679 (data access by heirs)

---

## 🔗 Related Documents

- **Death Event Full Scenario:** See main website (Life Events section)
- **EOAVH Project (Finland):** Government initiative for death services
- **Rules as Code:** `/capabilities/rules-as-code.html` (inheritance law automation)
- **Data Spaces:** `/capabilities/data-spaces.html` (federated data access)

---

**Status:** Vision document (implementation starting 2026)

**Last Updated:** February 20, 2026

**Repository:** https://github.com/jgmikael/realdigitalization
