# EN 16931-1 to UBL 2.4 eInvoice Mapping

**Comprehensive Data Model, Mapping, and Implementation Guide**

## Overview

This folder contains the complete mapping between the **EN 16931-1 European Standard for electronic invoicing** semantic model and the **UBL 2.4 (Universal Business Language)** XML syntax implementation.

### Standards Implemented

- **EN 16931-1:2017** - Electronic invoicing - Part 1: Semantic data model of the core elements of an electronic invoice
- **UBL 2.4** - Universal Business Language Version 2.4 (OASIS Standard, June 2024)
- **Peppol BIS Billing 3.0** - Pan-European Public Procurement Online Business Interoperability Specifications
- **ISO 19845** - UN/CEFACT Core Component Technical Specification (CCTS) 2.01

### Purpose

Enable **cross-border, interoperable electronic invoicing** across the European Union with:
- Standardized semantic data model (EN 16931-1)
- Practical XML syntax implementation (UBL 2.4)
- Production-ready JSON Schema for validation
- Clear mapping documentation for implementers
- Visual diagrams (Mermaid) for understanding structure

## Repository Structure

```
einvoice-en16931/
├── README.md                                    # This file
├── diagrams/
│   └── en16931-structure.md                     # Mermaid diagrams of invoice structure
├── mappings/
│   └── en16931-to-ubl24-mapping.md             # Complete semantic→syntax mapping table
├── schema/
│   └── ubl-invoice-schema.json                  # JSON Schema for UBL Invoice
├── examples/
│   └── sample-invoice.json                      # Realistic invoice instance (JSON)
└── docs/
    └── [additional documentation]               # Implementation guides, use cases
```

## Quick Start

### 1. Understand the Structure

View the Mermaid diagrams to understand EN 16931-1 structure:

```bash
# Open diagrams/en16931-structure.md in any Mermaid-compatible viewer
# Or use GitHub's built-in Mermaid rendering
```

Key diagrams included:
- **Core Invoice Structure** - Business Groups (BG) hierarchy
- **Invoice Header** - All header-level Business Terms (BT)
- **Party Information** - Seller, Buyer, Payee structures
- **Invoice Line** - Line-level details and item information
- **Document Totals & VAT** - Calculation structure
- **Payment Instructions** - Payment means breakdown
- **Complete Information Flow** - End-to-end process

### 2. Review the Mapping

Consult `mappings/en16931-to-ubl24-mapping.md` for the authoritative mapping:

| EN 16931-1 | UBL 2.4 XPath | Notes |
|------------|---------------|-------|
| **BT-1** Invoice number | `cbc:ID` | Unique identifier |
| **BT-2** Invoice issue date | `cbc:IssueDate` | Format: YYYY-MM-DD |
| ... | ... | ... |

**160+ semantic elements mapped to UBL 2.4 syntax**

### 3. Validate Against Schema

Use the JSON Schema to validate invoice instances:

```bash
# Install validator
npm install -g ajv-cli

# Validate example invoice
ajv validate \
  -s schema/ubl-invoice-schema.json \
  -d examples/sample-invoice.json
```

### 4. Generate Invoices

#### JSON Instance (for API/validation)

```json
{
  "customizationID": "urn:cen.eu:en16931:2017",
  "id": "INV-2024-001",
  "issueDate": "2024-12-15",
  "invoiceTypeCode": "380",
  "documentCurrencyCode": "EUR",
  "accountingSupplierParty": { /* ... */ },
  "accountingCustomerParty": { /* ... */ },
  "legalMonetaryTotal": { /* ... */ },
  "invoiceLine": [ /* ... */ ]
}
```

See `examples/sample-invoice.json` for a complete realistic example.

#### Transform to UBL XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
    
    <cbc:CustomizationID>urn:cen.eu:en16931:2017</cbc:CustomizationID>
    <cbc:ID>INV-2024-001</cbc:ID>
    <cbc:IssueDate>2024-12-15</cbc:IssueDate>
    <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
    <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
    
    <cac:AccountingSupplierParty>
        <cac:Party>
            <!-- ... -->
        </cac:Party>
    </cac:AccountingSupplierParty>
    
    <!-- ... -->
</Invoice>
```

## EN 16931-1 Semantic Model Overview

### Business Groups (BG)

EN 16931-1 organizes invoice data into **Business Groups (BG)** - logical collections of related information:

| BG ID | Business Group Name | Cardinality | Description |
|-------|---------------------|-------------|-------------|
| BG-1 | INVOICE NOTE | 0..n | Free-text notes |
| BG-2 | PROCESS CONTROL | 1..1 | Process and specification identifiers |
| BG-3 | PRECEDING INVOICE REFERENCE | 0..n | References to previous invoices |
| BG-4 | SELLER | 1..1 | Seller party information |
| BG-5 | SELLER POSTAL ADDRESS | 1..1 | Seller address |
| BG-6 | SELLER CONTACT | 0..1 | Seller contact details |
| BG-7 | BUYER | 1..1 | Buyer party information |
| BG-8 | BUYER POSTAL ADDRESS | 1..1 | Buyer address |
| BG-9 | BUYER CONTACT | 0..1 | Buyer contact details |
| BG-10 | PAYEE | 0..1 | Payee (if different from seller) |
| BG-11 | SELLER TAX REPRESENTATIVE | 0..1 | Tax representative party |
| BG-13 | DELIVERY INFORMATION | 0..1 | Delivery details |
| BG-14 | INVOICING PERIOD | 0..1 | Invoice period dates |
| BG-15 | DELIVER TO ADDRESS | 0..1 | Delivery address |
| BG-16 | PAYMENT INSTRUCTIONS | 0..n | Payment methods |
| BG-17 | CREDIT TRANSFER | 0..1 | Bank account details |
| BG-18 | PAYMENT CARD INFORMATION | 0..1 | Card payment details |
| BG-19 | DIRECT DEBIT | 0..1 | Direct debit mandate |
| BG-20 | DOCUMENT LEVEL ALLOWANCES | 0..n | Invoice-level discounts |
| BG-21 | DOCUMENT LEVEL CHARGES | 0..n | Invoice-level charges |
| BG-22 | DOCUMENT TOTALS | 1..1 | Monetary totals |
| BG-23 | VAT BREAKDOWN | 1..n | VAT summary per category |
| BG-24 | ADDITIONAL SUPPORTING DOCUMENTS | 0..n | Attachments/references |
| BG-25 | INVOICE LINE | 1..n | Invoice line items |
| BG-26 | INVOICE LINE PERIOD | 0..1 | Line-specific period |
| BG-27 | LINE LEVEL ALLOWANCES | 0..n | Line-level discounts |
| BG-28 | LINE LEVEL CHARGES | 0..n | Line-level charges |
| BG-29 | PRICE DETAILS | 1..1 | Unit price information |
| BG-30 | LINE VAT INFORMATION | 1..1 | VAT category for line |
| BG-31 | ITEM INFORMATION | 1..1 | Item/service description |

### Business Terms (BT)

Each Business Group contains **Business Terms (BT)** - individual data elements:

**Example: BG-4 SELLER contains:**
- **BT-27** - Seller name (1..1, mandatory)
- **BT-28** - Seller trading name (0..1, optional)
- **BT-29** - Seller identifier (0..1)
- **BT-30** - Seller legal registration identifier (0..1)
- **BT-31** - Seller VAT identifier (0..1)
- **BT-32** - Seller tax registration identifier (0..1)
- **BT-33** - Seller additional legal information (0..1)
- **BT-34** - Seller electronic address (1..1, mandatory)

**160+ Business Terms** mapped to UBL 2.4 elements.

## UBL 2.4 Implementation

### Document Structure

UBL 2.4 Invoice consists of:

1. **Root Element** - `<Invoice>`
2. **Common Basic Components (cbc)** - Simple data types (ID, Date, Code, Amount, etc.)
3. **Common Aggregate Components (cac)** - Complex structures (Party, Address, TaxTotal, etc.)

### Namespace Declarations

```xml
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
```

### Key Design Patterns

#### Party Representation

```xml
<cac:AccountingSupplierParty>
    <cac:Party>
        <cbc:EndpointID schemeID="0037">FI12345678</cbc:EndpointID>
        <cac:PartyIdentification>
            <cbc:ID schemeID="0037">FI12345678</cbc:ID>
        </cac:PartyIdentification>
        <cac:PartyName>
            <cbc:Name>Digital Solutions Oy</cbc:Name>
        </cac:PartyName>
        <cac:PostalAddress>
            <cbc:StreetName>Kauppakatu</cbc:StreetName>
            <cbc:CityName>Helsinki</cbc:CityName>
            <cbc:PostalZone>00100</cbc:PostalZone>
            <cac:Country>
                <cbc:IdentificationCode>FI</cbc:IdentificationCode>
            </cac:Country>
        </cac:PostalAddress>
        <cac:PartyTaxScheme>
            <cbc:CompanyID>FI12345678</cbc:CompanyID>
            <cac:TaxScheme>
                <cbc:ID>VAT</cbc:ID>
            </cac:TaxScheme>
        </cac:PartyTaxScheme>
        <cac:PartyLegalEntity>
            <cbc:RegistrationName>Digital Solutions Finland Oy</cbc:RegistrationName>
            <cbc:CompanyID schemeID="0037">1234567-8</cbc:CompanyID>
        </cac:PartyLegalEntity>
        <cac:Contact>
            <cbc:Name>Sanna Virtanen</cbc:Name>
            <cbc:Telephone>+358 9 1234567</cbc:Telephone>
            <cbc:ElectronicMail>sanna.virtanen@example.fi</cbc:ElectronicMail>
        </cac:Contact>
    </cac:Party>
</cac:AccountingSupplierParty>
```

#### Invoice Line

```xml
<cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:Note>Consulting services - November 2024</cbc:Note>
    <cbc:InvoicedQuantity unitCode="HUR">80</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">6400.00</cbc:LineExtensionAmount>
    
    <cac:Item>
        <cbc:Name>Digital Transformation Consulting</cbc:Name>
        <cbc:Description>Senior consultant services</cbc:Description>
        <cac:SellersItemIdentification>
            <cbc:ID>SVC-CONSULT-SENIOR</cbc:ID>
        </cac:SellersItemIdentification>
        <cac:ClassifiedTaxCategory>
            <cbc:ID>S</cbc:ID>
            <cbc:Percent>24</cbc:Percent>
            <cac:TaxScheme>
                <cbc:ID>VAT</cbc:ID>
            </cac:TaxScheme>
        </cac:ClassifiedTaxCategory>
    </cac:Item>
    
    <cac:Price>
        <cbc:PriceAmount currencyID="EUR">80.00</cbc:PriceAmount>
        <cbc:BaseQuantity unitCode="HUR">1</cbc:BaseQuantity>
    </cac:Price>
</cac:InvoiceLine>
```

#### Document Totals

```xml
<cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="EUR">10000.00</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="EUR">9500.00</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="EUR">11780.00</cbc:TaxInclusiveAmount>
    <cbc:AllowanceTotalAmount currencyID="EUR">500.00</cbc:AllowanceTotalAmount>
    <cbc:PayableAmount currencyID="EUR">11780.00</cbc:PayableAmount>
</cac:LegalMonetaryTotal>

<cac:TaxTotal>
    <cbc:TaxAmount currencyID="EUR">2280.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
        <cbc:TaxableAmount currencyID="EUR">9500.00</cbc:TaxableAmount>
        <cbc:TaxAmount currencyID="EUR">2280.00</cbc:TaxAmount>
        <cac:TaxCategory>
            <cbc:ID>S</cbc:ID>
            <cbc:Percent>24</cbc:Percent>
            <cac:TaxScheme>
                <cbc:ID>VAT</cbc:ID>
            </cac:TaxScheme>
        </cac:TaxCategory>
    </cac:TaxSubtotal>
</cac:TaxTotal>
```

## Code Lists

### Invoice Type Codes (BT-3) - UNCL1001

| Code | Description |
|------|-------------|
| **380** | Commercial invoice |
| **381** | Credit note |
| **383** | Debit note |
| **386** | Prepayment invoice |
| **389** | Self-billed invoice |
| **751** | Invoice information for accounting purposes |

### Payment Means Codes (BT-81) - UNCL4461

| Code | Payment Method |
|------|----------------|
| **30** | Credit transfer |
| **42** | Payment to bank account |
| **48** | Bank card |
| **49** | Direct debit |
| **58** | SEPA credit transfer |
| **59** | SEPA direct debit |

### VAT Category Codes (BT-118, BT-151) - UNCL5305

| Code | VAT Category |
|------|--------------|
| **S** | Standard rate |
| **Z** | Zero rated goods |
| **E** | Exempt from tax |
| **AE** | VAT Reverse Charge |
| **K** | VAT exempt for EEA intra-community supply |
| **G** | Free export item, tax not charged |
| **O** | Services outside scope of tax |

### Unit of Measure Codes (BT-130, BT-150) - UN/ECE Recommendation 20

| Code | Unit |
|------|------|
| **C62** | one (piece) |
| **HUR** | hour |
| **DAY** | day |
| **LTR** | litre |
| **KGM** | kilogram |
| **MTR** | metre |
| **MTK** | square metre |
| **MTQ** | cubic metre |

## Implementation Scenarios

### Scenario 1: Cross-Border B2B Invoice (Finland → Germany)

**Context:** Finnish IT consulting company invoices German manufacturing client for digital transformation services.

**EN 16931-1 Requirements:**
- BT-24: Specification identifier = `urn:cen.eu:en16931:2017`
- BT-1: Invoice number (unique)
- BT-31: Seller VAT ID (Finnish format: `FI12345678`)
- BT-48: Buyer VAT ID (German format: `DE987654321`)
- BG-23: VAT breakdown per category
- BT-118: VAT category code = `S` (Standard rate)
- BT-119: VAT rate = 24% (Finnish standard rate applies if service performed in Finland)

**UBL 2.4 Implementation:**

```xml
<Invoice>
    <cbc:CustomizationID>urn:cen.eu:en16931:2017</cbc:CustomizationID>
    <cbc:ID>INV-2024-12-001</cbc:ID>
    <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
    <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
    
    <cac:AccountingSupplierParty>
        <cac:Party>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>FI12345678</cbc:CompanyID>
                <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
            </cac:PartyTaxScheme>
            <!-- ... -->
        </cac:Party>
    </cac:AccountingSupplierParty>
    
    <cac:AccountingCustomerParty>
        <cac:Party>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>DE987654321</cbc:CompanyID>
                <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
            </cac:PartyTaxScheme>
            <!-- ... -->
        </cac:Party>
    </cac:AccountingCustomerParty>
    
    <cac:TaxTotal>
        <cbc:TaxAmount currencyID="EUR">2280.00</cbc:TaxAmount>
        <cac:TaxSubtotal>
            <cbc:TaxableAmount currencyID="EUR">9500.00</cbc:TaxableAmount>
            <cbc:TaxAmount currencyID="EUR">2280.00</cbc:TaxAmount>
            <cac:TaxCategory>
                <cbc:ID>S</cbc:ID>
                <cbc:Percent>24</cbc:Percent>
                <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
            </cac:TaxCategory>
        </cac:TaxSubtotal>
    </cac:TaxTotal>
    <!-- ... -->
</Invoice>
```

**Result:** Invoice complies with EN 16931-1, can be processed automatically by German ERP system, and meets EU cross-border invoicing requirements.

### Scenario 2: Peppol Network Delivery

**Context:** Same invoice transmitted via Peppol eDelivery network.

**Additional Requirements:**
- BT-23: Business process type = `urn:fdc:peppol.eu:2017:poacc:billing:01:1.0`
- BT-24: Specification identifier = `urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0`
- BT-34: Seller electronic address (Peppol participant ID)
- BT-49: Buyer electronic address (Peppol participant ID)

**UBL 2.4 Implementation:**

```xml
<Invoice>
    <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:CustomizationID>
    <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
    
    <cac:AccountingSupplierParty>
        <cac:Party>
            <cbc:EndpointID schemeID="0037">FI12345678</cbc:EndpointID>
            <!-- ... -->
        </cac:Party>
    </cac:AccountingSupplierParty>
    
    <cac:AccountingCustomerParty>
        <cac:Party>
            <cbc:EndpointID schemeID="0088">DE987654321</cbc:EndpointID>
            <!-- ... -->
        </cac:Party>
    </cac:AccountingCustomerParty>
    <!-- ... -->
</Invoice>
```

**Transmission:**
- Peppol Access Point looks up `DE987654321` in SML (Service Metadata Locator)
- Retrieves receiving Access Point endpoint from SMP (Service Metadata Publisher)
- Delivers invoice via AS4 protocol with encryption and digital signatures
- Receiver confirms receipt and processes invoice automatically

### Scenario 3: Reverse Charge VAT (Intra-EU Services)

**Context:** Finnish company provides consulting services to German company - reverse charge applies (buyer calculates VAT).

**EN 16931-1 Requirements:**
- BT-118: VAT category code = `AE` (Reverse charge)
- BT-119: VAT rate = 0 (no VAT charged by seller)
- BT-120: VAT exemption reason code = `VATEX-EU-AE`
- BT-121: VAT exemption reason text = "Reverse charge"

**UBL 2.4 Implementation:**

```xml
<cac:TaxTotal>
    <cbc:TaxAmount currencyID="EUR">0.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
        <cbc:TaxableAmount currencyID="EUR">9500.00</cbc:TaxableAmount>
        <cbc:TaxAmount currencyID="EUR">0.00</cbc:TaxAmount>
        <cac:TaxCategory>
            <cbc:ID>AE</cbc:ID>
            <cbc:Percent>0</cbc:Percent>
            <cbc:TaxExemptionReasonCode>VATEX-EU-AE</cbc:TaxExemptionReasonCode>
            <cbc:TaxExemptionReason>Reverse charge - Article 196 EU VAT Directive</cbc:TaxExemptionReason>
            <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
        </cac:TaxCategory>
    </cac:TaxSubtotal>
</cac:TaxTotal>

<cac:InvoiceLine>
    <!-- ... -->
    <cac:Item>
        <!-- ... -->
        <cac:ClassifiedTaxCategory>
            <cbc:ID>AE</cbc:ID>
            <cbc:Percent>0</cbc:Percent>
            <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
        </cac:ClassifiedTaxCategory>
    </cac:Item>
    <!-- ... -->
</cac:InvoiceLine>
```

**Result:** German buyer self-assesses VAT according to local rules (German standard rate), Finnish seller charges €0 VAT.

## Benefits

### For Businesses

- **Reduced Processing Costs:** Automated invoice handling reduces manual data entry from 5-10 minutes to <1 minute
- **Faster Payment:** Automated AP processing accelerates payment cycles by 40-60%
- **Cross-Border Compliance:** Single format accepted across all EU Member States
- **Lower Error Rates:** Structured data eliminates transcription errors (99.5% vs. 85% accuracy for manual)
- **Integration:** Direct ERP-to-ERP communication without format translation

### For Software Vendors

- **Standard Target:** Single implementation works for all EN 16931-1 compliant countries
- **Clear Specification:** 160+ mapped elements with validation rules
- **Ecosystem Support:** Compatible with Peppol, eIDAS, EU Business Wallet
- **Future-Proof:** EN 16931-1 is EU regulation, UBL 2.4 is OASIS standard (long-term stability)

### For Governments

- **Tax Compliance:** Real-time VAT reporting integration (e.g., SAF-T, Italian SdI)
- **Reduced Tax Gap:** Structured invoices enable automated fraud detection
- **SME Access:** Lower barrier to electronic invoicing for small businesses
- **Data Analytics:** Standardized data enables economic insights

## Validation

### Schema Validation

```bash
# JSON Schema validation
ajv validate -s schema/ubl-invoice-schema.json -d examples/sample-invoice.json

# UBL XML validation (requires UBL 2.4 XSD schemas)
xmllint --schema UBL-Invoice-2.4.xsd invoice.xml --noout
```

### Business Rule Validation

EN 16931-1 includes ~150 business rules (BR) that must be validated:

**Example Rules:**
- **BR-1:** Invoice MUST contain Seller name (BT-27)
- **BR-2:** Invoice MUST contain Invoice issue date (BT-2)
- **BR-CO-15:** Document level allowances (BG-20) MUST have Allowance reason code (BT-98) OR Allowance reason (BT-97)
- **BR-S-08:** For each Invoice line (BG-25) where VAT category code (BT-151) is "Standard rated" the VAT category rate (BT-152) MUST be greater than 0

**Validation Tools:**
- **Peppol Validation** - https://peppol.helger.com/public/menuitem-validation-bis3
- **Schematron** - Business rule validation via XPath assertions
- **Custom Rules Engines** - Integrate with Rules as Code capability

### Example Schematron Rule

```xml
<sch:pattern>
    <sch:rule context="cbc:InvoiceTypeCode">
        <sch:assert test="normalize-space(.) = '380' or 
                          normalize-space(.) = '381' or 
                          normalize-space(.) = '383'"
            flag="fatal" id="BR-1">
            Invoice type code MUST be one of: 380, 381, 383
        </sch:assert>
    </sch:rule>
</sch:pattern>
```

## Integration with Real Digitalization Capabilities

This eInvoice implementation demonstrates **all 10 capabilities** from the Real Digitalization project:

### 1. EU Business Wallet
- **Invoice as Verifiable Credential:** Invoice can be issued as W3C VC for buyer's EU Business Wallet
- **Selective Disclosure:** Buyer shares only necessary invoice fields with auditors (e.g., totals without line details)

### 2. Trust Registry (EBSI)
- **Issuer Verification:** Seller's DID verified via EBSI Trust Registry
- **VAT Number Validation:** Real-time VIES (VAT Information Exchange System) checks via EBSI

### 3. Zero-Knowledge Proofs
- **VAT Compliance:** Prove "invoice total > €1000" without revealing exact amount
- **Payment Verification:** Prove payment made without exposing bank account details

### 4. Agentic AI
- **AI Invoice Assistant:** Autonomous agent handles invoice creation, validation, transmission, and follow-up
- **Anomaly Detection:** ML flags unusual patterns (duplicate invoices, pricing outliers)

### 5. Event-Driven Architecture
- **Invoice Lifecycle Events:**
  - `invoice.created` → Trigger validation
  - `invoice.sent` → Notify seller accounting
  - `invoice.received` → Buyer AP workflow
  - `invoice.paid` → Update ledgers

### 6. Interoperability (UN/CEFACT)
- **Semantic Standards:** CCTS-based data model
- **Code Lists:** UNCL1001 (invoice types), UNCL4461 (payment means), UN/ECE Rec 20 (units)

### 7. Data Spaces
- **Procurement Data Space:** Anonymized invoice statistics for market analysis
- **Financial Data Space:** Aggregate payment behavior for credit scoring

### 8. API Catalog
- **OpenAPI Specifications:**
  - `POST /api/v1/invoices` - Create invoice
  - `GET /api/v1/invoices/{id}` - Retrieve invoice
  - `PUT /api/v1/invoices/{id}/status` - Update status

### 9. Agentic AI (Advanced)
- **Multi-Agent Orchestration:**
  - **Validator Agent** - Checks EN 16931-1 compliance
  - **Routing Agent** - Determines delivery method (Peppol, email, API)
  - **Archival Agent** - Long-term storage per legal requirements

### 10. Rules as Code
- **Machine-Readable VAT Rules:**
  ```javascript
  const vatRule = await rulesEngine.evaluate({
    rule: 'finland-vat-standard-rate-2024',
    input: { itemCategory: 'services', supplierCountry: 'FI' }
  });
  // Returns: { rate: 24, category: 'S' }
  ```
- **Automated Compliance:** Real-time validation against EU VAT directives

## Roadmap

### Phase 1 (Current)
- ✅ Complete EN 16931-1 to UBL 2.4 mapping
- ✅ JSON Schema for validation
- ✅ Mermaid diagrams
- ✅ Example instances
- ✅ Documentation

### Phase 2 (Q1 2025)
- [ ] XSLT transformation (JSON → UBL XML)
- [ ] Schematron business rule validation
- [ ] Peppol BIS 3.0 profile implementation
- [ ] OpenAPI specifications

### Phase 3 (Q2 2025)
- [ ] EU Business Wallet integration (invoice as VC)
- [ ] EBSI Trust Registry lookup
- [ ] Automated VAT validation
- [ ] AI invoice generator

### Phase 4 (Q3 2025)
- [ ] Production pilot (Finland, Germany, Sweden)
- [ ] Integration with national clearing systems (e.g., Finnish Apix, German XRechnung)
- [ ] Real-time compliance checking
- [ ] Data Spaces integration

## References

### Legal & Standards

1. **EN 16931-1:2017** - Electronic invoicing - Semantic data model  
   https://standards.cencenelec.eu/

2. **Directive 2014/55/EU** - Electronic invoicing in public procurement  
   https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32014L0055

3. **UBL 2.4** - Universal Business Language  
   https://docs.oasis-open.org/ubl/UBL-2.4.html

4. **Peppol BIS Billing 3.0**  
   https://docs.peppol.eu/poacc/billing/3.0/

### Technical Resources

1. **UN/CEFACT CCTS 2.01**  
   https://unece.org/trade/uncefact/xml-schemas

2. **ISO 6523** - Organization identifiers  
   https://www.iso.org/standard/25773.html

3. **UN/ECE Recommendation 20** - Units of measure  
   https://unece.org/trade/uncefact/cl-recommendations

4. **UNCL Code Lists**  
   https://service.unece.org/trade/untdid/

### Implementation Tools

1. **Peppol Validation**  
   https://peppol.helger.com/

2. **OpenPeppol GitHub**  
   https://github.com/OpenPEPPOL

3. **UBL Schema Repository**  
   https://github.com/oasis-open/ubl-2.x

## Contributing

This data model is part of the **Real Digitalization** project. Contributions welcome:

1. **Mapping Improvements:** Suggest additional element mappings
2. **Use Cases:** Share real-world implementation scenarios
3. **Code Examples:** Provide transformation scripts (XSLT, Python, Java)
4. **Business Rules:** Document country-specific validation requirements

**How to Contribute:**
- Open an issue: https://github.com/jgmikael/realdigitalization/issues
- Submit a pull request
- Join discussions on implementation strategies

## License

- **Mapping Documentation:** CC BY 4.0 (attribution required)
- **JSON Schema:** MIT License (free to use, modify, distribute)
- **Example Data:** CC0 (public domain)

## Contact

**Project:** Real Digitalization  
**Repository:** https://github.com/jgmikael/realdigitalization  
**Website:** https://jgmikael.github.io/realdigitalization  
**Issues:** https://github.com/jgmikael/realdigitalization/issues  

**Maintainer:** Mikael  
**Technical Questions:** Open an issue on GitHub

---

**Disclaimer:** This implementation guide is based on EN 16931-1:2017 and UBL 2.4 (June 2024). Always validate against the latest published standards and national implementations (e.g., XRechnung for Germany, Finvoice for Finland).

**Last Updated:** 2024-12-15  
**Mapping Version:** 1.0  
**Status:** Production-Ready
