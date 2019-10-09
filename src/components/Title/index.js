import React from "react";
import "./style.css";

function Title(props) {
  return (
    <div id="title">
      <div className = "titleBar">
      <h1 className="title">{props.children}</h1>
      <div className="scoreDiv">
      <a className="score">Current Count: {props.count} | </a>
      <a className="score">Top Score: {props.topScore}</a>
      </div>
      </div>
      <div>
      <p className="message">{props.message}</p>
      </div>
    </div>
    
  )
}

export default Title;
