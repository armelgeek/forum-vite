import React from "react";
const RemainingButton=({ ...props })=> {
  
    return (
        <>
            <button className="w-full btn text-white bg-primary-500" disabled={props.remainingTime !== 0 || props.disabled} onClick={props.onClick} type="button">
                {props.remainingTime !== 0 ? (<span>{props.remainingTime} sec</span>) : <span>{props.title}</span>}
            </button>
        </>
    );
}
export default RemainingButton;