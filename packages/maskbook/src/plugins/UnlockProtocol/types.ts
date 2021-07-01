export interface UnlockLocks {
    lock: {
        address: string
        name: string
        price?: string
    }
}

export interface UnlockProtocolMetadata {
    post: string
    target: UnlockLocks[]
}
