import { makeStyles, Box, Chip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useState } from 'react'
import { SelectRecipientsUnlockDialogUIProps, SelectRecipientsUnlockDialogUI } from './SelectRecipientsUnlockDialog'
import { useI18N } from '../../../utils/i18n-next-ui'
import { difference } from 'lodash-es'
import { useStylesExtends } from '../../custom-ui-helper'
import type { UnlockLocks } from '../../../unlock-protocol/types'

const useStyles = makeStyles({
    root: {
        display: 'inline-flex',
        flexWrap: 'wrap',
    },
})

export interface SelectRecipientsUnlockUIProps extends withClasses<never> {
    itemsUnlock: Array<UnlockLocks>
    selectedUnlock: Array<UnlockLocks>
    // frozenSelected: Array<UnlockLocks> // BREAKING, tries to import (Profile | Group)[]
    disabled?: boolean
    hideSelectAll?: boolean
    hideSelectNone?: boolean
    showAtNetwork?: boolean
    onSetUnlockSelected(selected: Array<UnlockLocks>): void
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
                label={t('post_dialog__select_specific_friends_title')}
                avatar={<AddIcon />}
                disabled={props.disabled}
                onClick={() => setOpen(true)}
            />
            <SelectRecipientsUnlockDialogUI
                open={open}
                items={props.itemsUnlock}
                selected={props.itemsUnlock.filter((x) => selectedUnlock.includes(x))}
                // disabledItems={props.items.filter((x) => selectedGroupMembers.includes(x.identifier.toText()))}
                disabled={false}
                submitDisabled={false}
                onSubmit={() => setOpen(false)}
                onClose={() => setOpen(false)}
                onSelect={(item) => onSetUnlockSelected([...selectedUnlock, item])}
                onDeselect={(item) => onSetUnlockSelected(difference(selectedUnlock, [item]))}
                {...props.SelectRecipientsUnlockDialogUIProps}
            />
        </Box>
    )
}
