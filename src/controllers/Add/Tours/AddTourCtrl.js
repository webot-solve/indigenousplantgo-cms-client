import React, {useState, useEffect} from "react";
import AddTour from "../../../components/Add/Tours";
import { useHistory } from "react-router-dom";

import {
  getImages,
  getAudios,
  getVideos,
  getCategoryGroup,
  getTags,
  getAllPlants,
  getAllWaypoints,
  createTour,
} from "../../../network";

export default function AddTourCtrl(){
  let isMounted = true;
  const history = useHistory();

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
  const [isVisible, setIsVisible] = useState(true);

  const [plants, setPlants] = useState([]);
  const [waypoints, setWaypoints] = useState([]);

  // ===============================================================
  // SELECTION DATA
  // @desc data that appears as options in select boxes.
  // ===============================================================
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);
  const [eCategories, setECategories] = useState([]);
  const [eTags, setETags] = useState([]);
  const [ePlants, setEPlants] = useState([]);
  const [eWaypoints, setEWaypoints] = useState([]);

  // Error handling
  const [directive, setDirective] = useState(null);
  // Preloader
  const [loading, setLoading] = useState(false);

  //========================
  //  USEEFFECT

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
        await queryImages();
        await queryAudios();
        await queryVideos();
        await queryTags();
        await queryCategories();
        await queryPlants();
        await queryWaypoints();
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

  const queryPlants = async () => {
    const result = await getAllPlants();
    if (result.error) return;
    if (!isMounted) return;
    setEPlants(result);
  };

  const queryWaypoints = async () => {
    const result = await getAllWaypoints();
    if (result.error) return;
    if (!isMounted) return;
    setEWaypoints(result);
  };

    // ===============================================================
  // INPUT WATCHERS AND SETTERS
  // @desc functions that watch updates in children components, and sets them here.
  // ===============================================================
  const tourNameChanged = (data) => {
    setTourName(data);
  };
  const descriptionChanged = (data) => {
    setDescription(data);
  };
  const customFieldsChanged = (data) => {
    setCustomFields(data);
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
  const categoriesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setCategories(mappedData);
  };
  const tagsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setTags(mappedData);
  };

  const isVisibleChanged = (data) => {
    setIsVisible(data);
  };

  const plantsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setPlants(mappedData);
  };

  const waypointsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setWaypoints(mappedData);
  };

  // CREATE TOUR
  const handlePublish = async () => {
    if (!isMounted) return;
    setLoading(true);
    const tour = {
      tour_name: tourName,
      description: description,
      images: images,
      audio_files: audioFiles,
      videos: videos,
      tags: tags,
      categories: categories,
      custom_fields: customFields,
      isPublish: isVisible,
      plants: plants,
      waypoints: waypoints,
    };

    const result = await createTour(tour);
    if (!isMounted) return;
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error creating tour",
        message: result.error.data.error,
        success: false,
      });
    history.push("/tours");
  };


  return (
    <div>
      <AddTour
        handlePublish={handlePublish}
        // WATCHERS
        imagesChanged={imagesChanged}
        audioFilesChanged={audioFilesChanged}
        videosChanged={videosChanged}
        categoriesChanged={categoriesChanged}
        tagsChanged={tagsChanged}
        tourNameChanged={tourNameChanged}
        descriptionChanged={descriptionChanged}
        customFieldsChanged={customFieldsChanged}
        isVisibleChanged={isVisibleChanged}

        plantsChanged={plantsChanged}
        waypointsChanged={waypointsChanged}

        // SELECTION DATA
        eImages={eImages}
        eAudios={eAudios}
        eVideos={eVideos}
        eCategories={eCategories}
        eTags={eTags}
        ePlants={ePlants}
        eWaypoints={eWaypoints}

        // QUERIES
        queryImages={queryImages}
        queryAudios={queryAudios}
        queryVideos={queryVideos}
        queryCategories={queryCategories}
        queryTags={queryTags}

        // PRELOADER
        loading={loading}
        directive={directive}
      />
    </div>
  );
}