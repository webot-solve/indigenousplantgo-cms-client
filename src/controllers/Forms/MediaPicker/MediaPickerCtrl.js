import React, { useState, useEffect } from "react";
import MediaPicker from "../../../components/Forms/MediaPicker";
import { createImage, createAudio, createVideo } from "../../../network";

export default function MediaPickerCtrl({
  label,
  dataLabel,
  data,
  setter,
  selected,
  query,
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

  /*
    @desc a variable that holds the active state of the modal
    @author Patrick Fortaleza
    @type boolean
  */
  const [modalActive, setModalActive] = useState(false);

  /*
    @desc a variable that holds the file being uploaded
    @author Patrick Fortaleza
    @type {Object}
  */
  const [file, setFile] = useState(null);

  /*
    @desc a variable that holds the caption for the file being uploaded
    @author Patrick Fortaleza
    @type String
  */
  const [caption, setCaption] = useState("");

  /*
    @desc a variable that holds the youtube link for a video
    @author Patrick Fortaleza
    @type String
  */
  const [videoLink, setVideoLink] = useState("");
  const [directive, setDirective] = useState(null);

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

  useEffect(() => {
    resetDirective();
  }, [directive]);

  // ===============================================================
  // FUNCTIONS
  // ===============================================================

  const resetDirective = async () => {
    await setTimeout(() => {
      setDirective(null);
    }, 4000);
  };

  /*
    @desc resets fields related to uploading new media
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const resetFields = () => {
    setCaption("");
    setFile(null);
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
      const obj = {
        _id: option._id,
        url: option[`${dataLabel}_url`],
        title: option.caption,
        image: null,
      };

      return obj;
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
        key: option._id,
        value: option._id,
        text: option.caption,
        image: null,
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
      title: foundOption.caption,
      url: foundOption[`${dataLabel}_url`],
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
    @desc uploads media, and adds the uploaded media to the picker.
    @author Patrick Fortaleza
    @param none
    @return none
  */
  const handleUpload = async () => {
    let result, formatted, currSelection;
    if (dataLabel !== "video") {
      if (!file || !caption) return;
    }

    if (dataLabel === "video") {
      if (!videoLink || !caption) return;
    }

    const formData = new FormData();

    switch (dataLabel) {
      case "image":
        formData.append("image", file);
        formData.append("caption", caption);
        result = await createImage(formData);
        break;
      case "audio_file":
        formData.append("audio", file);
        formData.append("caption", caption);
        result = await createAudio(formData);
        break;
      case "video":
        const video_ = {
          caption: caption,
          video_url: videoLink,
        };
        result = await createVideo(video_);
        break;
      default:
        break;
    }

    if (result.error)
      return setDirective({
        header: "Error uploading media",
        message: result.error.data.error,
        success: false,
      });
    formatted = {
      _id: result._id,
      url: result[`${dataLabel}_url`],
      title: result.caption,
    };
    currSelection = [...activeSelection, formatted];
    closeModal();
    resetFields();
    setActiveSelection(currSelection);
    query();
  };

  return (
    <MediaPicker
      dataLabel={dataLabel}
      handleSelectChange={handleSelectChange}
      handleRemove={handleRemove}
      confirmSelection={confirmSelection}
      handleOnDragEnd={handleOnDragEnd}
      activeSelection={activeSelection}
      options={formattedOptions}
      label={label}
      openModal={openModal}
      closeModal={closeModal}
      modalActive={modalActive}
      file={file}
      setFile={setFile}
      caption={caption}
      setCaption={setCaption}
      handleUpload={handleUpload}
      setVideoLink={setVideoLink}
      videoLink={videoLink}
      directive={directive}
    />
  );
}
