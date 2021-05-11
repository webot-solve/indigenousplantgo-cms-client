import React, { useState, useEffect } from "react";
import AddPlants from "../../../components/Add/Plants";
import { useHistory } from "react-router-dom";
import {
  getLocations,
  getImages,
  getAudios,
  getVideos,
  getTags,
  getCategoryGroup,
  createPlant,
} from "../../../network";

export default function AddPlantsCtrl() {
  let isMounted = true;
  const history = useHistory();
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
  const [plantName, setPlantName] = useState("");
  const [scientificName, setScientificName] = useState("");
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
  const [eTags, setETags] = useState([]);
  const [eCategories, setECategories] = useState([]);

  // Error handling
  const [directive, setDirective] = useState(null);
  // Preloader
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isMounted) resetDirective();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directive]);

  const resetDirective = () => {
    (async () => {
      await setTimeout(() => {
        if (!isMounted) return;
        setDirective(null);
      }, 4000);
    })();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    if (isMounted) {
      (async () => {
        setLoading(true);
        await queryLocations();
        await queryImages();
        await queryAudios();
        await queryVideos();
        await queryTags();
        await queryCategories();
        setLoading(false);
      })();
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const queryTags = async () => {
    const result = await getTags();
    if (result.error) return;
    if (!isMounted) return;
    setETags(result);
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

  const customFieldsChanged = (data) => {
    setCustomFields(data);
  };

  const plantNameChanged = (data) => {
    setPlantName(data);
  };

  const scientificNameChanged = (data) => {
    setScientificName(data);
  };

  const descriptionChanged = (data) => {
    setDescription(data);
  };

  const isVisibleChanged = (data) => {
    setIsVisible(data);
  };

  // ===============================================================
  // POST
  // @desc Publishes the new Plant.
  // ===============================================================

  const handlePublish = async () => {
    if (!isMounted) return;
    setLoading(true);
    const plant = {
      plant_name: plantName,
      scientific_name: scientificName,
      description: description,
      images: images,
      audio_files: audioFiles,
      videos: videos,
      tags: tags,
      categories: categories,
      locations: locations,
      custom_fields: customFields,
      isPublish: isVisible,
    };

    const result = await createPlant(plant);
    if (!isMounted) return;
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error creating plant",
        message: result.error.data.error,
        success: false,
      });
    history.push("/plants");
  };

  return (
    <AddPlants
      // WATCHERS
      categoriesChanged={categoriesChanged}
      tagsChanged={tagsChanged}
      locationsChanged={locationsChanged}
      imagesChanged={imagesChanged}
      audioFilesChanged={audioFilesChanged}
      customFieldsChanged={customFieldsChanged}
      videosChanged={videosChanged}
      plantNameChanged={plantNameChanged}
      scientificNameChanged={scientificNameChanged}
      descriptionChanged={descriptionChanged}
      isVisibleChanged={isVisibleChanged}
      handlePublish={handlePublish}
      // SELECTION DATA
      eLocations={eLocations}
      eImages={eImages}
      eAudios={eAudios}
      eVideos={eVideos}
      eTags={eTags}
      eCategories={eCategories}
      // QUERIES
      queryLocations={queryLocations}
      queryImages={queryImages}
      queryAudios={queryAudios}
      queryVideos={queryVideos}
      queryTags={queryTags}
      queryCategories={queryCategories}
      // PRELOADER
      loading={loading}
      directive={directive}
    />
  );
}
