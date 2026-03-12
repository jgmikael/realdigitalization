# W3C Verifiable Credentials for eCMR (Electronic Consignment Note)

**Production-ready JSON-LD Context and W3C VC structure for electronic road transport consignment notes**

## Overview

This folder contains the implementation of **eCMR** (electronic CMR - Convention relative au contrat de transport international de Marchandises par Route) as **W3C Verifiable Credentials** using the **UN/CEFACT Buy-Ship-Pay (BSP) JSON-LD vocabulary** for semantic interoperability.

### Standards Implemented

- **CMR Convention (1956)** - International carriage of goods by road
- **eCMR Protocol (2008)** - Electronic consignment note
- **UN/CEFACT BSP Reference Data Model (D23B)** - Buy-Ship-Pay vocabulary
- **W3C Verifiable Credentials Data Model 1.1** - Decentralized credential format
- **JSON-LD 1.1** - Linked Data for semantic web interoperability
- **ADR** - Agreement concerning the International Carriage of Dangerous Goods by Road

### Purpose

Enable **tamper-evident, cryptographically-verifiable electronic consignment notes** that:
- Replace paper CMR documents for international road transport
- Are legally binding under eCMR Protocol (ratified by 30+ countries)
- Support multi-modal transport and cross-border operations
- Integrate with customs, logistics, and trade finance systems
- Enable real-time tracking and automated processing
- Maintain full compliance with CMR Convention requirements

## Repository Structure

```
vc-ecmr-uncefact/
├── README.md                          # This file
├── ecmr-context.jsonld                # JSON-LD @context mapping eCMR to UN/CEFACT BSP
├── vc-ecmr-example.jsonld             # Complete W3C VC example consignment note
└── architecture.md                    # Architecture diagrams (to be added)
```

## Key Files

### 1. `ecmr-context.jsonld`

The JSON-LD `@context` file that provides the semantic mapping between:
- **eCMR** document structure (CMR Convention fields)
- **UN/CEFACT BSP** vocabulary IRIs
- **W3C VC** data model

**Key features:**
- Complete mapping of all CMR Convention mandatory fields
- Support for dangerous goods (ADR compliance)
- Multi-party structure (consignor, consignee, carrier)
- Transport equipment and seals tracking
- Event-based status tracking (pickup, delivery)
- Incoterms delivery terms support

**Usage:**
```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://vocabulary.uncefact.org/unece-context-D23B.jsonld",
    "https://iri.suomi.fi/model/vc-ecmr-uncefact/context/v1"
  ],
  "type": ["VerifiableCredential", "eCMRConsignmentNote"],
  "credentialSubject": {
    "type": "eCMR",
    "consignmentNumber": "001234"
  }
}
```

### 2. `vc-ecmr-example.jsonld`

A complete, production-ready example of an eCMR consignment note as a W3C Verifiable Credential.

**Scenario:**
- **Route**: Tampere (Finland) → Hamburg (Germany)
- **Cargo**: Industrial machinery (18.5 tons, 45.5 m³)
- **Special conditions**: Contains dangerous goods (UN 3480 - Lithium-ion batteries, Class 9)
- **Transport mode**: Road (Truck with container)
- **Delivery terms**: DAP (Delivered At Place)

**Structure:**
- **@context**: W3C VC + UN/CEFACT BSP + custom eCMR context
- **type**: `["VerifiableCredential", "eCMRConsignmentNote"]`
- **issuer**: DID and metadata of the carrier
- **credentialSubject**: The consignment note data (eCMR compliant)
- **proof**: Cryptographic signature (Ed25519Signature2020)
- **evidence**: Consignor/consignee signatures, driver qualifications

**eCMR data includes:**
- Consignor, consignee, and carrier party details
- Loading and unloading locations
- Transport means and equipment (truck, container, seals)
- Three consignment items with packaging details
- Dangerous goods declaration (UN 3480 - ADR compliance)
- Pickup and delivery events with timestamps
- Insurance and declared values
- Delivery terms (Incoterms)
- Special instructions and remarks

## Legal Framework

### CMR Convention Coverage

The eCMR Protocol (effective 2011) allows electronic consignment notes with **same legal effect** as paper CMR, provided:

✅ **Authentication** - Reliable method for electronic signatures  
✅ **Integrity** - Information cannot be altered undetected  
✅ **Readability** - Information available in visual form  
✅ **Functional equivalence** - Contains same information as paper CMR  

### W3C VC Compliance

W3C Verifiable Credentials provide:
- ✅ **Authentication**: DID-based issuer identification + cryptographic signatures
- ✅ **Integrity**: Tamper-evident proofs (Ed25519, BBS+)
- ✅ **Readability**: Human-readable JSON-LD format
- ✅ **Functional equivalence**: All CMR fields mapped

### Countries with eCMR Ratification (as of 2024)

🇪🇺 EU: Bulgaria, Czech Republic, Denmark, Estonia, Finland, France, Latvia, Lithuania, Netherlands, Poland, Slovakia, Spain  
🌍 Other: Iran, Moldova, North Macedonia, Russia, Switzerland, Turkey, Ukraine

## UN/CEFACT BSP Vocabulary Mapping

### Core eCMR Classes

| eCMR Element | UN/CEFACT Class | Description |
|-------------|-----------------|-------------|
| Consignment Note | `unece:Consignment` | Main document container |
| Consignment Item | `unece:ConsignmentItem` | Individual cargo items |
| Consignor | `unece:TradeParty` | Goods sender |
| Consignee | `unece:TradeParty` | Goods receiver |
| Carrier | `unece:TradeParty` | Transport company |
| Transport Movement | `unece:LogisticsTransportMovement` | Journey details |
| Transport Means | `unece:LogisticsTransportMeans` | Vehicle/truck |
| Transport Equipment | `unece:LogisticsTransportEquipment` | Container/trailer |
| Dangerous Goods | `unece:DangerousGoods` | Hazmat details |
| Location | `unece:LogisticsLocation` | Loading/unloading points |
| Event | `unece:SupplyChainEvent` | Pickup/delivery/transit |

### Key Properties

| CMR Field | UN/CEFACT Property | Type |
|-----------|-------------------|------|
| Consignment number | `unece:sequenceNumeric` | `xsd:string` |
| Issue date | `unece:issueDateTime` | `xsd:dateTime` |
| Gross weight | `unece:grossWeightMeasure` | `MeasureType` |
| Package quantity | `unece:packageQuantity` | `QuantityType` |
| Declared value | `unece:declaredValueForCarriageAmount` | `AmountType` |
| Nature of goods | `unece:natureIdentificationCargo` | `Cargo` |
| Delivery terms | `unece:applicableDeliveryTerms` | `DeliveryTerms` |
| UN number (dangerous goods) | `unece:UNDGIdentificationCode` | `xsd:string` |

## Use Cases

### 1. International Road Freight

**Scenario**: Finnish exporter ships machinery to Germany
- **eCMR issued**: At pickup in Tampere
- **Border crossing**: Automatic customs notification
- **Delivery proof**: Consignee signature via mobile app
- **Payment release**: Automated upon delivery confirmation

### 2. Dangerous Goods Transport

**Scenario**: Lithium-ion batteries (UN 3480, Class 9)
- **ADR compliance**: Dangerous goods declaration in eCMR
- **Driver qualification**: ADR certificate verification
- **Emergency contact**: 24/7 hotline included
- **Route restrictions**: Tunnel codes embedded

### 3. Multi-Modal Transport

**Scenario**: Road → Sea → Road
- **Main eCMR**: Road transport Tampere → Hamburg port
- **Sub-consignments**: Linked to sea waybill and onward CMR
- **Container tracking**: Equipment ID linked across modes
- **Seal integrity**: Continuous seal monitoring

### 4. Trade Finance Integration

**Scenario**: Letter of Credit payment
- **eCMR as evidence**: Proof of shipment for LC
- **Bank verification**: DID-based issuer authenticity
- **Document presentation**: Direct to bank's digital system
- **Fraud prevention**: Tamper-evident cryptographic proofs

### 5. Customs Clearance

**Scenario**: EU → Non-EU export
- **Customs declaration**: eCMR data auto-populates SAD
- **Risk assessment**: Automated based on cargo data
- **Green channel**: Pre-approved low-risk shipments
- **Audit trail**: Complete journey history

## Advantages Over Paper CMR

✅ **Legally Binding** - eCMR Protocol ratified in 30+ countries  
✅ **Cryptographically Verifiable** - Built-in digital signatures  
✅ **Tamper-Evident** - Any changes are detectable  
✅ **Real-Time Tracking** - Event-based status updates  
✅ **Cost Savings** - No paper, printing, courier costs  
✅ **Faster Processing** - Instant transmission and verification  
✅ **Environmental** - Paperless transport documentation  
✅ **Fraud Prevention** - DID-based party authentication  
✅ **Integration Ready** - JSON-LD format for APIs  
✅ **Audit Trail** - Complete immutable history  

## Implementation Examples

### Creating an eCMR VC

```javascript
import { issue } from '@digitalbazaar/vc';
import { Ed25519Signature2020 } from '@digitalbazaar/ed25519-signature-2020';

const credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://vocabulary.uncefact.org/unece-context-D23B.jsonld",
    "https://iri.suomi.fi/model/vc-ecmr-uncefact/context/v1"
  ],
  "type": ["VerifiableCredential", "eCMRConsignmentNote"],
  "issuer": "did:example:carrier789",
  "issuanceDate": new Date().toISOString(),
  "credentialSubject": {
    "type": "eCMR",
    "consignmentNumber": "001234",
    "consignor": { /* ... */ },
    "consignee": { /* ... */ },
    // ... eCMR data
  }
};

const verifiableCredential = await issue({
  credential,
  suite: new Ed25519Signature2020({/* ... */}),
  documentLoader
});
```

### Verifying an eCMR VC

```javascript
import { verify } from '@digitalbazaar/vc';

const result = await verify({
  credential: ecmrVC,
  suite: new Ed25519Signature2020(),
  documentLoader
});

if (result.verified) {
  console.log('CMR Number:', result.credentialSubject.consignmentNumber);
  console.log('Carrier:', result.issuer.name);
  console.log('Consignor:', result.credentialSubject.consignor.name);
  console.log('Consignee:', result.credentialSubject.consignee.name);
  console.log('Gross Weight:', result.credentialSubject.grossWeightMeasure.value, 
              result.credentialSubject.grossWeightMeasure.unitCode);
}
```

### Extracting for Customs Declaration

```javascript
const ecmr = verifiableCredential.credentialSubject;

// Map to Single Administrative Document (SAD)
const customsDeclaration = {
  boxNumber: {
    2: ecmr.consignor.name,              // Consignor
    8: ecmr.consignee.name,              // Consignee
    15: ecmr.loadingLocation.countryId,  // Country of dispatch
    17: ecmr.unloadingLocation.countryId,// Country of destination
    31: ecmr.consignmentItem.map(item => ({
      description: item.information,
      hsCode: item.natureIdentificationCargo.identificationId,
      grossMass: item.grossWeightMeasure.value,
      packages: item.packageQuantity.value
    })),
    35: ecmr.grossWeightMeasure.value,   // Total gross mass
    44: ecmr.associatedDocument           // Documents
  }
};
```

## Dangerous Goods Compliance (ADR)

The eCMR implementation fully supports ADR requirements:

### Mandatory DG Information

- ✅ UN number (e.g., UN 3480)
- ✅ Proper shipping name
- ✅ Hazard class and packing group
- ✅ Total quantity (by mass/volume)
- ✅ Emergency contact information

### Example:

```json
{
  "applicableDangerousGoods": [{
    "type": "DangerousGoods",
    "UNDGId": "3480",
    "regulationName": "ADR 2023",
    "technicalName": "Lithium ion batteries",
    "hazardClassId": "9",
    "packingGroupCode": "II",
    "netWeightMeasure": {
      "value": 4200.0,
      "unitCode": "KGM"
    }
  }]
}
```

## Integration Points

### TMS (Transport Management Systems)
- Create eCMR from shipment order
- Track consignment status in real-time
- Archive for compliance

### ERP Systems
- Auto-generate from sales/purchase orders
- Link to invoicing and payment
- Integration with inventory management

### Customs Systems
- Auto-populate export/import declarations
- Real-time risk assessment
- Electronic clearance workflows

### Insurance Platforms
- Cargo insurance policy integration
- Claims processing with delivery proof
- Premium calculation based on cargo data

### Banking/Trade Finance
- Letter of Credit document presentation
- Payment release automation
- Fraud detection and KYC compliance

## Security Considerations

### Cryptographic Signatures

- **Ed25519**: Fast, secure digital signatures
- **BBS+**: Selective disclosure (optional)
- **Multi-signature**: Consignor + Carrier + Consignee

### DID-Based Identity

- **Carrier**: Verified transport license
- **Consignor/Consignee**: Business registry validation
- **Driver**: Professional qualification verification

### Tamper Detection

- Any modification invalidates the signature
- Complete audit trail of all changes
- Timestamped evidence of signing events

## Future Enhancements

- [ ] Smart contract integration for automated payments
- [ ] IoT sensor data (temperature, shock, location)
- [ ] Real-time tracking via GPS/telematics
- [ ] AI-powered route optimization
- [ ] Blockchain anchoring for extra immutability
- [ ] Multi-modal transport chain linking
- [ ] Carbon footprint calculation
- [ ] Automated insurance claim processing

## Related Standards

- **CMR Convention (1956)** - International road transport
- **eCMR Protocol (2008)** - Electronic consignment notes
- **ADR** - Dangerous goods by road
- **UN/CEFACT BSP** - Buy-Ship-Pay reference model
- **UNLOCODE** - UN location codes
- **ISO 6346** - Container identification
- **eIDAS** - European identity framework
- **W3C DID** - Decentralized identifiers

## References

- **UN/CEFACT Vocabulary**: https://vocabulary.uncefact.org/
- **eCMR Protocol**: https://unece.org/transportdangerous-goods/e-cmr
- **CMR Convention**: https://unece.org/transportdangerous-goods/cmr-convention-1956
- **W3C VC**: https://www.w3.org/TR/vc-data-model/
- **ADR**: https://unece.org/transportdangerous-goods/adr-2023-files
- **UN/CEFACT GitHub**: https://github.com/uncefact/spec-jsonld

## License

This implementation follows the licensing of:
- CMR Convention (UNECE, open international treaty)
- UN/CEFACT BSP vocabulary (UNECE, royalty-free)
- W3C VC Data Model (W3C open standard)

## Contact

For questions, issues, or contributions:
- **Repository**: https://github.com/jgmikael/realdigitalization
- **UN/CEFACT**: https://unece.org/trade/uncefact
- **eCMR Working Group**: https://unece.org/transportdangerous-goods/e-cmr

---

**Status**: Draft implementation (v0.1.0)  
**Last updated**: 2024-03-12  
**Based on**: UN/CEFACT BSP D23B + CMR Convention + eCMR Protocol
