import type { TypedMessage } from '@dimensiondev/maskbook-shared'
import { useEffect } from 'react'
import MaskbookPluginWrapper from '../../MaskbookPluginWrapper'
import { renderWithUnlockProtocolMetadata, UnlockProtocolMetadataReader } from '../utils'

interface UnlockProtocolInPostProps {
    message: TypedMessage
}

export default function UnlockProtocolInPost(props: UnlockProtocolInPostProps) {
    const { message } = props
    useEffect(() => {
        const metadata = UnlockProtocolMetadataReader(props.message.meta)
        if (metadata.ok) {
            // TODO : call decode functions and api's here
            // Call the api
            // decryptUnlockData(data from api)
        }
    }, [props.message.meta])

    const jsx = message
        ? renderWithUnlockProtocolMetadata(props.message.meta, (r) => {
              return (
                  <div>
                      <MaskbookPluginWrapper width={300} pluginName="Unlock Protocol">
                          {r.post}
                      </MaskbookPluginWrapper>
                  </div>
              )
          })
        : null

    return <>{jsx}</>
}
