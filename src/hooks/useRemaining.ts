import { useState, useEffect, useRef } from "react";

const useRemaining = ({
    maxTime = 60,
    onTimerComplete = () => {},
    timeInterval = 1,
    onResendClick  = () => {}
}: any) => {
    const timeout = useRef() as any;

    const [remainingTime, setRemainingTime] = useState(maxTime);

    useEffect(() => {
        if (timeout.current && remainingTime === 0) {
            clearTimeout(timeout.current);
            if (onTimerComplete) {
                onTimerComplete();
            }
        } else {
            timeout.current = setTimeout(() => {
                setRemainingTime((t: any) => t - 1);
            }, timeInterval);
        }
        return () => {
            clearTimeout(timeout.current);
        };
    }, [onTimerComplete, remainingTime, timeInterval]);

    const reLaunchTime = () => {
        if (onResendClick) {
            onResendClick(remainingTime === 0);
        }
        setRemainingTime(maxTime);
    };

    return {
        reLaunchTime,
        remainingTime
    };
};

export default useRemaining;