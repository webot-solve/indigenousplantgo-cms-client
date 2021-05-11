import React from "react";
import {
  TrashIcon,
  ImageIcon,
  AudioIcon,
  PlantIcon,
  CompassIcon,
} from "../../../icons";
import { Dropdown } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

/*
  @desc UI component for A content picker form control. Allows the user to associate other content-types to another content-type.
        ie. associating a waypoint to a plant, or a tour to a waypoint.
  @controller ~/src/controllers/Forms/ContentPicker/ContentPickerCtrl.js
*/
export default function ContentPicker({
  options,
  activeSelection,
  handleSelectChange,
  handleRemove,
  confirmSelection,
  handleOnDragEnd,
  label,
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
                            <span className="selected__icon">
                              {renderIcon(label)}
                            </span>
                            <div className="selected__media__meta">
                              {item.title}
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
    </div>
  );
}

const renderIcon = (label) => {
  switch (label) {
    case "plant":
      return <PlantIcon />;
    case "waypoint":
      return <CompassIcon />;
    case "Audio File":
      return <AudioIcon />;
    default:
      return <ImageIcon />;
  }
};
