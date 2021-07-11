import type { TypedMessage } from '@dimensiondev/maskbook-shared'
import { useEffect, useState } from 'react'
import MaskbookPluginWrapper from '../../MaskbookPluginWrapper'
import { PuginUnlockProtocolRPC, renderWithUnlockProtocolMetadata, UnlockProtocolMetadataReader } from '../utils'

interface UnlockProtocolInPostProps {
    message: TypedMessage
}

function UnlockDecipher(props: { iv: string }) {
    useEffect(() => {})
    return <> {props.iv} </>
}

export default function UnlockProtocolInPost(props: UnlockProtocolInPostProps) {
    const { message } = props
    const [cont, setCont] = useState('')
    useEffect(() => {
        const metadata = UnlockProtocolMetadataReader(props.message.meta)
        if (metadata.ok) {
            PuginUnlockProtocolRPC.getKey(metadata.val.iv).then((response) => {
                console.log('key :' + response.post.unlockKey)
                PuginUnlockProtocolRPC.decryptUnlockData(
                    metadata.val.iv,
                    response.post.unlockKey,
                    metadata.val.post,
                ).then((content) => {
                    setCont(content.content)
                })
            })
            // Call the api
            // decryptUnlockData(data from api)
        }
    }, [props.message.meta])

    const jsx = message
        ? renderWithUnlockProtocolMetadata(props.message.meta, (r) => {
              return (
                  <div>
                      <MaskbookPluginWrapper width={300} pluginName="Unlock Protocol">
                          {cont}
                      </MaskbookPluginWrapper>
                  </div>
              )
          })
        : null

    return <>{jsx}</>
}
