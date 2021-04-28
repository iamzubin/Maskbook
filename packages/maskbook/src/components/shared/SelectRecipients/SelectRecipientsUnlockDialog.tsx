import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import {
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Button,
    InputBase,
    DialogContent,
    DialogActions,
} from '@material-ui/core'
import { useStylesExtends } from '../../custom-ui-helper'
import { useI18N } from '../../../utils/i18n-next-ui'
import { LockInList } from './LockInList'
import { InjectedDialog } from '../InjectedDialog'
import type { UnlockLocks } from '../../../unlock-protocol/types'

const useStyles = makeStyles((theme) => ({
    content: {
        padding: '0 !important',
    },
    title: {
        marginLeft: 6,
    },
    input: { flex: 1, minWidth: '10em', marginLeft: 20, marginTop: theme.spacing(1) },
}))

export interface SelectRecipientsUnlockDialogUIProps extends withClasses<never> {
    open: boolean
    items: UnlockLocks[]
    selected: UnlockLocks[]
    disabled: boolean
    disabledItems?: UnlockLocks[]
    submitDisabled: boolean
    onSubmit: () => void
    onClose: () => void
    onSelect: (item: UnlockLocks) => void
    onDeselect: (item: UnlockLocks) => void
}
export function SelectRecipientsUnlockDialogUI(props: SelectRecipientsUnlockDialogUIProps) {
    const { t } = useI18N()
    const classes = useStylesExtends(useStyles(), props)
    const { items, disabledItems } = props
    const [search, setSearch] = useState('')
    const itemsAfterSearch = useMemo(() => {
        const fuse = new Fuse(items, {
            keys: ['identifier.userId', 'linkedPersona.fingerprint', 'nickname'],
            isCaseSensitive: false,
            ignoreLocation: true,
            threshold: 0,
        })

        return search === '' ? items : fuse.search(search).map((item) => item.item)
    }, [search, items])
    const LIST_ITEM_HEIGHT = 56

    return (
        <InjectedDialog open={props.open} title={t('select_specific_friends_dialog__title')} onClose={props.onClose}>
            <DialogContent>
                <InputBase
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={classes.input}
                    placeholder={t('search_box_placeholder')}
                />
                <List style={{ height: items.length * LIST_ITEM_HEIGHT }} dense>
                    {itemsAfterSearch.length === 0 ? (
                        <ListItem>
                            <ListItemText primary={JSON.stringify(items)} />
                        </ListItem>
                    ) : (
                        itemsAfterSearch.map((item) => (
                            <LockInList
                                item={item}
                                search={search}
                                checked={
                                    props.selected.some((x) => x.lock.address === item.lock.address) ||
                                    disabledItems?.includes(item)
                                }
                                disabled={props.disabled || disabledItems?.includes(item)}
                                onChange={(_, checked) => {
                                    if (checked) {
                                        props.onSelect(item)
                                    } else {
                                        props.onDeselect(item)
                                    }
                                }}
                            />
                        ))
                    )}
                </List>
            </DialogContent>
            <DialogActions>
                <Button
                    style={{ marginLeft: 'auto' }}
                    variant="contained"
                    disabled={props.submitDisabled}
                    onClick={props.onSubmit}>
                    {t('select_specific_friends_dialog__button')}
                </Button>
            </DialogActions>
        </InjectedDialog>
    )
}
