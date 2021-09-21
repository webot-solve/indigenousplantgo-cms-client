import React, {useState, useEffect} from 'react';
import AddLearnMore from '../../../components/Add/LearnMore';

import {
  getLocations,
  getImages,
 
} from "../../../network";


export default function AddLearnMoreCtrl(){

  let isMounted = true;

  // ===============================================================
  // FORM DATA
  // @desc form control data
  // ===============================================================

  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const [learnMore, setLearnMoreName] = useState("");
  const [description, setDescription] = useState("");

    // ===============================================================
  // SELECTION DATA
  // @desc data that appears as options in select boxes.
  // ===============================================================
  const [eLocations, setELocations] = useState([]);
  const [eImages, setEImages] = useState([]);

// ===============================================================
  // NETWORK QUERIES FOR EXISTING DATA
  // @desc queries for existing data
  // ===============================================================
  const queryLocations = async () => {
    const result = await getLocations();
    if (result.error) return;
    if (!isMounted) return;
    setELocations(result);
  };

  const queryImages = async () => {
    const result = await getImages();
    if (result.error) return;
    if (!isMounted) return;
    setEImages(result);
  };

   // ===============================================================
  // INPUT WATCHERS AND SETTERS
  // @desc functions that watch updates in children components, and sets them here.
  // ===============================================================


  const imagesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setImages(mappedData);
  };
  const learnMoreNameChanged = (data) => {
    setLearnMoreName(data);
  };
  const descriptionChanged = (data) => {
    setDescription(data);
  };
  const customFieldsChanged = (data) => {
    setCustomFields(data);
  };

    // ===============================================================
  // INPUT WATCHERS AND SETTERS
  // @desc functions that watch updates in children components, and sets them here.
  // ===============================================================

  const locationsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setLocations(mappedData);
  };

  return (
    <AddLearnMore

      locationsChanged={locationsChanged}
      imagesChanged={imagesChanged}

      customFieldsChanged={customFieldsChanged}
      learnMoreNameChanged={learnMoreNameChanged}
      descriptionChanged={descriptionChanged}
      
      eLocations={eLocations}
      eImages={eImages}
      queryImages={queryImages}

      queryLocations={queryLocations}
    />
  );
}
