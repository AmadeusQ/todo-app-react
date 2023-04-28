import React, { Component } from "react";
import "./appHeader.css";

export default class AppHeader extends Component {
  render() {
    const { toDo, done } = this.props;
    return (
      <div className={"app-header d-flex"}>
        <h1>Todo List</h1>
        <h1>
          {toDo} more to do, {done} done
        </h1>
      </div>
    );
  }
}
