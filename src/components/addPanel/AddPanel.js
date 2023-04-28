import React, { Component } from "react";

export default class AddPanel extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.label === "") return;
    this.props.onAdd(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <form class="row g-3" onSubmit={this.handleSubmit}>
        <input
          type={"text"}
          name="itemName"
          className={"form-control search-input"}
          onChange={this.onLabelChange}
          value={this.state.label}
          placeholder={"type to add"}
        />
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>
    );
  }
}
