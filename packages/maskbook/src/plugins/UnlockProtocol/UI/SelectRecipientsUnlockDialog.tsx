import { InjectedDialog } from '../../../components/shared/InjectedDialog'
import Fuse from 'fuse.js'
import {
    makeStyles,
    InputBase,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    DialogActions,
    Button,
} from '@material-ui/core'
import { useState, useMemo } from 'react'
import type { UnlockLocks } from '../types'
import { LockInList } from './LockInList'

const useStyles = makeStyles((theme) => ({
    content: {
        padding: '0 !important',
    },
}))

export interface SelectRecipientsUnlockDialogUIProps extends withClasses<never> {
    open: boolean
    items: UnlockLocks[]
    selected: UnlockLocks[]
    disabled: boolean
    disabledItems?: UnlockLocks[]
    chain: number
    onClose: () => void
    onSelect: (item: UnlockLocks) => void
    onDeselect: (item: UnlockLocks) => void
    setChain: (chain: number) => void
}

export function SelectRecipientsUnlockDialogUI(props: SelectRecipientsUnlockDialogUIProps) {
    const [search, setSearch] = useState('')
    const LIST_ITEM_HEIGHT = 40
    const { items, disabledItems } = props
    const itemsAfterSearch = useMemo(() => {
        const fuse = new Fuse(items, {
            keys: ['lock.name', 'lock.address'],
            isCaseSensitive: false,
            ignoreLocation: true,
            threshold: 0,
        })

        return search === '' ? items : fuse.search(search).map((item) => item.item)
    }, [search, items])

    return (
        <InjectedDialog open={props.open} title="select_unlock_lock_i18n" onClose={props.onClose}>
            <DialogContent>
                <InputBase value={search} onChange={(e) => setSearch(e.target.value)} />

                <List style={{ height: items.length * LIST_ITEM_HEIGHT }} dense>
                    {itemsAfterSearch.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="not_found_i18n" />
                        </ListItem>
                    ) : (
                        itemsAfterSearch.map((item) => (
                            <LockInList
                                item={item}
                                search={search}
                                checked={props.selected.some((x) => x.lock.address === item.lock.address)}
                                disabled={props.disabled || disabledItems?.includes(item)}
                                onChange={(_, checked) => {
                                    if (checked) {
                                        props.onSelect(item)
                                    } else {
                                        props.onDeselect(item)
                                    }
                                }}></LockInList>
                        ))
                    )}
                </List>
            </DialogContent>
            <DialogActions>
                <Button style={{ marginLeft: 'auto' }} variant="contained" onClick={props.onClose}>
                    Submit_i18n
                </Button>
            </DialogActions>
        </InjectedDialog>
    )
}
