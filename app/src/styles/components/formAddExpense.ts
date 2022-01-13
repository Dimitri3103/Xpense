import { makeStyles } from "@material-ui/core";

const formAddStyle = makeStyles((theme) => ({
    btnAddFields: { width: "70%" },
    btnAddFees: {
      width: "80%",
      background: "#2FBF39 0% 0% no-repeat padding-box",
      borderRadius: 30,
      textTransform: "none",
      font: "normal normal 600 0.9vw Open Sans",
      color: "#FFFFFF",
    },
    inputForm: {
      width: "100%",
      font: "normal normal normal 0.8vw Open Sans",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
    },
    inputAmount: {
      width: "100%",
      font: "normal normal normal 0.8vw Open Sans",
      marginTop: theme.spacing(1),
    },
    inputTotal: {
      width: "90%",
      font: "normal normal normal 1vw Open Sans",
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    total: { font: "normal normal 600 0.9vw Open Sans", color: "#2F45C5" },
    imgPreview: { width: "100%", height: 150 },
    imgPreview2: { width: "100%", height: 210 },
    uploadPart: {
      border: "2px dashed #9BABC560",
      borderRadius: 17,
      width: "100%",
      height: 200,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imgUploadFile: { width: "30%", height: "40%", cursor: "pointer" },
    btnSave: { width: "14%" },
    btnCancel: { marginLeft: theme.spacing(1), width: "9%" },
    fontForm: { font: "normal normal normal 0.8vw Open Sans" },
    fileName: {
      font: "normal normal 400 1vw Open Sans",
      textAlign: "center",
      color: "#07114B",
    },
  }));

  export default formAddStyle;