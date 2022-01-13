import React, { useState } from "react";
import { Dialog, makeStyles } from "@material-ui/core";
import { TitleDialog } from "../../styles/typography";
import {
  CloseButon,
  CommonDialogContent,
  CommonDialogTitle,
} from "../../styles/dialogs";
import GooglePayButton from "@google-pay/button-react";

const useStyles = makeStyles((theme) => ({
  btnSubmit: { width: "60%" },
  btnClose: { width: "40%" },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const PaymentDialog = ({ isOpen, handleClose }) => {
  const classes = useStyles();

  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            boxShadow: "0px 3px 23px #00000033",
            borderRadius: 17,
            width: "23%",
          },
        }}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <CommonDialogTitle id="max-width-dialog-title">
          <TitleDialog>Valider Votre Inscription</TitleDialog>
          <CloseButon onClick={handleClose}>
            <i className="uil uil-times-circle" style={{ fontSize: "1.5vw" }} />
          </CloseButon>
        </CommonDialogTitle>
        <CommonDialogContent dividers>
          <div className={classes.dialogContent}>
            <GooglePayButton
              environment="TEST"
              buttonSizeMode="fill"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Only",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: "100.00",
                  currencyCode: "USD",
                  countryCode: "US",
                },
              }}
            />
          </div>
        </CommonDialogContent>
      </Dialog>
    </>
  );
};
