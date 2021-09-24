import React, { useState, useEffect }  from "react";
import EditTour from "../../../components/Edit/Tour";
import { useParams } from "react-router-dom";
import { 
  getTour,
  getAllWaypoints,
  getImages, 
  getAudios,
 
} from "../../../network";

export default function EditTourCtrl(){

  let isMounted = true;
  
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


    // ===============================================================
  // SELECTION DATA
  // @desc data that appears as options in select boxes.
  // ===============================================================
  const [eWaypoints, setEWaypoints] = useState([]);
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  
  

  // Preloader
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <EditTour
        tourData = {tourData}
        // METHODS
        tourNameChanged ={tourNameChanged}
        descriptionChanged={descriptionChanged}
        waypointsChanged={waypointsChanged}
        imagesChanged={imagesChanged}
        audioFilesChanged={audioFilesChanged}
        

        // SELECTION DATA
        eWaypoints={eWaypoints}
        eImages={eImages}
        eAudios={eAudios}


        // QUERIES
        queryTours={queryTours}
        queryImages={queryImages}
        queryAudios={queryAudios}
        


        
        loading={loading}
      />
    </div>
  )
}