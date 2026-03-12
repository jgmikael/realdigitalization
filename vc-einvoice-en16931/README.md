# W3C Verifiable Credentials for EN 16931-1 eInvoices

**Production-ready JSON-LD Context and W3C VC structure for European electronic invoices**

## Overview

This folder contains the implementation of **EN 16931-1** (European eInvoicing standard) as **W3C Verifiable Credentials** using the **busdoc OWL ontology** developed by Verohallinto (Finnish Tax Administration) for semantic interoperability.

### Standards Implemented

- **EN 16931-1:2017** - Semantic data model for electronic invoicing
- **UBL 2.4** - Universal Business Language (XML syntax)
- **W3C Verifiable Credentials Data Model 1.1** - Decentralized credential format
- **JSON-LD 1.1** - Linked Data for semantic web interoperability
- **busdoc OWL Ontology** - Finnish business document vocabulary (https://iri.suomi.fi/model/busdoc/)

### Purpose

Enable **tamper-evident, cryptographically-verifiable electronic invoices** that:
- Are machine-readable and semantically interoperable
- Support cross-border EU invoicing requirements
- Can be cryptographically signed and verified
- Integrate with EU Business Wallet and identity frameworks
- Maintain compatibility with existing UBL 2.4 implementations

## Repository Structure

```
vc-einvoice-en16931/
├── README.md                          # This file
├── en16931-context.jsonld             # JSON-LD @context mapping EN 16931-1 to busdoc
├── vc-einvoice-example.jsonld         # Complete W3C VC example invoice
└── schema/
    └── vc-einvoice-schema.json        # JSON Schema for validation (to be added)
```

## Key Files

### 1. `en16931-context.jsonld`

The JSON-LD `@context` file that provides the semantic mapping between:
- **EN 16931-1** business terms (BT-1, BT-2, etc.)
- **busdoc** OWL ontology IRIs
- **W3C VC** data model

**Key features:**
- Type coercion for dates (`xsd:date`), amounts (`xsd:decimal`), booleans
- Semantic alignment with UBL 2.4 element names
- IRI-based identifiers for all entities
- Support for nested structures (Party, Address, Contact, etc.)

**Usage:**
```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://iri.suomi.fi/model/vc-einvoice-en16931/context/v1"
  ],
  "type": ["VerifiableCredential", "EN16931Invoice"],
  "credentialSubject": {
    "type": "Invoice",
    "invoiceNumber": "INV-2024-001"
  }
}
```

### 2. `vc-einvoice-example.jsonld`

A complete, production-ready example of an EN 16931-1 compliant invoice as a W3C Verifiable Credential.

**Structure:**
- **@context**: References W3C VC context + custom EN 16931-1 context
- **type**: `["VerifiableCredential", "EN16931Invoice"]`
- **issuer**: DID and metadata of the invoice issuer (seller/supplier)
- **issuanceDate**: When the VC was created
- **credentialSubject**: The actual invoice data (EN 16931-1 compliant)
- **proof**: Cryptographic signature (Ed25519Signature2020)

**Invoice data includes:**
- Header information (invoice number, dates, references)
- Seller and Buyer party details (names, addresses, VAT IDs)
- Delivery information
- Payment means (bank account, payment reference)
- Payment terms
- Document-level allowances/charges
- VAT breakdown
- Monetary totals
- Invoice lines with items, prices, and line-level details

## Integration with EU Business Wallet

This implementation is designed to work with the upcoming **EU Business Wallet** framework:

1. **Issue**: Seller creates invoice as VC, signs with their DID
2. **Store**: Invoice VC stored in Business Wallet
3. **Present**: Buyer receives and verifies invoice VC
4. **Verify**: Any party can cryptographically verify authenticity
5. **Process**: Invoice data extracted and processed by accounting systems

## Semantic Mapping Details

### EN 16931-1 → busdoc Ontology

The mapping follows this pattern:

| EN 16931-1 Element | busdoc Property | Type |
|-------------------|-----------------|------|
| BT-1: Invoice number | `busdoc:iD` | `xsd:string` |
| BT-2: Invoice issue date | `busdoc:issueDate` | `xsd:date` |
| BT-3: Invoice type code | `busdoc:invoiceTypeCode` | `xsd:string` |
| BT-5: Document currency | `busdoc:documentCurrencyCode` | `xsd:string` |
| BG-4: Seller | `busdoc:sellerSupplierParty` | `@id` (reference) |
| BG-7: Buyer | `busdoc:buyerCustomerParty` | `@id` (reference) |
| ... | ... | ... |

Full mapping available in `../einvoice-en16931/mappings/en16931-to-ubl24-mapping.md`

## Advantages Over XML UBL

✅ **Cryptographically Verifiable** - Built-in digital signature support  
✅ **Linked Data** - Semantic interoperability via IRIs  
✅ **DID-based Identity** - Decentralized issuer/subject identification  
✅ **JSON-native** - Modern API and web-friendly format  
✅ **Selective Disclosure** - Possible with advanced VC techniques (BBS+)  
✅ **Wallet Integration** - Native support in EU Business Wallet  
✅ **Version Control** - Cryptographic linking to previous versions  

## Usage Examples

### Creating a VC eInvoice

```javascript
import { issue } from '@digitalbazaar/vc';

const credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://iri.suomi.fi/model/vc-einvoice-en16931/context/v1"
  ],
  "type": ["VerifiableCredential", "EN16931Invoice"],
  "issuer": "did:example:seller123",
  "issuanceDate": new Date().toISOString(),
  "credentialSubject": {
    "type": "Invoice",
    "invoiceNumber": "INV-2024-001",
    // ... invoice data
  }
};

const verifiableCredential = await issue({
  credential,
  suite: new Ed25519Signature2020(),
  documentLoader
});
```

### Verifying a VC eInvoice

```javascript
import { verify } from '@digitalbazaar/vc';

const result = await verify({
  credential: verifiableCredential,
  suite: new Ed25519Signature2020(),
  documentLoader
});

console.log('Verified:', result.verified);
console.log('Invoice Number:', result.credentialSubject.invoiceNumber);
```

### Extracting Invoice Data

```javascript
const invoice = verifiableCredential.credentialSubject;

console.log(`Invoice: ${invoice.invoiceNumber}`);
console.log(`Seller: ${invoice.seller.name}`);
console.log(`Amount: ${invoice.legalMonetaryTotal.payableAmount} ${invoice.documentCurrencyCode}`);
console.log(`Due: ${invoice.dueDate}`);
```

## Validation

To validate a VC eInvoice:

1. **Structure validation**: JSON Schema validation against VC schema
2. **Semantic validation**: JSON-LD validation against busdoc ontology
3. **Business rules**: EN 16931-1 cardinality and constraint validation
4. **Cryptographic verification**: Digital signature verification
5. **DID resolution**: Issuer DID document resolution and verification

## Implementation Notes

### Required Fields (EN 16931-1 Mandatory Elements)

- `invoiceNumber` (BT-1)
- `issueDate` (BT-2)
- `invoiceTypeCode` (BT-3)
- `documentCurrencyCode` (BT-5)
- `seller` with mandatory sub-elements
- `buyer` with mandatory sub-elements
- `taxTotal` with at least one `taxSubtotal`
- `legalMonetaryTotal` with all mandatory amounts
- At least one `invoiceLine`

### Optional Enhancements

- **Zero-Knowledge Proofs**: Use BBS+ signatures for selective disclosure
- **Revocation**: Implement status list 2021 for invoice cancellation
- **Amendments**: Link amended invoices cryptographically
- **Multi-signature**: Support for approval workflows
- **Encrypted payloads**: Encrypt sensitive commercial terms

## Related Standards

- **ISO 20022** - Financial messaging (payment initiation from invoice)
- **PEPPOL BIS Billing 3.0** - Pan-European procurement network
- **UN/CEFACT** - Buy-Ship-Pay reference data model
- **eIDAS 2.0** - European identity framework (DID methods)
- **EBSI** - European Blockchain Services Infrastructure

## Future Enhancements

- [ ] JSON Schema validation file
- [ ] TypeScript type definitions
- [ ] Python pydantic models
- [ ] OpenAPI specification for invoice API
- [ ] SHACL shapes for RDF validation
- [ ] Integration examples with accounting systems
- [ ] EU Business Wallet adapter
- [ ] Credit note (type 381) examples
- [ ] Multi-currency invoice examples
- [ ] Advance payment invoice examples

## License

This implementation follows the licensing of:
- EN 16931-1 (CEN standard)
- UBL 2.4 (OASIS, royalty-free)
- busdoc ontology (Verohallinto)
- W3C VC Data Model (W3C open standard)

## References

- **EN 16931-1:2017**: https://standards.cen.eu/
- **UBL 2.4**: https://docs.oasis-open.org/ubl/os-UBL-2.4/
- **W3C VC**: https://www.w3.org/TR/vc-data-model/
- **busdoc**: https://tietomallit.suomi.fi/model/busdoc
- **EU Business Wallet**: (upcoming regulation)
- **Peppol**: https://peppol.eu/

## Contact

For questions, issues, or contributions related to this Finnish implementation:
- **Repository**: https://github.com/jgmikael/realdigitalization
- **Related project**: Yrityksen digitalous (RTE) / Finnish Tax Administration

---

**Status**: Draft implementation (v0.1.0)  
**Last updated**: 2024-03-12  
**Maintainer**: Finnish Tax Administration (Verohallinto)
