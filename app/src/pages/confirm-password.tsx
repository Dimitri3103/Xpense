import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import Cookie from "js-cookie";
import cookie from "cookie";
import { useForm } from "react-hook-form";
import LoginStyle from "../styles/login/login";
import { useAuth } from "../utils/firebase/auth";

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

interface State {
  password: string;
  showPassword: boolean;
}

const ConfirmPassword = () => {
  const classes = LoginStyle();

  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const [rememberMe, setRememberMe] = useState(() => JSON.parse("false"));

  const getEmailForSignIn = () => {
    if (typeof window !== "undefined")
      return localStorage.getItem("emailForSignIn");
  };

  const emailForSignIn = getEmailForSignIn();

  const { handleSubmit, errors, register } = useForm();

  const [error, setError] = useState();

  const onSubmit = (data) => {
    console.log(emailForSignIn, data.password);
    createUserWithEmailAndPassword(emailForSignIn, data.password);
  };

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

  const check = require("../assets/img/check.png");

  useEffect(() => {
    Cookie.set("rememberMe", JSON.stringify(rememberMe));
  }, [rememberMe]);

  const { createUserWithEmailAndPassword } = useAuth();

  return (
    <div>
      <div className={classes.plan}>
        <div>
          <img className={classes.checkImg} src={check} alt="" />
        </div>
        <div className={classes.title}>Xpense</div>
        <div className={classes.box}>
          <div className={classes.step}>Juste un pas de plus..</div>
          <br />
          <div className={classes.txtConfirm}>
            Veuillez saisir votre mot de passe afin de pouvoir vous connecter.
            Si jamais vous l'avez oublié nous avons envoyé un e-mail de
            confirmation à :
          </div>
          <br />
          <div className={classes.emailInvitation}>{emailForSignIn}</div>
          <br />
          {error && <div className={classes.alertError}>{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row form-group">
              <div className={classes.emailPassword}>
                <input
                  className={classes.inputLogin}
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  ref={register({ required: true })}
                  onChange={handleChange("password")}
                  name="password"
                  placeholder="Votre mot de passe"
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
            </div>
            {errors.password && (
              <div className={classes.alertError}>Mot de passe obligatoire</div>
            )}
            <div className="row mb-3">
              <div className="custom-control custom-checkbox custom-control-inline">
                <input
                  id="chk1"
                  type="checkbox"
                  name="check"
                  value={rememberMe}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="custom-control-input"
                />
                <label htmlFor="chk1" className="custom-control-label ml-3">
                  <span className={classes.textSm}>Restez connecté</span>
                </label>
              </div>
              <a href="/reset-password" className="ml-auto mr-3">
                <span className={classes.textSm}>Mot de passe oublié ?</span>
              </a>
            </div>
            <div className="row mb-2">
              <button type="submit" className={classes.btnSubmit}>
                Connexion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ConfirmPassword.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);

  return {
    initialRememberValue: cookies.rememberMe,
  };
};

export default ConfirmPassword;
