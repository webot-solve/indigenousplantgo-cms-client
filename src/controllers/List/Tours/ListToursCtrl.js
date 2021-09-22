import React, {useEffect, useState} from "react";
import ListTours from "../../../components/List/Tours/index";
import {
  getAllTours
} from "../../../network"

export default function ListToursCtrl(){

  let isMounted = true;
  const [toursData, setToursData] = useState([]);

  const [selectedTour, setSelectedTour] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [modalState, setModalState] = useState("single");
  const [bulkAction, setBulkAction] = useState("");
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

  // ================== DELETE

  const handleBulkActionChange = (_, data) => {
    const value = data.value;
    setBulkAction(value);
  };

  const handleBulkDelete = () => {
    if (selectedTour.length < 1) return;
    if (bulkAction === "default") return;
    setModalState("bulk");
    setModalActive(true);
  };


  return (
    <div>
      <ListTours
        toursData = {toursData}
        loading = {loading}

        bulkAction={bulkAction}
        handleBulkActionChange={handleBulkActionChange}
        handleBulkDelete={handleBulkDelete}
      />
    </div>
  );
}