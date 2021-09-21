import React, {useEffect, useState} from "react";
import ListLearnMore from "../../../components/List/LearnMore/index";
import {
  getAllLearnMore,
  getCategoryGroup,
  deleteLearnMore,
  bulkDeleteLearnMore
} from "../../../network"

export default function ListLearnMoreCtrl(){
  let isMounted = true;
  const [learnMoreData, setLearnMoreData] = useState([]);
  const [learnMoreData_, setLearnMoreData_] = useState([]);

  const [formattedCategories, setFormattedCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedLearnMore, setSelectedLearnMore] = useState([]);

  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [eCategories, setECategories] = useState([]);

  const [modalActive, setModalActive] = useState(false);
  const [pendingDelete, setPendingDelete] = useState({});
  const [modalState, setModalState] = useState("single");
  const [bulkAction, setBulkAction] = useState("");
  
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    queryLearnMore();
    queryCategories();
    formatPages();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted) setLearnMoreData_(learnMoreData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [learnMoreData]);

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
  }, [learnMoreData_]);

  // ================== METHODS ========================  
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

  const queryCategories = async () => {
    const result = await getCategoryGroup("learnMore");
    if (result.error) return;
    if (!isMounted) return;
    setECategories(result);
  };
  
  const formatPages = () => {
    const dataLength = learnMoreData_.length;
    if (dataLength < 5) return setHasPages(false);

    setHasPages(true);
    let itemsChunk = 5,
        learnMoreData = learnMoreData_;

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

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e, data) => {
    setCategoryFilter(data.value);
  };

  const applyFilter = () => {
    if(categoryFilter === "default" && !searchQuery){
      setLearnMoreData_(learnMoreData)
      return;
    }

    const searchData = learnMoreData
      //filter by SEARCH TERM
      .filter(item => {
        if(!searchQuery) {
          return item;
        } 
        
        return item.learn_more_title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      })
  
      // filter by CATEGORY
      .filter(item => {
        if(categoryFilter === "default"){
          return item;
        }
        return (item.categories.map( categoryItem => categoryItem.category_name)
          .join()
         .toLowerCase()
         .includes(categoryFilter.toLowerCase())
        
         )
      })
    
    setLearnMoreData_(searchData)
  }

  const resetFilters = () => {
    setLearnMoreData_(learnMoreData);
    setCategoryFilter("default");
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleSelected = (e) => {
    const id = e.target.value;
    let newSelected = [...selectedLearnMore];

    if (selectedLearnMore.includes(id)) {
      newSelected = newSelected.filter((item) => item !== id);
    } else {
      newSelected = [...newSelected, id];
    }

    setSelectedLearnMore(newSelected);
  };

   const batchSelect = () => {
    const resourceIds = learnMoreData.map((learnMore) => learnMore._id);
    const selectedIds = selectedLearnMore;

    const allSelected =
      resourceIds.length === selectedIds.length &&
      resourceIds.every(function (element, index) {
        return element === selectedIds[index];
      });

    if (!allSelected) {
      setSelectedLearnMore(resourceIds);
    } else {
      setSelectedLearnMore([]);
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

  //=================== DELETE

  const handleDelete = async (e) => {
    if (!isMounted) return;
    setModalState("single");
    const id = e.target.value;
    const foundLearnMore = learnMoreData.filter((learnMore) => learnMore._id === id)[0];
    if (!foundLearnMore) return;
    await setPendingDelete(foundLearnMore);
    setModalActive(true);
  };

  const applyDelete = async () => {
    if (!isMounted) return;
    const id = pendingDelete._id;
    if (!id) return;
    const result = await deleteLearnMore(id);
    if (result.error) return;
    if (!isMounted) return;
    closeModal();
    setPendingDelete({});
    queryLearnMore();
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handleBulkActionChange = (_, data) => {
    const value = data.value;
    setBulkAction(value);
  };

  const handleBulkDelete = () => {
    if (selectedLearnMore.length < 1) return;
    if (bulkAction === "default") return;
    setModalState("bulk");
    setModalActive(true);
  };

  const applyBulkDelete = async () => {
    if (!isMounted) return;
    const result = await bulkDeleteLearnMore(selectedLearnMore);
    if (result.error) return;
    if (!isMounted) return;
    closeModal();
    setSelectedLearnMore([]);
    queryLearnMore();
  };

  return(
    <ListLearnMore
      learnMoreData = {learnMoreData_}
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

      resetFilters={resetFilters}
      clearSearch={clearSearch}

      categories={formattedCategories}
      categoryFilter={categoryFilter}

      selectedLearnMore={selectedLearnMore}
      handleSelected={handleSelected}
      batchSelect={batchSelect}

      handleDelete={handleDelete}
      modalState={modalState}
      modalActive={modalActive}
      pendingDelete={pendingDelete}

      bulkAction={bulkAction}
      applyDelete={applyDelete}
      handleBulkActionChange={handleBulkActionChange}
      handleBulkDelete={handleBulkDelete}
      applyBulkDelete={applyBulkDelete}

      closeModal={closeModal}

    />
  );
}