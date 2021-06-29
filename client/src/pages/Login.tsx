import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../app/slices/userSlice";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    test: { display: "none" },
  })
);

export const Login = () => {
  const accountCreated = useAppSelector((state) => state.user.accountCreated);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const history = useHistory();
  const wrongCredentials = useAppSelector(
    (state) => state.user.wrongCredentials
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login({ username, password }));
    } else {
      alert("Missing Some Info...");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {wrongCredentials && (
            <Typography>{"Wrong Credentials, Please try again..."}</Typography>
          )}
          {accountCreated && (
            <Typography>
              {"Account created successfuly!! Please log in"}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => history.push("/register")}
              >
                {"Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
