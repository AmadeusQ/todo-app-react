import React, { Component } from "react";
import AddPanel from "../addPanel/AddPanel";

import AppHeader from "../appHeader";
import ItemStatusFilter from "../itemStatusFilter";
import SearchPanel from "../searchPanel";
import TodoList from "../todoList";

import "./app.css";

export default class App extends Component {
  maxId = 1;
  state = {
    todoData: [
      this.createTodoItem("Do something"),
      this.createTodoItem("Do something"),
      this.createTodoItem("Do something"),
      this.createTodoItem("Do something"),
    ],
    term: "",
    filter: "all",
  };

  createTodoItem(label) {
    return {
      itemProps: {
        label: label,
        important: false,
        done: false,
      },
      id: this.maxId++,
    };
  }

  onAdd = (label) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(label);
      return {
        todoData: [...todoData, newItem],
      };
    });
  };

  onDeleted = (id) => {
    this.setState(({ todoData }) => {
      const newData = todoData.filter((item) => item.id !== id);

      return {
        todoData: newData,
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.itemProps.done);
      case "done":
        return items.filter((item) => item.itemProps.done);
      default:
        return items;
    }
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((element) => element.id === id);

    const oldItem = arr[idx];
    const newItem = {
      itemProps: {
        ...oldItem.itemProps,
        [propName]: !oldItem.itemProps[propName],
      },
      id: idx,
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onMarkDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };

  onMarkImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    });
  };

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter(
      (element) => element.itemProps.done
    ).length;

    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="">
          <AddPanel todos={todoData} onAdd={this.onAdd} />
        </div>
        <div className="top-panel d-flex">
          <SearchPanel todos={todoData} onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.onDeleted}
          onMarkImportant={this.onMarkImportant}
          onMarkDone={this.onMarkDone}
        />
      </div>
    );
  }
}
