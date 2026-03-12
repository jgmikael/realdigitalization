# W3C VC eInvoice Architecture

## Overall Architecture

```mermaid
graph TB
    subgraph "Standards Layer"
        EN16931[EN 16931-1<br/>Semantic Model]
        UBL[UBL 2.4<br/>XML Syntax]
        VC[W3C Verifiable<br/>Credentials]
        JSONLD[JSON-LD 1.1<br/>Linked Data]
    end
    
    subgraph "Ontology Layer"
        BUSDOC[busdoc OWL Ontology<br/>Verohallinto]
        CONTEXT[JSON-LD @context<br/>EN16931→busdoc]
    end
    
    subgraph "Implementation Layer"
        VCEINV[VC eInvoice<br/>JSON-LD Document]
        PROOF[Digital Signature<br/>Ed25519/BBS+]
        DID[DID Identity<br/>Issuer/Subject]
    end
    
    subgraph "Application Layer"
        WALLET[EU Business Wallet]
        ACCOUNTING[Accounting Systems]
        PORTAL[Invoice Portal]
        API[Invoice API]
    end
    
    EN16931 --> BUSDOC
    UBL --> BUSDOC
    EN16931 --> CONTEXT
    BUSDOC --> CONTEXT
    VC --> VCEINV
    JSONLD --> VCEINV
    CONTEXT --> VCEINV
    DID --> VCEINV
    PROOF --> VCEINV
    VCEINV --> WALLET
    VCEINV --> ACCOUNTING
    VCEINV --> PORTAL
    VCEINV --> API
    
    style EN16931 fill:#e1f5ff
    style BUSDOC fill:#ffe1e1
    style VCEINV fill:#e1ffe1
    style WALLET fill:#fff4e1
```

## W3C VC Structure

```mermaid
graph TB
    VC[Verifiable Credential]
    
    VC --> CONTEXT[@context]
    VC --> TYPE[type]
    VC --> ID[id]
    VC --> ISSUER[issuer]
    VC --> ISSUED[issuanceDate]
    VC --> EXPIRES[expirationDate]
    VC --> SUBJECT[credentialSubject]
    VC --> PROOF[proof]
    
    CONTEXT --> VC_CONTEXT[W3C VC Context]
    CONTEXT --> EN_CONTEXT[EN16931 Context]
    
    TYPE --> VC_TYPE[VerifiableCredential]
    TYPE --> INVOICE_TYPE[EN16931Invoice]
    
    ISSUER --> DID[did:example:seller123]
    ISSUER --> NAME[Issuer Name]
    ISSUER --> VAT[VAT ID]
    
    SUBJECT --> INVOICE[Invoice Data]
    INVOICE --> HEADER[Header Info]
    INVOICE --> SELLER[Seller Party]
    INVOICE --> BUYER[Buyer Party]
    INVOICE --> DELIVERY[Delivery]
    INVOICE --> PAYMENT[Payment Means]
    INVOICE --> TAX[Tax Total]
    INVOICE --> TOTALS[Monetary Total]
    INVOICE --> LINES[Invoice Lines]
    
    PROOF --> SIG_TYPE[Ed25519Signature2020]
    PROOF --> CREATED[Signature Date]
    PROOF --> METHOD[Verification Method]
    PROOF --> PURPOSE[Proof Purpose]
    PROOF --> VALUE[Signature Value]
    
    style VC fill:#e1f5ff
    style SUBJECT fill:#e1ffe1
    style PROOF fill:#ffe1e1
```

## EN 16931-1 Semantic to VC Mapping

```mermaid
graph LR
    subgraph "EN 16931-1 Semantic Model"
        BT1[BT-1: Invoice Number]
        BT2[BT-2: Issue Date]
        BT5[BT-5: Currency Code]
        BG4[BG-4: Seller]
        BG7[BG-7: Buyer]
        BG25[BG-25: Invoice Line]
    end
    
    subgraph "busdoc Ontology"
        ID[busdoc:iD]
        ISSUE[busdoc:issueDate]
        CURR[busdoc:documentCurrencyCode]
        SELLER[busdoc:sellerSupplierParty]
        BUYER[busdoc:buyerCustomerParty]
        LINE[busdoc:invoiceLine]
    end
    
    subgraph "JSON-LD @context"
        CTX[en16931-context.jsonld]
    end
    
    subgraph "VC credentialSubject"
        INV_NUM[invoiceNumber]
        INV_DATE[issueDate]
        DOC_CURR[documentCurrencyCode]
        SELL_PARTY[seller]
        BUY_PARTY[buyer]
        INV_LINE[invoiceLine]
    end
    
    BT1 -->|mapped via| CTX
    BT2 -->|mapped via| CTX
    BT5 -->|mapped via| CTX
    BG4 -->|mapped via| CTX
    BG7 -->|mapped via| CTX
    BG25 -->|mapped via| CTX
    
    CTX -->|resolves to| ID
    CTX -->|resolves to| ISSUE
    CTX -->|resolves to| CURR
    CTX -->|resolves to| SELLER
    CTX -->|resolves to| BUYER
    CTX -->|resolves to| LINE
    
    ID -->|appears as| INV_NUM
    ISSUE -->|appears as| INV_DATE
    CURR -->|appears as| DOC_CURR
    SELLER -->|appears as| SELL_PARTY
    BUYER -->|appears as| BUY_PARTY
    LINE -->|appears as| INV_LINE
    
    style BT1 fill:#e1f5ff
    style CTX fill:#ffe1e1
    style ID fill:#fff4e1
    style INV_NUM fill:#e1ffe1
```

## Invoice Lifecycle with VCs

```mermaid
sequenceDiagram
    participant Seller
    participant SellerWallet as Seller's Business Wallet
    participant Network as Invoice Network
    participant BuyerWallet as Buyer's Business Wallet
    participant Buyer
    participant Verifier as Tax Authority/Auditor
    
    Note over Seller,Buyer: 1. Invoice Creation
    Seller->>SellerWallet: Create invoice data (EN 16931-1)
    SellerWallet->>SellerWallet: Wrap as VC credentialSubject
    SellerWallet->>SellerWallet: Sign with seller's DID key
    SellerWallet->>SellerWallet: Generate VC with proof
    
    Note over Seller,Buyer: 2. Invoice Transmission
    SellerWallet->>Network: Send VC invoice
    Network->>BuyerWallet: Deliver VC invoice
    
    Note over Seller,Buyer: 3. Invoice Verification
    BuyerWallet->>BuyerWallet: Resolve seller's DID document
    BuyerWallet->>BuyerWallet: Verify cryptographic signature
    BuyerWallet->>BuyerWallet: Validate EN 16931-1 rules
    BuyerWallet->>Buyer: Present verified invoice
    
    Note over Seller,Buyer: 4. Payment Processing
    Buyer->>BuyerWallet: Approve payment
    BuyerWallet->>Network: Initiate payment (ISO 20022)
    Network->>SellerWallet: Payment confirmation
    
    Note over Seller,Verifier: 5. Audit/Compliance
    Verifier->>Network: Request invoice VC
    Network->>Verifier: Provide VC invoice
    Verifier->>Verifier: Verify signature
    Verifier->>Verifier: Extract and analyze data
    Verifier->>Verifier: Compliance check passed ✓
    
    style Seller fill:#e1f5ff
    style SellerWallet fill:#ffe1e1
    style BuyerWallet fill:#ffe1e1
    style Buyer fill:#e1f5ff
    style Verifier fill:#fff4e1
```

## Data Flow: XML UBL vs JSON-LD VC

```mermaid
graph TB
    subgraph "Traditional UBL Flow"
        XML_CREATE[Create UBL Invoice<br/>XML]
        XML_SIGN[Optional XML Signature]
        XML_SEND[Send via Peppol/AS4]
        XML_RECEIVE[Receive XML]
        XML_PARSE[Parse XML]
        XML_VALIDATE[XSD/Schematron<br/>Validation]
        XML_EXTRACT[Extract to DB]
        
        XML_CREATE --> XML_SIGN
        XML_SIGN --> XML_SEND
        XML_SEND --> XML_RECEIVE
        XML_RECEIVE --> XML_PARSE
        XML_PARSE --> XML_VALIDATE
        XML_VALIDATE --> XML_EXTRACT
    end
    
    subgraph "VC JSON-LD Flow"
        VC_CREATE[Create Invoice Data<br/>JSON]
        VC_WRAP[Wrap as VC<br/>credentialSubject]
        VC_SIGN[Sign with DID Key<br/>Ed25519/BBS+]
        VC_SEND[Store in Wallet<br/>or Send]
        VC_RECEIVE[Receive VC]
        VC_VERIFY[Verify Signature<br/>via DID Resolution]
        VC_VALIDATE[Validate JSON Schema<br/>& Business Rules]
        VC_EXTRACT[Extract credentialSubject]
        
        VC_CREATE --> VC_WRAP
        VC_WRAP --> VC_SIGN
        VC_SIGN --> VC_SEND
        VC_SEND --> VC_RECEIVE
        VC_RECEIVE --> VC_VERIFY
        VC_VERIFY --> VC_VALIDATE
        VC_VALIDATE --> VC_EXTRACT
    end
    
    style XML_CREATE fill:#e1f5ff
    style VC_CREATE fill:#e1ffe1
    style XML_SIGN fill:#ffe1e1
    style VC_SIGN fill:#ffe1e1
```

## Integration Points

```mermaid
graph TB
    subgraph "External Systems"
        ERP[ERP Systems<br/>SAP, NetSuite]
        ACCOUNTING[Accounting SW<br/>Procountor, Xero]
        BANK[Banking APIs<br/>ISO 20022]
        PEPPOL[Peppol Network<br/>Access Points]
        EIDAS[eIDAS 2.0<br/>Identity Providers]
    end
    
    subgraph "VC eInvoice Platform"
        WALLET[Business Wallet]
        ISSUER[VC Issuer Service]
        VERIFIER[VC Verifier Service]
        STORAGE[VC Storage]
        GATEWAY[API Gateway]
    end
    
    ERP -->|Create invoice data| ISSUER
    ISSUER -->|Issue VC| WALLET
    WALLET -->|Store VC| STORAGE
    WALLET -->|Present VC| VERIFIER
    VERIFIER -->|Verified data| ACCOUNTING
    VERIFIER -->|Payment instruction| BANK
    GATEWAY -->|Peppol format| PEPPOL
    EIDAS -->|DID resolution| VERIFIER
    
    style WALLET fill:#e1ffe1
    style ISSUER fill:#ffe1e1
    style VERIFIER fill:#e1f5ff
```

## Security & Trust Model

```mermaid
graph TB
    subgraph "Trust Anchors"
        TRUST_REG[Business Registry<br/>PRH/YTJ]
        TRUST_VAT[VAT Registry<br/>VIES]
        TRUST_CERT[Certificate Authority<br/>eIDAS Qualified]
    end
    
    subgraph "DID Infrastructure"
        DID_REG[DID Registry<br/>EBSI/Ethereum]
        DID_DOC[DID Document<br/>Public Keys]
        DID_METHOD[DID Method<br/>did:ebsi, did:web]
    end
    
    subgraph "VC Components"
        VC_ISSUER[Issuer DID]
        VC_SUBJECT[Subject DID]
        VC_PROOF[Cryptographic Proof]
        VC_DATA[Invoice Data]
    end
    
    subgraph "Verification"
        VERIFY_DID[Resolve DID]
        VERIFY_SIG[Verify Signature]
        VERIFY_STATUS[Check Revocation]
        VERIFY_TRUST[Verify Trust Chain]
    end
    
    TRUST_REG -->|Anchors| DID_REG
    TRUST_VAT -->|Validates| VC_SUBJECT
    TRUST_CERT -->|Issues| DID_DOC
    
    DID_REG --> DID_DOC
    DID_METHOD --> DID_DOC
    
    VC_ISSUER -->|References| DID_DOC
    VC_SUBJECT -->|References| DID_DOC
    VC_PROOF -->|Uses key from| DID_DOC
    
    VC_ISSUER --> VERIFY_DID
    VERIFY_DID --> VERIFY_SIG
    VERIFY_SIG --> VERIFY_STATUS
    VERIFY_STATUS --> VERIFY_TRUST
    
    style TRUST_REG fill:#e1f5ff
    style DID_REG fill:#ffe1e1
    style VC_PROOF fill:#fff4e1
    style VERIFY_TRUST fill:#e1ffe1
```

## Comparison: Traditional vs VC eInvoice

| Aspect | Traditional UBL XML | W3C VC JSON-LD |
|--------|-------------------|----------------|
| **Format** | XML (verbose) | JSON (concise) |
| **Semantic Layer** | XSD schemas | JSON-LD + OWL ontology |
| **Identity** | X.509 certificates | DIDs (decentralized) |
| **Signature** | XMLDSig | JSON-LD proof (Ed25519, BBS+) |
| **Transport** | Peppol AS4, SFTP | HTTPS, DIDComm, Wallet |
| **Verification** | CA chain of trust | DID resolution + crypto |
| **Selective Disclosure** | Not supported | BBS+ signatures |
| **Revocation** | CRL/OCSP | StatusList2021 |
| **Interoperability** | UBL 2.x versions | Linked Data (IRIs) |
| **Wallet Support** | No | Native |
| **Web3 Ready** | No | Yes |

## Implementation Checklist

### Phase 1: Foundation ✅
- [x] JSON-LD @context creation
- [x] W3C VC structure definition
- [x] Example invoice with all EN 16931-1 elements
- [x] Documentation and architecture diagrams

### Phase 2: Validation (Next)
- [ ] JSON Schema for structure validation
- [ ] Business rule validation engine
- [ ] EN 16931-1 cardinality checks
- [ ] Unit tests for validation

### Phase 3: Cryptography
- [ ] DID key generation utilities
- [ ] Ed25519 signature implementation
- [ ] BBS+ signature support (selective disclosure)
- [ ] Signature verification library

### Phase 4: Integration
- [ ] EU Business Wallet adapter
- [ ] ERP system connectors
- [ ] Peppol Access Point bridge
- [ ] ISO 20022 payment integration

### Phase 5: Production
- [ ] DID registry integration (EBSI)
- [ ] Revocation mechanism
- [ ] Audit logging
- [ ] Performance optimization
- [ ] Security hardening

---

**Last Updated**: 2024-03-12  
**Version**: 0.1.0 (Draft)
