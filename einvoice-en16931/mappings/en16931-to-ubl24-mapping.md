# EN 16931-1 to UBL 2.4 Mapping

## Complete Semantic to Syntax Mapping

This document provides the authoritative mapping between EN 16931-1 semantic model elements and UBL 2.4 XML syntax elements.

### Conventions

- **BT** = Business Term (individual data element)
- **BG** = Business Group (collection of related data elements)
- **Card.** = Cardinality (1..1 = mandatory one, 0..1 = optional, 0..n = optional repeating, 1..n = mandatory repeating)
- **UBL Path** = XPath expression in UBL 2.4 Invoice schema

---

## Header Level Elements

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-1** | Invoice number | 1..1 | `cbc:ID` | Unique invoice identifier |
| **BT-2** | Invoice issue date | 1..1 | `cbc:IssueDate` | Format: YYYY-MM-DD |
| **BT-3** | Invoice type code | 1..1 | `cbc:InvoiceTypeCode` | UNCL1001: 380=Commercial invoice, 381=Credit note |
| **BT-5** | Invoice currency code | 1..1 | `cbc:DocumentCurrencyCode` | ISO 4217 (e.g., EUR, USD) |
| **BT-6** | VAT accounting currency code | 0..1 | `cbc:TaxCurrencyCode` | ISO 4217, used if different from BT-5 |
| **BT-7** | Value added tax point date | 0..1 | `cbc:TaxPointDate` | Date when VAT becomes accountable |
| **BT-8** | Value added tax point date code | 0..1 | `cbc:InvoicePeriod/cbc:DescriptionCode` | UNCL2005 date/time/period codes |
| **BT-9** | Payment due date | 0..1 | `cbc:DueDate` | Date payment is due |
| **BT-10** | Buyer reference | 0..1 | `cbc:BuyerReference` | Buyer's internal routing reference |
| **BT-11** | Project reference | 0..1 | `cac:ProjectReference/cbc:ID` | Project identifier |
| **BT-12** | Contract reference | 0..1 | `cac:ContractDocumentReference/cbc:ID` | Contract document identifier |
| **BT-13** | Purchase order reference | 0..1 | `cac:OrderReference/cbc:ID` | Purchase order number |
| **BT-14** | Sales order reference | 0..1 | `cac:OrderReference/cbc:SalesOrderID` | Sales order number |
| **BT-15** | Receiving advice reference | 0..1 | `cac:ReceiptDocumentReference/cbc:ID` | Receipt advice document reference |
| **BT-16** | Despatch advice reference | 0..1 | `cac:DespatchDocumentReference/cbc:ID` | Despatch advice document reference |
| **BT-17** | Tender or lot reference | 0..1 | `cac:OriginatorDocumentReference/cbc:ID` | Tender or lot identifier |
| **BT-18** | Invoiced object identifier | 0..1 | `cac:AdditionalDocumentReference[cbc:DocumentTypeCode='130']/cbc:ID` | Object identifier with scheme |
| **BT-19** | Buyer accounting reference | 0..1 | `cbc:AccountingCost` | Buyer's accounting cost center |
| **BT-20** | Payment terms | 0..1 | `cac:PaymentTerms/cbc:Note` | Free text payment terms |
| **BT-21** | Invoice note subject code | 0..1 | `cbc:Note/@LanguageID` | Subject code for note |
| **BT-22** | Invoice note | 0..1 | `cbc:Note` | Free text note on invoice level |
| **BT-23** | Business process type | 0..1 | `cbc:ProfileID` | Business process identifier |
| **BT-24** | Specification identifier | 1..1 | `cbc:CustomizationID` | Default: `urn:cen.eu:en16931:2017` |

---

## BG-2: PROCESS CONTROL

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-23** | Business process type | 0..1 | `cbc:ProfileID` | Process identifier (e.g., Peppol) |
| **BT-24** | Specification identifier | 1..1 | `cbc:CustomizationID` | Specification version |

---

## BG-3: PRECEDING INVOICE REFERENCE

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-25** | Preceding Invoice reference | 1..1 | `cac:BillingReference/cac:InvoiceDocumentReference/cbc:ID` | Previous invoice number |
| **BT-26** | Preceding Invoice issue date | 0..1 | `cac:BillingReference/cac:InvoiceDocumentReference/cbc:IssueDate` | Date of previous invoice |

---

## BG-4: SELLER

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-27** | Seller name | 1..1 | `cac:AccountingSupplierParty/cac:Party/cac:PartyLegalEntity/cbc:RegistrationName` | Legal name |
| **BT-28** | Seller trading name | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:PartyName/cbc:Name` | Trading name |
| **BT-29** | Seller identifier | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:PartyIdentification/cbc:ID` | Identifier with scheme attribute |
| **BT-30** | Seller legal registration identifier | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:PartyLegalEntity/cbc:CompanyID` | Company registration number |
| **BT-31** | Seller VAT identifier | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID` | VAT number (ISO 6523) |
| **BT-32** | Seller tax registration identifier | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme[cac:TaxScheme/cbc:ID='TAX']/cbc:CompanyID` | Tax registration |
| **BT-33** | Seller additional legal information | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:PartyLegalEntity/cbc:CompanyLegalForm` | Additional legal info |
| **BT-34** | Seller electronic address | 1..1 | `cac:AccountingSupplierParty/cac:Party/cbc:EndpointID` | Electronic address (email, Peppol ID) |

### BG-5: SELLER POSTAL ADDRESS

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-35** | Seller address line 1 | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:StreetName` | Street name |
| **BT-36** | Seller address line 2 | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:AdditionalStreetName` | Additional street |
| **BT-37** | Seller address line 3 | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cac:AddressLine/cbc:Line` | Address line 3 |
| **BT-38** | Seller city | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:CityName` | City name |
| **BT-39** | Seller post code | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:PostalZone` | Postal code |
| **BT-40** | Seller country subdivision | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:CountrySubentity` | State/region |
| **BT-41** | Seller country code | 1..1 | `cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cac:Country/cbc:IdentificationCode` | ISO 3166-1 alpha-2 |

### BG-6: SELLER CONTACT

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-41** | Seller contact point | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:Name` | Contact person name |
| **BT-42** | Seller contact telephone number | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:Telephone` | Phone number |
| **BT-43** | Seller contact email address | 0..1 | `cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:ElectronicMail` | Email address |

---

## BG-7: BUYER

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-44** | Buyer name | 1..1 | `cac:AccountingCustomerParty/cac:Party/cac:PartyLegalEntity/cbc:RegistrationName` | Legal name |
| **BT-45** | Buyer trading name | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:PartyName/cbc:Name` | Trading name |
| **BT-46** | Buyer identifier | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:PartyIdentification/cbc:ID` | Identifier with scheme |
| **BT-47** | Buyer legal registration identifier | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:PartyLegalEntity/cbc:CompanyID` | Registration number |
| **BT-48** | Buyer VAT identifier | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID` | VAT number |
| **BT-49** | Buyer electronic address | 1..1 | `cac:AccountingCustomerParty/cac:Party/cbc:EndpointID` | Electronic address |

### BG-8: BUYER POSTAL ADDRESS

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-50** | Buyer address line 1 | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:StreetName` | Street name |
| **BT-51** | Buyer address line 2 | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:AdditionalStreetName` | Additional street |
| **BT-52** | Buyer address line 3 | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cac:AddressLine/cbc:Line` | Address line 3 |
| **BT-53** | Buyer city | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:CityName` | City name |
| **BT-54** | Buyer post code | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:PostalZone` | Postal code |
| **BT-55** | Buyer country subdivision | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:CountrySubentity` | State/region |
| **BT-56** | Buyer country code | 1..1 | `cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cac:Country/cbc:IdentificationCode` | ISO 3166-1 alpha-2 |

### BG-9: BUYER CONTACT

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-56** | Buyer contact point | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:Name` | Contact person |
| **BT-57** | Buyer contact telephone number | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:Telephone` | Phone |
| **BT-58** | Buyer contact email address | 0..1 | `cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:ElectronicMail` | Email |

---

## BG-10: PAYEE

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-59** | Payee name | 1..1 | `cac:PayeeParty/cac:PartyName/cbc:Name` | Payee legal name |
| **BT-60** | Payee identifier | 0..1 | `cac:PayeeParty/cac:PartyIdentification/cbc:ID` | Payee identifier |
| **BT-61** | Payee legal registration identifier | 0..1 | `cac:PayeeParty/cac:PartyLegalEntity/cbc:CompanyID` | Payee registration |

---

## BG-11: SELLER TAX REPRESENTATIVE PARTY

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-62** | Seller tax representative name | 1..1 | `cac:TaxRepresentativeParty/cac:PartyName/cbc:Name` | Tax rep name |
| **BT-63** | Seller tax representative VAT identifier | 1..1 | `cac:TaxRepresentativeParty/cac:PartyTaxScheme/cbc:CompanyID` | Tax rep VAT |

### BG-12: SELLER TAX REPRESENTATIVE POSTAL ADDRESS

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-64** | Tax representative address line 1 | 0..1 | `cac:TaxRepresentativeParty/cac:PostalAddress/cbc:StreetName` | Street |
| **BT-65** | Tax representative address line 2 | 0..1 | `cac:TaxRepresentativeParty/cac:PostalAddress/cbc:AdditionalStreetName` | Additional street |
| **BT-66** | Tax representative address line 3 | 0..1 | `cac:TaxRepresentativeParty/cac:PostalAddress/cac:AddressLine/cbc:Line` | Line 3 |
| **BT-67** | Tax representative city | 0..1 | `cac:TaxRepresentativeParty/cac:PostalAddress/cbc:CityName` | City |
| **BT-68** | Tax representative post code | 0..1 | `cac:TaxRepresentativeParty/cac:PostalAddress/cbc:PostalZone` | Postal code |
| **BT-69** | Tax representative country subdivision | 0..1 | `cac:TaxRepresentativeParty/cac:PostalAddress/cbc:CountrySubentity` | State/region |
| **BT-70** | Tax representative country code | 1..1 | `cac:TaxRepresentativeParty/cac:PostalAddress/cac:Country/cbc:IdentificationCode` | ISO 3166-1 |

---

## BG-13: DELIVERY INFORMATION

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-70** | Deliver to party name | 0..1 | `cac:Delivery/cac:DeliveryParty/cac:PartyName/cbc:Name` | Delivery party |
| **BT-71** | Deliver to location identifier | 0..1 | `cac:Delivery/cac:DeliveryLocation/cbc:ID` | Location identifier |
| **BT-72** | Actual delivery date | 0..1 | `cac:Delivery/cbc:ActualDeliveryDate` | Actual delivery date |

### BG-15: DELIVER TO ADDRESS

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-75** | Deliver to address line 1 | 0..1 | `cac:Delivery/cac:DeliveryLocation/cac:Address/cbc:StreetName` | Street |
| **BT-76** | Deliver to address line 2 | 0..1 | `cac:Delivery/cac:DeliveryLocation/cac:Address/cbc:AdditionalStreetName` | Additional |
| **BT-77** | Deliver to address line 3 | 0..1 | `cac:Delivery/cac:DeliveryLocation/cac:Address/cac:AddressLine/cbc:Line` | Line 3 |
| **BT-78** | Deliver to city | 0..1 | `cac:Delivery/cac:DeliveryLocation/cac:Address/cbc:CityName` | City |
| **BT-79** | Deliver to post code | 0..1 | `cac:Delivery/cac:DeliveryLocation/cac:Address/cbc:PostalZone` | Postal code |
| **BT-80** | Deliver to country subdivision | 0..1 | `cac:Delivery/cac:DeliveryLocation/cac:Address/cbc:CountrySubentity` | State/region |
| **BT-81** | Deliver to country code | 1..1 | `cac:Delivery/cac:DeliveryLocation/cac:Address/cac:Country/cbc:IdentificationCode` | ISO 3166-1 |

---

## BG-14: INVOICING PERIOD

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-73** | Invoicing period start date | 0..1 | `cac:InvoicePeriod/cbc:StartDate` | Period start |
| **BT-74** | Invoicing period end date | 0..1 | `cac:InvoicePeriod/cbc:EndDate` | Period end |

---

## BG-16: PAYMENT INSTRUCTIONS

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-81** | Payment means type code | 1..1 | `cac:PaymentMeans/cbc:PaymentMeansCode` | UNCL4461 (30=Credit transfer, 48=Card, 49=Direct debit) |
| **BT-82** | Payment means text | 0..1 | `cac:PaymentMeans/cbc:PaymentMeansCode/@name` | Payment means description |
| **BT-83** | Remittance information | 0..1 | `cac:PaymentMeans/cbc:InstructionNote` | Remittance info |

### BG-17: CREDIT TRANSFER

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-84** | Payment account identifier | 1..1 | `cac:PaymentMeans/cac:PayeeFinancialAccount/cbc:ID` | IBAN or account number |
| **BT-85** | Payment account name | 0..1 | `cac:PaymentMeans/cac:PayeeFinancialAccount/cbc:Name` | Account holder |
| **BT-86** | Payment service provider identifier | 0..1 | `cac:PaymentMeans/cac:PayeeFinancialAccount/cac:FinancialInstitutionBranch/cbc:ID` | BIC/SWIFT |

### BG-18: PAYMENT CARD INFORMATION

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-87** | Payment card primary account number | 1..1 | `cac:PaymentMeans/cac:CardAccount/cbc:PrimaryAccountNumberID` | Masked PAN |
| **BT-88** | Payment card holder name | 0..1 | `cac:PaymentMeans/cac:CardAccount/cbc:HolderName` | Cardholder name |

### BG-19: DIRECT DEBIT

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-89** | Mandate reference identifier | 1..1 | `cac:PaymentMeans/cac:PaymentMandate/cbc:ID` | SEPA mandate ID |
| **BT-90** | Bank assigned creditor identifier | 0..1 | `cac:PaymentMeans/cac:PaymentMandate/cac:PayerFinancialAccount/cac:FinancialInstitutionBranch/cac:FinancialInstitution/cbc:ID` | Creditor ID |
| **BT-91** | Debited account identifier | 0..1 | `cac:PaymentMeans/cac:PaymentMandate/cac:PayerFinancialAccount/cbc:ID` | IBAN of debtor |

---

## BG-20: DOCUMENT LEVEL ALLOWANCES

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-92** | Document level allowance amount | 1..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='false']/cbc:Amount` | Allowance amount |
| **BT-93** | Document level allowance base amount | 0..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='false']/cbc:BaseAmount` | Base for percentage |
| **BT-94** | Document level allowance percentage | 0..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='false']/cbc:MultiplierFactorNumeric` | Allowance % |
| **BT-95** | Document level allowance VAT category code | 1..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='false']/cac:TaxCategory/cbc:ID` | VAT category |
| **BT-96** | Document level allowance VAT rate | 0..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='false']/cac:TaxCategory/cbc:Percent` | VAT rate |
| **BT-97** | Document level allowance reason | 0..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='false']/cbc:AllowanceChargeReason` | Reason text |
| **BT-98** | Document level allowance reason code | 0..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='false']/cbc:AllowanceChargeReasonCode` | UNCL5189 code |

---

## BG-21: DOCUMENT LEVEL CHARGES

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-99** | Document level charge amount | 1..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='true']/cbc:Amount` | Charge amount |
| **BT-100** | Document level charge base amount | 0..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='true']/cbc:BaseAmount` | Base for percentage |
| **BT-101** | Document level charge percentage | 0..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='true']/cbc:MultiplierFactorNumeric` | Charge % |
| **BT-102** | Document level charge VAT category code | 1..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='true']/cac:TaxCategory/cbc:ID` | VAT category |
| **BT-103** | Document level charge VAT rate | 0..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='true']/cac:TaxCategory/cbc:Percent` | VAT rate |
| **BT-104** | Document level charge reason | 0..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='true']/cbc:AllowanceChargeReason` | Reason text |
| **BT-105** | Document level charge reason code | 0..1 | `cac:AllowanceCharge[cbc:ChargeIndicator='true']/cbc:AllowanceChargeReasonCode` | UNCL7161 code |

---

## BG-22: DOCUMENT TOTALS

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-106** | Sum of Invoice line net amount | 1..1 | `cac:LegalMonetaryTotal/cbc:LineExtensionAmount` | Sum of all line net amounts |
| **BT-107** | Sum of allowances on document level | 0..1 | `cac:LegalMonetaryTotal/cbc:AllowanceTotalAmount` | Total allowances |
| **BT-108** | Sum of charges on document level | 0..1 | `cac:LegalMonetaryTotal/cbc:ChargeTotalAmount` | Total charges |
| **BT-109** | Invoice total amount without VAT | 1..1 | `cac:LegalMonetaryTotal/cbc:TaxExclusiveAmount` | Net total before VAT |
| **BT-110** | Invoice total VAT amount | 1..1 | `cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount - cac:LegalMonetaryTotal/cbc:TaxExclusiveAmount` | Total VAT (calculated) |
| **BT-111** | Invoice total VAT amount in accounting currency | 0..1 | `cac:TaxTotal[cbc:TaxAmount/@currencyID != ../cbc:DocumentCurrencyCode]/cbc:TaxAmount` | VAT in accounting currency |
| **BT-112** | Invoice total amount with VAT | 1..1 | `cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount` | Gross total |
| **BT-113** | Paid amount | 0..1 | `cac:LegalMonetaryTotal/cbc:PrepaidAmount` | Amount already paid |
| **BT-114** | Rounding amount | 0..1 | `cac:LegalMonetaryTotal/cbc:PayableRoundingAmount` | Rounding adjustment |
| **BT-115** | Amount due for payment | 1..1 | `cac:LegalMonetaryTotal/cbc:PayableAmount` | Final payable amount |

---

## BG-23: VAT BREAKDOWN

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-116** | VAT category taxable amount | 1..1 | `cac:TaxTotal/cac:TaxSubtotal/cbc:TaxableAmount` | Taxable base per category |
| **BT-117** | VAT category tax amount | 1..1 | `cac:TaxTotal/cac:TaxSubtotal/cbc:TaxAmount` | VAT amount per category |
| **BT-118** | VAT category code | 1..1 | `cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cbc:ID` | S=Standard, Z=Zero, E=Exempt, AE=Reverse charge |
| **BT-119** | VAT category rate | 0..1 | `cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cbc:Percent` | VAT rate percentage |
| **BT-120** | VAT exemption reason code | 0..1 | `cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cbc:TaxExemptionReasonCode` | Exemption code |
| **BT-121** | VAT exemption reason text | 0..1 | `cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cbc:TaxExemptionReason` | Exemption reason |

---

## BG-24: ADDITIONAL SUPPORTING DOCUMENTS

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-122** | Supporting document reference | 1..1 | `cac:AdditionalDocumentReference/cbc:ID` | Document identifier |
| **BT-123** | Supporting document description | 0..1 | `cac:AdditionalDocumentReference/cbc:DocumentDescription` | Description |
| **BT-124** | External document location | 0..1 | `cac:AdditionalDocumentReference/cac:Attachment/cac:ExternalReference/cbc:URI` | URL to document |
| **BT-125** | Attached document | 0..1 | `cac:AdditionalDocumentReference/cac:Attachment/cbc:EmbeddedDocumentBinaryObject` | Base64 embedded |

---

## BG-25: INVOICE LINE

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-126** | Invoice line identifier | 1..1 | `cac:InvoiceLine/cbc:ID` | Line sequence number |
| **BT-127** | Invoice line note | 0..1 | `cac:InvoiceLine/cbc:Note` | Free text line note |
| **BT-128** | Invoice line object identifier | 0..1 | `cac:InvoiceLine/cac:DocumentReference/cbc:ID` | Object identifier |
| **BT-129** | Invoiced quantity | 1..1 | `cac:InvoiceLine/cbc:InvoicedQuantity` | Quantity with unit |
| **BT-130** | Invoiced quantity unit of measure code | 1..1 | `cac:InvoiceLine/cbc:InvoicedQuantity/@unitCode` | UN/ECE Rec 20 |
| **BT-131** | Invoice line net amount | 1..1 | `cac:InvoiceLine/cbc:LineExtensionAmount` | Net line amount |
| **BT-132** | Referenced purchase order line reference | 0..1 | `cac:InvoiceLine/cac:OrderLineReference/cbc:LineID` | PO line reference |
| **BT-133** | Invoice line Buyer accounting reference | 0..1 | `cac:InvoiceLine/cbc:AccountingCost` | Buyer cost center |

### BG-26: INVOICE LINE PERIOD

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-134** | Invoice line period start date | 0..1 | `cac:InvoiceLine/cac:InvoicePeriod/cbc:StartDate` | Line period start |
| **BT-135** | Invoice line period end date | 0..1 | `cac:InvoiceLine/cac:InvoicePeriod/cbc:EndDate` | Line period end |

### BG-27: LINE LEVEL ALLOWANCES

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-136** | Invoice line allowance amount | 1..1 | `cac:InvoiceLine/cac:AllowanceCharge[cbc:ChargeIndicator='false']/cbc:Amount` | Allowance |
| **BT-137** | Invoice line allowance base amount | 0..1 | `cac:InvoiceLine/cac:AllowanceCharge[cbc:ChargeIndicator='false']/cbc:BaseAmount` | Base amount |
| **BT-138** | Invoice line allowance percentage | 0..1 | `cac:InvoiceLine/cac:AllowanceCharge[cbc:ChargeIndicator='false']/cbc:MultiplierFactorNumeric` | Percentage |
| **BT-139** | Invoice line allowance reason code | 0..1 | `cac:InvoiceLine/cac:AllowanceCharge[cbc:ChargeIndicator='false']/cbc:AllowanceChargeReasonCode` | UNCL5189 |
| **BT-140** | Invoice line allowance reason | 0..1 | `cac:InvoiceLine/cac:AllowanceCharge[cbc:ChargeIndicator='false']/cbc:AllowanceChargeReason` | Reason text |

### BG-28: LINE LEVEL CHARGES

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-141** | Invoice line charge amount | 1..1 | `cac:InvoiceLine/cac:AllowanceCharge[cbc:ChargeIndicator='true']/cbc:Amount` | Charge |
| **BT-142** | Invoice line charge base amount | 0..1 | `cac:InvoiceLine/cac:AllowanceCharge[cbc:ChargeIndicator='true']/cbc:BaseAmount` | Base amount |
| **BT-143** | Invoice line charge percentage | 0..1 | `cac:InvoiceLine/cac:AllowanceCharge[cbc:ChargeIndicator='true']/cbc:MultiplierFactorNumeric` | Percentage |
| **BT-144** | Invoice line charge reason code | 0..1 | `cac:InvoiceLine/cac:AllowanceCharge[cbc:ChargeIndicator='true']/cbc:AllowanceChargeReasonCode` | UNCL7161 |
| **BT-145** | Invoice line charge reason | 0..1 | `cac:InvoiceLine/cac:AllowanceCharge[cbc:ChargeIndicator='true']/cbc:AllowanceChargeReason` | Reason text |

### BG-29: PRICE DETAILS

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-146** | Item net price | 1..1 | `cac:InvoiceLine/cac:Price/cbc:PriceAmount` | Unit price net |
| **BT-147** | Item price discount | 0..1 | `cac:InvoiceLine/cac:Price/cac:AllowanceCharge/cbc:Amount` | Price discount |
| **BT-148** | Item gross price | 0..1 | `cac:InvoiceLine/cac:Price/cac:AllowanceCharge/cbc:BaseAmount` | Gross price |
| **BT-149** | Item price base quantity | 0..1 | `cac:InvoiceLine/cac:Price/cbc:BaseQuantity` | Price per X units |
| **BT-150** | Item price base quantity unit of measure code | 0..1 | `cac:InvoiceLine/cac:Price/cbc:BaseQuantity/@unitCode` | UN/ECE Rec 20 |

### BG-30: LINE VAT INFORMATION

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-151** | Invoiced item VAT category code | 1..1 | `cac:InvoiceLine/cac:Item/cac:ClassifiedTaxCategory/cbc:ID` | VAT category |
| **BT-152** | Invoiced item VAT rate | 0..1 | `cac:InvoiceLine/cac:Item/cac:ClassifiedTaxCategory/cbc:Percent` | VAT rate |

### BG-31: ITEM INFORMATION

| EN 16931-1 ID | EN 16931-1 Element Name | Card. | UBL 2.4 XPath | Notes |
|---------------|------------------------|-------|---------------|-------|
| **BT-153** | Item name | 1..1 | `cac:InvoiceLine/cac:Item/cbc:Name` | Item description |
| **BT-154** | Item description | 0..1 | `cac:InvoiceLine/cac:Item/cbc:Description` | Additional description |
| **BT-155** | Item Seller's identifier | 0..1 | `cac:InvoiceLine/cac:Item/cac:SellersItemIdentification/cbc:ID` | Seller's item number |
| **BT-156** | Item Buyer's identifier | 0..1 | `cac:InvoiceLine/cac:Item/cac:BuyersItemIdentification/cbc:ID` | Buyer's item number |
| **BT-157** | Item standard identifier | 0..1 | `cac:InvoiceLine/cac:Item/cac:StandardItemIdentification/cbc:ID` | GTIN, EAN, etc. |
| **BT-158** | Item classification identifier | 0..n | `cac:InvoiceLine/cac:Item/cac:CommodityClassification/cbc:ItemClassificationCode` | UNSPSC, CPV, etc. |
| **BT-159** | Item country of origin | 0..1 | `cac:InvoiceLine/cac:Item/cac:OriginCountry/cbc:IdentificationCode` | ISO 3166-1 |
| **BT-160** | Item attribute name | 0..1 | `cac:InvoiceLine/cac:Item/cac:AdditionalItemProperty/cbc:Name` | Attribute name |
| **BT-161** | Item attribute value | 0..1 | `cac:InvoiceLine/cac:Item/cac:AdditionalItemProperty/cbc:Value` | Attribute value |

---

## Code Lists Reference

### Invoice Type Codes (BT-3) - UNCL1001
- **380** - Commercial invoice
- **381** - Credit note
- **383** - Debit note
- **386** - Prepayment invoice
- **389** - Self-billed invoice
- **751** - Invoice information for accounting purposes

### Payment Means Codes (BT-81) - UNCL4461
- **1** - Instrument not defined
- **10** - In cash
- **30** - Credit transfer
- **42** - Payment to bank account
- **48** - Bank card
- **49** - Direct debit
- **57** - Standing agreement
- **58** - SEPA credit transfer
- **59** - SEPA direct debit

### VAT Category Codes (BT-118, BT-151) - UNCL5305
- **S** - Standard rate
- **Z** - Zero rated goods
- **E** - Exempt from tax
- **AE** - VAT Reverse Charge
- **K** - VAT exempt for EEA intra-community supply
- **G** - Free export item, tax not charged
- **O** - Services outside scope of tax
- **L** - Canary Islands general indirect tax
- **M** - Tax for production, services and importation in Ceuta and Melilla

### Unit of Measure Codes (BT-130, BT-150) - UN/ECE Recommendation 20
- **C62** - one (piece)
- **LTR** - litre
- **KGM** - kilogram
- **MTR** - metre
- **MTK** - square metre
- **MTQ** - cubic metre
- **HUR** - hour
- **DAY** - day
- **MON** - month
- **TNE** - tonne (metric ton)

---

## Namespace Declarations for UBL 2.4 Invoice

```xml
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
```

---

## Additional Notes

1. **Mandatory Elements**: Elements with cardinality 1..1 MUST be present
2. **Conditional Elements**: Some elements are conditionally mandatory based on business rules (e.g., BT-9 or BT-20 must be present if amount due > 0)
3. **XPath Notation**: All paths use abbreviated syntax; `/` = child, `@` = attribute
4. **Code Lists**: All code list values must match UN/CEFACT or OASIS specified values
5. **Scheme Identifiers**: ID elements often require `@schemeID` attribute (ISO 6523, ISO 3166, etc.)
6. **Currency**: All monetary amounts must include `@currencyID` attribute (ISO 4217)

---

**Document Version**: 1.0  
**Based on**: EN 16931-1:2017, UBL 2.4 (June 2024), Peppol BIS Billing 3.0  
**Last Updated**: 2024-11-15
