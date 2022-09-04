import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const usenStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      paddingTop: "13%",
      paddingLeft: "30%",
      paddingRight: "30%",
      "&:hover": {
        opacity: 0.9,
      },
      "& .MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root":
        {
          margin: "20px",
        },
    },
    apiDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    apiKey: {
      width: "70%",
    },
  })
);
