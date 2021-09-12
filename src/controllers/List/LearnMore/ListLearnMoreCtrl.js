import React, {useEffect, useState} from "react";
import ListLearnMore from "../../../components/List/LearnMore/index";
import {
  getAllLearnMore
} from "../../../network"

export default function ListLearnMoreCtrl(){
  let isMounted = true;
  const [learnMoreData, setLearnMoreData] = useState([]);
  const [learnMoreData_, setLearnMoreData_] = useState([]);

  const [loading, setLoading] = useState(false);

  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");

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
    setPage(1);
    formatPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [learnMoreData_]);



  // METHODS 
  
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

  const applyFilter = () => {
    const searchData = learnMoreData.filter(item => 
      item.learn_more_title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()));

    setLearnMoreData_(searchData)
  }



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
      applyFilters={applyFilter}
    />
  );
}