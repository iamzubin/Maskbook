// import { TextField } from '@dimensiondev/maskbook-theme/src/component-changes'
import { DialogActions, DialogContent, DialogProps, TextField, Chip, Button } from '@material-ui/core'
import { useState } from 'react'
import { InjectedDialog } from '../../../components/shared/InjectedDialog'
import { editActivatedPostMetadata } from '../../../protocols/typed-message/global-state'
import { pluginMetaKey } from '../constants'
import type { UnlockLocks } from '../types'
import { PuginUnlockProtocolRPC } from '../utils'
import { SelectRecipientsUnlockDialogUI } from './SelectRecipientsUnlockDialog'

interface UnlockProtocolDialogProps extends withClasses<'wrapper'> {
    open: boolean
    onConfirm: (opt?: any) => void
    onDecline: () => void
    DialogProps?: Partial<DialogProps>
    children?: React.ReactNode
}

export default function UnlockProtocolDialog(props: UnlockProtocolDialogProps) {
    // const { t } = useI18N()
    // var content : any = ""
    const [open, setOpen] = useState(false)

    const [currentUnlockPost, setCurrentUnlockPost] = useState('')
    const [currentUnlockTarget, setCurrentUnlockTarget] = useState<UnlockLocks[]>(() => [])
    const [availableUnlockTarget, setAvailableUnlockTarget] = useState<UnlockLocks[]>(() => [])
    const { children } = props

    setTimeout(() => {
        PuginUnlockProtocolRPC.getLocks('0x3a574461fd1279FCF96043bcF416C53B7e8dcEC0')
            .then((value) => {
                if (value.lockManagers.length) {
                    setAvailableUnlockTarget(value.lockManagers)
                } else {
                    setAvailableUnlockTarget([])
                }
            })
            .catch((error) => {
                console.error(error)
                setAvailableUnlockTarget([
                    {
                        lock: {
                            name: error.message || 'Some error occured',
                            address: '0x0',
                            price: '0',
                        },
                    },
                ])
            })
    }, 1000)

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

    return (
        <InjectedDialog open={props.open} onClose={props.onDecline} title="post_UnlockProtocol_title_i18n">
            <DialogContent>
                <TextField
                    id="outlined-multiline-static"
                    label={currentUnlockPost}
                    // value={CurrentUnlockPost}
                    rows={4}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setCurrentUnlockPost(e.target.value)}></TextField>
            </DialogContent>
            <DialogActions>
                <Chip
                    // label={'post_dialog__select_specific_friends_title' {
                    //     selected: new Set([...currentUnlockTarget]).size,
                    // })}
                    label="test"
                    onClick={() => setOpen(true)}
                />
                <SelectRecipientsUnlockDialogUI
                    onSelect={(item) => setCurrentUnlockTarget([...currentUnlockTarget, item])}
                    onDeselect={(item) =>
                        setCurrentUnlockTarget(currentUnlockTarget.filter((x) => x.lock.address != item.lock.address))
                    }
                    open={open}
                    selected={currentUnlockTarget}
                    disabled={false}
                    items={availableUnlockTarget}
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
