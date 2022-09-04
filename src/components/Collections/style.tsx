import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const usenStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "3%",
      "&  .MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textSuccess MuiButton-sizeMedium MuiButton-textSizeMedium makeStyles-createButton-8 css-1lg55su-MuiButtonBase-root-MuiButton-root":
        {
          background: "lightblue",
        },
    },
    container: {
      display: "flex",
    },
    allCollections: {
      display: "inline-block",
    },
    createButton: {
      background: "lightblue",
    },
  })
);
