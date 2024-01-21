
import React, { useState, useRef } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";

const OTPVerificationInput = ({ numOfInputs, onResend, onChange, onSubmit }: any) => {
  const [OTP, setOTP] = useState("");
  const renderButton = (buttonProps: any) => {
    return <button {...buttonProps} className="btn btn-info btn-xs">
      Renvoyer le code
    </button>;
  };
  const renderTime = (remainingTime: any) => {
    return <span className="text-sm">{remainingTime} s restants</span>;
  };

  return (
    <>
      <div className="flex flex-row justify-center my-2 items-center">
        <OTPInput
          value={OTP}
          onChange={(value: any) => {
            onChange(value);
            setOTP(value);
          }}
          autoFocus
          OTPLength={numOfInputs}
          otpType="number"
          disabled={false}
          inputClassName="bg-slate-100 border-slate-300 rounded-md"
          inputStyles={{
            width: 48,
            height: 48
          }}
        />
      </div>

      <button
        disabled={OTP.length <= 0}
        className="btn w-full text-white bg-primary-500"
        onClick={onSubmit}
      >
        <p>Verifier</p>
      </button>
      <div className="mt-2 mb-3">
        <ResendOTP renderButton={renderButton} maxTime={600} onResendClick={onResend} renderTime={renderTime} />
      </div>
    </>
  );
};

export default OTPVerificationInput;
