import React from "react";
import OtpInput from "otp-input-react";
import "./OtpPage.css";
import phIcon from "../Images/pho-icon.svg";
import shIcon from "../Images/sh-icon.svg";
import loadingIcon from "../Images/eos-iconloading.svg";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

export default function OtpPage() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [showOTP, setShowOtp] = useState(false);
  const [logged, setLogged] = useState(null);

  function onCapVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignUp();
          },
          "expired-callback": () => {},
        }
      );
    }
  }
  function onSignUp() {
    setLoading(true);
    onCapVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
        toast.success("OTP was sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function otpVerified() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setLogged(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <div className="content">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {logged ? (
        <h2>Login was successful 👍 </h2>
      ) : (
        <div className="verified">
          {!showOTP ? (
            <div className="contentForPh">
              <h2>
                Welcome to <br />A VERIFICATION PAGE
              </h2>
              <img src={phIcon} />
              <br />
              <label htmlFor="otp">Verify Your Phone number</label>
              <PhoneInput
                className="phField"
                country="ng"
                value={ph}
                onChange={setPh}
              />
              <button onClick={onSignUp}>
                <span className="btnSpan">
                  {loading ? <img className="btnload" src={loadingIcon} /> : ""}{" "}
                  Send OTP via SMS
                </span>
              </button>
            </div>
          ) : (
            <div className="contentForOtp">
              <h2>
                Welcome to <br />A VERIFICATION PAGE
              </h2>
              <img src={shIcon} />
              <br />
              <label htmlFor="otp">Enter Your OTP</label>
              <OtpInput
                className="otpField"
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                disabled={false}
                otpType="number"
                autoFocus
              ></OtpInput>
              <button onClick={otpVerified}>
                <span className="btnSpan">
                  {loading ? <img className="btnload" src={loadingIcon} /> : ""}
                  Verify your OTP
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
