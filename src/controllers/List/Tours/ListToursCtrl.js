import React, {useEffect, useState} from "react";
import ListTours from "../../../components/List/Tours/index";
import {
  getAllTours,
  getCategoryGroup
} from "../../../network"

export default function ListToursCtrl(){

  let isMounted = true;
  const [toursData, setToursData] = useState([]);
  const [toursData_, setToursData_] = useState([]);

  const [formattedCategories, setFormattedCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("default");
  const [eCategories, setECategories] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedTour, setSelectedTour] = useState([]);
  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);


  const [modalActive, setModalActive] = useState(false);
  const [modalState, setModalState] = useState("single");
  const [bulkAction, setBulkAction] = useState("");

  const [loading, setLoading] = useState(false);

 

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    queryTours();
    queryCategories();
    
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted) setToursData_(toursData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toursData]);

  useEffect(() => {
    if (!searchQuery) applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    formatCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eCategories]);
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

  const queryCategories = async () => {
    const result = await getCategoryGroup("tour");
    if (result.error) return;
    if (!isMounted) return;
    setECategories(result);
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleFilterChange = (e, data) => {
    setCategoryFilter(data.value);
  };

  const applyFilter = () => {  
    if(categoryFilter === "default" && !searchQuery){
      setToursData_(toursData)
      return;
    }

    const searchData = toursData
      //filter by SEARCH TERM
      .filter(item => { 
        if(!searchQuery) return item; 
        return item.tour_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      })
      // filter by CATEGORY
      .filter(item => {
        if(categoryFilter === "default") return item;
        return (item.categories.map( categoryItem => categoryItem.category_name)
          .join()
          .toLowerCase()
          .includes(categoryFilter.toLowerCase())
         )
      })

    setToursData_(searchData);
  }

  const resetFilters = () => {
    setToursData_(toursData);
    setCategoryFilter("default");
  };
  const clearSearch = () => {
    setSearchQuery("");
  };

  const batchSelect = () => {
    const resourceIds = toursData.map((learnMore) => learnMore._id);
    const selectedIds = selectedTour;

    const allSelected =
      resourceIds.length === selectedIds.length &&
      resourceIds.every(function (element, index) {
        return element === selectedIds[index];
      });

    if (!allSelected) {
      setSelectedTour(resourceIds);
    } else {
      setSelectedTour([]);
    }
  };

  const formatCategories = () => {
    const formatted = eCategories.map((category) => {
      return {
        ...category,
        key: category._id,
        value: category.category_name,
        text: category.category_name,
      };
    });

    setFormattedCategories(formatted);
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
        toursData = {toursData_}
        loading = {loading}

        hasPages={hasPages}
        pages={pages}
        page={page}

        searchQuery={searchQuery}
        handleQueryChange={handleQueryChange}
        handleFilterChange={handleFilterChange}
        applyFilters={applyFilter}

        clearSearch={clearSearch}
        resetFilters={resetFilters}

        categories={formattedCategories}
        categoryFilter={categoryFilter}

        selectedTour={selectedTour}
        batchSelect={batchSelect}

        bulkAction={bulkAction}
        handleBulkActionChange={handleBulkActionChange}
        handleBulkDelete={handleBulkDelete}
      />
    </div>
  );
}