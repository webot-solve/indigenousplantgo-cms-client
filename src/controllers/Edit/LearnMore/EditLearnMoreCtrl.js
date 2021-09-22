import React, { useState, useEffect }  from 'react';
import EditLearnMore from "../../../components/Edit/LearnMore";
import { 
  getLearnMore,
  getImages, 
  getAudios,
  getVideos,
  getCategoryGroup,
  getTags,
  updateLearnMore,
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
  const [tags, setTags] = useState([]);
  const [learnMoreTitle, setLearnMoreTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customFields, setCustomFields] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  // ===============================================================
  // SELECTION DATA
  // @desc data that appears as options in select boxes.
  // ===============================================================
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);
  const [eCategories, setECategories] = useState([]);
  const [eTags, setETags] = useState([]);


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
        await queryLearnMore();
        await queryImages();
        await queryAudios();
        await queryVideos();
        await queryCategories();
        await queryTags();
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
    if (!learnMoreTitle ||  !description)
      return setDirective({
        header: "Error updating item",
        message: "Missing required fields",
        success: false,
      });
    setLoading(true);
    const learnMore = {
      learn_more_title: learnMoreTitle,
      description: description,
      images: images,
      audio_files: audioFiles,
      videos: videos,
      tags: tags,
      categories: categories,
      custom_fields: customFields,
      isPublish: isVisible,
    };

    const result = await updateLearnMore(learnMoreId, learnMore);
    if (!isMounted) return;
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error updating item",
        message: result.error.data.error,
        success: false,
      });
    history.push("/learnmore");
  };

  return (
    <EditLearnMore
      learnMoreData = {learnMoreData}
      // METHODS
      categoriesChanged={categoriesChanged}
      tagsChanged={tagsChanged}
      learnMoreTitleChanged ={learnMoreTitleChanged}
      descriptionChanged={descriptionChanged}
      customFieldsChanged={customFieldsChanged}
      imagesChanged={imagesChanged}
      audioFilesChanged={audioFilesChanged}
      videosChanged={videosChanged}
      isVisibleChanged={isVisibleChanged}
      handleUpdate={handleUpdate}

      // SELECTION DATA
      eImages={eImages}
      eAudios={eAudios}
      eVideos={eVideos}
      eCategories={eCategories}
      eTags={eTags}

      // QUERIES
      queryLearnMore={queryLearnMore}
      queryImages={queryImages}
      queryAudios={queryAudios}
      queryVideos={queryVideos}
      queryCategories={queryCategories}
      queryTags={queryTags}
      loading={loading}
      directive={directive}
    />
  );
}