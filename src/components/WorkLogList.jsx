import React from 'react';
import style from "./WorkLogList.module.css";

const WorkLogList = ({ workLogs }) => {
  if (workLogs.length === 0) {
    return <div>You have no logged work!</div>;
  }

    const convertToHours = (time) => {
        return (time / 3600000).toFixed(2) ;
    }
  return (
    <>
      {workLogs.map((item) => (
        <div key={item.time} className={style.listContainer}>
          <div>{item.time}</div>
          <div>{convertToHours(item.workedTime)}</div>
        </div>
      ))}
    </>
  );
};

export default WorkLogList;
