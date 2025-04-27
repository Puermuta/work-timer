import './App.css'
import React, { useState } from "react";
import Stopwatch from "./components/Stopwatch";
import TimeTable from './components/TimeTable';
import { WorkLogProvider } from "./components/WorkLogContext";

function App() {

  return (
    <>
    <WorkLogProvider>
    <div className="slider-container">
      <section className="slide">
        <Stopwatch />
      </section>
      <section className="slide">
        <TimeTable />
      </section>
    </div>
    </WorkLogProvider>
    </>
  )
}

export default App
