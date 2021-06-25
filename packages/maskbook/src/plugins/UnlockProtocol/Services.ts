import { GraphQLClient, gql } from 'graphql-request'
// import * as self from './Services'

// setTimeout(() => {
//     AsyncCall(self, { channel: new WorkerChannel() })
// }, 0)

const endpoint = 'https://api.thegraph.com/subgraphs/name/unlock-protocol/unlock-rinkeby'
const graphQLClient = new GraphQLClient(endpoint)

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
