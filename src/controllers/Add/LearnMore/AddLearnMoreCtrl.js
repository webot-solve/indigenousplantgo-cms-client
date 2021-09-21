import React, {useState, useEffect} from 'react';
import AddLearnMore from '../../../components/Add/LearnMore';

import {
  getLocations,
  getImages,
  getAudios,
  getVideos,
  getCategoryGroup,
 
} from "../../../network";


export default function AddLearnMoreCtrl(){

  let isMounted = true;

  // ===============================================================
  // FORM DATA
  // @desc form control data
  // ===============================================================

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videos, setVideos] = useState([]);

  const [customFields, setCustomFields] = useState([]);
  const [learnMore, setLearnMoreName] = useState("");
  const [description, setDescription] = useState("");

    // ===============================================================
  // SELECTION DATA
  // @desc data that appears as options in select boxes.
  // ===============================================================
  const [eLocations, setELocations] = useState([]);
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);
  const [eCategories, setECategories] = useState([]);
  

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
  const queryAudios = async () => {
    const result = await getAudios();
    if (result.error) return;
    if (!isMounted) return;
    setEAudios(result);
  };
  const queryVideos = async () => {
    const result = await getVideos();
    if (result.error) return;
    if (!isMounted) return;
    setEVideos(result);
  };

  const queryCategories = async () => {
    const result = await getCategoryGroup("plant");
    if (result.error) return;
    if (!isMounted) return;
    setECategories(result);
  };
   // ===============================================================
  // INPUT WATCHERS AND SETTERS
  // @desc functions that watch updates in children components, and sets them here.
  // ===============================================================
  const categoriesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setCategories(mappedData);
  };

  const imagesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setImages(mappedData);
  };
  const audioFilesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setAudioFiles(mappedData);
  };
  const videosChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setVideos(mappedData);
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

  const locationsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setLocations(mappedData);
  };

  return (
    <AddLearnMore
      // WATCHERS
      locationsChanged={locationsChanged}
      imagesChanged={imagesChanged}
      audioFilesChanged={audioFilesChanged}
      videosChanged={videosChanged}
      categoriesChanged={categoriesChanged}

      customFieldsChanged={customFieldsChanged}
      learnMoreNameChanged={learnMoreNameChanged}
      descriptionChanged={descriptionChanged}

      // SELECTION DATA
      eLocations={eLocations}
      eImages={eImages}
      eAudios={eAudios}
      eVideos={eVideos}
      eCategories={eCategories}
      
      // QUERIES
      queryLocations={queryLocations}
      queryImages={queryImages}
      queryAudios={queryAudios}
      queryVideos={queryVideos}
      queryCategories={queryCategories}

      
      
    />
  );
}
