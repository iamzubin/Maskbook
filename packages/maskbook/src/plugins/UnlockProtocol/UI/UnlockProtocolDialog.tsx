// import { TextField } from '@dimensiondev/maskbook-theme/src/component-changes'
import { DialogActions, DialogContent, DialogProps, TextField, Chip, Button } from '@material-ui/core'
import { useState } from 'react'
import { InjectedDialog } from '../../../components/shared/InjectedDialog'
import { editActivatedPostMetadata } from '../../../protocols/typed-message/global-state'
import { useI18N } from '../../../utils'
import { pluginMetaKey } from '../constants'
import type { UnlockLocks } from '../types'
import { SelectRecipientsUnlockDialogUI } from './SelectRecipientsUnlockDialog'

interface UnlockProtocolDialogProps extends withClasses<'wrapper'> {
    open: boolean
    onConfirm: (opt?: any) => void
    onDecline: () => void
    DialogProps?: Partial<DialogProps>
    children?: React.ReactNode
}

export default function UnlockProtocolDialog(props: UnlockProtocolDialogProps) {
    const { t } = useI18N()
    const [open, setOpen] = useState(false)
    const itemsUnlock: UnlockLocks[] = [
        {
            lockname: 'test',
            lockaddress: 'tset123',
        },
        {
            lockname: 'tests',
            lockaddress: 'tset1e23',
        },
    ]
    const [currentUnlockPost, setCurrentUnlockPost] = useState('')
    const [currentUnlockTarget, setCurrentUnlockTarget] = useState<UnlockLocks[]>(() => [])
    const [availableUnlockTarget, setAvailableUnlockTarget] = useState<UnlockLocks[]>(() => [])
    const { children } = props

    const onInsert = () => {
        if (!!currentUnlockTarget.length && !!currentUnlockPost) {
            editActivatedPostMetadata((next) => {
                if (!!currentUnlockTarget.length && !!currentUnlockPost) {
                    next.set(pluginMetaKey, { post: currentUnlockPost, target: currentUnlockTarget })
                } else {
                    next.delete(pluginMetaKey)
                }
            })
            props.onConfirm({ post: currentUnlockPost, target: currentUnlockTarget })
        } else {
            return
        }
    }

    // const onInsert = () => {
    //     if (!!currentUnlockTarget && !!currentUnlockPost) {
    //         editActivatedPostMetadata((next) => {
    //             if (selectedFileInfo) {
    //                 // Make a Date become string
    //                 next.set(META_KEY_2, JSON.parse(JSON.stringify(selectedFileInfo)))
    //             } else {
    //                 next.delete(META_KEY_2)
    //             }
    //         })
    //         props.onConfirm(selectedFileInfo)
    //     } else {
    //         return
    //     }
    // }

    return (
        <InjectedDialog open={props.open} onClose={props.onDecline} title="post_UnlockProtocol_title_i18n">
            <DialogContent>
                <TextField
                    id="outlined-multiline-static"
                    label="Locked_Post_Content_i18n"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setCurrentUnlockPost(e.target.value)}></TextField>
            </DialogContent>
            <DialogActions>
                <Chip
                    label={t('post_dialog__select_specific_friends_title', {
                        selected: new Set([...currentUnlockTarget]).size,
                    })}
                    onClick={() => setOpen(true)}
                />
                <SelectRecipientsUnlockDialogUI
                    onSelect={(item) => setCurrentUnlockTarget([...currentUnlockTarget, item])}
                    onDeselect={(item) =>
                        setCurrentUnlockTarget(currentUnlockTarget.filter((x) => x.lockaddress != item.lockaddress))
                    }
                    open={open}
                    selected={currentUnlockTarget}
                    disabled={false}
                    items={itemsUnlock}
                    onClose={() => setOpen(false)}
                />
                <Button
                    style={{ marginLeft: 'auto' }}
                    variant="contained"
                    disabled={!(!!currentUnlockTarget.length && !!currentUnlockPost)}
                    onClick={onInsert}>
                    Submit_i18n
                </Button>
            </DialogActions>
        </InjectedDialog>
    )
}
