import React from "react";
import { TrashIcon, HamburgerIcon } from "../../../icons";
import { Dropdown, Input, TextArea } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "../../Modal";
import Message from "../../Message";

/*
  @desc UI component for A text picker form control. Allows users to associate text-based content to a main content type.
        ie. associating a location with a plant, or categories/tags.
  @controller ~/src/controllers/Forms/TextPicker/TextPickerCtrl.js
*/
export default function TextPicker({
  options,
  activeSelection,
  handleSelectChange,
  handleRemove,
  confirmSelection,
  handleOnDragEnd,
  label,
  dataLabel,
  modalActive,
  openModal,
  closeModal,
  fields,
  handleFieldChange,
  handleFieldUpload,
  directive,
}) {
  const renderModal = () => {
    let label_;
    switch (dataLabel) {
      case "location":
        label_ = "location";
        return (
          <>
            <fieldset style={style.fieldset}>
              <p style={style.label}>
                Location Name <span style={style.req}>*</span>
              </p>
              <Input
                onChange={(e) => handleFieldChange(e, label_)}
                style={style.input}
                value={fields.location.name}
                name="name"
                placeholder="Enter location name"
              />
            </fieldset>

            <fieldset style={style.fieldset}>
              <p style={style.label}>
                Latitude <span style={style.req}>*</span>
              </p>
              <Input
                onChange={(e) => handleFieldChange(e, label_)}
                value={fields.location.latitude}
                name="latitude"
                type="number"
                style={style.input}
                placeholder="Enter latitude (number)"
              />
            </fieldset>

            <fieldset style={style.fieldset}>
              <p style={style.label}>
                Longitude <span style={style.req}>*</span>
              </p>
              <Input
                onChange={(e) => handleFieldChange(e, label_)}
                value={fields.location.longitude}
                name="longitude"
                type="number"
                style={style.input}
                placeholder="Enter longitude (number)"
              />
            </fieldset>

            <fieldset style={style.fieldset}>
              <p style={style.label}>Description</p>
              <TextArea
                onChange={(e) => handleFieldChange(e, label_)}
                value={fields.location.description}
                name="description"
                style={{
                  ...style.input,
                  ...style.textarea,
                }}
              />
            </fieldset>

            <fieldset style={style.fieldset}>
              <button
                className="field__button"
                onClick={() => handleFieldUpload(label_)}
              >
                Create new Location
              </button>

              <button className="modal__cancel" onClick={() => closeModal()}>
                Cancel
              </button>
            </fieldset>
          </>
        );
      case "category":
        label_ = "category";
        return (
          <>
            <fieldset style={style.fieldset}>
              <p style={style.label}>
                Category Name <span style={style.req}>*</span>
              </p>
              <Input
                onChange={(e) => handleFieldChange(e, label_)}
                style={style.input}
                value={fields.category.name}
                name="name"
                placeholder="Enter category name"
              />
            </fieldset>
            <fieldset style={style.fieldset}>
              <button
                className="field__button"
                onClick={() => handleFieldUpload(label_)}
              >
                Create new Category
              </button>

              <button className="modal__cancel" onClick={() => closeModal()}>
                Cancel
              </button>
            </fieldset>
          </>
        );
      case "tag":
        label_ = "tag";
        return (
          <>
            <fieldset style={style.fieldset}>
              <p style={style.label}>
                Tag Name <span style={style.req}>*</span>
              </p>
              <Input
                onChange={(e) => handleFieldChange(e, label_)}
                style={style.input}
                value={fields.tag.name}
                name="name"
                placeholder="Enter tag name"
              />
            </fieldset>
            <fieldset style={style.fieldset}>
              <button
                className="field__button"
                onClick={() => handleFieldUpload(label_)}
              >
                Create new Tag
              </button>

              <button className="modal__cancel" onClick={() => closeModal()}>
                Cancel
              </button>
            </fieldset>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="textpicker">
      {typeof directive === "object" &&
        directive !== null &&
        Object.keys(directive).length > 0 && (
          <Message
            success={directive.success}
            header={directive.header}
            message={directive.message}
          />
        )}
      <label>
        {label === "category"
          ? "Categories:"
          : `${label[0].toUpperCase()}${label.substring(1)}(s):`}
        {label === "location" && <span style={style.req}>*</span>}
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
                            <span style={{ maxWidth: "24px" }}>
                              <HamburgerIcon />
                            </span>
                            {item.title}
                          </span>
                          <button onClick={() => handleRemove(item._id)}>
                            <TrashIcon />
                          </button>
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
      <div className="textpicker__picker">
        <Dropdown
          onChange={(e, data) => handleSelectChange(e, data)}
          placeholder={`Select an existing ${label[0].toUpperCase()}${label.substring(
            1
          )}`}
          search
          selection
          options={options}
        />
        <button onClick={() => confirmSelection()}>
          Add Existing {`${label[0].toUpperCase()}${label.substring(1)}`}
        </button>
      </div>
      <div className="textpicker__footer">
        <button onClick={() => openModal()}>
          + Create A New {`${label[0].toUpperCase()}${label.substring(1)}`}
        </button>
      </div>
      <Modal
        title={`Upload a new ${label[0].toUpperCase()}${label.substring(1)}`}
        isActive={modalActive}
        closeModal={closeModal}
      >
        {renderModal()}
      </Modal>
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
