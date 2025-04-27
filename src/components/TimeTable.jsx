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
        <div className = {style.title}>{`Total hours`}</div>
        <div style={{"height" : "50vh"}}>
        <WorkLogList workLogs ={workLogs} />
        </div>
        {workLogs.length > 0 ? (
            <button className = {style.btn} onClick = {toggleClearLogs}>Clear list</button>
        ) : (
            <div></div>
        )}
        </div>
        
    );
}

export default TimeTable;