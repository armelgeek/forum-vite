import React, { useReducer, useState } from "react";
import sdk from "../../utils/api-sdk";
import OTPVerificationInput from "./OTPVerificationInput";
import { MdOutlineWavingHand } from "react-icons/md";
import { FaArrowLeft, FaRedo } from "react-icons/fa";
const CodeVerification = ({ state, dispatch, goBack, handleResetPassword }: any) => {
  const handleCodeChange = (code: string) => {
    dispatch({ type: "updateCode", payload: code });
  };
  const [codeError, setCodeError] = useState(false);
  const generatePassword = () => {
    handleResetPassword();
    setCodeError(false);
  };
  const handleSubmit = async () => {
    try {
      let requestObj = sdk.codeVerificationHandle(
        state.email,
        state.code
      ).promise;
      requestObj
        .then((response: any) => {
          dispatch({ type: "setSuccess", payload: response.message });
          setCodeError(false);
          dispatch({ type: "nextStep" });
        })
        .catch((error) => {
          setCodeError(true);
          dispatch({ type: "setSuccess", payload: error.message });
        });
    } catch (error: any) {
      setCodeError(true);
      dispatch({ type: "setSuccess", payload: error.message });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-1 rounded-md bg-white border py-7 px-6 w-1/3">
          <div className="flex flex-col justify-center items-center">
            <div className="icon-login mb-2">
              <MdOutlineWavingHand className="text-primary-500" size={40} />
            </div>
            <h1 className="text-xl font-semibold text-center">Verification</h1>
            <p className="text-gray-500 text-sm">Enter you OPT code number</p>
            {state.successMessage ? (
              <div className="alert alert-success mt-2 flex flex-row justify-center">{state.successMessage}</div>
            ) : null}
            {codeError && (
              <div className="w-full alert alert-danger flex flex-row justify-center mt-2 text-sm">Le code de reinialisation est invalide</div>
            )}
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <OTPVerificationInput
              numOfInputs={4}
              onResend={generatePassword}
              onChange={handleCodeChange}
              onSubmit={handleSubmit}
            />

            <div className="text-sm  text-primary-500 flex flex-row justify-center items-center gap-2">
              <FaArrowLeft />
              <button onClick={goBack}>

                Revenir en arriere
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeVerification;
