import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
const NavBar = () => {
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography color="inherit">
                        Thentic API(Contract, NFT, Token, Wallet)
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default NavBar;