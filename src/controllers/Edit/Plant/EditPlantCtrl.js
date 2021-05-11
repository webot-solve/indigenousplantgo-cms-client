import React, { useState, useEffect } from "react";
import EditPlant from "../../../components/Edit/Plant";
import { getPlant } from "../../../network";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  getLocations,
  getImages,
  getAudios,
  getVideos,
  getTags,
  getCategoryGroup,
  updatePlant,
} from "../../../network";

export default function EditPlantCtrl() {
  let isMounted = true;
  const history = useHistory();
  const [plantData, setPlantData] = useState({});
  const { plantId } = useParams();
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

  const resetDirective = async () => {
    await setTimeout(() => {
      if (!isMounted) return;
      setDirective(null);
    }, 4000);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;

    if (isMounted) {
      (async () => {
        setLoading(true);
        await queryPlant();
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
  // @desc queries for existing data in the database, and delegates to selection data
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

  const queryPlant = async () => {
    if (!plantId) return;
    const result = await getPlant(plantId);
    if (result.error) return;
    if (!isMounted) return;
    setPlantData(result);
  };

  // ===============================================================
  // INPUT WATCHERS AND SETTERS
  // @desc functions that watch updates in children components, and sets them here.
  // ===============================================================

  const categoriesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    if (!isMounted) return;
    setCategories(mappedData);
  };

  const tagsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    if (!isMounted) return;
    setTags(mappedData);
  };

  const locationsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    if (!isMounted) return;
    setLocations(mappedData);
  };

  const imagesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    if (!isMounted) return;
    setImages(mappedData);
  };

  const audioFilesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    if (!isMounted) return;
    setAudioFiles(mappedData);
  };

  const videosChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    if (!isMounted) return;
    setVideos(mappedData);
  };

  const customFieldsChanged = (data) => {
    if (!isMounted) return;
    setCustomFields(data);
  };

  const plantNameChanged = (data) => {
    if (!isMounted) return;
    setPlantName(data);
  };

  const scientificNameChanged = (data) => {
    if (!isMounted) return;
    setScientificName(data);
  };

  const descriptionChanged = (data) => {
    if (!isMounted) return;
    setDescription(data);
  };

  const isVisibleChanged = (data) => {
    if (!isMounted) return;
    setIsVisible(data);
  };

  // ===============================================================
  // POST
  // @desc updates the Plant.
  // ===============================================================
  const handleUpdate = async () => {
    if (!isMounted) return;
    if (!plantName || !scientificName || !description || locations.length < 1)
      return setDirective({
        header: "Error updating plant",
        message: "Missing required fields",
        success: false,
      });
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

    const result = await updatePlant(plantId, plant);
    if (!isMounted) return;
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error updating plant",
        message: result.error.data.error,
        success: false,
      });
    history.push("/plants");
  };

  return (
    <EditPlant
      // METHODS
      handleUpdate={handleUpdate}
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
      // SELECTION DATA
      eLocations={eLocations}
      eImages={eImages}
      eAudios={eAudios}
      eVideos={eVideos}
      eTags={eTags}
      eCategories={eCategories}
      plantData={plantData}
      // QUERIES
      queryLocations={queryLocations}
      queryImages={queryImages}
      queryAudios={queryAudios}
      queryVideos={queryVideos}
      queryTags={queryTags}
      queryCategories={queryCategories}
      loading={loading}
      directive={directive}
    />
  );
}
