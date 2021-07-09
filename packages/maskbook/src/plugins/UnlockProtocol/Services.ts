import { GraphQLClient, gql } from 'graphql-request'
import stringify from 'json-stable-stringify'
import { graphEndpointKeyVal, keyServerEndpoint } from './constants'

var graphQLClients: { [key: string]: GraphQLClient } = {}

for (const [key, url] of Object.entries(graphEndpointKeyVal)) {
    graphQLClients[key] = new GraphQLClient(url)
}

export const verifyHolder = async (_lockAddress: String, _holder: String, _chain: string) => {
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
    const data = await graphQLClients[_chain].request(query, variables)
    for (let index = 0; index < data.locks[0].keys.length; index++) {
        if (data.locks[0].keys[index].owner.id == _holder) return true
    }
    return false
}

export const getLocks = async (_address1: String, chain: string) => {
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
    const data = await graphQLClients[chain].request(query, variables)
    return data
}

// export func as func

// func().catch((error) => console.error(error))

export const postUnlockData = async (myBody: any) => {
    const response = await fetch(keyServerEndpoint + '/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: stringify(myBody), // string or object
    })
    // const myJson = await response.json() //extract JSON from the http response
    // do something with myJson
    console.log(response)
    // return myJson
    return response.status
}
export const getKey = async (iv: any) => {
    const response = await fetch(keyServerEndpoint + '/request', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: stringify({ identifier: 'test' }),
    })
    return response.json
}

export * from './utils/crypto'
