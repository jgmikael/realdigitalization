# EN 16931-1 eInvoice Data Model - Mermaid Diagrams

## Core Invoice Structure

```mermaid
graph TB
    Invoice[EN 16931-1 Invoice]
    
    Invoice --> BG1[BG-1: INVOICE NOTE]
    Invoice --> BG2[BG-2: PROCESS CONTROL]
    Invoice --> BG3[BG-3: PRECEDING INVOICE REFERENCE]
    Invoice --> BG4[BG-4: SELLER]
    Invoice --> BG5[BG-5: SELLER POSTAL ADDRESS]
    Invoice --> BG6[BG-6: SELLER CONTACT]
    Invoice --> BG7[BG-7: BUYER]
    Invoice --> BG8[BG-8: BUYER POSTAL ADDRESS]
    Invoice --> BG9[BG-9: BUYER CONTACT]
    Invoice --> BG10[BG-10: PAYEE]
    Invoice --> BG11[BG-11: SELLER TAX REPRESENTATIVE]
    Invoice --> BG13[BG-13: DELIVERY INFORMATION]
    Invoice --> BG15[BG-15: DELIVER TO ADDRESS]
    Invoice --> BG16[BG-16: PAYMENT INSTRUCTIONS]
    Invoice --> BG17[BG-17: CREDIT TRANSFER]
    Invoice --> BG18[BG-18: PAYMENT CARD]
    Invoice --> BG19[BG-19: DIRECT DEBIT]
    Invoice --> BG20[BG-20: DOCUMENT LEVEL ALLOWANCES]
    Invoice --> BG21[BG-21: DOCUMENT LEVEL CHARGES]
    Invoice --> BG22[BG-22: DOCUMENT TOTALS]
    Invoice --> BG23[BG-23: VAT BREAKDOWN]
    Invoice --> BG25[BG-25: INVOICE LINE]
    Invoice --> BG26[BG-26: INVOICE LINE PERIOD]
    Invoice --> BG27[BG-27: INVOICE LINE ALLOWANCES]
    Invoice --> BG28[BG-28: INVOICE LINE CHARGES]
    Invoice --> BG29[BG-29: PRICE DETAILS]
    Invoice --> BG30[BG-30: LINE VAT INFORMATION]
    Invoice --> BG31[BG-31: ITEM INFORMATION]
    
    style Invoice fill:#e1f5ff
    style BG4 fill:#ffe1e1
    style BG7 fill:#ffe1e1
    style BG22 fill:#e1ffe1
    style BG25 fill:#fff4e1
```

## Invoice Header Details

```mermaid
graph LR
    Header[Invoice Header]
    
    Header --> BT1[BT-1: Invoice number]
    Header --> BT2[BT-2: Invoice issue date]
    Header --> BT3[BT-3: Invoice type code]
    Header --> BT5[BT-5: Invoice currency code]
    Header --> BT6[BT-6: VAT accounting currency code]
    Header --> BT7[BT-7: Value added tax point date]
    Header --> BT8[BT-8: Value added tax point date code]
    Header --> BT9[BT-9: Payment due date]
    Header --> BT10[BT-10: Buyer reference]
    Header --> BT11[BT-11: Project reference]
    Header --> BT12[BT-12: Contract reference]
    Header --> BT13[BT-13: Purchase order reference]
    Header --> BT14[BT-14: Sales order reference]
    Header --> BT15[BT-15: Receiving advice reference]
    Header --> BT16[BT-16: Despatch advice reference]
    Header --> BT17[BT-17: Tender reference]
    Header --> BT19[BT-19: Buyer accounting reference]
    Header --> BT20[BT-20: Payment terms]
    
    style Header fill:#e1f5ff
```

## Party Information (Seller)

```mermaid
graph TB
    Seller[BG-4: SELLER]
    
    Seller --> BT27[BT-27: Seller name]
    Seller --> BT28[BT-28: Seller trading name]
    Seller --> BT29[BT-29: Seller identifier]
    Seller --> BT30[BT-30: Seller legal registration identifier]
    Seller --> BT31[BT-31: Seller VAT identifier]
    Seller --> BT32[BT-32: Seller tax registration identifier]
    Seller --> BT33[BT-33: Seller additional legal information]
    Seller --> BT34[BT-34: Seller electronic address]
    
    Seller --> Address[BG-5: SELLER POSTAL ADDRESS]
    Address --> BT35[BT-35: Seller address line 1]
    Address --> BT36[BT-36: Seller address line 2]
    Address --> BT37[BT-37: Seller address line 3]
    Address --> BT38[BT-38: Seller city]
    Address --> BT39[BT-39: Seller post code]
    Address --> BT40[BT-40: Seller country subdivision]
    Address --> BT41[BT-41: Seller country code]
    
    Seller --> Contact[BG-6: SELLER CONTACT]
    Contact --> BT42[BT-42: Seller contact point]
    Contact --> BT43[BT-43: Seller contact telephone]
    Contact --> BT44[BT-44: Seller contact email]
    
    style Seller fill:#ffe1e1
    style Address fill:#ffeeee
    style Contact fill:#ffeeee
```

## Invoice Line Structure

```mermaid
graph TB
    Line[BG-25: INVOICE LINE]
    
    Line --> BT126[BT-126: Invoice line identifier]
    Line --> BT127[BT-127: Invoice line note]
    Line --> BT128[BT-128: Invoice line object identifier]
    Line --> BT129[BT-129: Invoiced quantity]
    Line --> BT130[BT-130: Invoiced quantity unit]
    Line --> BT131[BT-131: Invoice line net amount]
    Line --> BT132[BT-132: Referenced purchase order line]
    Line --> BT133[BT-133: Buyer accounting reference]
    
    Line --> Period[BG-26: INVOICE LINE PERIOD]
    Period --> BT134[BT-134: Line period start date]
    Period --> BT135[BT-135: Line period end date]
    
    Line --> Allowance[BG-27: LINE ALLOWANCES]
    Allowance --> BT136[BT-136: Line allowance amount]
    Allowance --> BT137[BT-137: Line allowance base amount]
    Allowance --> BT138[BT-138: Line allowance percentage]
    Allowance --> BT139[BT-139: Line allowance reason code]
    Allowance --> BT140[BT-140: Line allowance reason]
    
    Line --> Charge[BG-28: LINE CHARGES]
    Charge --> BT141[BT-141: Line charge amount]
    Charge --> BT142[BT-142: Line charge base amount]
    Charge --> BT143[BT-143: Line charge percentage]
    Charge --> BT144[BT-144: Line charge reason code]
    Charge --> BT145[BT-145: Line charge reason]
    
    Line --> Price[BG-29: PRICE DETAILS]
    Price --> BT146[BT-146: Item net price]
    Price --> BT147[BT-147: Item price discount]
    Price --> BT148[BT-148: Item gross price]
    Price --> BT149[BT-149: Item price base quantity]
    Price --> BT150[BT-150: Item price base quantity unit]
    
    Line --> VAT[BG-30: LINE VAT INFORMATION]
    VAT --> BT151[BT-151: Invoiced item VAT category code]
    VAT --> BT152[BT-152: Invoiced item VAT rate]
    
    Line --> Item[BG-31: ITEM INFORMATION]
    Item --> BT153[BT-153: Item name]
    Item --> BT154[BT-154: Item description]
    Item --> BT155[BT-155: Item seller's identifier]
    Item --> BT156[BT-156: Item buyer's identifier]
    Item --> BT157[BT-157: Item standard identifier]
    Item --> BT158[BT-158: Item classification identifier]
    Item --> BT159[BT-159: Item country of origin]
    
    style Line fill:#fff4e1
    style Price fill:#ffffcc
    style Item fill:#e1ffe1
```

## Document Totals and VAT

```mermaid
graph TB
    Totals[BG-22: DOCUMENT TOTALS]
    
    Totals --> BT106[BT-106: Sum of Invoice line net amount]
    Totals --> BT107[BT-107: Sum of allowances on document level]
    Totals --> BT108[BT-108: Sum of charges on document level]
    Totals --> BT109[BT-109: Invoice total amount without VAT]
    Totals --> BT110[BT-110: Invoice total VAT amount]
    Totals --> BT111[BT-111: Invoice total VAT amount in accounting currency]
    Totals --> BT112[BT-112: Invoice total amount with VAT]
    Totals --> BT113[BT-113: Paid amount]
    Totals --> BT114[BT-114: Rounding amount]
    Totals --> BT115[BT-115: Amount due for payment]
    
    VAT[BG-23: VAT BREAKDOWN]
    
    VAT --> BT116[BT-116: VAT category taxable amount]
    VAT --> BT117[BT-117: VAT category tax amount]
    VAT --> BT118[BT-118: VAT category code]
    VAT --> BT119[BT-119: VAT category rate]
    VAT --> BT120[BT-120: VAT exemption reason code]
    VAT --> BT121[BT-121: VAT exemption reason text]
    
    style Totals fill:#e1ffe1
    style VAT fill:#ffe1ff
```

## Payment Instructions Flow

```mermaid
graph LR
    Payment[BG-16: PAYMENT INSTRUCTIONS]
    
    Payment --> BT81[BT-81: Payment means type code]
    Payment --> BT82[BT-82: Payment means text]
    Payment --> BT83[BT-83: Remittance information]
    
    Payment --> Credit[BG-17: CREDIT TRANSFER]
    Credit --> BT84[BT-84: Payment account identifier]
    Credit --> BT85[BT-85: Payment account name]
    Credit --> BT86[BT-86: Payment service provider identifier]
    
    Payment --> Card[BG-18: PAYMENT CARD]
    Card --> BT87[BT-87: Payment card primary account number]
    Card --> BT88[BT-88: Payment card holder name]
    
    Payment --> Debit[BG-19: DIRECT DEBIT]
    Debit --> BT89[BT-89: Mandate reference identifier]
    Debit --> BT90[BT-90: Bank assigned creditor identifier]
    Debit --> BT91[BT-91: Debited account identifier]
    
    style Payment fill:#e1e1ff
    style Credit fill:#eeeeff
    style Card fill:#eeeeff
    style Debit fill:#eeeeff
```

## Complete Invoice Information Flow

```mermaid
flowchart TD
    Start([Invoice Creation]) --> Header[Header Information<br/>BT-1 to BT-24]
    
    Header --> Parties[Party Details]
    Parties --> Seller[Seller<br/>BG-4, BG-5, BG-6]
    Parties --> Buyer[Buyer<br/>BG-7, BG-8, BG-9]
    Parties --> Payee[Payee<br/>BG-10]
    
    Header --> Delivery[Delivery Info<br/>BG-13, BG-15]
    
    Header --> Payment[Payment Instructions<br/>BG-16, BG-17, BG-18, BG-19]
    
    Header --> DocLevelAdjust[Document Level<br/>Allowances & Charges<br/>BG-20, BG-21]
    
    Header --> Lines[Invoice Lines<br/>BG-25]
    Lines --> LineLoop{For Each<br/>Line}
    LineLoop --> LineDetails[Line Details<br/>BT-126 to BT-133]
    LineLoop --> ItemDetails[Item Info<br/>BG-31]
    LineLoop --> PriceDetails[Price Details<br/>BG-29]
    LineLoop --> LineAdjust[Line Adjustments<br/>BG-27, BG-28]
    
    LineLoop --> MoreLines{More<br/>Lines?}
    MoreLines -->|Yes| LineLoop
    MoreLines -->|No| Calculate
    
    Calculate[Calculate Totals] --> Totals[Document Totals<br/>BG-22]
    Totals --> VATBreakdown[VAT Breakdown<br/>BG-23]
    
    VATBreakdown --> End([Invoice Complete])
    
    style Start fill:#90EE90
    style End fill:#FFB6C1
    style Header fill:#87CEEB
    style Lines fill:#FFD700
    style Totals fill:#98FB98
```

## EN 16931-1 Business Groups (BG) Overview

```mermaid
mindmap
  root((EN 16931-1<br/>Invoice))
    Process Control
      BG-2 Process Control
    Parties
      BG-4 Seller
        BG-5 Seller Postal Address
        BG-6 Seller Contact
      BG-7 Buyer
        BG-8 Buyer Postal Address
        BG-9 Buyer Contact
      BG-10 Payee
      BG-11 Seller Tax Representative
        BG-12 Tax Rep Postal Address
    References
      BG-3 Preceding Invoice Reference
      BG-14 Invoice Period
      BG-24 Additional Documents
    Delivery
      BG-13 Delivery Information
      BG-15 Deliver To Address
    Payment
      BG-16 Payment Instructions
        BG-17 Credit Transfer
        BG-18 Payment Card
        BG-19 Direct Debit
    Adjustments
      BG-20 Document Allowances
      BG-21 Document Charges
    Totals
      BG-22 Document Totals
      BG-23 VAT Breakdown
    Lines
      BG-25 Invoice Line
        BG-26 Line Period
        BG-27 Line Allowances
        BG-28 Line Charges
        BG-29 Price Details
        BG-30 Line VAT Information
        BG-31 Item Information
          BG-32 Item Attributes
          BG-33 Item Classification
```

## Cardinality Legend

```mermaid
graph LR
    A[1..1 = Mandatory, exactly one]
    B[0..1 = Optional, maximum one]
    C[1..n = Mandatory, one or more]
    D[0..n = Optional, zero or more]
    
    style A fill:#ff9999
    style B fill:#99ff99
    style C fill:#ffcc99
    style D fill:#99ccff
```
