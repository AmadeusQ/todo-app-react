import React, { Component } from "react";
import TodoListItem from "../todoListItem";

export default class TodoList extends Component {
  render() {
    const { todos, onDeleted, onMarkImportant, onMarkDone } = this.props;
    const elements = todos.map((item) => {
      const { id, itemProps } = item;
      return (
        <li key={id} className="list-group-item">
          <TodoListItem
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onMarkImportant={() => onMarkImportant(id)}
            onMarkDone={() => onMarkDone(id)}
          />
        </li>
      );
    });

    return <ul className="list-group todo-list">{elements}</ul>;
  }
}
