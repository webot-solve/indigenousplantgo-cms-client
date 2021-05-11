import React from "react";
import { TrashIcon, ImageIcon, AudioIcon, VideoIcon } from "../../../icons";
import { Dropdown, Input } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "../../Modal";
import Message from "../../Message";

/*
  @desc UI component for A media picker form control. Allows the user to select existing media,
        or upload their own to a given content type.
  @controller ~/src/controllers/Forms/MediaPicker/MediaPickerCtrl.js
*/
export default function MediaPicker({
  options,
  activeSelection,
  handleSelectChange,
  handleRemove,
  confirmSelection,
  handleOnDragEnd,
  label,
  openModal,
  closeModal,
  modalActive,
  file,
  setFile,
  caption,
  setCaption,
  handleUpload,
  dataLabel,
  setVideoLink,
  videoLink,
  directive,
}) {
  const renderModal = () => {
    switch (dataLabel) {
      case "video":
        return (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <fieldset style={style.fieldset}>
                <p style={style.label}>
                  Caption <span style={style.req}>*</span>
                </p>
                <Input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  style={style.input}
                  placeholder="Enter caption"
                />
              </fieldset>

              <fieldset style={style.fieldset}>
                <p style={style.label}>
                  Youtube URL <span style={style.req}>*</span>
                </p>

                <Input
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  style={style.input}
                  placeholder="Enter Youtube URL"
                />
                <p style={{ fontSize: 12, marginTop: 7 }}>
                  Valid Example: https://www.youtube.com/watch?v=lhqNduGgpC8
                </p>
              </fieldset>

              <button className="field__button" onClick={() => handleUpload()}>
                Upload {label[0].toUpperCase()}
                {label.substring(1)}
              </button>
              <button className="modal__cancel" onClick={() => closeModal()}>
                Cancel
              </button>
            </form>
          </>
        );
      default:
        return (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <fieldset style={style.fieldset}>
                <p style={style.label}>
                  Caption <span style={style.req}>*</span>
                </p>
                <Input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  style={style.input}
                  placeholder="Enter caption"
                />
              </fieldset>
              <p style={style.label}>
                Upload file: <span style={style.req}>*</span>
              </p>
              <fieldset style={style.fieldset}>
                <div className="field__file">
                  <div className="file__meta">
                    <p>{file?.name}</p>
                  </div>
                  <input
                    filename={file}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    style={{ display: "none" }}
                    id="file--upload"
                    type="file"
                    accept={
                      dataLabel === "image"
                        ? "image/*"
                        : dataLabel === "audio_file"
                        ? "audio/*"
                        : "video/*"
                    }
                  />
                  <button className="field__button">
                    <label htmlFor="file--upload">Choose File</label>
                  </button>
                </div>
                <button
                  className="field__button"
                  onClick={() => handleUpload()}
                >
                  Upload {label[0].toUpperCase()}
                  {label.substring(1)}
                </button>
                <button className="modal__cancel" onClick={() => closeModal()}>
                  Cancel
                </button>
              </fieldset>
            </form>
          </>
        );
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
                            <span className="selected__icon">
                              {renderIcon(label)}
                            </span>
                            <div className="selected__media__meta">
                              <label className="caption">
                                <strong>Caption: </strong>
                                {item.title}
                              </label>
                              <label className="url">
                                <strong>URL: </strong>
                                {item.url}
                              </label>
                            </div>
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
          + Upload A New {`${label[0].toUpperCase()}${label.substring(1)}`}
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

const renderIcon = (label) => {
  switch (label) {
    case "image":
      return <ImageIcon />;
    case "video":
      return <VideoIcon />;
    case "Audio File":
      return <AudioIcon />;
    default:
      return <ImageIcon />;
  }
};

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
