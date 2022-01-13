import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useAuth } from "../utils/firebase/auth";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Cookie from "js-cookie";
import cookie from "cookie";
import { useForm } from "react-hook-form";
import LoginStyle from "../styles/login/login";

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const Login = () => {
  const classes = LoginStyle();

  const { signIn, signInWithGoogle } = useAuth();

  const { handleSubmit, errors, register } = useForm();

  const [error, setError] = useState();

  const onSubmit = (data) => {
    signIn(data.email, data.password).catch((error) => {
      setError(error.message);
    });
  };

  const [values, setValues] = useState<State>({
    email: "",
    password: "",
    showPassword: false,
  });

  const [rememberMe, setRememberMe] = useState(() => JSON.parse("false"));

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const Groupe98 = require("../assets/img/Groupe98.png");
  const imgGoogle = require("../assets/img/google.png");

  useEffect(() => {
    Cookie.set("rememberMe", JSON.stringify(rememberMe));
  }, [rememberMe]);

  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.loginContent}>
          <div className={classes.title}>Xpense</div>
          <div className={classes.welcome}>Bienvenue</div>
          <br />
          <button
            className={classes.btnGoogle}
            onClick={() => signInWithGoogle()}
          >
            <img src={imgGoogle} className={classes.imgGoogle} />
            Se connecter avec Google
          </button>

          <br />

          <div className="line or">
            <span> ou connectez-vous par email </span>
          </div>

          <br />

          {error && <div className={classes.alertError}>{error}</div>}
          <form className={classes.lineEnd} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.emailPassword}>
              <input
                className={classes.inputLogin}
                type="text"
                name="email"
                ref={register({ required: true })}
                placeholder="Votre email"
                value={values.email}
                onChange={handleChange("email")}
              />
              <span>
                <i className={classes.iconEemailPassword}>
                  <MailOutlineIcon />
                </i>
              </span>
            </div>
            {errors.email && (
              <div className={classes.alertError}>Email obligatoire</div>
            )}
            <br />
            <div className={classes.emailPassword}>
              <input
                className={classes.inputLogin}
                type={values.showPassword ? "text" : "password"}
                name="password"
                ref={register({ required: true })}
                placeholder="Votre mot de passe"
                value={values.password}
                onChange={handleChange("password")}
              />
              <span>
                <i
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  className={classes.iconEemailPassword}
                >
                  {values.showPassword ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </i>
              </span>
            </div>
            {errors.password && (
              <div className={classes.alertError}>Mot de passe obligatoire</div>
            )}
            <br />
            <div className="row">
              <div className="custom-control custom-checkbox custom-control-inline">
                <input
                  id="chk1"
                  type="checkbox"
                  name="chk"
                  className="custom-control-input"
                  value={rememberMe}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="chk1" className="custom-control-label ml-3">
                  <span className={classes.textSm}>Restez connecté</span>
                </label>
              </div>
              <a href="/reset-password" className="ml-auto mr-3">
                <span className={classes.textSm}>Mot de passe oublié ?</span>
              </a>
            </div>
            <br />
            <button type="submit" className={classes.btnSubmit}>
              Connexion
            </button>
            <div className="mb-3" />
          </form>

          <div className="row mt-3">
            <small className={classes.textSm}>
              Vous n'êtes pas encore inscrit ?{" "}
              <a href="/register" className="text-danger">
                Inscrivez-vous ici
              </a>
            </small>
          </div>
        </div>
        <div className={classes.imgXpense}>
          <img src={Groupe98} alt="" className={classes.imgX} />
          <div className={classes.nameXpense}>Xpense</div>
        </div>
      </div>
    </div>
  );
};

Login.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);

  return {
    initialRememberValue: cookies.rememberMe,
  };
};

export default Login;
