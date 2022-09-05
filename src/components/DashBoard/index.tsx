//node_modules
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";

//styles
import { usenStyles } from "./style";

//store
import { RootState } from "../../redux/store";
import { buyNFT, getNFTs } from "../../redux/slices/nft.slice";

const DashBoard = () => {
  const dispatch = useDispatch();
  const classes = usenStyles();

  const { NFTs, NFT } = useSelector((state: RootState) => state.nft);

  const getAllNFTs = useCallback(async () => {
    const getData = {
      ApiKey: localStorage.getItem("ApiKey"),
      chainId: 80001,
    };

    dispatch(getNFTs({ getNFTInfo: getData }));
  }, [dispatch]);

  const buy_nft = async (data: any) => {
    const buyNFTInfo = {
      key: localStorage.getItem("ApiKey"),
      chain_id: data.chain_id as number,
      contract: data.contract,
      nft_id: data.id as number,
      from: data.owner_address
        ? data.owner_address
        : "0x2bABfAdf0fAfb86297906aE4C7dc11E2e8F0Bc5C",
      to: "0x719a479edb7513D429C5450b425Dcc2a00aF2B04",
      redirect_url: "https://localhost:3000/",
    };

    // console.log("price", data.data.price);
    dispatch(buyNFT({ buyNFTInfo: buyNFTInfo, price: data.data.price }));
  };

  const confirmTransaction = async (url: string) => {
    window.open(url as string, "_blank");
    await getAllNFTs();
  };

  useEffect(() => {
    getAllNFTs();
    // console.log("OK", NFTs);
  }, [getAllNFTs]);

  useEffect(() => {
    getAllNFTs();
  }, [NFT, getAllNFTs]);

  return (
    <div className={classes.root}>
      {NFTs ? (
        <Box sx={{ flexGrow: 1 }} className={classes.allCollections}>
          <Grid container spacing={5}>
            {NFTs.map((e, index) => (
              <Grid item key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    width="100%"
                    image="/img/contemplative-reptile.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Name: {e.data.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      <>Price : {e.data.price}</>
                      <br />
                      <>id : {e.id}</>
                      <br />
                      <>status : {e.status}</>
                      <br />
                      <>request : {e.request_id}</>
                      <br />
                      <>contract : {e.contract?.slice(0, 8)}...</>
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {e.status === "pending" ? (
                      <Button
                        size="medium"
                        color="warning"
                        onClick={() => {
                          confirmTransaction(e.transaction_url as string);
                        }}
                      >
                        Confirm
                      </Button>
                    ) : (
                      <Button
                        size="medium"
                        color="success"
                        onClick={() => {
                          buy_nft(e);
                        }}
                      >
                        Buy NFTs
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <h2>No NFTs</h2>
      )}
    </div>
  );
};

export default DashBoard;
