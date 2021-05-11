import React, { useState, useEffect } from "react";
import CustomFieldPicker from "../../../components/Forms/CustomFieldPicker";
import { ObjectID } from "bson";

export default function CustomFieldPickerCtrl({ label, setter, selected }) {
  // ===============================================================
  // STATE VARIABLES
  // ===============================================================
  /*
    @desc an array of Id's that of selected items
    @author Patrick Fortaleza
    @type Array<id>
  */
  const [activeSelection, setActiveSelection] = useState([]);

  /*
    @desc an Id of an item that is pending an edit.
    @author Patrick Fortaleza
    @type String
  */
  const [_id, setId] = useState("");

  /*
    @desc holds the string value for "title" when adding/editing custom fields.
    @author Patrick Fortaleza
    @type String
  */
  const [title, setTitle] = useState("");

  /*
    @desc holds the string value for "content" when adding/editing custom fields.
    @author Patrick Fortaleza
    @type String
  */
  const [content, setContent] = useState("");

  /*
    @desc a boolean that holds the active state of the modal.
    @author Patrick Fortaleza
    @type Boolean
  */
  const [modalActive, setModalActive] = useState(false);

  /*
    @desc a string that holds the action state of the modal, either "add" or "edit"
    @author Patrick Fortaleza
    @type String
  */
  const [modalState, setModalState] = useState("add");

  // ===============================================================
  // USE EFFECTS
  // ===============================================================
  /*
    @desc everytime the selection changes, we want to sync up with the parent's data by calling the setter method.
    @author Patrick Fortaleza
  */
  useEffect(() => {
    setter(activeSelection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSelection]);

  /*
    @desc once the selection data mounts, format it.
    @author Patrick Fortaleza
  */
  useEffect(() => {
    formatSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // ===============================================================
  // FUNCTIONS
  // ===============================================================

  /*
    @desc formats the existing data into an array that can be accepted by the picker.
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const formatSelection = () => {
    if (!selected) return;
    const formatted = selected.map((option) => {
      return {
        _id: option._id,
        field_title: option.field_title,
        content: option.content,
      };
    });

    setActiveSelection(formatted);
  };

  /*
    @desc resets state variables related to editing/adding
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const clearFields = () => {
    setTitle("");
    setContent("");
    setId("");
  };

  /*
    @desc closed modal
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const closeModal = () => {
    setModalActive(false);
  };

  /*
    @desc watches for changes in title input, sets title variable
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  /*
    @desc watches for changes in content input, sets content variable
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const updateContent = (e) => {
    setContent(e.target.value);
  };

  /*
    @desc adds a new custom field to the selection.
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const addToSelection = () => {
    if (!title || !content) return;

    const id = new ObjectID();
    const field = {
      _id: id.toString(),
      field_title: title,
      content: content,
    };

    let selection = [...activeSelection, field];
    setActiveSelection(selection);
    setModalActive(false);
    clearFields();
  };

  /*
    @desc listens for drag events to reorder items within the picker.
    @author Patrick Fortaleza
    @param result {Object} -- a custom response object from react drag-and-drop.
    @return null -- if there's no destination, we return null to exit the function. 
  */
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(activeSelection);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setActiveSelection(items);
  };

  /*
    @desc removes the chosen content from the picker.
    @author Patrick Fortaleza
    @param id {String} -- an ObjectId that is unique to the content being picked.
    @return none
  */
  const handleRemove = (id) => {
    let selected = [...activeSelection];
    selected = selected.filter((item) => item._id !== id);
    setActiveSelection(selected);
  };

  /*
    @desc opens the edit modal
    @author Patrick Fortaleza
    @param id {String} -- an ObjectId for the specific custom field.
    @return none
  */
  const handleEdit = (id) => {
    setModalState("edit");
    let selected = [...activeSelection];
    selected = selected.filter((item) => item._id === id)[0];
    if (!selected) return;
    setId(selected._id);
    setTitle(selected.field_title);
    setContent(selected.content);
    setModalActive(true);
  };

  /*
    @desc publishes the custom field to the picker
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const handleNewCustomField = () => {
    clearFields();
    setModalState("add");
    setModalActive(true);
  };

  /*
    @desc applies the update on a pending edit
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const submitEdit = () => {
    let selected = [...activeSelection];
    if (!_id) return;

    let selectedIndex = selected.map((item) => item._id).indexOf(`${_id}`);
    if (selectedIndex === null || selectedIndex === undefined) return;

    const updatedField = {
      _id: _id,
      field_title: title,
      content: content,
    };

    selected[selectedIndex] = updatedField;

    setActiveSelection(selected);
    clearFields();
    setModalActive(false);
  };

  return (
    <CustomFieldPicker
      // METHODS
      handleRemove={handleRemove}
      handleEdit={handleEdit}
      submitEdit={submitEdit}
      handleOnDragEnd={handleOnDragEnd}
      handleNewCustomField={handleNewCustomField}
      updateTitle={updateTitle}
      updateContent={updateContent}
      closeModal={closeModal}
      addToSelection={addToSelection}
      // ATTRIBUTES
      activeSelection={activeSelection}
      modalActive={modalActive}
      modalState={modalState}
      label={label}
      title={title}
      content={content}
    />
  );
}
