import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import GetTodoListItem from "./components/GetTodoListItem";

class App extends Component {
  state = {
    inputValue: "",
    todoList: [],
  };

  onChangeInput = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  onClickAddTodo = () => {
    const { inputValue } = this.state;
    if (inputValue !== "") {
      const newList = inputValue.split(" ");
      const onlyText = newList.slice(0, newList.length - 1).join(" ");
      const getNumber = newList[newList.length - 1];
      const isNumber = !isNaN(getNumber);

      if (isNumber) {
        const number = parseInt(getNumber);
        let newTodo = [];
        for (let i = 0; i < number; i++) {
          newTodo.push({
            id: uuidv4(),
            todo: onlyText,
            updated: 0,
            onClickEdit: false,
          });
        }
        this.setState((prevState) => ({
          todoList: [...prevState.todoList, ...newTodo],
          inputValue: "",
        }));
      } else {
        const newTodoItem = {
          id: uuidv4(),
          todo: inputValue,
          updated: 0,
          onClickEdit: false,
        };
        this.setState((prevState) => ({
          todoList: [...prevState.todoList, newTodoItem],
          inputValue: "",
        }));
      }
    }
  };

  onClickDeleteButton = (id) => {
    const { todoList } = this.state;
    const newList = todoList.filter((each) => each.id !== id);
    this.setState({ todoList: newList });
  };

  onClickEditButton = (id) => {
    const { todoList } = this.state;
    const newList = todoList.map((each) => {
      if (each.id === id) {
        return { ...each, onClickEdit: true };
      }
      return each;
    });
    this.setState({ todoList: newList });
  };

  onUpdate = (id, value) => {
    const { todoList } = this.state;
    const newList = todoList.map((each) => {
      if (each.id === id) {
        const previousCounter = each.updated;

        return {
          ...each,
          todo: value,
          onClickEdit: false,
          updated: previousCounter + 1,
        };
      }
      return each;
    });
    this.setState({ todoList: newList });
  };

  render() {
    const { inputValue, todoList } = this.state;

    return (
      <div className="bg-container">
        <h1>Day Goals!</h1>
        <input
          className="input-style"
          type="text"
          placeholder="Add a todo"
          value={inputValue}
          onChange={this.onChangeInput}
        />
        <button
          onClick={this.onClickAddTodo}
          className="add-todo-button"
          type="button"
        >
          Add Todo
        </button>
        <ul className="unorder-list-container">
          {todoList.map((each) => (
            <GetTodoListItem
              key={each.id}
              details={each}
              onClickDeleteButton={this.onClickDeleteButton}
              onClickEditButton={this.onClickEditButton}
              onUpdate={this.onUpdate}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
