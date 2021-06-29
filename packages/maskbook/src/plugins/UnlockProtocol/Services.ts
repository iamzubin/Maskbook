import { GraphQLClient, gql } from 'graphql-request'
// import * as self from './Services'

// setTimeout(() => {
//     AsyncCall(self, { channel: new WorkerChannel() })
// }, 0)

const graphEndpoint = 'https://api.thegraph.com/subgraphs/name/unlock-protocol/unlock-rinkeby'
const graphQLClient = new GraphQLClient(graphEndpoint)

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

const keyServerEndpoint = 'http://0.0.0.0:5000'

export const postUnlockData = async (myBody: string) => {
    const response = await fetch(keyServerEndpoint, {
        method: 'POST',
        body: myBody, // string or object
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const myJson = await response.json() //extract JSON from the http response
    // do something with myJson
    return myJson
}
