import React, { Component } from "react";
import "./searchPanel.css";

export default class SearchPanel extends Component {
  handleChange = (event) => {
    const { todos, onSearch } = this.props;
    onSearch(todos, event.target.value);

  };

  render() {

    return (
      <input
        type={"text"}
        className={"form-control search-input"}
        placeholder={"type to search"}
        onChange={this.handleChange}
      />
    );
  }
}
