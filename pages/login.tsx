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
import { useUserMutations } from "../src/hooks/mutations/useUserMutations";

const useStyles = makeStyles(style);

const LoginPage = () => {
  const { fetchUserInfo } = useUserQueries();
  const { loginUser, loading: loadingMutation } = useUserMutations();

  const classes = useStyles();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [twoFactorFlag, setTwoFactorFlag] = useState(false);
  const [twoFactorValue, setTwoFactorValue] = useState<number>();
  // const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { setIsLoggedIn, user } = useUserContext();

  const handleSignUp = () => {
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

  const handleLogin = async () => {
    const response = await loginUser(email, password);
    if (response === -1) {
      setTwoFactorFlag(true);
    } else {
      router.push("/");
    }
  };

  const handleTwoFactorSubmit = () => {
    if (!twoFactorValue) return;
    mainAxios
      .post(`User/login/2fa/${encodeURIComponent(twoFactorValue)}`)
      .then((d) => {
        if (!d) {
          setPasswordError(true);
          return;
        }
      })
      .then(() => {
        fetchUserInfo().then(() => {
          router.push("/");
        });
      });
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (twoFactorFlag) {
      handleTwoFactorSubmit();
      return;
    }
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
            {isLogin ? "Login" : "Sign Up" || (twoFactorFlag && "Two")}
          </Typography>
          {error && (
            <Typography className={classes.errorText}>{error}</Typography>
          )}

          {!twoFactorFlag && (
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
          )}
          {!twoFactorFlag && (
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
          )}
          {!isLogin && !twoFactorFlag && (
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
          {twoFactorFlag && (
            <TextField
              InputLabelProps={{ required: false }}
              value={twoFactorValue}
              onChange={(e) => {
                setPasswordError(false);
                setTwoFactorValue(parseFloat(e.target.value));
              }}
              label="Confirm two-factor password"
              type="text"
              variant="outlined"
              color="secondary"
              required={twoFactorFlag}
            />
          )}
          <Button
            type="submit"
            disabled={loadingMutation}
            variant="contained"
            color="secondary"
          >
            {loadingMutation ? (
              <CircularProgress color="secondary" />
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </Button>
          {!twoFactorFlag && (
            <div>
              <Typography variant="overline" display="inline">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </Typography>
              <Button
                onClick={() => setIsLogin((prev) => !prev)}
                variant="text"
                color="secondary"
              >
                {isLogin ? "Sign Up" : "Login"}
              </Button>
            </div>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
