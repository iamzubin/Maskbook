import { DialogContent, DialogProps } from '@material-ui/core'
import { InjectedDialog } from '../../../components/shared/InjectedDialog'
import { useI18N } from '../../../utils'

interface UnlockProtocolDialogProps extends withClasses<'wrapper'> {
    open: boolean
    onConfirm: (opt?: any) => void
    onDecline: () => void
    DialogProps?: Partial<DialogProps>
}

export default function UnlockProtocolDialog(props: UnlockProtocolDialogProps) {
    const { t } = useI18N()
    return (
        <InjectedDialog open={props.open} onClose={props.onDecline} title={t('plugin_poll_display_name')}>
            <DialogContent>hello linux 123</DialogContent>
        </InjectedDialog>
    )
}
