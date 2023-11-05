import { FormEventHandler, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Typography,
  makeStyles,
  Paper,
  TextField,
  Button,
  Container,
  CircularProgress,
} from "@material-ui/core";
// interfaces
import { User } from "../src/types/User";
// hooks
import { useUserContext } from "../src/contexts/UserContext";
import { useUserQueries } from "../src/hooks/queries/useUserQueries";
// utils and icons
import { mainAxios } from "../src/utils/AxiosInstances";
import style from "../src/assets/jss/layouts/loginPageStyles";

const useStyles = makeStyles(style);

const LoginPage = () => {
  const { fetchUserInfo } = useUserQueries();

  const classes = useStyles();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { setIsLoggedIn } = useUserContext();

  const handleSignUp = () => {
    setLoading(true);

    mainAxios
      .post("User/register", {
        email,
        password,
        role: 0,
      })
      .then(() => {
        handleLogin();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogin = () => {
    setLoading(true);

    mainAxios
      .post("User/login", {
        email,
        password,
      })
      .then(() => {
        setIsLoggedIn(true);
        fetchUserInfo().then(() => {
          router.push("/");
        });
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

export default LoginPage;
