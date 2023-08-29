import React from "react";
import MainTimeline from "../components/TimelineC";
import NavbarEs from "../components/navbar";
import "react-calendar-timeline/lib/Timeline.css";
//import "./style.css";


function MainCalendar() {
  return (
    <div>
      <div>
        <NavbarEs></NavbarEs>
      </div>
      <div>
        
        <MainTimeline></MainTimeline>
      </div>
    </div>
  );
}

export default MainCalendar;