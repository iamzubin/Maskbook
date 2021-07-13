import { PluginConfig, PluginStage, PluginScope } from '../types'
import { createCompositionDialog } from '../utils/createCompositionDialog'
import { identifier, pluginDescription, pluginIcon, pluginMetaKey, pluginName } from './constants'
import type { UnlockProtocolMetadata } from './types'
import UnlockProtocolDialog from './UI/UnlockProtocolDialog'
import UnlockProtocolInPost from './UI/UnlockProtocolInPost'
import { UnlockProtocolMetadataReader } from './utils'

const [UnlockProtocolCompositionEntry, UnlockProtocolCompositionUI] = createCompositionDialog(
    pluginIcon + ' ' + pluginName,
    (props) => <UnlockProtocolDialog open={props.open} onConfirm={props.onClose} onDecline={props.onClose} />,
)

export const UnlockProtocolPluginDefine: PluginConfig = {
    id: identifier,
    pluginIcon: pluginIcon,
    pluginName: pluginName,
    pluginDescription: pluginDescription,
    identifier,
    stage: PluginStage.Development,
    scope: PluginScope.Public,
    successDecryptionInspector: function Comp(props) {
        const metadata = UnlockProtocolMetadataReader(props.message.meta)
        if (!metadata.ok) return null
        return <UnlockProtocolInPost {...props} />
    },
    postDialogMetadataBadge: new Map([
        [pluginMetaKey, (meta: UnlockProtocolMetadata) => `a locked post to using unlock protocol `],
    ]),
    PageComponent: UnlockProtocolCompositionUI,
    postDialogEntries: [UnlockProtocolCompositionEntry],
}
