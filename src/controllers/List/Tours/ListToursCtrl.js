import React, {useEffect, useState} from "react";
import ListTours from "../../../components/List/Tours/index";
import {
  getAllTours
} from "../../../network"

export default function ListToursCtrl(){

  let isMounted = true;
  const [toursData, setToursData] = useState([]);

  const [loading, setLoading] = useState(false);

 

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    queryTours();
    
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  // ================== METHODS ========================  
  const queryTours = async () => {
    if (!isMounted) return;
    setLoading(true);
    const result = await getAllTours();
    if (!isMounted) return;
    setLoading(false);
    if (result.error) return;
    if (result.length < 1) setToursData([]);
    setToursData(result);
  };

  return (
    <div>
      <ListTours
        toursData = {toursData}
        loading = {loading}
      />
    </div>
  );
}