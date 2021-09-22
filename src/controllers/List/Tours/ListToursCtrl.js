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

 
  //================ useEFFECT START===========================
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    queryTours();
    queryCategories();
    formatPages();
    
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

  useEffect(() => {
    setPage(1);
    formatPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toursData_]);

  //================ useEFFECT END============================

  //================ METHODS START ===========================  
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

  const formatPages = () => {
    const dataLength = toursData_.length;
    if (dataLength < 5) return setHasPages(false);

    setHasPages(true);
    let itemsChunk = 5,
        learnMoreData = toursData_;

    // split the data into pages
    const pages = learnMoreData.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / itemsChunk);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    setPages(pages);
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

        prevPage={prevPage}
        nextPage={nextPage}

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