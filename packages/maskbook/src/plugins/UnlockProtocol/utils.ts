import { createPluginMessage } from '../utils/createPluginMessage'
import { createPluginRPC } from '../utils/createPluginRPC'
import { identifier } from './constants'

// export const

const UnlockProtocolMessage = createPluginMessage<{ _: unknown }>(identifier)

export const PuginUnlockProtocolRPC = createPluginRPC(
    identifier,
    () => import('./Services'),
    UnlockProtocolMessage.events._,
    true,
)
