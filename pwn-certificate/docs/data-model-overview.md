# PWN Certificate Data Model - Overview

## Executive Summary

This data model implements an **EU-standardized Posted Workers Notification (PWN) Certificate** as a W3C Verifiable Credential, designed for the EU Business Wallet ecosystem. It fulfills requirements from:

- **COM(2024) 531 final** - Proposal for a Regulation on a public interface connected to the Internal Market Information System (IMI)
- **Directive 96/71/EC** - Posting of Workers Directive
- **Directive 2014/67/EU** - Enforcement Directive
- **Regulation (EU) 2024/1857** - European Digital Identity Wallet

## Legal Context

### Posting of Workers Framework

The EU's posting of workers framework ensures that workers temporarily posted to another EU Member State are guaranteed the same minimum working conditions as local workers, while maintaining their home country's social security coverage.

**Key Requirements:**
1. **Prior Declaration** - Employers must declare postings to host Member State authorities
2. **A1 Certificate** - Social security coordination (Regulation 883/2004)
3. **Terms and Conditions** - Minimum wages, working hours, holidays apply from host country
4. **Long-term Postings** - Enhanced obligations after 12 months
5. **Enforcement** - Host authorities can inspect and sanction violations

### COM(2024) 531 final

This proposal aims to:
- Create a **single EU-wide electronic declaration form** for posted workers
- Connect to the **Internal Market Information System (IMI)** for cross-border verification
- Reduce administrative burden (currently ~40-80 hours per posting)
- Enable real-time compliance checking
- Support mutual recognition via EBSI Trust Registry

## Technical Architecture

### W3C Verifiable Credentials

The PWN Certificate is structured as a **W3C Verifiable Credential (VC)**, enabling:

- **Cryptographic Verification** - Digital signatures from issuing authorities
- **Selective Disclosure** - Workers can share only necessary information
- **Revocation Support** - Status lists for real-time validity checking
- **Interoperability** - Compatible with EU Digital Identity Wallet
- **Machine-Readable** - JSON-LD format with semantic context

### EBSI Integration

The certificate integrates with the **European Blockchain Services Infrastructure (EBSI)**:

- **Trust Registry** - Verifiable authority credentials
- **DID Method** - Decentralized identifiers for issuers (`did:ebsi:...`)
- **Timestamping** - Immutable issuance records
- **Cross-Border Trust** - Mutual recognition across Member States

### Data Model Structure

```
PWN Certificate (W3C VC)
├── Metadata
│   ├── Certificate ID (unique identifier)
│   ├── Issuer (competent authority DID)
│   ├── Issuance & Validity Dates
│   └── Credential Status (revocation check)
│
├── Service Provider (Employer)
│   ├── Legal identity & registration
│   ├── VAT/EORI numbers
│   ├── Address & contact
│   └── Economic activity (NACE code)
│
├── Posted Workers (array)
│   ├── Personal details
│   ├── Occupation (ISCO-08 code)
│   ├── Social Security (A1 reference)
│   └── Employment contract details
│
├── Receiving Undertaking (Host)
│   ├── Legal identity
│   └── Address & contact
│
├── Posting Details
│   ├── Duration (start/end dates)
│   ├── Member State & work locations
│   ├── Nature of services
│   └── Long-term posting flag
│
├── Terms & Conditions
│   ├── Remuneration (salary + allowances)
│   ├── Working time (hours, rest periods)
│   ├── Paid leave
│   ├── Health & safety
│   ├── Accommodation
│   └── Applicable collective agreements
│
├── Liaison Person
│   └── Contact in host Member State
│
├── Declaration
│   ├── Signatory details
│   ├── Legal attestation
│   └── Digital signature
│
├── Evidence (array)
│   ├── A1 Certificate
│   ├── Business registration
│   └── Employment contracts
│
└── Proof (cryptographic signature)
    └── Issuing authority's digital signature
```

## Semantic Standards

### Classification Systems

1. **NACE Rev. 2** - Economic activities classification  
   Example: `41.20` = Construction of residential and non-residential buildings

2. **ISCO-08** - Occupation classification  
   Example: `3123` = Construction supervisors

3. **ISO 3166-1 alpha-2** - Country codes  
   Example: `FI` = Finland, `DE` = Germany

4. **ISO 4217** - Currency codes  
   Example: `EUR` = Euro

5. **ISO 639-1** - Language codes  
   Example: `fi` = Finnish, `de` = German

### Controlled Vocabularies

All enumerated values use controlled vocabularies aligned with:
- UN/CEFACT semantic standards
- EU Interoperability Framework (EIF)
- Finnish Interoperability Platform (sanastot.suomi.fi)

## Implementation Scenarios

### Scenario 1: Finnish Company Posting Workers to Germany

**Context:**  
Rakennuspalvelu Oy (Finland) posts construction workers to Munich project.

**Process:**
1. **Pre-Posting**
   - Company applies for A1 certificates (social security)
   - Prepares employment contracts and qualifications

2. **Declaration via EU Business Wallet**
   - Company logs into Finnish labor authority portal
   - Fills electronic PWN form (data model fields)
   - Attaches evidence (A1 certificates, business registration)
   - Digital signature with company eIDAS certificate

3. **Issuance**
   - Finnish Occupational Safety Authority validates data
   - Issues PWN Certificate as W3C VC
   - Records on EBSI for cross-border verification
   - Certificate delivered to company's EU Business Wallet

4. **Verification in Germany**
   - German labor inspectors scan QR code at construction site
   - Verify certificate signature via EBSI Trust Registry
   - Check credential status (not revoked)
   - View posted worker details and terms
   - Confirm A1 certificate validity

5. **Real-Time Compliance**
   - Automated checks: minimum wage, working hours
   - Notifications if posting extends beyond expected end date
   - Integration with German payroll systems

**Time Reduction:**  
Traditional paper process: 40-80 hours  
Digital PWN Certificate: 15-30 minutes

### Scenario 2: Long-Term Posting (>12 months)

When `posting.isLongTermPosting = true`, enhanced obligations trigger:

- **Additional Terms Apply**
  - All German labor law applies (not just minimum conditions)
  - Full collective agreement coverage
  - Equal treatment with local workers

- **Social Security Review**
  - A1 certificate may require renewal
  - Possible shift to German social security system

- **Notification Updates**
  - Employer must update PWN Certificate
  - New issuance with extended validity
  - Additional evidence may be required

### Scenario 3: Cross-Border Inspection

**Trigger:** Anonymous tip about underpaid workers

**Process:**
1. German inspector visits construction site
2. Requests PWN Certificate (QR code or digital wallet)
3. **Instant Verification:**
   - Certificate authenticity (EBSI signature check)
   - Issuing authority validity (Trust Registry)
   - Not revoked (Status List 2021)
   - Posted worker identity matches ID document
4. **Compliance Check:**
   - Declared salary vs. German minimum wage
   - Working hours vs. German limits
   - A1 certificate still valid
5. **Cross-Border Coordination:**
   - If violation found, IMI notification to Finnish authorities
   - Shared case file with evidence
   - Joint enforcement action if needed

## Privacy and Data Protection (GDPR)

### Data Minimization

- **Selective Disclosure:** Workers can present only relevant fields (e.g., A1 validity without full salary details)
- **Zero-Knowledge Proofs:** Prove "salary ≥ minimum wage" without revealing exact amount
- **Purpose Limitation:** Certificate used only for posting compliance, not other purposes

### Legal Basis

- **Article 6(1)(c) GDPR** - Processing necessary for legal obligation (Directive 2014/67/EU)
- **Article 9(2)(b) GDPR** - Processing necessary for employment law obligations

### Data Subject Rights

- **Access:** Workers can view their certificate data via EU Wallet
- **Rectification:** Errors corrected by re-issuance
- **Erasure:** Certificate revoked when posting ends
- **Portability:** JSON-LD format enables data export

### Retention

- **Active Posting:** Certificate valid during posting period
- **Post-Posting:** Archived for 5 years (labor law compliance)
- **Audit Trail:** EBSI timestamp records retained indefinitely (pseudonymized)

## Interoperability

### EU Business Wallet

The PWN Certificate is designed for the **EU Business Wallet** (eIDAS 2.0):

- **Storage:** Secure credential storage on company devices
- **Presentation:** QR code or NFC presentation to verifiers
- **Revocation:** Real-time status checks via Status List 2021
- **Portability:** Transfer between wallet providers

### API Integration

Organizations can integrate via **OpenAPI 3.1** specifications:

```yaml
POST /api/v1/pwn-certificates
Request:
  - Service provider details
  - Posted workers array
  - Posting details
  - Evidence attachments

Response:
  - PWN Certificate (W3C VC)
  - EBSI timestamp
  - QR code for mobile presentation
```

### Event-Driven Architecture

Certificate lifecycle events published to:

- **Member State IMI Systems** - Cross-border notification
- **Social Security Institutions** - A1 coordination
- **Tax Authorities** - Employer compliance
- **Data Spaces** - Analytics (anonymized)

### Rules as Code

Integration with **machine-readable legislation**:

```javascript
// Automated compliance check via Rules API
const complianceCheck = await rulesEngine.evaluate({
  rule: "german-minimum-wage-construction-2024",
  input: {
    occupation: pwnCertificate.credentialSubject.postedWorkers[0].occupation.iscoCode,
    salary: pwnCertificate.credentialSubject.termsAndConditions.remuneration.monthlyGrossSalary,
    workingHours: pwnCertificate.credentialSubject.termsAndConditions.workingTime.regularHoursPerWeek
  }
});

if (!complianceCheck.compliant) {
  // Trigger inspection or warning
  await notifyAuthorities(complianceCheck.violations);
}
```

## Benefits

### For Employers

- **Time Savings:** 15 min vs. 40-80 hours
- **Cost Reduction:** No manual form-filling, translations, or courier fees
- **Compliance Assurance:** Real-time validation against host country rules
- **Reusability:** One certificate for multiple inspections
- **Portability:** Works across all EU Member States

### For Workers

- **Transparency:** Clear view of employment terms
- **Protection:** Automatic minimum wage/hours compliance
- **Privacy:** Control over data disclosure
- **Mobility:** Certificate travels with worker via mobile wallet

### For Authorities

- **Real-Time Verification:** Instant authenticity checks
- **Cross-Border Coordination:** IMI integration for joint enforcement
- **Data Quality:** Structured, validated data vs. paper forms
- **Analytics:** Aggregate insights on posting trends (anonymized)
- **Fraud Prevention:** Cryptographic proof prevents forgery

### For Host Country Businesses

- **Fair Competition:** Ensures posted workers receive fair terms
- **Trust:** Verifiable compliance from foreign service providers
- **Simplified Procurement:** Digital credentials in tender processes

## Comparison with Current Process

| Aspect | Current (Paper/PDF) | Digital PWN Certificate |
|--------|---------------------|-------------------------|
| **Form Completion** | 8-12 hours (manual) | 15-30 min (pre-filled from business registry) |
| **Translation** | Manual, 2-5 days, €500-1000 | Automatic (multilingual JSON-LD) |
| **Submission** | Email/postal, 1-7 days | Instant (API or web portal) |
| **Verification** | Phone calls, fax, weeks | Seconds (QR code scan) |
| **Updates** | Re-submit entire form | Update specific fields, re-sign |
| **Revocation** | Phone/email notification | Real-time status list |
| **Cross-Border** | Separate forms per country | Single certificate, EU-wide recognition |
| **Compliance Check** | Manual review by inspector | Automated rules engine |
| **Evidence** | Physical copies, courier | Digital attachments (VCs) |
| **Cost per Posting** | €800-2000 (admin + translation) | €50-100 (validation fees) |

## Future Enhancements

### Phase 2: AI-Powered Validation

- **Document Extraction:** AI reads employment contracts, auto-fills PWN fields
- **Anomaly Detection:** ML flags suspicious postings (e.g., below-minimum wages)
- **Risk Scoring:** Predict high-risk postings for targeted inspections

### Phase 3: Agentic Automation

- **AI Estate Agent for Businesses:** Autonomous agent handles all posting formalities
  - Monitors project schedules
  - Applies for A1 certificates
  - Files PWN declarations
  - Updates authorities on changes
  - Handles inspector queries

### Phase 4: Data Spaces Integration

- **Labor Mobility Data Space:**
  - Anonymized posting trends
  - Skill shortages mapping
  - Cross-border labor market analytics
- **Construction Industry Data Space:**
  - Project-level worker credentials
  - Safety incident correlation

### Phase 5: Zero-Knowledge Enhancements

- **Salary Range Proofs:** Prove compliance without revealing exact salary
- **Selective Worker Disclosure:** Inspector sees only workers at specific site
- **Anonymized Audits:** Compliance statistics without personal data

## Technical Specifications

### JSON Schema Version

- **Schema Version:** 1.0
- **JSON Schema Spec:** Draft 2020-12
- **Validation:** Strict mode (no additional properties)

### Encoding

- **Character Set:** UTF-8
- **Date/Time Format:** ISO 8601 (e.g., `2024-11-15T10:30:00Z`)
- **Decimal Precision:** 2 decimal places for monetary amounts

### Signature Algorithms

- **Preferred:** Ed25519 (EdDSA)
- **Supported:** ES256 (ECDSA), RS256 (RSA)
- **Hash:** SHA-256

### Status Checking

- **Method:** Status List 2021 (bitstring)
- **Endpoint:** HTTPS with TLS 1.3+
- **Caching:** 5-minute TTL

### File Size

- **Schema:** ~20 KB
- **Typical Instance:** 5-10 KB (2 workers)
- **With Evidence:** 50-200 KB (attachments as URLs, not embedded)

## References

### Legal Sources

1. **Directive 96/71/EC** - Posting of Workers  
   https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:31996L0071

2. **Directive 2014/67/EU** - Enforcement  
   https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32014L0067

3. **COM(2024) 531 final** - PWN Regulation Proposal  
   https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=COM:2024:531:FIN

4. **Regulation (EU) 2024/1857** - EU Digital Identity Wallet  
   https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1857

### Technical Standards

1. **W3C Verifiable Credentials Data Model v2.0**  
   https://www.w3.org/TR/vc-data-model-2.0/

2. **EBSI DID Method Specification**  
   https://ec.europa.eu/digital-building-blocks/wikis/display/EBSI/EBSI+DID+Method

3. **Status List 2021**  
   https://www.w3.org/TR/vc-status-list/

4. **JSON Schema**  
   https://json-schema.org/

### Classification Systems

1. **NACE Rev. 2**  
   https://ec.europa.eu/eurostat/web/nace-rev2

2. **ISCO-08**  
   https://www.ilo.org/public/english/bureau/stat/isco/

3. **ISO 3166-1 (Countries)**  
   https://www.iso.org/iso-3166-country-codes.html

4. **ISO 4217 (Currencies)**  
   https://www.iso.org/iso-4217-currency-codes.html

## Contact & Support

**Maintainer:** Real Digitalization Project  
**Repository:** https://github.com/jgmikael/realdigitalization  
**Issues:** https://github.com/jgmikael/realdigitalization/issues  
**License:** MIT (schema), CC BY 4.0 (documentation)

---

*This data model is a technical implementation proposal based on current EU legislation and standards. Final implementation should align with official COM(2024) 531 annexes once published.*
