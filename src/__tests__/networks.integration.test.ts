import { Resolver } from 'did-resolver'
import { getResolver } from '../resolver'
import { interpretIdentifier } from '../helpers'

jest.setTimeout(30000)

describe('ethrResolver (alt-chains)', () => {
  const addr = '0xd0dbe9d3698738f899ccd8ee27ff2347a7faa4dd'
  const { address } = interpretIdentifier(addr)
  const checksumAddr = address

  describe('eth-networks', () => {
    it('resolves on mainnet with versionId', async () => {
      const resolver = new Resolver(getResolver({ infuraProjectId: '6b734e0b04454df8a6ce234023c04f26' }))
      const result = await resolver.resolve('did:ethr:0x26bf14321004e770e7a8b080b7a526d8eed8b388?versionId=12090174')
      expect(result).toEqual({
        didDocumentMetadata: {
          nextVersionId: '12090175',
          nextUpdate: '2021-03-22T18:14:29Z',
        },
        didResolutionMetadata: {
          contentType: 'application/did+ld+json',
        },
        didDocument: {
          '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/secp256k1recovery-2020/v2'],
          id: 'did:ethr:0x26bf14321004e770e7a8b080b7a526d8eed8b388',
          verificationMethod: [
            {
              id: 'did:ethr:0x26bf14321004e770e7a8b080b7a526d8eed8b388#controller',
              type: 'EcdsaSecp256k1RecoveryMethod2020',
              controller: 'did:ethr:0x26bf14321004e770e7a8b080b7a526d8eed8b388',
              blockchainAccountId: 'eip155:1:0x26bF14321004e770E7A8b080b7a526d8eed8b388',
            },
          ],
          authentication: ['did:ethr:0x26bf14321004e770e7a8b080b7a526d8eed8b388#controller'],
          assertionMethod: ['did:ethr:0x26bf14321004e770e7a8b080b7a526d8eed8b388#controller'],
        },
      })
    })

    it('resolves on goerli when configured', async () => {
      const did = 'did:ethr:goerli:' + addr
      const ethr = getResolver({
        networks: [{ name: 'goerli', rpcUrl: 'https://goerli.infura.io/v3/6b734e0b04454df8a6ce234023c04f26' }],
      })
      const resolver = new Resolver(ethr)
      const result = await resolver.resolve(did)
      expect(result).toEqual({
        didDocumentMetadata: {},
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
        didDocument: {
          '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/secp256k1recovery-2020/v2'],
          id: did,
          verificationMethod: [
            {
              id: `${did}#controller`,
              type: 'EcdsaSecp256k1RecoveryMethod2020',
              controller: did,
              blockchainAccountId: `eip155:5:${checksumAddr}`,
            },
          ],
          authentication: [`${did}#controller`],
          assertionMethod: [`${did}#controller`],
        },
      })
    })

    it('resolves on linea:goerli when configured', async () => {
      const did = 'did:ethr:linea:goerli:' + addr
      const ethr = getResolver({
        infuraProjectId: '6b734e0b04454df8a6ce234023c04f26',
      })
      const resolver = new Resolver(ethr)
      const result = await resolver.resolve(did)
      expect(result).toEqual({
        didDocumentMetadata: {},
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
        didDocument: {
          '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/secp256k1recovery-2020/v2'],
          id: did,
          verificationMethod: [
            {
              id: `${did}#controller`,
              type: 'EcdsaSecp256k1RecoveryMethod2020',
              controller: did,
              blockchainAccountId: `eip155:59140:${checksumAddr}`,
            },
          ],
          authentication: [`${did}#controller`],
          assertionMethod: [`${did}#controller`],
        },
      })
    })

    it('resolves on rsk when configured', async () => {
      const did = 'did:ethr:rsk:' + addr
      const ethr = getResolver({ networks: [{ name: 'rsk', rpcUrl: 'https://did.rsk.co:4444' }] })
      const resolver = new Resolver(ethr)
      const result = await resolver.resolve(did)
      expect(result).toEqual({
        didDocumentMetadata: {},
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
        didDocument: {
          '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/secp256k1recovery-2020/v2'],
          id: did,
          verificationMethod: [
            {
              id: `${did}#controller`,
              type: 'EcdsaSecp256k1RecoveryMethod2020',
              controller: did,
              blockchainAccountId: `eip155:30:${checksumAddr}`,
            },
          ],
          authentication: [`${did}#controller`],
          assertionMethod: [`${did}#controller`],
        },
      })
    })

    it('resolves on rsk:testnet when configured', async () => {
      const did = 'did:ethr:rsk:testnet:' + addr
      const ethr = getResolver({ networks: [{ name: 'rsk:testnet', rpcUrl: 'https://did.testnet.rsk.co:4444' }] })
      const resolver = new Resolver(ethr)
      const result = await resolver.resolve(did)
      expect(result).toEqual({
        didDocumentMetadata: {},
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
        didDocument: {
          '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/secp256k1recovery-2020/v2'],
          id: did,
          verificationMethod: [
            {
              id: `${did}#controller`,
              type: 'EcdsaSecp256k1RecoveryMethod2020',
              controller: did,
              blockchainAccountId: `eip155:31:${checksumAddr}`,
            },
          ],
          authentication: [`${did}#controller`],
          assertionMethod: [`${did}#controller`],
        },
      })
    })

    it('resolves public key identifier on rsk when configured', async () => {
      const did = 'did:ethr:rsk:0x03fdd57adec3d438ea237fe46b33ee1e016eda6b585c3e27ea66686c2ea5358479'
      const ethr = getResolver({ networks: [{ name: 'rsk', rpcUrl: 'https://did.rsk.co:4444' }] })
      const resolver = new Resolver(ethr)
      const doc = await resolver.resolve(did)
      return expect(doc).toEqual({
        didDocumentMetadata: {},
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
        didDocument: {
          '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/secp256k1recovery-2020/v2'],
          id: did,
          verificationMethod: [
            {
              id: `${did}#controller`,
              type: 'EcdsaSecp256k1RecoveryMethod2020',
              controller: did,
              blockchainAccountId: 'eip155:30:0xF3beAC30C498D9E26865F34fCAa57dBB935b0D74',
            },
            {
              id: `${did}#controllerKey`,
              type: 'EcdsaSecp256k1VerificationKey2019',
              controller: did,
              publicKeyHex: '03fdd57adec3d438ea237fe46b33ee1e016eda6b585c3e27ea66686c2ea5358479',
            },
          ],
          authentication: [`${did}#controller`, `${did}#controllerKey`],
          assertionMethod: [`${did}#controller`, `${did}#controllerKey`],
        },
      })
    })

    it('resolves public keys and services on aurora when configured', async () => {
      const did = 'did:ethr:aurora:0x036d148205e34a8591dcdcea34fb7fed760f5f1eca66d254830833f755ff359ef0'
      const ethr = getResolver({
        networks: [
          {
            name: 'aurora',
            chainId: 1313161554,
            rpcUrl: 'https://mainnet.aurora.dev',
            registry: '0x63eD58B671EeD12Bc1652845ba5b2CDfBff198e0',
          },
        ],
      })
      const resolver = new Resolver(ethr)
      const doc = await resolver.resolve(did)
      return expect(doc).toEqual({
        didDocumentMetadata: {
          updated: '2022-01-19T12:20:00Z',
          versionId: '57702194',
        },
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
        didDocument: {
          '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/secp256k1recovery-2020/v2'],
          id: did,
          verificationMethod: [
            {
              id: `${did}#controller`,
              type: 'EcdsaSecp256k1RecoveryMethod2020',
              controller: did,
              blockchainAccountId: 'eip155:1313161554:0x7a988202a04f00436f73972DF4dEfD80c3A6BD13',
            },
            {
              id: `${did}#controllerKey`,
              type: 'EcdsaSecp256k1VerificationKey2019',
              controller: did,
              publicKeyHex: '036d148205e34a8591dcdcea34fb7fed760f5f1eca66d254830833f755ff359ef0',
            },
          ],
          authentication: [`${did}#controller`, `${did}#controllerKey`],
          assertionMethod: [`${did}#controller`, `${did}#controllerKey`],
        },
      })
    })
  })
})
