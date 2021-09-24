import React, { useState, useEffect }  from "react";
import EditTour from "../../../components/Edit/Tour";
import { useParams, useHistory } from "react-router-dom";
import { 
  getTour,
  getAllWaypoints,
  getImages, 
  getAudios,
  getVideos,
  getCategoryGroup,
  getTags,
  getAllPlants,
  updateTour
 
} from "../../../network";

export default function EditTourCtrl(){

  let isMounted = true;
  const history = useHistory();
  const [tourData, setTourData] = useState({});
  const { tourId } = useParams();

  // ===============================================================
  // FORM DATA
  // @desc form control data
  // ===============================================================
  const [tourName, setTourName] = useState("");
  const [description, setDescription] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [images, setImages] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [customFields, setCustomFields] = useState([]);
  const [plants, setPlants] = useState([]);

    // ===============================================================
  // SELECTION DATA
  // @desc data that appears as options in select boxes.
  // ===============================================================
  const [eWaypoints, setEWaypoints] = useState([]);
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);
  const [eCategories, setECategories] = useState([]);
  const [eTags, setETags] = useState([]);
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
        await queryTours();
        await queryWaypoints();
        await queryImages();
        await queryAudios();
        await queryVideos();
        await queryCategories();
        await queryTags();
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
  const queryTours = async () => {
    if (!tourId) return;
    const result = await getTour(tourId);
    if (result.error) return;
    if (!isMounted) return;
    setTourData(result);
  };
  const queryWaypoints = async () => {
    const result = await getAllWaypoints();
    if (result.error) return;
    if (!isMounted) return;
    setEWaypoints(result);
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
    const result = await getCategoryGroup("tour");
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


  // ===============================================================
  // INPUT WATCHERS AND SETTERS
  // @desc functions that watch updates in children components, and sets them here.
  // ===============================================================
  const tourNameChanged = (data) => {
    if (!isMounted) return;
    setTourName(data);
  };
  const descriptionChanged = (data) => {
    if (!isMounted) return;
    setDescription(data);
  };

  const waypointsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    if (!isMounted) return;

    console.log(mappedData)
    setWaypoints(mappedData);
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
  const isVisibleChanged = (data) => {
    if (!isMounted) return;
    setIsVisible(data);
  };
  const customFieldsChanged = (data) => {
    if (!isMounted) return;
    setCustomFields(data);
  };
  const plantsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    if (!isMounted) return;
    setPlants(mappedData);
  };

  // ===============================================================
  // POST
  // @desc updates the tour
  // ===============================================================
  const handleUpdate = async () => {
    if (!isMounted) return;
    if (!tourName || !description)
      return setDirective({
        header: "Error updating waypoint",
        message: "Missing required fields",
        success: false,
      });
    const tour = {
      tour_name: tourName,
      description: description,
      images: images,
      audio_files: audioFiles,
      videos: videos,
      tags: tags,
      categories: categories,
      custom_fields: customFields,
      waypoints: waypoints,
      plants: plants,
      isPublish: isVisible,
    };

    const result = await updateTour(tourId, tour);
    if (!isMounted) return;
    if (result.error)
      return setDirective({
        header: "Error updating tour",
        message: result.error.data.error,
        success: false,
      });
    history.push("/tours");
  };

  return (
    <div>
      <EditTour
        tourData = {tourData}
        handleUpdate={handleUpdate}
        // METHODS
        tourNameChanged ={tourNameChanged}
        descriptionChanged={descriptionChanged}
        waypointsChanged={waypointsChanged}
        imagesChanged={imagesChanged}
        audioFilesChanged={audioFilesChanged}
        videosChanged={videosChanged}
        categoriesChanged={categoriesChanged}
        tagsChanged={tagsChanged}
        isVisibleChanged={isVisibleChanged}
        customFieldsChanged={customFieldsChanged}
        plantsChanged={plantsChanged}

        

        // SELECTION DATA
        eWaypoints={eWaypoints}
        eImages={eImages}
        eAudios={eAudios}
        eVideos={eVideos}
        eCategories={eCategories}
        eTags={eTags}
        ePlants={ePlants}


        // QUERIES
        queryTours={queryTours}
        queryImages={queryImages}
        queryAudios={queryAudios}
        queryVideos={queryVideos}
        queryCategories={queryCategories}
        queryTags={queryTags}

        loading={loading}
      />
    </div>
  )
}