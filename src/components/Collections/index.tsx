//node_modules
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

//styles
import { usenStyles } from "./style";

//store
import { RootState } from "../../redux/store";
import {
  createCollection,
  getCollections,
} from "../../redux/slices/collection.slice";

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

const Collections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = usenStyles();

  const { collections, collection } = useSelector(
    (state: RootState) => state.collection
  );

  const [chain, setChain] = React.useState("80001");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [chainId, setChainId] = useState<any>();
  const [collectionName, setCollectionName] = useState<any>("");
  const [shortName, setShortName] = useState<any>("");

  const getAllCollection = useCallback(async () => {
    const getData = {
      ApiKey: localStorage.getItem("ApiKey"),
      chainId: chain,
    };

    dispatch(getCollections({ getCollectionInfo: getData }));
  }, [dispatch, chain]);

  const createNew = async () => {
    if (!chain || !collectionName || !shortName) {
      alert("Invalid Parameter");
      return;
    }
    const collectionInfo = {
      key: localStorage.getItem("ApiKey"),
      chain_id: chain,
      name: collectionName,
      short_name: shortName,
    };
    await dispatch(createCollection({ collectionInfo: collectionInfo }));
    await getAllCollection();
    handleClose();
  };

  const confirmTransaction = async (url: string) => {
    window.open(url as string, "_blank");
    await getAllCollection();
  };

  useEffect(() => {
    if (!localStorage.getItem("ApiKey")) {
      navigate("/");
      return;
    }
    getAllCollection();
  }, [dispatch, navigate, getAllCollection]);

  useEffect(() => {
    if (collection.transaction_url) {
      // navigate(collection.transaction_url as string);
      // window.open(collection.transaction_url as string, "_blank");
    }
    getAllCollection();
  }, [collection, navigate, getAllCollection]);

  const selectChain = (event: SelectChangeEvent) => {
    setChain(event.target.value);
    getAllCollection();
  };

  return (
    <div className={classes.root}>
      <Button
        onClick={handleOpen}
        color="success"
        className={classes.createButton}
      >
        New Collection
      </Button>

      <InputLabel id="demo-select-small">Chain Id</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={chain}
        label="ChainId"
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        onChange={selectChain}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={80001}>Polygon Mumbai</MenuItem>
        <MenuItem value={97}>Binance Smart Chain</MenuItem>
      </Select>
      <br />
      <br />
      {collections ? (
        <Box sx={{ flexGrow: 1 }} className={classes.allCollections}>
          <Grid container spacing={4}>
            {collections.map((e, index) => (
              <Grid item key={index}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Name: {e.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      <>short_name : {e.short_name}</>
                      <br />
                      <>chainId : {e.chain_id}</>
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
                          console.log(e.contract);
                          navigate(`/collections/${e.contract}/${e.chain_id}`);
                        }}
                      >
                        Show NFTs
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <h2>no</h2>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New NFT Collection Info
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label="Chain ID"
              color="secondary"
              value={chain}
              focused
              disabled
              onChange={(e) => {
                setChain(e.target.value);
              }}
            />
            <br />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label="Collection Name"
              color="secondary"
              value={collectionName}
              focused
              onChange={(e) => {
                setCollectionName(e.target.value);
              }}
            />
            <br />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label="Collection Short_Name"
              color="secondary"
              value={shortName}
              focused
              onChange={(e) => {
                setShortName(e.target.value);
              }}
            />
            <br />
          </Typography>
          <br></br>
          <Button color="info" onClick={() => createNew()}>
            Create Collection
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Collections;
