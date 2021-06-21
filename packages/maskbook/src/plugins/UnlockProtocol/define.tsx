import { PollMetadataReader } from '../Polls/utils'
import { PluginConfig, PluginStage, PluginScope } from '../types'
import { createCompositionDialog } from '../utils/createCompositionDialog'
import { identifier, pluginDescription, pluginIcon, pluginName } from './constants'
import UnlockProtocolDialog from './UI/UnlockProtocolDialog'

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
        const metadata = PollMetadataReader(props.message.meta)
        if (!metadata.ok) return null
        // return <UnlockProtocolInPost/>
        return null
    },
    PageComponent: UnlockProtocolCompositionUI,
    postDialogEntries: [UnlockProtocolCompositionEntry],
}
