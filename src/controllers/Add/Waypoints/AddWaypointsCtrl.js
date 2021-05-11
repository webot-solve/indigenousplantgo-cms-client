import React, { useState, useEffect } from "react";
import AddWaypoints from "../../../components/Add/Waypoints";
import { useHistory } from "react-router-dom";
import {
  getLocations,
  getImages,
  getAudios,
  getVideos,
  getTags,
  getCategoryGroup,
  getAllPlants,
  createWaypoint,
} from "../../../network";

export default function AddWaypointsCtrl() {
  let isMounted = true;
  const history = useHistory();
  // ===============================================================
  // FORM DATA
  // @desc state variables that map back to what the user has selected.
  //        These variables are updated when the user changes any form
  //        controls for a waypoint.
  // ===============================================================
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const [waypointName, setWaypointName] = useState("");
  const [description, setDescription] = useState("");
  const [plants, setPlants] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  // ===============================================================
  // SELECTION DATA
  // @desc state variables that hold EXISTING data. These variables
  //        allow the user to see what is currently in the DB, and select
  //        from that existing data. We immediately query for these on mount.
  // ===============================================================
  const [eLocations, setELocations] = useState([]);
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);
  const [eTags, setETags] = useState([]);
  const [eCategories, setECategories] = useState([]);
  const [ePlants, setEPlants] = useState([]);

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
      setDirective(null);
    }, 4000);
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
        await queryPlants();
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
  // @desc queries locations, media, categories, and tags to display
  //       available options when creating a plant.
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
    const result = await getCategoryGroup("waypoint");
    if (result.error) return;
    if (!isMounted) return;
    setECategories(result);
  };

  const queryPlants = async () => {
    const result = await getAllPlants();
    if (result.error) return;
    if (!isMounted) return;
    setEPlants(result);
  };

  // ===============================================================
  // INPUT WATCHERS AND SETTERS
  // @desc functions that watch for state updates in child components.
  //        These functions are used as setters, and when a form-control
  //        is updated, these functions update this component's state to match.
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

  const waypointNameChanged = (data) => {
    setWaypointName(data);
  };

  const descriptionChanged = (data) => {
    setDescription(data);
  };

  const plantsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setPlants(mappedData);
  };

  const isVisibleChanged = (data) => {
    setIsVisible(data);
  };

  const handlePublish = async () => {
    if (!isMounted) return;
    const waypoint = {
      waypoint_name: waypointName,
      description: description,
      images: images,
      audio_files: audioFiles,
      videos: videos,
      tags: tags,
      categories: categories,
      locations: locations,
      custom_fields: customFields,
      plants: plants,
      isPublish: isVisible,
    };

    setLoading(true);
    const result = await createWaypoint(waypoint);
    if (!isMounted) return;
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error creating waypoint",
        message: result.error.data.error,
        success: false,
      });
    history.push("/waypoints");
  };

  return (
    <AddWaypoints
      // WATCHERS
      categoriesChanged={categoriesChanged}
      tagsChanged={tagsChanged}
      locationsChanged={locationsChanged}
      imagesChanged={imagesChanged}
      audioFilesChanged={audioFilesChanged}
      customFieldsChanged={customFieldsChanged}
      videosChanged={videosChanged}
      waypointNameChanged={waypointNameChanged}
      descriptionChanged={descriptionChanged}
      plantsChanged={plantsChanged}
      isVisibleChanged={isVisibleChanged}
      // SELECTION DATA
      eLocations={eLocations}
      eImages={eImages}
      eAudios={eAudios}
      eVideos={eVideos}
      eTags={eTags}
      eCategories={eCategories}
      ePlants={ePlants}
      // QUERIES
      queryLocations={queryLocations}
      queryImages={queryImages}
      queryAudios={queryAudios}
      queryVideos={queryVideos}
      queryTags={queryTags}
      queryCategories={queryCategories}
      // PUBLISH
      handlePublish={handlePublish}
      loading={loading}
      directive={directive}
    />
  );
}
