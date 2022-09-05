//node_modules
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";

//styles
import { usenStyles } from "./style";

//store
import { RootState } from "../../redux/store";
import { createNFT, getNFTs } from "../../redux/slices/nft.slice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const NFTs = () => {
  const dispatch = useDispatch();
  const classes = usenStyles();

  const { chainId, id } = useParams();
  const [nft_name, setNFTName] = useState<string>("");
  const [nft_id, setNFTId] = useState<any>();
  const [nft_price, setNFTPrice] = useState<any>();
  const [nft_description, setNFTDescription] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [detailNFT, setDetailNFT] = useState<any>();

  const { NFTs, NFT } = useSelector((state: RootState) => state.nft);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const setOneNFT = (data: any) => {
    setDetailNFT(data);
    handleOpen1();
  };

  const getAllNFTs = useCallback(async () => {
    const getData = {
      ApiKey: localStorage.getItem("ApiKey"),
      chainId: chainId,
    };

    dispatch(getNFTs({ getNFTInfo: getData }));
  }, [dispatch, chainId]);

  const createNewNFT = async () => {
    if (!nft_name || !nft_description || !chainId || !id) {
      alert("Invalid Parameter!");
      return;
    }
    const data = JSON.stringify({
      name: nft_name,
      price: nft_price,
      imgUrl: "/img/contemplative-reptile.jpg",
      descriptions: "This is the first Thentic API NFTS",
    });

    const newNFTInfo = {
      key: localStorage.getItem("ApiKey"),
      chain_id: chainId,
      contract: id,
      nft_id: nft_id,
      nft_data: data,
      to: "0x2bABfAdf0fAfb86297906aE4C7dc11E2e8F0Bc5C",
      redirect_url: `http://localhost:3000/collections/${id}/${chainId}`,
      // webhook_url: `https://rdland.io`,
    };

    dispatch(createNFT({ NFTInfo: newNFTInfo }));
    handleClose();
  };

  const confirmTransaction = async (url: string) => {
    window.open(url as string, "_blank");
    await getAllNFTs();
  };

  useEffect(() => {
    getAllNFTs();
  }, [getAllNFTs]);

  useEffect(() => {
    getAllNFTs();
  }, [NFT, getAllNFTs]);

  return (
    <div className={classes.root}>
      <Button
        onClick={handleOpen}
        color="success"
        className={classes.createButton}
      >
        New NFT
      </Button>

      <br />
      <br />
      {NFTs ? (
        <Box sx={{ flexGrow: 1 }} className={classes.allCollections}>
          <Grid container spacing={5}>
            {NFTs.filter((el) => el.contract === id).map((e, index) => (
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
                          setOneNFT(e);
                        }}
                      >
                        Detail NFTs
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New NFT Info
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label="File"
              color="secondary"
              focused
              onChange={(e) => {
                // setNFTName(e.target.value);
              }}
            />
            <br />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label="Id"
              color="secondary"
              focused
              value={nft_id}
              onChange={(e) => {
                setNFTId(e.target.value);
              }}
            />
            <br />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label="Name"
              color="secondary"
              focused
              value={nft_name}
              onChange={(e) => {
                setNFTName(e.target.value);
              }}
            />
            <br />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label="Price"
              color="secondary"
              focused
              value={nft_price}
              onChange={(e) => {
                setNFTPrice(e.target.value);
              }}
            />
            <br />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label="Description"
              color="secondary"
              focused
              value={nft_description}
              onChange={(e) => {
                setNFTDescription(e.target.value);
              }}
            />
            <br />
          </Typography>
          <br></br>
          <Button
            color="info"
            onClick={() => {
              createNewNFT();
            }}
          >
            Mint New NFT
          </Button>
        </Box>
      </Modal>

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            NFT Detail Info
          </Typography>
          {detailNFT ? (
            <div>
              <p>CollectionName : {detailNFT.name ? detailNFT.name : ""}</p>
              <p>
                CollectionShortName :{" "}
                {detailNFT.short_name ? detailNFT.short_name : ""}
              </p>
              <p>chainId : {detailNFT.chain_id ? detailNFT.chain_id : ""}</p>
              <p>NFTName : {detailNFT.data.name ? detailNFT.data.name : ""}</p>
              <p>
                Description :{" "}
                {detailNFT.data.description ? detailNFT.data.description : ""}
              </p>
              <p>Img : {detailNFT.data.imgUrl ? detailNFT.data.imgUrl : ""}</p>
            </div>
          ) : (
            ""
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default NFTs;
