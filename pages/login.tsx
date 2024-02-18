import { FormEventHandler, useState } from "react";
// next
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// mui
import {
  Typography,
  Paper,
  TextField,
  Button,
  Container,
  CircularProgress,
  IconButton,
} from "@mui/material";
// icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// interfaces
import { User } from "../src/types/entities/User";
// hooks
import { useUserContext } from "../src/contexts/UserContext";
import { useUserQueries } from "../src/hooks/queries/useUserQueries";
import { useUserMutations } from "../src/hooks/mutations/useUserMutations";
// utils
import { mainAxios } from "../src/utils/AxiosInstances";

const LoginPage = () => {
  const { fetchUserInfo } = useUserQueries();
  const { loginUser, loading: loadingMutation } = useUserMutations();

  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [twoFactorFlag, setTwoFactorFlag] = useState(false);
  const [twoFactorValue, setTwoFactorValue] = useState<string>();
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
      handleTogglePanel(false);
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

  const handleTogglePanel = (isSignIn: boolean) => {
    setIsLogin(isSignIn);
  };

  return (
    <>
      <Head>
        <title>Login | Theatrica</title>
      </Head>
      <Container
        component="form"
        onSubmit={handleSubmit}
        className="!flex !no-wrap justify-center items-center !min-h-[calc(100vh-64px)]  !pl-0 !pr-0 !w-full"
      >
        {/* Sliding container */}
        <div
          className={`login-container ${isLogin ? "" : "right-panel-active"}`}
        >
          {/* Sign in card */}

          <div className="sign-in-container form-container">
            <Paper
              elevation={2}
              className="flex flex-col justify-center items-center gap-5 h-full"
            >
              <Typography variant="h3" component="h1">
                Σύνδεση
              </Typography>
              {error && (
                <Typography className="text-[#f44336]">{error}</Typography>
              )}
              {/* Social media */}
              <div className="flex w-full justify-center items-center">
                <IconButton color="info">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="success">
                  <GoogleIcon />
                </IconButton>
                <IconButton>
                  <LinkedInIcon color="primary" />
                </IconButton>
              </div>
              <Typography variant="caption">ή με υπάρχον λογαριασμό</Typography>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
                color="secondary"
                type="email"
                InputProps={{
                  style: { backgroundColor: "white" },
                }}
              />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Κωδικός"
                type="password"
                variant="outlined"
                color="secondary"
                InputProps={{
                  style: { backgroundColor: "white" },
                }}
              />
              <Button
                type="submit"
                disabled={loadingMutation || password.length < 3 || !email}
                variant="contained"
                className="!bg-secondary hover:!bg-opacity-80"
              >
                {loadingMutation ? (
                  <CircularProgress className="!text-white" />
                ) : (
                  "Σύνδεση"
                )}
              </Button>
            </Paper>
          </div>
          {/* Sign up card and 2fa*/}
          <div className="sign-up-container form-container">
            {/* Sign up */}
            {!twoFactorFlag ? (
              <Paper
                elevation={2}
                className="flex flex-col justify-center items-center gap-5 h-full"
              >
                <Typography variant="h3" component="h1">
                  Εγγραφή
                </Typography>
                {error && (
                  <Typography className="text-[#f44336]">{error}</Typography>
                )}
                {/* Social media */}
                <div className="flex w-full justify-center items-center">
                  <IconButton color="info">
                    <FacebookIcon />
                  </IconButton>
                  <IconButton color="success">
                    <GoogleIcon />
                  </IconButton>
                  <IconButton>
                    <LinkedInIcon color="primary" />
                  </IconButton>
                </div>
                <Typography variant="caption">ή με δικό σας email</Typography>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  variant="outlined"
                  color="secondary"
                  type="email"
                  InputProps={{
                    style: { backgroundColor: "white" },
                  }}
                />
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Κωδικός"
                  type="password"
                  variant="outlined"
                  color="secondary"
                  InputProps={{
                    style: { backgroundColor: "white" },
                  }}
                />
                <TextField
                  InputLabelProps={{ required: false }}
                  value={confirmPassword}
                  onChange={(e) => {
                    setPasswordError(false);
                    setConfirmPassword(e.target.value);
                  }}
                  label="Επιβεβαίωση κωδικού"
                  type="password"
                  variant="outlined"
                  color="secondary"
                  error={passwordError}
                  helperText={passwordError && "Passwords do not match!"}
                  InputProps={{
                    style: { backgroundColor: "white" },
                  }}
                />
                <Button
                  type="submit"
                  disabled={
                    loadingMutation ||
                    !email ||
                    password.length < 3 ||
                    confirmPassword.length < 3
                  }
                  variant="contained"
                  className="!bg-secondary hover:!bg-opacity-80"
                >
                  {loadingMutation ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    "Εγγραφή"
                  )}
                </Button>
              </Paper>
            ) : (
              // 2FA
              <Paper
                elevation={2}
                className="flex flex-col justify-center items-center gap-5 h-full"
              >
                <Typography variant="h3" component="h1">
                  Επιβεβαίωση κωδικού
                </Typography>
                <TextField
                  InputLabelProps={{ required: false }}
                  value={twoFactorValue}
                  onChange={(e) => setTwoFactorValue(e.target.value)}
                  label="Κωδικός Επιβεβαίωσης"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  InputProps={{
                    style: { backgroundColor: "white" },
                  }}
                />
                <Button
                  type="submit"
                  disabled={loadingMutation}
                  variant="contained"
                  className="!bg-secondary hover:!bg-opacity-80"
                >
                  Επιβεβαίωση
                </Button>
              </Paper>
            )}
          </div>
          {/* Overlay card */}
          <div className="login-overlay-container">
            <div className="login-overlay">
              <div className="login-overlay-panel login-overlay-left">
                {!twoFactorFlag ? (
                  <div className="flex flex-col">
                    <Typography variant="h2">Καλώς ήρθατε στο</Typography>
                    <Image
                      src="/logos/logo-name.svg"
                      alt="Logo"
                      width={40}
                      height={40}
                      className="w-40 ml-2"
                    />

                    <Typography variant="caption">
                      Έχετε ήδη λογαριασμό;
                    </Typography>
                    <Button
                      className="!rounded-2xl !text-white !bg-secondary hover:!bg-opacity-80"
                      variant="outlined"
                      onClick={() => handleTogglePanel(true)}
                    >
                      Σύνδεση
                    </Button>
                  </div>
                ) : (
                  // 2fa
                  <div className="flex flex-col">
                    <Typography variant="h2">Επαλήθευση 2FA</Typography>
                    <Typography variant="caption">
                      Παρακαλώ ελέγξτε το email σας. Σας έχουμε στείλει έναν
                      κωδικό μίας χρήσης.
                    </Typography>
                  </div>
                )}
              </div>
              <div className="login-overlay-panel login-overlay-right">
                <Typography variant="h2">Συνδεθείτε στο</Typography>
                <Image
                  src="/logos/logo-name.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="w-40 ml-2"
                />
                <Typography variant="caption">Δεν έχετε λογαριασμό;</Typography>
                <Button
                  className="!rounded-2xl !text-white !bg-secondary hover:!bg-opacity-80"
                  variant="outlined"
                  onClick={() => handleTogglePanel(false)}
                >
                  Εγγραφή
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
