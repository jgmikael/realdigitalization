# W3C VC Business Document Demo Application

**Complete working demo of the semantic modeling process**

## Overview

This application demonstrates the complete workflow:
1. **SHACL Shape Generation** from business requirements
2. **JSON-LD @context Generation** from SHACL shapes
3. **Data Extraction** from SAP (mocked)
4. **W3C VC Issuance** with Ed25519 signatures
5. **Business Wallet** storage and presentation

## Features

✅ SHACL generator from YAML requirements  
✅ Automatic JSON-LD context generation  
✅ W3C VC issuance with DID authentication  
✅ Self-issued VC model (holder = issuer)  
✅ Basic business wallet with storage  
✅ Presentation creation  
✅ VC verification  
✅ Multi-document support (Invoice, PO, eCMR)  
✅ REST API  
✅ Web UI (React)  

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd vc-demo-app
npm install
```

### Run Server

```bash
npm run dev
```

Server runs at: **http://localhost:3000**

### Run Demo

```bash
# Generate SHACL shape from business requirements
curl -X POST http://localhost:3000/api/shacl/generate \
  -H "Content-Type: application/json" \
  -d @examples/invoice-requirements.json

# Generate JSON-LD context from SHACL
curl -X POST http://localhost:3000/api/context/generate \
  -H "Content-Type: text/turtle" \
  --data-binary @output/invoice-shape.ttl

# Issue VC
curl -X POST http://localhost:3000/api/vc/issue \
  -H "Content-Type: application/json" \
  -d @examples/invoice-data.json

# Store in wallet
curl -X POST http://localhost:3000/api/wallet/store \
  -H "Content-Type: application/json" \
  -d @output/invoice-vc.json
```

## API Endpoints

### SHACL Generation

**POST** `/api/shacl/generate`

Generate SHACL shapes from business requirements.

**Request**:
```json
{
  "document": {
    "name": "Invoice",
    "baseVocabulary": "busdoc"
  },
  "fields": [
    {
      "name": "invoiceNumber",
      "source": "busdoc:iD",
      "datatype": "xsd:string",
      "cardinality": "1..1"
    }
  ]
}
```

**Response**: SHACL Turtle

---

### Context Generation

**POST** `/api/context/generate`

Generate JSON-LD @context from SHACL shape.

**Request**: SHACL Turtle (Content-Type: text/turtle)

**Response**:
```json
{
  "@context": {
    "busdoc": "https://iri.suomi.fi/model/busdoc/",
    "invoiceNumber": {
      "@id": "busdoc:iD",
      "@type": "xsd:string"
    }
  }
}
```

---

### VC Issuance

**POST** `/api/vc/issue`

Issue a W3C Verifiable Credential.

**Request**:
```json
{
  "documentType": "Invoice",
  "issuerDid": "did:key:z6Mkf...",
  "credentialSubject": {
    "invoiceNumber": "INV-2024-001",
    "issueDate": "2024-03-12",
    "seller": { "name": "Example Oy" },
    "buyer": { "name": "Buyer Ltd" }
  }
}
```

**Response**:
```json
{
  "@context": [...],
  "type": ["VerifiableCredential", "EN16931Invoice"],
  "issuer": "did:key:z6Mkf...",
  "issuanceDate": "2024-03-12T10:00:00Z",
  "credentialSubject": {...},
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2024-03-12T10:00:00Z",
    "proofValue": "z58DAd..."
  }
}
```

---

### Wallet Storage

**POST** `/api/wallet/store`

Store VC in wallet.

**GET** `/api/wallet/credentials`

List all stored credentials.

**GET** `/api/wallet/credentials/:id`

Get specific credential.

---

### Presentation

**POST** `/api/wallet/present`

Create verifiable presentation.

**Request**:
```json
{
  "credentialIds": ["urn:uuid:..."],
  "holder": "did:key:z6Mkf...",
  "verifier": "did:key:z6Mkf..."
}
```

## Project Structure

```
vc-demo-app/
├── server/
│   ├── index.ts              # Express server
│   ├── routes/
│   │   ├── shacl.ts          # SHACL generation API
│   │   ├── context.ts        # Context generation API
│   │   ├── vc.ts             # VC issuance API
│   │   └── wallet.ts         # Wallet API
│   ├── services/
│   │   ├── SHACLGenerator.ts
│   │   ├── ContextGenerator.ts
│   │   ├── VCIssuer.ts
│   │   ├── DIDManager.ts
│   │   └── WalletService.ts
│   └── utils/
│       └── sapMock.ts        # Mock SAP data
├── client/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── SHACLBuilder.tsx
│   │   │   ├── ContextViewer.tsx
│   │   │   ├── VCIssuer.tsx
│   │   │   └── Wallet.tsx
│   │   └── services/
│   │       └── api.ts
│   └── public/
├── shared/
│   ├── types.ts              # Shared TypeScript types
│   └── schemas/              # Example documents
├── examples/
│   ├── invoice-requirements.json
│   ├── invoice-data.json
│   └── po-requirements.json
└── package.json
```

## Example Workflow

### 1. Define Business Requirements

Create `invoice-requirements.json`:

```json
{
  "document": {
    "name": "Invoice",
    "version": "1.0",
    "baseVocabulary": "busdoc"
  },
  "fields": [
    {
      "name": "invoiceNumber",
      "source": "busdoc:iD",
      "datatype": "xsd:string",
      "cardinality": "1..1",
      "description": "Unique invoice identifier"
    },
    {
      "name": "issueDate",
      "source": "busdoc:issueDate",
      "datatype": "xsd:date",
      "cardinality": "1..1"
    },
    {
      "name": "seller",
      "source": "busdoc:sellerSupplierParty",
      "type": "Party",
      "cardinality": "1..1"
    }
  ],
  "types": {
    "Party": {
      "fields": [
        {
          "name": "name",
          "source": "busdoc:name",
          "datatype": "xsd:string",
          "cardinality": "1..1"
        }
      ]
    }
  }
}
```

### 2. Generate SHACL Shape

```bash
curl -X POST http://localhost:3000/api/shacl/generate \
  -H "Content-Type: application/json" \
  -d @invoice-requirements.json \
  > invoice-shape.ttl
```

### 3. Generate JSON-LD Context

```bash
curl -X POST http://localhost:3000/api/context/generate \
  -H "Content-Type: text/turtle" \
  --data-binary @invoice-shape.ttl \
  > invoice-context.jsonld
```

### 4. Extract Data from SAP (Mock)

```bash
curl http://localhost:3000/api/sap/invoice/90123456 > sap-invoice.json
```

### 5. Issue VC

```bash
curl -X POST http://localhost:3000/api/vc/issue \
  -H "Content-Type: application/json" \
  -d '{
    "documentType": "Invoice",
    "credentialSubject": '$(cat sap-invoice.json)'
  }' > invoice-vc.json
```

### 6. Store in Wallet

```bash
curl -X POST http://localhost:3000/api/wallet/store \
  -H "Content-Type: application/json" \
  -d @invoice-vc.json
```

### 7. Create Presentation for Buyer

```bash
curl -X POST http://localhost:3000/api/wallet/present \
  -H "Content-Type: application/json" \
  -d '{
    "credentialIds": ["urn:uuid:..."],
    "holder": "did:key:seller123",
    "verifier": "did:key:buyer456"
  }' > presentation.json
```

## Web UI

Access the web UI at: **http://localhost:3000**

### Features:

1. **SHACL Builder**
   - Visual form for requirements
   - Add/remove fields
   - Select vocabularies
   - Generate SHACL

2. **Context Generator**
   - Upload SHACL file
   - Preview generated context
   - Download .jsonld

3. **VC Issuer**
   - Select document type
   - Input/upload data
   - Generate DID (or use existing)
   - Issue and sign VC

4. **Wallet**
   - View all credentials
   - Filter by type/date
   - Create presentations
   - Verify credentials
   - Export reports

## Testing

```bash
npm test
```

Tests cover:
- SHACL generation
- Context generation
- VC issuance
- VC verification
- Wallet operations

## Deployment

### Docker

```bash
docker build -t vc-demo-app .
docker run -p 3000:3000 vc-demo-app
```

### Cloud

Deploy to any Node.js hosting:
- Heroku
- AWS Lambda
- Azure App Service
- Google Cloud Run

## Configuration

Environment variables:

```env
PORT=3000
NODE_ENV=production
WALLET_STORAGE_PATH=./data/wallet
DID_KEY_PATH=./data/keys
ENABLE_CORS=true
```

## Security Notes

⚠️ **This is a demo application**

For production:
- Use proper key management (HSM)
- Implement authentication
- Use HTTPS
- Store keys securely
- Implement rate limiting
- Add input validation
- Use production DID methods (EBSI, not did:key)

## License

MIT

## Links

- **Documentation**: [semantic-modeling-process.md](../semantic-modeling-process.md)
- **GitHub**: https://github.com/jgmikael/realdigitalization
- **W3C VC Spec**: https://www.w3.org/TR/vc-data-model/
- **SHACL Spec**: https://www.w3.org/TR/shacl/
