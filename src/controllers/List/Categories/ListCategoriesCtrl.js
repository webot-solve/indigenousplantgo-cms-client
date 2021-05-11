import React, { useState, useEffect } from "react";
import ListCategories from "../../../components/List/Categories";
import {
  getCategoryGroup,
  createCategory,
  deleteCategory,
  updateCategory,
  bulkDeleteCategory,
} from "../../../network";

export default function ListCategoriesCtrl({ dataLabel, label, labelPlural }) {
  let isMounted = true;
  const [eCategories, setECategories] = useState([]);
  // categories_ is the mutable version of eCategories that we'll be using to filter
  const [categories_, setCategories_] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCat, setNewCat] = useState("");
  const [editCat, setEditCat] = useState("");
  const [pendingDelete, setPendingDelete] = useState({});
  const [pendingEdit, setPendingEdit] = useState({});
  const [modalActive, setModalActive] = useState(false);
  const [modalState, setModalState] = useState("delete");
  const [loading, setLoading] = useState(false);
  const [bulkAction, setBulkAction] = useState("");
  // Error Messaging
  const [directive, setDirective] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    queryCategories();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted) setCategories_(eCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eCategories]);

  useEffect(() => {
    setPage(1);
    formatPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories_]);

  useEffect(() => {
    if (isMounted) resetDirective();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directive]);

  const resetDirective = async () => {
    await setTimeout(() => {
      if (!isMounted) return;
      setDirective(null);
    }, 4000);
  };

  const formatPages = () => {
    const dataLength = categories_.length;
    if (dataLength < 5) return setHasPages(false);

    setHasPages(true);
    let itemsChunk = 5,
      categoriesData = categories_;

    // split the data into pages
    const pages = categoriesData.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / itemsChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    setPages(pages);
  };

  const queryCategories = async () => {
    if (!isMounted) return;
    setLoading(true);
    const result = await getCategoryGroup(dataLabel);
    if (!isMounted) return;
    setLoading(false);
    if (result.error) return;
    setECategories(result);
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const applySearch = () => {
    const searchQ = searchQuery.toLowerCase();
    if (!searchQ) return setCategories_(eCategories);

    let filteredData = eCategories.filter((category) =>
      category.category_name.toLowerCase().startsWith(searchQ)
    );
    setCategories_(filteredData);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCategories_(eCategories);
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

  const handleSelected = (e) => {
    const id = e.target.value;
    let newSelected = [...selectedCategories];

    if (selectedCategories.includes(id)) {
      newSelected = newSelected.filter((item) => item !== id);
    } else {
      newSelected = [...newSelected, id];
    }

    setSelectedCategories(newSelected);
  };

  const batchSelect = () => {
    const resourceIds = eCategories.map((category) => category._id);
    const selectedIds = selectedCategories;

    const allSelected =
      resourceIds.length === selectedIds.length &&
      resourceIds.every(function (element, index) {
        return element === selectedIds[index];
      });

    if (!allSelected) {
      setSelectedCategories(resourceIds);
    } else {
      setSelectedCategories([]);
    }
  };

  const submitNewCategory = async () => {
    if (!isMounted) return;
    if (!newCat)
      return setDirective({
        header: "Error creating category",
        message: "Can't create a category with an empty category name",
        success: false,
      });
    const category = {
      category_name: newCat,
      resource: `${dataLabel}`,
    };

    const result = await createCategory(category);
    if (!isMounted) return;
    if (result.error)
      return setDirective({
        header: "Error creating tag",
        message: result.error.data.error,
        success: false,
      });
    queryCategories();
    setNewCat("");
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handleDelete = async (e) => {
    if (!isMounted) return;
    setModalState("delete");
    const id = e.target.value;
    const foundCategory = eCategories.filter(
      (category) => category._id === id
    )[0];
    if (!foundCategory)
      return setDirective({
        header: "Error deleting category",
        message: "Could not locate category",
        success: false,
      });
    await setPendingDelete(foundCategory);
    if (!isMounted) return;
    setModalActive(true);
  };

  const applyDelete = async () => {
    if (!isMounted) return;
    const id = pendingDelete._id;
    if (!id)
      return setDirective({
        header: "Error deleting category",
        message: "Could not locate category",
        success: false,
      });
    const result = await deleteCategory(id);
    if (!isMounted) return;
    if (result.error)
      return setDirective({
        header: "Error deleting category",
        message: result.error.data.error,
        success: false,
      });

    closeModal();
    setPendingDelete({});
    queryCategories();
  };

  const handleEdit = async (e) => {
    if (!isMounted) return;
    setModalState("edit");
    const id = e.target.value;
    const foundCategory = eCategories.filter(
      (category) => category._id === id
    )[0];
    if (!foundCategory)
      return setDirective({
        header: "Error updating category",
        message: "Could not locate category",
        success: false,
      });
    await setPendingEdit(foundCategory);
    if (!isMounted) return;
    setEditCat(foundCategory.category_name);
    setModalActive(true);
  };

  const applyEdit = async (e) => {
    if (!isMounted) return;
    const id = pendingEdit._id;
    if (!id)
      return setDirective({
        header: "Error updating category",
        message: "Could not locate category",
        success: false,
      });

    if (!editCat || !pendingEdit.resource)
      return setDirective({
        header: "Error updating category",
        message: "Required fields are missing",
        success: false,
      });
    const updatedCategory = {
      category_name: editCat,
      resource: pendingEdit.resource,
    };
    const result = await updateCategory(id, updatedCategory);
    if (!isMounted) return;
    if (result.error)
      return setDirective({
        header: "Error deleting category",
        message: result.error.data.error,
        success: false,
      });
    closeModal();
    setPendingEdit({});
    queryCategories();
  };

  const handleBulkActionChange = (_, data) => {
    const value = data.value;
    setBulkAction(value);
  };

  const handleBulkDelete = async () => {
    setModalState("bulk");
    if (selectedCategories.length < 1)
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
    const result = await bulkDeleteCategory(selectedCategories);
    if (!isMounted) return;
    if (result.error)
      return setDirective({
        header: "Error applying bulk action",
        message: result.error.data.error,
        success: false,
      });
    closeModal();
    setSelectedCategories([]);
    queryCategories();
  };

  return (
    <ListCategories
      dataLabel={dataLabel}
      categories={categories_}
      label={label}
      labelPlural={labelPlural}
      searchQuery={searchQuery}
      handleQueryChange={handleQueryChange}
      applySearch={applySearch}
      clearSearch={clearSearch}
      page={page}
      pages={pages}
      hasPages={hasPages}
      nextPage={nextPage}
      prevPage={prevPage}
      handleSelected={handleSelected}
      batchSelect={batchSelect}
      newCategory={setNewCat}
      handleDelete={handleDelete}
      newCategoryValue={newCat}
      selectedCategories={selectedCategories}
      pendingDelete={pendingDelete}
      pendingEdit={pendingEdit}
      submitNewCategory={submitNewCategory}
      closeModal={closeModal}
      applyDelete={applyDelete}
      modalActive={modalActive}
      modalState={modalState}
      handleEdit={handleEdit}
      editCategory={setEditCat}
      editCategoryValue={editCat}
      applyEdit={applyEdit}
      loading={loading}
      directive={directive}
      handleBulkActionChange={handleBulkActionChange}
      handleBulkDelete={handleBulkDelete}
      applyBulkDelete={applyBulkDelete}
    />
  );
}
