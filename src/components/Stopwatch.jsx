import React, { useState, useEffect } from "react";
import style from "./Stopwatch.module.css";

function Stopwatch() {
    const [isActive, setIsActive] = useState(() => {
        const active = localStorage.getItem("active");
        return active ? JSON.parse(active) : false;
    });
    const [startTime, setStartTime] = useState(0);
    
    const [elapsedTime, setElapsedTime] = useState(() => {
        const saved = localStorage.getItem("elapsedTime");
        return saved ? Number(saved) : 0;
    });

    useEffect(() => {
        let interval;

        if (isActive) {

            setStartTime(Date.now() - elapsedTime);
            interval = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
                localStorage.setItem("elapsedTime", String(elapsedTime));
            }, 250);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, elapsedTime, startTime]);

    const toggleStopwatch = () => {
        setIsActive((prev) => !prev);
    }

    useEffect(() => {
        localStorage.setItem("active", JSON.parse(isActive));
    }, [isActive]);


    const resetStopwatch = () => {
        setIsActive(false);
        setElapsedTime(0);
        localStorage.removeItem("elapsedTime");
    }

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);  // Convert milliseconds to minutes
        const seconds = Math.floor((time % 60000) / 1000);  // Get remaining seconds
        // const milliseconds = Math.floor((time % 1000)/10);
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    
    return (
        <div className={style.container}>
            <h1 className={style.time}>{formatTime(elapsedTime)}</h1>
            <div className={style.btns}>
            <button onClick = {resetStopwatch} className={style.btn}>Reset</button>
                <button onClick = {toggleStopwatch} className={style.btn}>{isActive ? "Pause" : "Start"}</button>
            </div>
        </div>
    )
}

export default Stopwatch;