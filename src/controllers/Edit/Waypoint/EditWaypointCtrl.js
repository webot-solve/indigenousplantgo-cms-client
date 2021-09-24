import React, { useState, useEffect } from "react";
import EditWaypoint from "../../../components/Edit/Waypoint";
import { getWaypoint } from "../../../network";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getLocations,
  getImages,
  getAudios,
  getVideos,
  getTags,
  getCategoryGroup,
  getAllPlants,
  updateWaypoint,
} from "../../../network";

export default function EditWaypointCtrl() {
  let isMounted = true;
  const history = useHistory();
  const [waypointData, setWaypointData] = useState({});
  const { waypointId } = useParams();
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
  const [waypointName, setWaypointName] = useState("");
  const [description, setDescription] = useState("");
  const [plants, setPlants] = useState([]);
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
        await queryWaypoint();
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

  const queryWaypoint = async () => {
    if (!waypointId) return;
    const result = await getWaypoint(waypointId);
    if (result.error) return;
    if (!isMounted) return;
    setWaypointData(result);
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

  const waypointNameChanged = (data) => {
    if (!isMounted) return;
    setWaypointName(data);
  };

  const descriptionChanged = (data) => {
    if (!isMounted) return;
    setDescription(data);
  };

  const plantsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    if (!isMounted) return;
    setPlants(mappedData);
  };

  const isVisibleChanged = (data) => {
    if (!isMounted) return;
    setIsVisible(data);
  };

  // ===============================================================
  // POST
  // @desc updates the waypoint
  // ===============================================================
  const handleUpdate = async () => {
    if (!isMounted) return;
    if (!waypointName || !description || locations.length < 1)
      return setDirective({
        header: "Error updating waypoint",
        message: "Missing required fields",
        success: false,
      });
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

    const result = await updateWaypoint(waypointId, waypoint);
    if (!isMounted) return;
    if (result.error)
      return setDirective({
        header: "Error updating plant",
        message: result.error.data.error,
        success: false,
      });
    history.push("/waypoints");
  };

  return (
    <EditWaypoint
      // WAYPOINT DATA
      waypointData={waypointData}
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
      handleUpdate={handleUpdate}
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
      loading={loading}
      directive={directive}
    />
  );
}
