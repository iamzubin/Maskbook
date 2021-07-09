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
