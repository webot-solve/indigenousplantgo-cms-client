import React, { useState, useEffect } from "react";
import ListUsers from "../../../components/List/Users";
import { getAllUsers, deleteUser, bulkDeleteUsers } from "../../../network";
import { useAuth } from "../../../context/AuthContext";

export default function ListUsersCtrl() {
  let isMounted = true;
  const authContext = useAuth();
  const { userData } = authContext;
  const [userDatas, setUserDatas] = useState([]);
  const [userDatas_, setUserDatas_] = useState([]);
  const [roleSelection, setRoleSelection] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modalState, setModalState] = useState("single");
  const [modalActive, setModalActive] = useState(false);
  const [roleFilter, setCategoryFilter] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    queryUsers();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted) {
      formatRoles();
      setUserDatas_(userDatas);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDatas]);

  useEffect(() => {
    if (!searchQuery) applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
    formatPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDatas_]);

  const formatPages = () => {
    const dataLength = userDatas_.length;
    if (dataLength < 5) return setHasPages(false);

    setHasPages(true);
    let itemsChunk = 5,
      userData__ = userDatas_;

    // split the data into pages
    const pages = userData__.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / itemsChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    setPages(pages);
  };

  const formatRoles = () => {
    const rolesUnique = [
      ...new Set([...userDatas].map((userData) => userData.role)),
    ];
    let text;
    const formattedSelection = rolesUnique.map((role) => {
      if (role === "Admin") text = "Administrator";
      if (role === "Manager") text = "Content Manager";
      return {
        key: role,
        value: role,
        text: text,
      };
    });

    setRoleSelection(formattedSelection);
  };

  const queryUsers = async () => {
    if (!isMounted) return;
    setLoading(true);
    let myUserId;
    if (userData && userData.user) myUserId = userData.user._id;
    const result = await getAllUsers();
    if (!isMounted) return;
    setLoading(false);
    if (result.error) return;
    if (result.length < 1) setUserDatas([]);
    const filteredResults = result.filter((user) => user._id !== myUserId);
    setUserDatas(filteredResults);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setUserDatas_(userDatas);
    setCategoryFilter("default");
  };

  const handleFilterChange = (e, data) => {
    setCategoryFilter(data.value);
  };

  const applyFilter = () => {
    // APPLY A CATEGORY FILTER
    const roleF = roleFilter.toLowerCase();
    let filteredData = [...userDatas].filter((userData) => {
      let userRole = userData.role.toLowerCase();

      return userRole === roleF;
    });

    if (roleF === "default") filteredData = [...userDatas];

    // APPLY A SEARCH FILTER
    const searchQ = searchQuery.toLowerCase();
    if (!searchQ) return setUserDatas_(filteredData);

    filteredData = filteredData.filter(
      (userData) =>
        userData.user_name.toLowerCase().startsWith(searchQ) ||
        userData.email.toLowerCase().startsWith(searchQ)
    );

    setUserDatas_(filteredData);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const batchSelect = () => {
    const resourceIds = userDatas.map((userData) => userData._id);
    const selectedIds = selectedUsers;

    const allSelected =
      resourceIds.length === selectedIds.length &&
      resourceIds.every(function (element, index) {
        return element === selectedIds[index];
      });

    if (!allSelected) {
      setSelectedUsers(resourceIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelected = (e) => {
    const id = e.target.value;
    let newSelected = [...selectedUsers];

    if (selectedUsers.includes(id)) {
      newSelected = newSelected.filter((item) => item !== id);
    } else {
      newSelected = [...newSelected, id];
    }

    setSelectedUsers(newSelected);
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

  const closeModal = () => {
    setModalActive(false);
  };

  const handleDelete = async (e) => {
    setModalState("single");
    const id = e.target.value;
    const foundUser = userDatas.filter((userData) => userData._id === id)[0];
    if (!foundUser) return;
    await setPendingDelete(foundUser);
    setModalActive(true);
  };

  const applyDelete = async () => {
    if (!isMounted) return;
    const id = pendingDelete._id;
    if (!id) return;
    const result = await deleteUser(id);
    if (!isMounted) return;
    if (result.error) return;
    closeModal();
    setPendingDelete({});
    queryUsers();
  };

  const handleBulkActionChange = (_, data) => {
    const value = data.value;
    setBulkAction(value);
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length < 1) if (bulkAction === "default") return;
    setModalState("bulk");
    setModalActive(true);
  };

  const applyBulkDelete = async () => {
    if (!isMounted) return;
    const result = await bulkDeleteUsers(selectedUsers);
    if (!isMounted) return;
    if (result.error) return;
    closeModal();
    setSelectedUsers([]);
    queryUsers();
  };

  return (
    <ListUsers
      userDatas={userDatas_}
      roleSelection={roleSelection}
      handleBulkActionChange={handleBulkActionChange}
      bulkAction={bulkAction}
      handleBulkDelete={handleBulkDelete}
      roleFilter={roleFilter}
      resetFilters={resetFilters}
      searchQuery={searchQuery}
      handleFilterChange={handleFilterChange}
      applyFilters={applyFilter}
      clearSearch={clearSearch}
      handleQueryChange={handleQueryChange}
      batchSelect={batchSelect}
      handleSelected={handleSelected}
      selectedUsers={selectedUsers}
      page={page}
      hasPages={hasPages}
      pages={pages}
      nextPage={nextPage}
      prevPage={prevPage}
      closeModal={closeModal}
      handleDelete={handleDelete}
      pendingDelete={pendingDelete}
      applyDelete={applyDelete}
      modalActive={modalActive}
      modalState={modalState}
      applyBulkDelete={applyBulkDelete}
      loading={loading}
    />
  );
}
