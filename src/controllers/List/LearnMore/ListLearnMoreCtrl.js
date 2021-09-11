import React, {useEffect, useState} from "react";
import ListLearnMore from "../../../components/List/LearnMore/index";
import {
  getAllLearnMore
} from "../../../network"

export default function ListLearnMoreCtrl(){
  let isMounted = true;
  const [learnMoreData, setLearnMoreData] = useState([]);
  // const [learnMoreData_, setLearnMoreData_] = useState([]);
  const [loading, setLoading] = useState(false);

  const queryLearnMore = async () => {
    if (!isMounted) return;
    setLoading(true);
    const result = await getAllLearnMore();
    if (!isMounted) return;
    setLoading(false);
    if (result.error) return;
    if (result.length < 1) setLearnMoreData([]);
    setLearnMoreData(result);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    queryLearnMore();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return(
    <ListLearnMore
      learnMoreData = {learnMoreData}
      loading = {loading}
    />
  );
}