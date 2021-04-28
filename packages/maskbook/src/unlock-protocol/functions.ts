import { GraphQLClient, gql } from 'graphql-request'

const endpoint = 'https://api.thegraph.com/subgraphs/name/unlock-protocol/unlock'
const graphQLClient = new GraphQLClient(endpoint)

/**
 * Unlock Protocol Calls
 * 1. List all the locks by the given ETH address.
 *      - name of the lock
 *      - number of people on the lock
 *      - days left on the lock
 *      - price of the lock.
 *      - lock address
 * 2. List of all the people on the lock
 * 3. Check if the given lock address has given ETH address as a user. @verfiyHolder
 */

// Get key holders from the lock ID
// {
//   locks(where: {address : "0x78e133eb8125b1ecddb4b7a520ba2085a20c1144"}) {
//     name
//     tokenAddress
//     owner
//     keys {
//       owner {
//         id
//       }
//     }
//   }
// }

export const verifyHolder = async (_lockAddress: String, _holder: String) => {
    const query = gql`
        query locks($address: String!) {
            locks(where: { address: $address }) {
                keys {
                    owner {
                        id
                    }
                }
            }
        }
    `
    const variables = {
        address: _lockAddress,
    }
    const data = await graphQLClient.request(query, variables)
    for (let index = 0; index < data.locks[0].keys.length; index++) {
        if (data.locks[0].keys[index].owner.id == _holder) return true
    }
    return false
}

export const getLocks = async (_address1: String) => {
    const query = gql`
        query lockManager($address: String!) {
            lockManagers(where: { address: $address }) {
                lock {
                    name
                    price
                    address
                }
            }
        }
    `
    const variables = {
        address: _address1,
    }
    const data = await graphQLClient.request(query, variables)
    return data
}

// export func as func

// func().catch((error) => console.error(error))
