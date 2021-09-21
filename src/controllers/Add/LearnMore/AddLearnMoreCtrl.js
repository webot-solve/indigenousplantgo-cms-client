import React, {useState, useEffect} from 'react';
import AddLearnMore from '../../../components/Add/LearnMore';

import {
  getLocations,
  getImages,
  getAudios,
  getVideos,
  getCategoryGroup,
  getTags,
 
} from "../../../network";


export default function AddLearnMoreCtrl(){

  let isMounted = true;

  // ===============================================================
  // FORM DATA
  // @desc form control data
  // ===============================================================

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videos, setVideos] = useState([]);

  const [customFields, setCustomFields] = useState([]);
  const [learnMore, setLearnMoreName] = useState("");
  const [description, setDescription] = useState("");
  const [isVisible, setIsVisible] = useState(true);

    // ===============================================================
  // SELECTION DATA
  // @desc data that appears as options in select boxes.
  // ===============================================================
  const [eLocations, setELocations] = useState([]);
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);
  const [eCategories, setECategories] = useState([]);
  const [eTags, setETags] = useState([]);
  

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

  const queryTags = async () => {
    const result = await getTags();
    if (result.error) return;
    if (!isMounted) return;
    setETags(result);
  };
   // ===============================================================
  // INPUT WATCHERS AND SETTERS
  // @desc functions that watch updates in children components, and sets them here.
  // ===============================================================
  const categoriesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setCategories(mappedData);
  };

  const tagsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setTags(mappedData);
  };

  const locationsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setLocations(mappedData);
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

  const isVisibleChanged = (data) => {
    setIsVisible(data);
  };

 

  return (
    <AddLearnMore
      // WATCHERS
      locationsChanged={locationsChanged}
      imagesChanged={imagesChanged}
      audioFilesChanged={audioFilesChanged}
      videosChanged={videosChanged}
      categoriesChanged={categoriesChanged}
      tagsChanged={tagsChanged}

      customFieldsChanged={customFieldsChanged}
      learnMoreNameChanged={learnMoreNameChanged}
      descriptionChanged={descriptionChanged}
      isVisibleChanged={isVisibleChanged}

      // SELECTION DATA
      eLocations={eLocations}
      eImages={eImages}
      eAudios={eAudios}
      eVideos={eVideos}
      eCategories={eCategories}
      eTags={eTags}
      
      // QUERIES
      queryLocations={queryLocations}
      queryImages={queryImages}
      queryAudios={queryAudios}
      queryVideos={queryVideos}
      queryCategories={queryCategories}
      queryTags={queryTags}

      
      
    />
  );
}
