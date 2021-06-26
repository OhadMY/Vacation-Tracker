import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Box,
  Tooltip,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { isAdmin, logout } from "../app/slices/userSlice";
import { Add, ExitToApp, BarChart } from "@material-ui/icons";
import { useState } from "react";
import { AddVacationModal } from "./AddVacationModal";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightButtons: {
    display: "flex",
    gap: 10,
  },
}));

export const Navbar = () => {
  const admin = useAppSelector(isAdmin);
  const history = useHistory();
  const classes = useStyles();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const [addVacationModalOpen, setAddVacationModalOpen] = useState(false);

  const handleClose = () => {
    setAddVacationModalOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Container className={classes.root}>
            <Typography
              component={Link}
              to="/"
              variant="h5"
              color="inherit"
              style={{ textDecoration: "none" }}
            >
              Vacation Tracker
            </Typography>
            <Box className={classes.rightButtons}>
              {admin && (
                <>
                  <Tooltip title="Add Vacation">
                    <Button
                      color="inherit"
                      onClick={() => {
                        setAddVacationModalOpen(true);
                      }}
                    >
                      <Add fontSize="large" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Statistics">
                    <Button color="inherit" component={Link} to="/statistics">
                      <BarChart fontSize="large" />
                    </Button>
                  </Tooltip>
                </>
              )}
              {isLoggedIn ? (
                <Tooltip title="Logout">
                  <Button color="inherit" onClick={handleLogout}>
                    <ExitToApp fontSize="large" />
                  </Button>
                </Tooltip>
              ) : (
                <>
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => history.push("/register")}
                  >
                    Register
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => history.push("/login")}
                  >
                    Login
                  </Button>
                </>
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <AddVacationModal open={addVacationModalOpen} onClose={handleClose} />
    </>
  );
};
