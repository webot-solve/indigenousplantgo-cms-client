import React, { useState, useEffect } from "react";
import ContentPicker from "../../../components/Forms/ContentPicker";

export default function ContentPickerCtrl({
  label,
  dataLabel,
  data,
  setter,
  selected,
}) {
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
  const [options, setOptions] = useState([]);

  // ===============================================================
  // USE EFFECTS
  // ===============================================================
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

  /*
    @desc formats the existing data into an array that can be accepted by the picker.
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const formatSelection = () => {
    if ((selected && selected.length < 1) || !selected) return;
    const formatted = selected.map((option) => {
      const obj = {
        _id: option._id,
        title: option[`${dataLabel}_name`],
        // Nullify isPublish to suppress react warning
        isPublish: null,
      };
      if (obj.isPublish) delete obj.isPublish;

      return obj;
    });

    setActiveSelection(formatted);
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
    @desc formats the available option into an array that can be accepted by the dropdown.
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const formatOptions = () => {
    const activeOptions = [...activeSelection].map((item) => item._id);

    const filtered = options.filter(
      (option) => !activeOptions.includes(option._id)
    );

    const formatted = filtered.map((option) => {
      const obj = {
        ...option,
        key: option._id,
        value: option._id,
        // Nullify description, it looks like semantic UI drop downs look for this specific key, value which produces unwanted effects.
        description: null,
        // Nullify isPublish
        isPublish: null,
        text: option[`${dataLabel}_name`],
      };

      if (obj.isPublish) delete obj.isPublish;

      return obj;
    });

    setFormattedOptions(formatted);
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
  return (
    <ContentPicker
      // METHODS
      handleSelectChange={handleSelectChange}
      handleRemove={handleRemove}
      confirmSelection={confirmSelection}
      handleOnDragEnd={handleOnDragEnd}
      // ATTRIBUTES
      activeSelection={activeSelection}
      options={formattedOptions}
      label={label}
    />
  );
}
