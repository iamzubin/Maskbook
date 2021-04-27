import { memo, PropsWithChildren } from 'react'
import { Box, Button, Drawer, makeStyles } from '@material-ui/core'
import { PersonaState } from '../../hooks/usePersonaState'
import { PersonaCard } from '../PersonaCard'
import { MaskColorVar } from '@dimensiondev/maskbook-theme'
import { AddPersonaCard } from '../AddPersonaCard'

const useStyles = makeStyles((theme) => ({
    root: {
        top: `64px !important`,
    },
    paper: {
        top: `64px`,
        padding: theme.spacing(3.75, 3.75, 0, 3.75),
        background: MaskColorVar.suspensionBackground,
        '& > *': {
            marginTop: theme.spacing(1.5),
        },
    },
    buttons: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridColumnGap: theme.spacing(3.5),
    },
    backup: {
        backgroundColor: MaskColorVar.warning,
        '&:hover': {
            backgroundColor: MaskColorVar.warning,
            boxShadow: `0 0 5px ${MaskColorVar.warning}`,
        },
    },
}))

export interface PersonaDrawer extends PropsWithChildren<{}> {}

export const PersonaDrawer = memo<PersonaDrawer>(({ children }) => {
    const classes = useStyles()
    const { drawerOpen, toggleDrawer } = PersonaState.useContainer()

    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer}
            variant="temporary"
            hideBackdrop
            elevation={0}
            classes={{ root: classes.root, paper: classes.paper }}>
            <PersonaCard
                active={false}
                nickName="Yisiliu"
                providers={[
                    {
                        internalName: 'twitter.com',
                        connected: false,
                        network: 'twitter.com',
                    },
                ]}
            />
            <PersonaCard
                active={true}
                nickName="Yisiliu"
                providers={[
                    {
                        internalName: 'twitter.com',
                        connected: true,
                        network: 'twitter.com',
                    },
                ]}
            />
            <AddPersonaCard onConfirm={(name) => console.log(name)} onCancel={() => console.log('cancel')} />
            <Box className={classes.buttons}>
                <Button>Add Persona</Button>
                <Button className={classes.backup}>Backups</Button>
            </Box>
        </Drawer>
    )
})
