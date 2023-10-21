import {
  Typography,
  makeStyles,
  Paper,
  TextField,
  Button,
  Container,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import { useUserContext } from "../src/contexts/UserContext";
import style from "../src/assets/jss/layouts/loginPageStyles";
import { baseURL } from "../src/utils/AxiosInstances";

const useStyles = makeStyles(style);

const ColorPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { setIsLoggedIn, setUser } = useUserContext();

  const handleSignUp = () => {
    setLoading(true);

    axios
      .post(`${baseURL}/User/register`, {
        email,
        password,
        authorities: ["USER"],
      })
      .then(() => {
        setIsLoggedIn(true);
        setUser({ email: email, emailVerified: false });
        router.push("/");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleLogin = () => {
    setLoading(true);

    axios
      .post(`${baseURL}/User/login`, {
        email,
        password,
      })
      .then((data) => {
        localStorage.setItem(
          "authToken",
          JSON.stringify(data.data.access_token)
        );
        //TODO: use fetcher for these calls that will have the access token as bearer
        //TODO: setAuthToken at localStorage??
        axios.post(`${baseURL}/User/info`, {
          headers: `Bearer:${data.data.access_token}`,
        });
        setIsLoggedIn(true);
        setUser({ email: email, emailVerified: data.data.emailVerified });
        router.push("/");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      if (password !== confirmPassword) setPasswordError(true);
      else handleSignUp();
    }
  };

  return (
    <>
      <Head>
        <title>Login | Theatrica</title>
      </Head>
      <Container
        component="form"
        onSubmit={handleSubmit}
        className={classes.outerContainer}
      >
        <Paper elevation={2} className={classes.paperContainer}>
          <Typography variant="h3" component="h1">
            {isLogin ? "Login" : "Sign Up"}
          </Typography>
          {error && (
            <Typography className={classes.errorText}>{error}</Typography>
          )}
          <TextField
            InputLabelProps={{ required: false }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            color="secondary"
            type="email"
            required
          />
          <TextField
            InputLabelProps={{ required: false }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            variant="outlined"
            color="secondary"
            required
          />
          {!isLogin && (
            <TextField
              InputLabelProps={{ required: false }}
              value={confirmPassword}
              onChange={(e) => {
                setPasswordError(false);
                setConfirmPassword(e.target.value);
              }}
              label="Confirm Password"
              type="password"
              variant="outlined"
              color="secondary"
              error={passwordError}
              helperText={passwordError && "Password do not match!"}
              required
            />
          )}
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            color="secondary"
          >
            {loading ? (
              <CircularProgress color="secondary" />
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </Button>
          <div>
            <Typography variant="overline" display="inline">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </Typography>
            <Button
              onClick={() => setIsLogin((prev) => !prev)}
              variant="text"
              color="secondary"
            >
              {isLogin ? "Sign Up" : "Login"}
            </Button>
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default ColorPage;
