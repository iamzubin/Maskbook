import {
    List,
    ListItem as MuiListItem,
    ListItemText,
    ListItemIcon,
    Collapse,
    Theme,
    useMediaQuery,
    experimentalStyled as styled,
    listItemClasses,
} from '@material-ui/core'
import { Masks, AccountBalanceWallet, ExpandLess, ExpandMore, Settings } from '@material-ui/icons'
import { forwardRef, useContext, useMemo } from 'react'
import { useMatch } from 'react-router'
import { Link, LinkProps } from 'react-router-dom'
import { RoutePaths } from '../../pages/routes'
import { DashboardContext } from './context'
import { MaskNotSquareIcon } from '@dimensiondev/icons'
import { useDashboardI18N } from '../../locales'
import type { Omit } from '@material-ui/system'

const ListItemLinkUnStyled = ({ to, ...props }: { to: string; nested?: boolean }) => {
    const renderLink = useMemo(
        () =>
            forwardRef<HTMLAnchorElement | null, Omit<LinkProps, 'to'>>((linkProps, ref) => (
                <Link to={to} ref={ref} {...linkProps} />
            )),
        [to],
    )

    return <MuiListItem component={renderLink} selected={!!useMatch(to)} {...props} />
}

const ListItemLink = styled(ListItemLinkUnStyled)(({ theme, nested }) => ({
    [`&.${listItemClasses.root}`]: {
        paddingLeft: nested ? theme.spacing(9) : theme.spacing(2),
        color: 'inherit',
    },
    [`&.${listItemClasses.selected}`]: {
        backgroundColor: 'transparent',
        borderRight: '4px solid ' + (theme.palette.mode === 'light' ? theme.palette.action.selected : 'white'),
    },
}))

const LogoItem = (styled(MuiListItem)(({ theme }) => ({
    [`&.${listItemClasses.root}`]: {
        justifyContent: 'center',
        paddingLeft: theme.spacing(7),
        marginBottom: theme.spacing(3.5),
    },
})) as any) as typeof MuiListItem

const ListItem = styled(MuiListItem)(({ theme }) => ({
    [`&.${listItemClasses.selected}`]: {
        backgroundColor: 'transparent',
        borderRight: '4px solid ' + (theme.palette.mode === 'light' ? theme.palette.action.selected : 'white'),
    },
}))

export interface NavigationProps {}
export function Navigation({}: NavigationProps) {
    const { expanded, toggleNavigationExpand } = useContext(DashboardContext)

    const isLargeScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('lg'))
    const t = useDashboardI18N()

    return (
        <List>
            {isLargeScreen && (
                <LogoItem>
                    <MaskNotSquareIcon />
                </LogoItem>
            )}
            <ListItemLink to={RoutePaths.Personas}>
                <ListItemIcon>
                    <Masks />
                </ListItemIcon>
                <ListItemText primary={t.personas()} />
            </ListItemLink>
            <ListItemLink to={RoutePaths.Wallets}>
                <ListItemIcon>
                    <AccountBalanceWallet />
                </ListItemIcon>
                <ListItemText>{t.wallets()}</ListItemText>
                {!!useMatch(RoutePaths.Wallets) ? <ExpandLess /> : <ExpandMore />}
            </ListItemLink>
            <Collapse in={!!useMatch(RoutePaths.Wallets)}>
                <List disablePadding>
                    <ListItemLink nested to={RoutePaths.WalletsTransfer}>
                        <ListItemText primary={t.wallets_transfer()} />
                    </ListItemLink>
                    <ListItemLink nested to={RoutePaths.WalletsSwap}>
                        <ListItemText primary={t.wallets_swap()} />
                    </ListItemLink>
                    <ListItemLink nested to={RoutePaths.WalletsRedPacket}>
                        <ListItemText primary={t.wallets_red_packet()} />
                    </ListItemLink>
                    <ListItemLink nested to={RoutePaths.WalletsSell}>
                        <ListItemText primary={t.wallets_sell()} />
                    </ListItemLink>
                    <ListItemLink nested to={RoutePaths.WalletsHistory}>
                        <ListItemText primary={t.wallets_history()} />
                    </ListItemLink>
                </List>
            </Collapse>
            <ListItemLink to={RoutePaths.Settings}>
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                <ListItemText primary={t.settings()} />
            </ListItemLink>
        </List>
    )
}

export enum NavigationTarget {
    Personas,
    WalletsTransfer,
    WalletsSwap,
    Wallets,
    WalletsRedPacket,
    WalletsSell,
    WalletsHistory,
    Settings,
}
