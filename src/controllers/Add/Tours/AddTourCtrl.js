import React, {useState, useEffect} from "react";
import AddTour from "../../../components/Add/Tours";

import {
  getImages,
  getAudios,
  getVideos,
 
} from "../../../network";

export default function AddTourCtrl(){
  let isMounted = true;

   // ===============================================================
  // FORM DATA
  // @desc form control data
  // ===============================================================
  const [images, setImages] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videos, setVideos] = useState([]);

  const [tourName, setTourName] = useState("");
  const [description, setDescription] = useState("");
  const [customFields, setCustomFields] = useState([]);

  // ===============================================================
  // SELECTION DATA
  // @desc data that appears as options in select boxes.
  // ===============================================================
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);

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

        tourNameChanged={tourNameChanged}
        descriptionChanged={descriptionChanged}
        customFieldsChanged={customFieldsChanged}

        // SELECTION DATA
        eImages={eImages}
        eAudios={eAudios}
        eVideos={eVideos}

        // QUERIES
        queryImages={queryImages}
        queryAudios={queryAudios}
        queryVideos={queryVideos}

        // PRELOADER
        loading={loading}
      />
    </div>
  );
}