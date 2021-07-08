export interface UnlockLocks {
    lock: {
        address: string
        chain: number
        name: string
        price?: string
    }
}

export interface UnlockProtocolMetadata {
    post: string
    target: UnlockLocks[]
}
