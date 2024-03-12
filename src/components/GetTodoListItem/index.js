import { Component } from "react";

import "./index.css";

class GetTodoListItem extends Component {
  state = {
    updatedTodo: this.props.details.todo,
  };
  onChangeUpdate = (event) => {
    this.setState({ updatedTodo: event.target.value });
  };

  render() {
    const { updatedTodo } = this.state;
    const {
      details,
      onClickDeleteButton,
      onClickEditButton,
      onUpdate,
    } = this.props;
    const { id, todo, updated, onClickEdit } = details;
    const onClickDeleteBtn = () => {
      onClickDeleteButton(id);
    };
    const onClickEditBtn = () => {
      onClickEditButton(id);
    };

    const onClickSave = () => {
      const { updatedTodo } = this.state;
      onUpdate(id, updatedTodo);
    };
    return (
      <li className="list-item">
        {onClickEdit === true ? (
          <input
            onChange={this.onChangeUpdate}
            type="text"
            value={updatedTodo}
          />
        ) : (
          <p>
            {todo} (Updated {updated} Times)
          </p>
        )}

        <div>
          {onClickEdit === true ? (
            <button onClick={onClickSave} type="button">
              Save
            </button>
          ) : (
            <button
              onClick={onClickEditBtn}
              className="update-button"
              type="button"
            >
              <img
                width="15px"
                src="https://res.cloudinary.com/dcqsyb9d7/image/upload/v1710200119/tastyKitchensApp/mxn9shud2c5rmprrxa9m.svg"
                alt="edit"
              />
            </button>
          )}

          <button
            onClick={onClickDeleteBtn}
            className="delete-button"
            type="button"
          >
            X
          </button>
        </div>
      </li>
    );
  }
}

export default GetTodoListItem;
