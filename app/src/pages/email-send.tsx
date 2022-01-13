import React from "react";
import LoginStyle from "../styles/login/login";
import Router from "next/router";

const EmailSent = () => {
  const classes = LoginStyle();

  const Groupe98 = require("../assets/img/Groupe98.png");
  const mailSend = require("../assets/img/mail-send.png");

  return (
    <div className={classes.wrapper}>
      <div className={classes.loginContent}>
        <div className={classes.title}>Xpense</div>
        <div className={classes.emailSend}>L’email a été envoyé</div>
        <br />
        <div className={classes.txtEs}>
          S’il vous plaît vérifier votre boîte de réception et cliquez sur le
          lien reçu pour réinitialiser votre mot de passe
        </div>
        <br />
        <div className={classes.lineEnd}>
          <div className="mt-5 mb-2">
            <img src={mailSend} alt="" />
          </div>
          <div className="row mt-2">
            <button
              type="submit"
              className={classes.btnSubmit}
              onClick={() => Router.push("/login")}
            >
              Connexion
            </button>
          </div>
        </div>
        <div className="row mt-4">
          <small className={classes.textSm}>
            Je n’ai pas reçu le lien ?{" "}
            <a href="/reset-password" className="text-danger">
              Renvoyer
            </a>
          </small>
        </div>
      </div>
      <div className={classes.imgXpense}>
        <img src={Groupe98} alt="" className={classes.imgX} />
        <div className={classes.nameXpense}>Xpense</div>
      </div>
    </div>
  );
};

export default EmailSent;
