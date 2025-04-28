import React, { useState, useEffect } from "react";
import style from "./Stopwatch.module.css";
import { useWorkLogs } from "./WorkLogContext";

function Stopwatch() {
    const { workLogs, setWorkLogs } = useWorkLogs();

    const [isActive, setIsActive] = useState(() => {
        const active = localStorage.getItem("active");
        return active ? JSON.parse(active) : false;
    });

    const [startTime, setStartTime] = useState(() => {
        const time = localStorage.getItem("startTime");
        return time ? JSON.parse(time) : null;
    });

    const [elapsedTime, setElapsedTime] = useState(() => {
        const saved = localStorage.getItem("elapsedTime");
        return saved ? Number(saved) : 0;
    });

    useEffect(() => {
        if (isActive && startTime !== null) {
            const now = Date.now();
            const additionalElapsed = now - startTime;
            setElapsedTime(prev => prev + additionalElapsed);
            setStartTime(now);
        }
    }, []);

    useEffect(() => {
        let interval;

        if (isActive) {
            if (startTime === null) {
                const now = Date.now();
                setStartTime(now);
                localStorage.setItem("startTime", JSON.stringify(now));
            }

            interval = setInterval(() => {
                setElapsedTime(prev => {
                    const newElapsed = prev + 250;
                    localStorage.setItem("elapsedTime", JSON.stringify(newElapsed));
                    return newElapsed;
                });
            }, 250);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    const toggleStopwatch = () => {
        setIsActive(prev => {
            const newActiveState = !prev;
            localStorage.setItem("active", JSON.stringify(newActiveState));

            if (newActiveState) {
                const now = Date.now();
                setStartTime(now);
                localStorage.setItem("startTime", JSON.stringify(now));
            }

            return newActiveState;
        });
    };

    const resetStopwatch = () => {
        setIsActive(false);
        setElapsedTime(0);
        setStartTime(null);
        localStorage.removeItem("elapsedTime");
        localStorage.removeItem("startTime");
        localStorage.setItem("active", JSON.stringify(false));
    };

    const toggleFinishJob = () => {
        const timestamp = new Date().toLocaleDateString();
        const newEntry = { time: timestamp, workedTime: elapsedTime };

        const existingEntryIndex = workLogs.findIndex((log) => log.time === timestamp);

        let updatedLogs;
        if (existingEntryIndex !== -1) {
            updatedLogs = [...workLogs];
            updatedLogs[existingEntryIndex].workedTime += elapsedTime;
        } else {
            updatedLogs = [...workLogs, newEntry];
        }

        setWorkLogs(updatedLogs);
        resetStopwatch();
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className={style.container}>
            <h1 className={style.time}>{formatTime(elapsedTime)}</h1>
            <div className={style.btns}>
                <div className={style.row}>
                    <button onClick={resetStopwatch} className={style.btn}>Reset</button>
                    <button onClick={toggleStopwatch} className={style.btn}>{isActive ? "Pause" : "Start"}</button>
                </div>
                <button
                    onClick={toggleFinishJob}
                    className={`${style.btnFinishJob} ${style.btn}`}
                    style={{
                        opacity: elapsedTime > 0 ? 1 : 0,
                        visibility: elapsedTime > 0 ? 'visible' : 'hidden',
                        transition: 'opacity 0.2s, visibility 0.2s'
                    }}
                >
                    Finish job
                </button>
            </div>
        </div>
    );
}

export default Stopwatch;
