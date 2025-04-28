import React from 'react';

const WorkLogList = ({ workLogs, className }) => {
    if (workLogs.length === 0) {
        return <div>You have no logged work!</div>;
    }

    const convertToHours = (time) => {
        return (time / 3600000).toFixed(2) ;
    }

    const totalHours = () => {
        return (workLogs.reduce((acc, curr) => acc + curr.workedTime, 0)/3600000).toFixed(2);
    }
    return (
    <>  
        <div className = {className}>
            <div>Date</div>
            <div>Hours</div>
        </div>
        <div style={{"display":"flex", "flexDirection":"column", "justifyContent":"space-between", "height":"43vh"}}>
            <div>
            {workLogs.map((item) => (
                <div key={item.time} className = {className} style={{"backgroundColor": "#00000023"}}>
                <div>{item.time}</div>
                <div>{convertToHours(item.workedTime)}</div>
                </div>
            ))}
            </div>
            <div className = {className} style={{"backgroundColor": "#00000023"}}>
            <div>Total:</div>
            <div>{`${totalHours()}`}</div>
            </div>
        </div>
    </>
  );
};

export default WorkLogList;
