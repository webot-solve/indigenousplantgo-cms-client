import React, {useState, useEffect} from "react";
import AddTour from "../../../components/Add/Tours";

import {
  getImages,
  getAudios,
  getVideos,
  getCategoryGroup,
  getTags,
 
} from "../../../network";

export default function AddTourCtrl(){
  let isMounted = true;

   // ===============================================================
  // FORM DATA
  // @desc form control data
  // ===============================================================
  const [tourName, setTourName] = useState("");
  const [description, setDescription] = useState("");
  const [customFields, setCustomFields] = useState([]);
  
  const [images, setImages] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videos, setVideos] = useState([]);

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  

  // ===============================================================
  // SELECTION DATA
  // @desc data that appears as options in select boxes.
  // ===============================================================
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);
  const [eCategories, setECategories] = useState([]);
  const [eTags, setETags] = useState([]);

  // Preloader
  const [loading, setLoading] = useState(false);

  // ===============================================================
  // NETWORK QUERIES FOR EXISTING DATA
  // @desc queries for existing data
  // ===============================================================
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
    const result = await getCategoryGroup("learn_more");
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
  const categoriesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setCategories(mappedData);
  };
  const tagsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setTags(mappedData);
  };



  const tourNameChanged = (data) => {
    setTourName(data);
  };
  const descriptionChanged = (data) => {
    setDescription(data);
  };
  const customFieldsChanged = (data) => {
    setCustomFields(data);
  };


  return (
    <div>
      <AddTour
        // WATCHERS
        imagesChanged={imagesChanged}
        audioFilesChanged={audioFilesChanged}
        videosChanged={videosChanged}
        categoriesChanged={categoriesChanged}
        tagsChanged={tagsChanged}

        tourNameChanged={tourNameChanged}
        descriptionChanged={descriptionChanged}
        customFieldsChanged={customFieldsChanged}

        // SELECTION DATA
        eImages={eImages}
        eAudios={eAudios}
        eVideos={eVideos}
        eCategories={eCategories}
        eTags={eTags}

        // QUERIES
        queryImages={queryImages}
        queryAudios={queryAudios}
        queryVideos={queryVideos}
        queryCategories={queryCategories}
        queryTags={queryTags}

        // PRELOADER
        loading={loading}
      />
    </div>
  );
}