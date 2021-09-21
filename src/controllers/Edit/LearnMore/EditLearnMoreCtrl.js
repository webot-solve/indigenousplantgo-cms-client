import React, { useState, useEffect }  from 'react';
import EditLearnMore from "../../../components/Edit/LearnMore";
import { getLearnMore } from "../../../network";
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

  const [learnMoreTitle, setLearnMoreTitle] = useState("");
  const [description, setDescription] = useState("");

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
    
        setLoading(false);
      })();
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryLearnMore = async () => {
    if (!learnMoreId) return;
    const result = await getLearnMore(learnMoreId);
    if (result.error) return;
    if (!isMounted) return;
    setLearnMoreData(result);
  };

  const learnMoreTitleChanged = (data) => {
    if (!isMounted) return;
    setLearnMoreTitle(data);
  };

  const descriptionChanged = (data) => {
    if (!isMounted) return;
    setDescription(data);
  };

  return (
    <EditLearnMore
      // METHODS
      learnMoreTitleChanged ={learnMoreTitleChanged}
      descriptionChanged={descriptionChanged}

      // SELECTION DATA
      learnMoreData = {learnMoreData}

      // QUERIES
      queryLearnMore={queryLearnMore}
      loading={loading}
      directive={directive}
    
    />
   

  )
}