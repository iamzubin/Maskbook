import { makeStyles, Box, Chip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useState } from 'react'
import { SelectRecipientsUnlockDialogUIProps, SelectRecipientsUnlockDialogUI } from './SelectRecipientsUnlockDialog'
import { useI18N } from '../../../utils/i18n-next-ui'
import { useStylesExtends } from '../../custom-ui-helper'
import type { UnlockLocks } from '../../../extension/background-script/UnlockProtocolServices/types'

const useStyles = makeStyles({
    root: {
        display: 'inline-flex',
        flexWrap: 'wrap',
    },
})

export interface SelectRecipientsUnlockUIProps extends withClasses<never> {
    itemsUnlock: UnlockLocks[]
    selectedUnlock: UnlockLocks[]
    // frozenSelected: Array<UnlockLocks> // BREAKING, tries to import (Profile | Group)[]
    disabled?: boolean
    hideSelectAll?: boolean
    hideSelectNone?: boolean
    showAtNetwork?: boolean
    onSetUnlockSelected(selected: UnlockLocks[]): void
    SelectRecipientsUnlockDialogUIProps?: Partial<SelectRecipientsUnlockDialogUIProps>
    children?: React.ReactNode
}

export function SelectRecipientsUnlockUI<T extends UnlockLocks>(props: SelectRecipientsUnlockUIProps) {
    const { t } = useI18N()
    const classes = useStylesExtends(useStyles(), props)
    const { itemsUnlock, selectedUnlock, onSetUnlockSelected, children } = props
    const [open, setOpen] = useState(false)

    return (
        <Box>
            <Chip
                label={t('post_dialog__select_specific_friends_title', {
                    selected: new Set([...selectedUnlock.map((x) => x.lock.address)]).size,
                })}
                avatar={<AddIcon />}
                disabled={props.disabled || itemsUnlock.length == 0}
                onClick={() => setOpen(true)}
            />
            <SelectRecipientsUnlockDialogUI
                open={open}
                items={props.itemsUnlock}
                // selected={props.itemsUnlock.filter((x) => selectedUnlock.includes(x))}
                selected={selectedUnlock}
                // disabledItems={props.items.filter((x) => selectedGroupMembers.includes(x.identifier.toText()))}
                disabled={false}
                submitDisabled={false}
                onSubmit={() => setOpen(false)}
                onClose={() => setOpen(false)}
                onSelect={(item) => onSetUnlockSelected([...selectedUnlock, item])}
                onDeselect={(item) =>
                    onSetUnlockSelected(selectedUnlock.filter((x) => x.lock.address != item.lock.address))
                }
                {...props.SelectRecipientsUnlockDialogUIProps}
            />
        </Box>
    )
}
