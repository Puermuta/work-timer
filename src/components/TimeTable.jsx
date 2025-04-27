import React, { useEffect, useState } from "react";
import { useWorkLogs } from "./WorkLogContext";
import style from "./TimeTable.module.css";
import WorkLogList from "./WorkLogList";

function TimeTable() {
    const { workLogs, setWorkLogs } = useWorkLogs();
    
    const toggleClearLogs = () => {
        setWorkLogs([]);
    }

    return (
            
        <div className = {style.container}>
        <div className = {style.title}>{`Hours worked`}</div>
        <div style={{"height" : "50vh"}}>
        <WorkLogList workLogs ={workLogs} />
        </div>
        <button 
            onClick={toggleClearLogs} 
            className={style.btn} 
            style={{
                opacity: workLogs.length > 0 ? 1 : 0,
                visibility: workLogs.length > 0 ? 'visible' : 'hidden',
                transition: 'opacity 0.5s, visibility 0.5s'
            }}
        >
        Finish job
        </button>
        </div>
        
    );
}

export default TimeTable;