import React, { useState, useEffect }  from 'react';
import EditLearnMore from "../../../components/Edit/LearnMore";
import { 
  getLearnMore,
  getImages, 
  getAudios,
  getVideos,
  getCategoryGroup,

} from "../../../network";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function EditLearnMoreCtrl(){

  let isMounted = true;
  const history = useHistory();
  const [learnMoreData, setLearnMoreData] = useState({});
  const { learnMoreId } = useParams();

  // ===============================================================
  // FORM DATA
  // @desc form control data
  // ===============================================================

  const [images, setImages] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videos, setVideos] = useState([]);

  const [categories, setCategories] = useState([]);


  const [learnMoreTitle, setLearnMoreTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customFields, setCustomFields] = useState([]);


  // ===============================================================
  // SELECTION DATA
  // @desc data that appears as options in select boxes.
  // ===============================================================
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);
  const [eCategories, setECategories] = useState([]);


   // Error handling
   const [directive, setDirective] = useState(null);
   // Preloader
   const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    if (isMounted) {
      (async () => {
        setLoading(true);
        await queryLearnMore();
        await queryImages();
        await queryAudios();
        await queryVideos();
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
  const queryLearnMore = async () => {
    if (!learnMoreId) return;
    const result = await getLearnMore(learnMoreId);
    if (result.error) return;
    if (!isMounted) return;
    setLearnMoreData(result);
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
    const result = await getCategoryGroup("learnMore");
    if (result.error) return;
    if (!isMounted) return;
    setECategories(result);

    console.log("Test",eCategories);
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

  const learnMoreTitleChanged = (data) => {
    if (!isMounted) return;
    setLearnMoreTitle(data);
  };
  const descriptionChanged = (data) => {
    if (!isMounted) return;
    setDescription(data);
  };
  const customFieldsChanged = (data) => {
    if (!isMounted) return;
    setCustomFields(data);
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

  return (
    <EditLearnMore
      
      learnMoreData = {learnMoreData}
      // METHODS
      categoriesChanged={categoriesChanged}
      learnMoreTitleChanged ={learnMoreTitleChanged}
      descriptionChanged={descriptionChanged}
      customFieldsChanged={customFieldsChanged}

      imagesChanged={imagesChanged}
      audioFilesChanged={audioFilesChanged}
      videosChanged={videosChanged}

      // SELECTION DATA
      eImages={eImages}
      eAudios={eAudios}
      eVideos={eVideos}
      eCategories={eCategories}

      // QUERIES
      queryLearnMore={queryLearnMore}
      queryImages={queryImages}
      queryAudios={queryAudios}
      queryVideos={queryVideos}
      queryCategories={queryCategories}
      

      loading={loading}
      directive={directive}
    
    />
   

  )
}