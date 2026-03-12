# EU Posted Workers Notification (PWN) Certificate

**Data Model & W3C Verifiable Credential Schema**

## Overview

This folder contains a comprehensive data model for the **EU standardized Posted Workers Notification (PWN) Certificate**, structured as a W3C Verifiable Credential for the EU Business Wallet ecosystem.

### Legal Basis

- **COM(2024) 531 final** - Proposal for a Regulation on a public interface connected to the Internal Market Information System (IMI) for posted workers
- **Directive 96/71/EC** - Posting of Workers Directive
- **Directive 2014/67/EU** - Enforcement of Posting of Workers Directive
- **Regulation (EU) 2024/1857** - European Digital Identity Wallet Framework

### Purpose

Enable **fully digital, cross-border posting of workers declarations** with:
- Real-time verification by host Member State authorities
- Cryptographic proof of authenticity (no forgery)
- Integration with EU Business Wallet and EBSI Trust Registry
- Automated compliance checking via Rules as Code
- 40-80 hours → 15 minutes administrative time reduction

## Repository Structure

```
pwn-certificate/
├── README.md                           # This file
├── schema/
│   └── pwn-certificate-schema.json    # JSON Schema (W3C VC format)
├── examples/
│   └── pwn-certificate-example.json   # Realistic example instance
└── docs/
    └── data-model-overview.md         # Comprehensive documentation
```

## Quick Start

### Validate an Instance

```bash
# Install a JSON Schema validator
npm install -g ajv-cli

# Validate example against schema
ajv validate \
  -s schema/pwn-certificate-schema.json \
  -d examples/pwn-certificate-example.json
```

### Generate a PWN Certificate

```javascript
const pwnCertificate = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://realdigitalization.eu/contexts/pwn/v1"
  ],
  "type": ["VerifiableCredential", "PostedWorkersNotificationCertificate"],
  "id": `urn:uuid:${crypto.randomUUID()}`,
  "issuer": {
    "id": "did:ebsi:zYourAuthorityDID",
    "name": "Your National Labor Authority",
    "country": "FI"
  },
  "credentialSubject": {
    "serviceProvider": { /* ... */ },
    "postedWorkers": [ /* ... */ ],
    // ... see schema for full structure
  }
};

// Sign with authority's private key
const signedVC = await signVerifiableCredential(pwnCertificate, privateKey);
```

### Verify a PWN Certificate

```javascript
// Scan QR code or receive from EU Wallet
const receivedVC = await scanPWNCertificate();

// 1. Verify cryptographic signature
const isSignatureValid = await verifyVCSignature(receivedVC);

// 2. Check issuer is trusted authority
const isTrustedIssuer = await checkEBSITrustRegistry(receivedVC.issuer.id);

// 3. Check not revoked
const isNotRevoked = await checkStatusList(receivedVC.credentialStatus);

// 4. Validate against schema
const schemaValid = await validateAgainstSchema(receivedVC, pwnSchema);

if (isSignatureValid && isTrustedIssuer && isNotRevoked && schemaValid) {
  console.log("✅ Valid PWN Certificate");
  // Proceed with inspection
} else {
  console.log("❌ Invalid or revoked certificate");
}
```

## Data Model Highlights

### Core Components

1. **Service Provider** - The employer posting workers (Finnish company example)
   - Legal identity, VAT/EORI numbers
   - Economic activity (NACE code)
   - Contact details

2. **Posted Workers** - Array of workers being posted
   - Personal details (name, DOB, nationality)
   - Occupation (ISCO-08 classification)
   - Social security (A1 certificate reference)
   - Employment contract details

3. **Receiving Undertaking** - Host organization (German company example)
   - Legal identity and contact

4. **Posting Details**
   - Duration (start/end dates)
   - Member State and specific work locations
   - Nature of services
   - Long-term posting flag (>12 months)

5. **Terms & Conditions**
   - Remuneration (salary + allowances)
   - Working time (hours, rest periods)
   - Paid leave
   - Health & safety standards
   - Accommodation provisions
   - Applicable collective agreements

6. **Liaison Person** - Contact in host Member State

7. **Declaration**
   - Signatory from service provider
   - Legal attestation text
   - Digital signature

8. **Evidence** - Supporting credentials
   - A1 Certificate (social security)
   - Business registration
   - Employment contracts

### Semantic Standards

- **NACE Rev. 2** - Economic activities
- **ISCO-08** - Occupations
- **ISO 3166-1** - Countries
- **ISO 4217** - Currencies
- **ISO 639-1** - Languages

All codes ensure machine-readability and cross-border interoperability.

## Use Cases

### 1. Cross-Border Construction Project

**Scenario:** Finnish construction company posts 2 workers to Munich building site for 6 months.

**Process:**
1. Company fills PWN form via Finnish labor authority portal
2. Attaches A1 certificates and business registration (as VCs)
3. System validates data against German minimum wage rules
4. Authority issues signed PWN Certificate
5. Certificate delivered to company's EU Business Wallet
6. German inspectors verify instantly via QR code scan

**Result:** 40 hours → 20 minutes

### 2. Long-Term IT Services Posting

**Scenario:** Finnish IT company posts software engineers to German client for 18 months.

**Special Handling:**
- `posting.isLongTermPosting = true`
- Enhanced obligations (full German labor law applies)
- Possible social security regime shift
- Updated PWN Certificate required after 12 months

### 3. Multi-Country Manufacturing Support

**Scenario:** Finnish equipment manufacturer posts technicians to service machines across 5 EU countries.

**Solution:**
- Single PWN Certificate with multiple work locations
- Shared across Member State IMI systems
- Each country's inspectors can verify independently
- Updates synchronized in real-time

## Integration Points

### EU Business Wallet

- **Issuance:** Authority → Company Wallet
- **Storage:** Secure credential storage with backup
- **Presentation:** QR code, NFC, or API endpoint
- **Revocation:** Real-time status checks

### EBSI Trust Registry

- **Issuer DIDs:** Resolve authority identities
- **Trust Anchors:** National accreditation schemes
- **Cross-Border Recognition:** Automated mutual recognition

### Internal Market Information System (IMI)

- **Notification:** Automatic filing when certificate issued
- **Updates:** Real-time synchronization of changes
- **Enforcement:** Shared case files for violations

### Rules as Code

```javascript
// Automated compliance check
const rules = await loadRules('DE', 'construction', '2024');
const compliant = await rules.checkMinimumWage({
  occupation: 'construction-supervisor',
  salary: 4500,
  workingHours: 40
});
// Returns: { compliant: true, minimumRequired: 3200 }
```

## Privacy & GDPR Compliance

### Data Minimization

- **Selective Disclosure:** Present only necessary fields to verifiers
- **Zero-Knowledge Proofs:** Prove compliance without revealing exact values
- **Purpose Limitation:** Used only for posting compliance

### Legal Basis

- **Article 6(1)(c)** - Legal obligation (Directive 2014/67/EU)
- **Article 9(2)(b)** - Employment law obligations

### Retention

- **Active:** During posting period
- **Archive:** 5 years post-posting (labor law compliance)
- **Audit Trail:** EBSI timestamps (pseudonymized)

## Implementation Guide

### For Member State Authorities

1. **Deploy Issuance Infrastructure**
   - EBSI node connection
   - DID registration and key management
   - Status List 2021 endpoint
   - Web portal or API for employers

2. **Integrate with National Systems**
   - Business registries (pre-fill employer data)
   - Social security systems (A1 validation)
   - Labor inspectorates (verification tools)

3. **Cross-Border Coordination**
   - IMI system notifications
   - Mutual recognition agreements
   - Shared enforcement protocols

### For Employers

1. **Obtain EU Business Wallet**
   - Download wallet app (eIDAS 2.0 compliant)
   - Register company identity
   - Link to business registry

2. **Prepare Evidence**
   - Apply for A1 certificates (workers' home country)
   - Gather employment contracts
   - Document posting arrangements

3. **Request PWN Certificate**
   - Fill declaration form (pre-filled from registry)
   - Attach evidence credentials
   - Sign with company eIDAS certificate
   - Receive PWN Certificate to wallet

4. **Present to Inspectors**
   - Show QR code or share via NFC
   - Provide access to specific workers/terms only
   - Keep certificate updated during posting

### For Verifiers (Host Country Inspectors)

1. **Install Verification App**
   - Mobile app with QR/NFC scanner
   - Connection to EBSI Trust Registry
   - Offline verification cache

2. **Verify Certificate**
   - Scan PWN Certificate QR code
   - Check signature + issuer trust
   - Verify not revoked
   - Review worker details and terms

3. **Compliance Check**
   - Compare declared terms vs. host country minimums
   - Check A1 certificate validity
   - Document findings in IMI system

4. **Enforcement Actions**
   - If violations found, notify issuing authority via IMI
   - Initiate sanctions (fines, stop-work orders)
   - Request certificate revocation if fraud detected

## Performance Metrics

| Metric | Target |
|--------|--------|
| **Issuance Time** | < 30 seconds |
| **Verification Time** | < 3 seconds |
| **QR Code Scan** | < 1 second |
| **Status Check** | < 2 seconds (cached: <100ms) |
| **Cross-Border Propagation** | < 5 minutes (IMI) |
| **Certificate Size** | < 10 KB (typical) |

## Security Considerations

### Threat Model

1. **Forgery:** Prevented by cryptographic signatures (Ed25519/ES256)
2. **Replay Attacks:** Unique IDs + timestamps prevent reuse
3. **Man-in-the-Middle:** TLS 1.3+ for all network communications
4. **Credential Theft:** Wallet PIN/biometric protection
5. **Revocation Bypass:** Real-time status checks mandatory

### Best Practices

- **Key Management:** Hardware security modules (HSMs) for authority keys
- **Backup & Recovery:** Encrypted wallet backups with multi-factor recovery
- **Audit Logging:** Immutable logs of all issuance/verification events
- **Incident Response:** 24-hour revocation SLA for compromised certificates

## Roadmap

### Phase 1 (Current)
- ✅ Data model design
- ✅ JSON Schema
- ✅ Example instances
- ✅ Documentation

### Phase 2 (Q2 2025)
- [ ] OpenAPI specifications
- [ ] Reference implementation (Node.js)
- [ ] Wallet integration demo
- [ ] Verification app prototype

### Phase 3 (Q3 2025)
- [ ] Pilot with 2-3 Member States
- [ ] IMI system integration
- [ ] Production deployment
- [ ] Employer onboarding

### Phase 4 (2026+)
- [ ] AI-powered validation
- [ ] Agentic automation (AI Estate Agent)
- [ ] Data Spaces integration
- [ ] Zero-knowledge enhancements

## Contributing

This is an open data model. Contributions welcome:

1. **Schema Improvements:** Propose additional fields or refinements
2. **Example Scenarios:** Share real-world posting cases
3. **Implementation Guides:** Document integration experiences
4. **Tooling:** Build validators, generators, or wallet plugins

**How to Contribute:**
- Open an issue: https://github.com/jgmikael/realdigitalization/issues
- Submit a pull request
- Join discussions on implementation strategies

## License

- **JSON Schema:** MIT License (free to use, modify, distribute)
- **Documentation:** CC BY 4.0 (attribution required)
- **Example Data:** CC0 (public domain)

## Acknowledgments

- **European Commission** - COM(2024) 531 final proposal
- **W3C** - Verifiable Credentials Data Model
- **EBSI** - Trust infrastructure
- **Finnish Occupational Safety and Health Authority** - Use case insights
- **German Federal Ministry of Labour and Social Affairs** - Enforcement perspectives

## Contact

**Project:** Real Digitalization  
**Repository:** https://github.com/jgmikael/realdigitalization  
**Website:** https://jgmikael.github.io/realdigitalization  
**Issues:** https://github.com/jgmikael/realdigitalization/issues  

**Maintainer:** Mikael  
**Technical Questions:** Open an issue on GitHub

---

**Disclaimer:** This data model is a technical implementation proposal based on COM(2024) 531 final and current EU legislation. Final implementation should align with official annexes and technical specifications once published by the European Commission.

**Last Updated:** 2024-11-15  
**Schema Version:** 1.0  
**Status:** Draft for Public Review
