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
    target: string[]
    post: string
    key: string
}
