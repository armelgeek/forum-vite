import React, { useReducer, useState } from "react";
import jwtDecode from 'jwt-decode';
import sdk from "../../utils/api-sdk";
import OTPVerificationInput from "./OTPVerificationInput";
import { MdOutlineWavingHand } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const CodeActivation = ({ state, dispatch, toggleRegister }: any) => {
  const history = useHistory();
  const handleCodeChange = (code: string) => {
    dispatch({ type: "UPDATE_CODE", payload: code });
  };
  const generatePassword = () => {
    try {
      let requestObj = sdk.regenerateVerifyCodeHandle(state.email).promise;
      requestObj
        .then((response: any) => {
          dispatch({ type: "SET_MESSAGE", payload: response.message });
        })
        .catch((error: any) => {
          dispatch({ type: "SET_MESSAGE", payload: error.message });
        });
    } catch (error: any) {
      dispatch({ type: "SET_MESSAGE", payload: error.message });
    }
  };
  const handleSubmit = async () => {
    try {
    
      let requestObj = sdk.verifyAccountHandle(
        state.code,
        state.password
      ).promise;
      requestObj
        .then((response: any) => {
          const { accessToken, refreshToken } = response;
          const decodedToken = jwtDecode(accessToken) as any;
          if (decodedToken != null) {
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: {
                accessToken,
                refreshToken,
                isAuthenticated: true,
                isLoading: false,
                user: {
                  id: decodedToken.id as string,
                  email: decodedToken.email as string,
                  username: decodedToken.username as string,
                  photo: decodedToken.photo as string,
                },
              },
            });
          }
        })
        .catch((error) => {
          dispatch({ type: "SET_MESSAGE", payload: error.message });
        });
    } catch (error: any) {
      dispatch({ type: "SET_MESSAGE", payload: error.message });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-1 rounded-md bg-white border py-7 px-6 w-1/3">
        <div className="flex flex-col justify-center items-center">
          <div className="icon-login mb-2">
            <MdOutlineWavingHand className="text-primary-500" size={40} />
          </div>
          <h1 className="text-xl font-semibold text-center">Code d'activation</h1>
          <p className="text-gray-500 text-sm text-center">Entrer le code d'activation envoyé dans votre mail</p>
        </div>
        <div className="flex flex-col gap-1 mt-2 flex-1 text-center">
          {state.message ? (
            <div className="alert alert-info flex flex-row justify-center">{state.message}</div>
          ) : null}
          <OTPVerificationInput
            numOfInputs={4}
            onResend={generatePassword}
            onChange={handleCodeChange}
            onSubmit={handleSubmit}
          />

          <div className="text-sm mt-3 text-primary-500 flex flex-row items-center gap-2">
            <FaArrowLeft />
            <button onClick={() => history.goBack()}>

              Revenir en arriere
            </button>
          </div>
        </div></div></div>
  );
};

export default CodeActivation;
