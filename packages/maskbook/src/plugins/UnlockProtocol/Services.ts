import { GraphQLClient, gql } from 'graphql-request'
import { graphEndpoint, keyServerEndpoint } from './constants'

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

export const getLocks = async (_address1: String, chain: Number) => {
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

export const postUnlockData = async (myBody: any) => {
    const response = await fetch(keyServerEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(myBody), // string or object
        headers: {
            'Content-Type': 'application/json',
        },
    })
    // const myJson = await response.json() //extract JSON from the http response
    // do something with myJson
    console.log(response)
    // return myJson
    return response
}
export const gettest = async (test: any) => {
    const response = await fetch('https://reqres.in/api/users?page=2', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export * from './utils/crypto'
