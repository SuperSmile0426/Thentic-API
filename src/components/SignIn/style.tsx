import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const usenStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      paddingTop: "18%",
      paddingLeft: "30%",
      paddingRight: "30%",
      "&:hover": {
        opacity: 0.9,
      },
      "& .MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root":
        {
          // width: "500px",
          margin: "20px",
        },
    },
    apiDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    apiKey: {
      width: "60%",
    },
  })
);
