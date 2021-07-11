export interface UnlockLocks {
    lock: {
        address: string
        chain: number
        name: string
        price?: string
    }
}

export interface UnlockProtocolMetadata {
    iv: string
    unlockLocks: (string | number)[]
    post: string
    key: string
}

export interface UnlockProtocolResponse {
    iv: string
    unlockLocks: (string | number)[]
    post: string
    unlockKey: string
}

export interface requestKeyResponse {
    post: UnlockProtocolResponse
}
