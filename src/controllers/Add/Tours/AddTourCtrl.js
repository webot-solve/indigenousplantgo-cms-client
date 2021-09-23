import React, {useState, useEffect} from "react";
import AddTour from "../../../components/Add/Tours";

export default function AddTourCtrl(){

   // ===============================================================
  // FORM DATA
  // @desc form control data
  // ===============================================================
  const [tourName, setTourName] = useState("");
  const [description, setDescription] = useState("");
  const [customFields, setCustomFields] = useState([]);

  // Preloader
  const [loading, setLoading] = useState(false);

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


  return (
    <div>
      <AddTour
        // WATCHERS
        tourNameChanged={tourNameChanged}
        descriptionChanged={descriptionChanged}
        customFieldsChanged={customFieldsChanged}

        // PRELOADER
        loading={loading}
      />
    </div>
  );
}