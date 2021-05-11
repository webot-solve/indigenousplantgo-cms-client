import React, { useState, useEffect } from "react";
import TextPicker from "../../../components/Forms/TextPicker";
import { createTag, createCategory, createLocation } from "../../../network";

export default function TextPickerCtrl({
  label,
  dataLabel,
  data,
  selected,
  setter,
  query,
  resource,
}) {
  const fieldInputs = {
    location: {
      name: "",
      latitude: 0,
      longitude: 0,
      description: "",
    },
    category: {
      name: "",
    },
    tag: {
      name: "",
    },
  };
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
    @desc an array of formatted options to be parsed by semantic ui's dropdown.
    @author Patrick Fortaleza
    @type Array<{formattedOption}>
  */
  const [formattedOptions, setFormattedOptions] = useState([]);

  /*
    @desc a string value that holds the focused/selected item's id -- to be added in activeSelection
    @author Patrick Fortaleza
    @type String (ObjectId)
  */
  const [selectedOption, setSelectedOption] = useState("");

  /*
    @desc An array of raw options, to be formatted and used in dropdowns.
    @author Patrick Fortaleza
    @type Array<{option}>
  */
  const [options, setOptions] = useState(data);

  /*
    @desc a variable that holds the active state of the modal
    @author Patrick Fortaleza
    @type boolean
  */
  const [modalActive, setModalActive] = useState(false);

  /*
    @desc a variable that holds different fields of a text picker's data
    @author Patrick Fortaleza
    @type {Object<fieldInputs>}
  */
  const [fields, setFields] = useState(fieldInputs);
  const [directive, setDirective] = useState(null);

  // ===============================================================
  // USE EFFECTS
  // ===============================================================

  useEffect(() => {
    resetDirective();
  }, [directive]);

  /*
    @desc once the data mounts, we set our options, then format them.
    @author Patrick Fortaleza
  */
  useEffect(() => {
    setOptions(data);
    formatOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /*
    @desc once the selection data mounts, format it.
    @author Patrick Fortaleza
  */
  useEffect(() => {
    formatSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  /*
    @desc everytime the selection changes, we want to sync up with the parent's data by calling the setter method.
    @author Patrick Fortaleza
  */
  useEffect(() => {
    setter(activeSelection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSelection]);

  /*
    @desc everytime the activeSelection, or options change, we want to format the options
    @author Patrick Fortaleza
  */
  useEffect(() => {
    formatOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, activeSelection]);

  // ===============================================================
  // FUNCTIONS
  // ===============================================================

  const resetDirective = async () => {
    await setTimeout(() => {
      setDirective(null);
    }, 4000);
  };

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
        title: option[`${dataLabel}_name`],
      };
    });

    setActiveSelection(formatted);
  };

  /*
    @desc formats the available option into an array that can be accepted by the dropdown.
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const formatOptions = () => {
    const activeOptions = [...activeSelection].map((item) => item._id);

    const filtered = data.filter(
      (option) => !activeOptions.includes(option._id)
    );

    const formatted = filtered.map((option) => {
      return {
        ...option,
        description: null,
        key: option._id,
        value: option._id,
        text: option[`${dataLabel}_name`],
      };
    });

    setFormattedOptions(formatted);
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
    @desc watches for changes in drop-down selection, sets the selected option.
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const handleSelectChange = (e, data) => {
    setSelectedOption(data.value);
  };

  /*
    @desc formats, finds, and adds the selected content into the picker.
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const confirmSelection = () => {
    let foundOption = options.filter(
      (option) => option._id === selectedOption
    )[0];

    if (!foundOption || foundOption.length < 1) return;

    foundOption = {
      _id: foundOption._id,
      title: foundOption[`${dataLabel}_name`],
    };

    const newActiveSelection = [...activeSelection, foundOption];
    setActiveSelection(newActiveSelection);
  };

  /*
    @desc removes the chosen media from the picker.
    @author Patrick Fortaleza
    @param id {String} -- an ObjectId that is unique to the content being picked.
    @return none
  */
  const handleRemove = (id) => {
    let selected = [...activeSelection];
    selected = selected.filter((item) => item._id !== id);
    setActiveSelection(selected);
  };

  const openModal = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  /*
    @desc watches field updates, updates the field state variable
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const handleFieldChange = (e, label_) => {
    let target = e.target.name,
      fieldLabel = label_,
      value = e.target.value;

    let currentFields = { ...fields };
    currentFields[`${fieldLabel}`][`${target}`] = value;

    setFields(currentFields);
  };

  /*
    @desc uploads a new text field, and adds the uploaded text field to the picker.
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const handleFieldUpload = async (label_) => {
    let fieldLabel = label_;
    let result, currSelection, formatted;

    switch (fieldLabel) {
      case "tag":
        if (!fields.tag.name) return;
        const tag = {
          tag_name: fields.tag.name,
        };
        result = await createTag(tag);
        break;
      case "category":
        if (!fields.category.name) return;
        const category = {
          category_name: fields.category.name,
          resource: resource,
        };
        result = await createCategory(category);
        break;
      case "location":
        if (
          !fields.location.name ||
          !fields.location.longitude ||
          !fields.location.latitude
        )
          return;
        const location = {
          location_name: fields.location.name,
          latitude: +fields.location.latitude,
          longitude: +fields.location.longitude,
          description: fields.location.description,
        };
        result = await createLocation(location);
        break;
      default:
        break;
    }
    if (result.error)
      return setDirective({
        header: `Error creating ${dataLabel}`,
        message: result.error.data.error,
        success: false,
      });
    formatted = {
      _id: result._id,
      title: result[`${dataLabel}_name`],
    };
    currSelection = [...activeSelection, formatted];
    closeModal();
    setFields(fieldInputs);
    setActiveSelection(currSelection);
    query();
  };

  return (
    <TextPicker
      handleSelectChange={handleSelectChange}
      handleRemove={handleRemove}
      confirmSelection={confirmSelection}
      handleOnDragEnd={handleOnDragEnd}
      activeSelection={activeSelection}
      options={formattedOptions}
      label={label}
      dataLabel={dataLabel}
      modalActive={modalActive}
      openModal={openModal}
      closeModal={closeModal}
      fields={fields}
      handleFieldChange={handleFieldChange}
      handleFieldUpload={handleFieldUpload}
      directive={directive}
    />
  );
}
