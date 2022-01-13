import React, { ChangeEvent, useState } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useAuth } from "../utils/firebase/auth";
import Router from "next/router";
import { useForm } from "react-hook-form";
import LoginStyle from "../styles/login/login";

interface State {
  email: string;
}

const ResetPassword = () => {
  const classes = LoginStyle();
  const Groupe98 = require("../assets/img/Groupe98.png");

  const { resetPassword } = useAuth();

  const { handleSubmit, errors, register } = useForm();

  const [error, setError] = useState();

  const onSubmit = (data) => {
    resetPassword(data.email).catch((error) => {
      setError(error.message);
    });
  };

  const [values, setValues] = useState<State>({
    email: "",
  });

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.loginContent}>
          <div className={classes.title}>Xpense</div>
          <div className={classes.forgotPassword}>Mot de passe oublié ?</div>
          <br />
          <div className={classes.txt}>
            Entrez l’e-mail associé à votre compte et nous vous enverrons un
            e-mail avec Les instructions pour réinitialiser votre mot de passe
          </div>
          <br />
          {error && <div className={classes.alertError}>{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit" className={classes.btnSubmit}>
              Réinitialiser le mot de passe
            </button>
          </form>

          <button
            type="submit"
            className={classes.btnCancel}
            onClick={() => Router.push("/login")}
          >
            Annuler
          </button>
        </div>
        <div className={classes.imgXpense}>
          <img src={Groupe98} alt="" className={classes.imgX} />
          <div className={classes.nameXpense}>Xpense</div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
