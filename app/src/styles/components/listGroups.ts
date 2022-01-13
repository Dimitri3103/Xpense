import { makeStyles } from "@material-ui/core";

const listGroups = makeStyles((theme) => ({
  btnAddGroups: { width: "100%" },
  groupCard: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 1px 3px #0000000F",
    borderRadius: 16,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  nameGroup: { font: "normal normal bold 1vw COCOGOOSE", color: "#07114B" },
  cardContent: { paddingRight: 0, paddingTop: 0 },
  menu: {
    marginTop: 40,
    [theme.breakpoints.up("sm")]: { marginTop: 28 },
  },
  cardHeader: { height: "30%" },
}));

export default listGroups;
