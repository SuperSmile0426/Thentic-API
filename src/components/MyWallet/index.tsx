//node_modules
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

//styles
import { usenStyles } from "./style";

//store
import { RootState } from "../../redux/store";

import { createNewWallet, getWallet } from "../../redux/slices/user.slice";

const MyWallet = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const classes = usenStyles();

  const { wallets, currentWallet } = useSelector(
    (state: RootState) => state.user
  );

  const getAllWallet = useCallback(async () => {
    dispatch(getWallet({}));
  }, [dispatch]);

  const createNew = async () => {
    await dispatch(createNewWallet({}));
    await getAllWallet();
  };

  useEffect(() => {
    getAllWallet();
  }, [getAllWallet]);

  return (
    <div className={classes.root}>
      <Button
        onClick={createNew}
        color="success"
        className={classes.createButton}
      >
        Create New Wallet
      </Button>
      <br />
      <br />
      <h5>Current My WalletAddress: {currentWallet.wallet}</h5>
      <h5>Current My WalletAddress: {currentWallet.wallet}</h5>

      {wallets ? (
        <Box sx={{ flexGrow: 1 }} className={classes.allCollections}>
          <Grid container spacing={4}>
            {wallets.map((e: String, index) => (
              <Grid item key={index}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Address {index}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      <>{e?.slice(0, 30)}</>
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <h2>No Wallet</h2>
      )}
    </div>
  );
};

export default MyWallet;
