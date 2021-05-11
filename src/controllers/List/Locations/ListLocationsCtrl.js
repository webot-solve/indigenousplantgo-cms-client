import React, { useState, useEffect } from "react";
import ListLocations from "../../../components/List/Locations";
import {
  getLocations,
  createLocation,
  deleteLocation,
  updateLocation,
  bulkDeleteLocations,
} from "../../../network";

export default function ListLocationsCtrl() {
  let isMounted = true;
  const locationFields = {
    name: "",
    latitude: 0,
    longitude: 0,
    description: "",
  };
  const [newLocation, setNewLocation] = useState(locationFields);
  const [eLocations, setELocations] = useState([]);
  // locations_ is the mutable version of eLocations that we'll be using to filter the list
  const [locations_, setLocations_] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [pendingDelete, setPendingDelete] = useState({});
  const [pendingEdit, setPendingEdit] = useState({});
  const [modalActive, setModalActive] = useState(false);
  const [modalState, setModalState] = useState("delete");
  const [editLocation, setEditLocation] = useState(locationFields);
  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [bulkAction, setBulkAction] = useState("");
  const [loading, setLoading] = useState(false);
  // Error Messaging
  const [directive, setDirective] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    queryLocations();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted) setLocations_(eLocations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eLocations]);

  useEffect(() => {
    setPage(1);
    formatPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations_]);

  useEffect(() => {
    resetDirective();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directive]);

  const resetDirective = async () => {
    await setTimeout(() => {
      if (!isMounted) return;
      setDirective(null);
    }, 4000);
  };

  const formatPages = () => {
    const dataLength = locations_.length;
    if (dataLength < 5) return setHasPages(false);

    setHasPages(true);
    let itemsChunk = 5,
      locationsData = locations_;

    // split the data into pages
    const pages = locationsData.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / itemsChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    setPages(pages);
  };

  const nextPage = () => {
    let currentPage = page;
    if (currentPage >= pages.length) return;

    currentPage = currentPage + 1;
    setPage(currentPage);
  };

  const prevPage = () => {
    let currentPage = page;
    if (currentPage === 1) return;

    currentPage = currentPage - 1;
    setPage(currentPage);
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setLocations_(eLocations);
  };

  const queryLocations = async () => {
    if (!isMounted) return;
    setLoading(true);
    const result = await getLocations();
    if (!isMounted) return;
    setLoading(false);
    if (result.error) return;
    setELocations(result);
  };

  const handleNewLocation = (e) => {
    let target = e.target.name,
      value = e.target.value;

    let currentFields = { ...newLocation };
    currentFields[`${target}`] = value;
    setNewLocation(currentFields);
  };

  const handleChangeLocation = (e) => {
    let target = e.target.name,
      value = e.target.value;

    let currentFields = { ...editLocation };
    currentFields[`${target}`] = value;
    setEditLocation(currentFields);
  };

  const applySearch = () => {
    const searchQ = searchQuery.toLowerCase();
    if (!searchQ) return setLocations_(eLocations);

    let filteredData = eLocations.filter((location) =>
      location.location_name.toLowerCase().startsWith(searchQ)
    );
    setLocations_(filteredData);
  };

  const batchSelect = () => {
    const resourceIds = eLocations.map((tag) => tag._id);
    const selectedIds = selectedLocations;

    const allSelected =
      resourceIds.length === selectedIds.length &&
      resourceIds.every(function (element, index) {
        return element === selectedIds[index];
      });

    if (!allSelected) {
      setSelectedLocations(resourceIds);
    } else {
      setSelectedLocations([]);
    }
  };

  const handleSelected = (e) => {
    const id = e.target.value;
    let newSelected = [...selectedLocations];

    if (selectedLocations.includes(id)) {
      newSelected = newSelected.filter((item) => item !== id);
    } else {
      newSelected = [...newSelected, id];
    }

    setSelectedLocations(newSelected);
  };

  const submitNewLocation = async () => {
    if (!isMounted) return;
    const isUndefined = (variable) => variable === undefined;
    if (Object.values(newLocation).some(isUndefined))
      return setDirective({
        header: "Error creating location",
        message: "Required fields are missing",
        success: false,
      });

    const newLocation_ = {
      location_name: newLocation.name,
      latitude: +newLocation.latitude,
      longitude: +newLocation.longitude,
      description: newLocation.description,
    };

    const result = await createLocation(newLocation_);
    if (!isMounted) return;
    if (result.error)
      return setDirective({
        header: "Error creating location",
        message: result.error.data.error,
        success: false,
      });
    queryLocations();
    setNewLocation(locationFields);
  };

  const handleDelete = async (e) => {
    if (!isMounted) return;
    setModalState("delete");
    const id = e.target.value;
    const foundLocation = eLocations.filter((tag) => tag._id === id)[0];
    if (!foundLocation)
      return setDirective({
        header: "Error deleting location",
        message: "Could not locate location.",
        success: false,
      });
    await setPendingDelete(foundLocation);
    if (!isMounted) return;
    setModalActive(true);
  };

  const applyDelete = async () => {
    if (!isMounted) return;
    const id = pendingDelete._id;
    if (!id)
      return setDirective({
        header: "Error deleting location",
        message: "Could not locate location.",
        success: false,
      });
    setLoading(true);
    const result = await deleteLocation(id);
    if (!isMounted) return;
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error deleting location",
        message: result.error.data.error,
        success: false,
      });
    closeModal();
    setPendingDelete({});
    queryLocations();
  };

  const handleEdit = async (e) => {
    if (!isMounted) return;
    setModalState("edit");
    const id = e.target.value;
    const foundLocation = eLocations.filter(
      (location) => location._id === id
    )[0];
    if (!foundLocation)
      return setDirective({
        header: "Error updating location",
        message: "Could not locate location.",
        success: false,
      });
    await setPendingEdit(foundLocation);
    if (!isMounted) return;
    const L = {
      name: foundLocation.location_name,
      latitude: foundLocation.latitude,
      longitude: foundLocation.longitude,
      description: foundLocation.description,
    };

    setEditLocation(L);
    setModalActive(true);
  };

  const applyEdit = async (e) => {
    if (!isMounted) return;
    const id = pendingEdit._id;
    if (!editLocation.name || !editLocation.latitude || !editLocation.longitude)
      return setDirective({
        header: "Error updating location",
        message: "Required fields are missing.",
        success: false,
      });
    if (!id)
      return setDirective({
        header: "Error updating location",
        message: "Could not locate location.",
        success: false,
      });
    const updatedLocation = {
      location_name: editLocation.name,
      latitude: +editLocation.latitude,
      longitude: +editLocation.longitude,
      description: editLocation.description,
    };
    setLoading(true);
    const result = await updateLocation(id, updatedLocation);
    if (!isMounted) return;
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error deleting location",
        message: result.error.data.error,
        success: false,
      });
    closeModal();
    setPendingEdit({});
    queryLocations();
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handleBulkActionChange = (_, data) => {
    const value = data.value;
    setBulkAction(value);
  };

  const handleBulkDelete = async () => {
    setModalState("bulk");
    if (selectedLocations.length < 1)
      return setDirective({
        header: "Error applying bulk actions",
        message: "No items selected",
        success: false,
      });
    if (bulkAction === "default")
      return setDirective({
        header: "Error applying bulk actions",
        message: "Invalid action",
        success: false,
      });
    setModalActive(true);
  };

  const applyBulkDelete = async () => {
    if (!isMounted) return;
    const result = await bulkDeleteLocations(selectedLocations);
    if (!isMounted) return;
    if (result.error)
      return setDirective({
        header: "Error applying bulk actions",
        message: result.error.data.error,
        success: false,
      });
    closeModal();
    setSelectedLocations([]);
    queryLocations();
  };

  return (
    <ListLocations
      locations={locations_}
      newLocation={newLocation}
      handleNewLocation={handleNewLocation}
      searchQuery={searchQuery}
      handleQueryChange={handleQueryChange}
      clearSearch={clearSearch}
      applySearch={applySearch}
      batchSelect={batchSelect}
      handleSelected={handleSelected}
      selectedLocations={selectedLocations}
      submitNewLocation={submitNewLocation}
      handleDelete={handleDelete}
      modalActive={modalActive}
      modalState={modalState}
      closeModal={closeModal}
      pendingDelete={pendingDelete}
      applyDelete={applyDelete}
      editLocation={editLocation}
      handleChangeLocation={handleChangeLocation}
      handleEdit={handleEdit}
      pendingEdit={pendingEdit}
      applyEdit={applyEdit}
      page={page}
      pages={pages}
      hasPages={hasPages}
      nextPage={nextPage}
      prevPage={prevPage}
      handleBulkActionChange={handleBulkActionChange}
      handleBulkDelete={handleBulkDelete}
      applyBulkDelete={applyBulkDelete}
      loading={loading}
      directive={directive}
    />
  );
}
