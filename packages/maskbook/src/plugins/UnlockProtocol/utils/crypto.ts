import { encodeText } from '@dimensiondev/kit'

export async function encryptUnlockData(content: string): Promise<{
    iv: ArrayBuffer
    key: JsonWebKey
    encrypted: ArrayBuffer
}> {
    const iv: ArrayBuffer = crypto.getRandomValues(new Uint8Array(16))
    const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt'])
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        typeof content === 'string' ? encodeText(content) : content,
    )
    const exportkey = await crypto.subtle.exportKey('jwk', key)

    return { iv: iv, key: exportkey, encrypted: encrypted }
}

export async function decryptUnlockData(
    iv: ArrayBuffer,
    key: JsonWebKey,
    encrypted: ArrayBuffer,
): Promise<{
    content: string
}> {
    var importkey = await crypto.subtle.importKey('jwk', key, 'AES-GCM', true, ['encrypt', 'decrypt'])
    var decrypted = crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv,
        },
        importkey,
        encrypted,
    )
    return { content: 'dn' }
}
