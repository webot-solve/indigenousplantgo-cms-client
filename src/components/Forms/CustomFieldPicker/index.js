import React from "react";
import { TrashIcon, EditIcon } from "../../../icons";
import Modal from "../../Modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Input, TextArea } from "semantic-ui-react";

/*
  @desc UI component for A custom field form control. Allows the user to create "custom" fields within a content-type.
  @controller ~/src/controllers/Forms/CustomFieldPicker/CustomFieldPickerCtrl.js
*/
export default function CustomFieldPicker({
  activeSelection,
  handleRemove,
  handleEdit,
  submitEdit,
  handleOnDragEnd,
  updateTitle,
  updateContent,
  label,
  modalActive,
  modalState,
  handleNewCustomField,
  closeModal,
  addToSelection,
  title,
  content,
}) {
  return (
    <div className="textpicker">
      <label>
        {label === "category"
          ? "Categories:"
          : `${label[0].toUpperCase()}${label.substring(1)}(s):`}
      </label>
      {activeSelection && activeSelection.length > 0 && (
        <div className="textpicker__scroll">
          <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
            <Droppable droppableId="textpicker">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {activeSelection.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          className="textpicker__selected"
                        >
                          <span className="selected__title">
                            <div className="selected__media__meta">
                              <label className="caption">
                                <strong>Title: </strong>
                                {item.field_title}
                              </label>
                              <label className="url">
                                <strong>Content: </strong>
                                {item.content}
                              </label>
                            </div>
                          </span>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <div>
                              <button
                                style={{ marginRight: 10 }}
                                onClick={() => handleEdit(item._id)}
                              >
                                <EditIcon />
                              </button>
                              <button onClick={() => handleRemove(item._id)}>
                                <TrashIcon />
                              </button>
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
      <div className="textpicker__footer">
        <button onClick={() => handleNewCustomField()}>
          + Create A New {`${label[0].toUpperCase()}${label.substring(1)}`}
        </button>
        <Modal
          isActive={modalActive}
          closeModal={closeModal}
          subtitle={modalState === "edit" ? title : undefined}
          title={
            modalState === "edit"
              ? `Edit ${`${label[0].toUpperCase()}${label.substring(1)}`}`
              : `Create A New ${`${label[0].toUpperCase()}${label.substring(
                  1
                )}`}`
          }
        >
          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Title <span style={style.req}>*</span>
            </p>
            <Input
              value={title}
              style={style.input}
              onChange={(e) => updateTitle(e)}
              placeholder="Title"
            />
          </fieldset>

          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Content <span style={style.req}>*</span>
            </p>
            <TextArea
              value={content}
              onChange={(e) => updateContent(e)}
              style={{
                ...style.input,
                ...style.textarea,
              }}
            />
          </fieldset>

          <fieldset style={style.fieldset}>
            {modalState === "edit" ? (
              <button onClick={() => submitEdit()} className="modal__button">
                Update {`${label[0].toUpperCase()}${label.substring(1)}`}
              </button>
            ) : (
              <button
                onClick={() => addToSelection()}
                className="modal__button"
              >
                Add {`${label[0].toUpperCase()}${label.substring(1)}`}
              </button>
            )}

            <button className="modal__cancel" onClick={() => closeModal()}>
              Cancel
            </button>
          </fieldset>
        </Modal>
      </div>
    </div>
  );
}

const style = {
  form: {
    background: "var(--lightprimary)",
    border: "1px solid lightgrey",
    minWidth: "350px",
    margin: "auto",
    padding: 20,
    boxShadow: "var(--shadow)",
  },
  formFooter: {
    padding: "20px 0",
  },
  input: {
    width: "100%",
    color: "var(--darksecondary)",
  },
  textarea: {
    height: 200,
    border: "1px solid lightgrey",
    color: "var(--darkprimary)",
    padding: "7px 14px",
    background: "var(--lighttertiary)",
  },
  label: {
    color: "var(--darksecondary)",
    margin: 0,
    fontSize: 11,
    marginBottom: "3px",
  },
  fieldset: {
    marginBottom: "10px",
    padding: 0,
  },
  submit: {
    width: "100%",
    background: "var(--highlight)",
    borderRadius: "unset",
  },
  req: {
    color: "red",
    fontSize: 14,
  },
};
