import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../services-back/admin/userService";
import { useAuth } from "../utils/firebase/auth";
import { AlertBar } from "../components/Notification";
import LoginStyle from "../styles/login/login";
import { PaymentDialog } from "../components/payment/paymentDialog";

const Register = () => {
  const classes = LoginStyle();

  const { signInWithGoogle } = useAuth();
  const Groupe98 = require("../assets/img/Groupe98.png");
  const imgGoogle = require("../assets/img/google.png");

  const [alertMeta, setAlertMeta] = useState({ severity: "", message: "" });
  const [isAlertOpen, setAlertOpen] = useState(false);

  const showAlert = (severity, message) => {
    setAlertMeta({ severity, message });
    setAlertOpen(true);
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const { handleSubmit, errors, register } = useForm();

  const onSubmit = (data) => {
    createUser(data)
      .then(() => showAlert("success", "Inscription réussie"))
      .catch(() => showAlert("error", "Erreur d'inscription"));
  };

  const [isPayment, setIsisPayment] = React.useState(false);
  const handlePaymentDialogClose = () => {
    setIsisPayment(false);
  };
  const handlePaymentDialog = () => {
    setIsisPayment(true);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.loginContent}>
          <div className={classes.title}>Xpense</div>
          <div className={classes.welcome}>Bienvenue</div>
          <button
            className={classes.btnGoogle}
            onClick={() => signInWithGoogle()}
          >
            <img src={imgGoogle} className={classes.imgGoogle} />
            Inscrivez-vous avec Google
          </button>
          <br />
          <div className="line or">
            <span> ou inscrivez-vous par email </span>
          </div>
          <br />
          <div className={classes.lineEnd}>
            <div className="mb-1">
              <input
                className={classes.inputLogin}
                id="organization"
                name="organization"
                placeholder="Nom de l'organisation"
                ref={register({ required: true })}
              />
              {errors.organization && (
                <div className="alert-error">Organisation obligatoire</div>
              )}
            </div>
            <div className="mb-1">
              <input
                className={classes.inputLogin}
                id="address"
                name="address"
                placeholder="Adresse de l'organisation"
                ref={register({ required: true })}
              />
              {errors.address && (
                <div className="alert-error">
                  Adresse de l'organisation obligatoire
                </div>
              )}
            </div>
            <div className="mt-1 mb-1">
              <input
                className={classes.inputLogin}
                id="firstName"
                name="firstName"
                placeholder="Votre prénom"
                ref={register({ required: true })}
              />
              {errors.firstName && (
                <div className={classes.alertError}>Prénom obligatoire</div>
              )}
            </div>
            <div className="mt-1 mb-1">
              <input
                className={classes.inputLogin}
                id="lastName"
                name="lastName"
                placeholder="Votre nom"
                ref={register({ required: true })}
              />
              {errors.lastName && (
                <div className={classes.alertError}>Nom obligatoire</div>
              )}
            </div>
            <div className="mt-1 mb-1">
              <input
                className={classes.inputLogin}
                id="email"
                name="email"
                placeholder="Votre email"
                ref={register({ required: true })}
              />
              {errors.email && (
                <div className={classes.alertError}>Email obligatoire</div>
              )}
            </div>
            <div className="mt-1 mb-1">
              <input
                className={classes.inputLogin}
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Votre numéro de téléphone"
                ref={register({ required: true })}
              />
              {errors.phoneNumber && (
                <div className={classes.alertError}>
                  Numéro de téléphone obligatoire
                </div>
              )}
            </div>
            <div className="mt-1 mb-1">
              <input
                className={classes.inputLogin}
                type="password"
                id="password"
                name="password"
                placeholder="Votre mot de passe"
                ref={register({ required: true })}
              />
              {errors.password && (
                <div className="alert-error">Mot de passe obligatoire</div>
              )}
            </div>
            <div className="mt-2 mb-2">
              <div className="custom-control custom-checkbox custom-control-inline">
                <input
                  id="chk1"
                  type="checkbox"
                  name="chk"
                  className="custom-control-input"
                />
                <label htmlFor="chk1" className="custom-control-label">
                  <span className={classes.textSm}>
                    J'accepte
                    <a href="#" className="text-danger pl-1">
                      les conditions générales de vente et d'utilisation
                    </a>
                  </span>
                </label>
              </div>
            </div>
            <button className={classes.btnSubmit} onClick={handlePaymentDialog}>
              Inscription
            </button>
          </div>
          <div className="row mt-1">
            <small className={classes.textSm}>
              Vous avez déjà un compte ?
              <a href="/login" className="text-danger pl-1">
                Connectez-vous ici
              </a>
            </small>
          </div>
        </div>

        <div className={classes.imgXpense}>
          <img src={Groupe98} alt="" className={classes.imgX} />
          <div className={classes.nameXpense}>Xpense</div>
        </div>
      </div>
      <AlertBar
        open={isAlertOpen}
        onClose={handleAlertClose}
        alertMeta={alertMeta}
      />
      <PaymentDialog
        isOpen={isPayment}
        handleClose={handlePaymentDialogClose}
      />
    </>
  );
};

export default Register;
