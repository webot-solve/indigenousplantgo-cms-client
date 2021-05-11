import React, { useState, useEffect } from "react";
import ListTags from "../../../components/List/Tags";
import {
  getTags,
  createTag,
  deleteTag,
  updateTag,
  bulkDeleteTags,
} from "../../../network";

export default function ListTagsCtrl() {
  let isMounted = true;
  const [newTag, setNewTag] = useState("");
  const [eTags, setETags] = useState([]);
  // tags_ is the mutable version of eTags that we'll be using to filter the list
  const [tags_, setTags_] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState({});
  const [pendingEdit, setPendingEdit] = useState({});
  const [modalActive, setModalActive] = useState(false);
  const [modalState, setModalState] = useState("delete");
  const [bulkAction, setBulkAction] = useState("");
  const [editTag, setEditTag] = useState("");
  const [loading, setLoading] = useState(false);
  // Error Messaging
  const [directive, setDirective] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    queryTags();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted) setTags_(eTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eTags]);

  useEffect(() => {
    setPage(1);
    formatPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags_]);

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
    const dataLength = tags_.length;
    if (dataLength < 5) return setHasPages(false);

    setHasPages(true);
    let itemsChunk = 5,
      tagsData = tags_;

    // split the data into pages
    const pages = tagsData.reduce((resultArray, item, index) => {
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

  const queryTags = async () => {
    if (!isMounted) return;
    setLoading(true);
    const result = await getTags();
    if (!isMounted) return;
    setLoading(false);
    if (result.error) return;
    setETags(result);
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setTags_(eTags);
  };

  const batchSelect = () => {
    const resourceIds = eTags.map((tag) => tag._id);
    const selectedIds = selectedTags;

    const allSelected =
      resourceIds.length === selectedIds.length &&
      resourceIds.every(function (element, index) {
        return element === selectedIds[index];
      });

    if (!allSelected) {
      setSelectedTags(resourceIds);
    } else {
      setSelectedTags([]);
    }
  };

  const handleSelected = (e) => {
    const id = e.target.value;
    let newSelected = [...selectedTags];

    if (selectedTags.includes(id)) {
      newSelected = newSelected.filter((item) => item !== id);
    } else {
      newSelected = [...newSelected, id];
    }

    setSelectedTags(newSelected);
  };

  const applySearch = () => {
    const searchQ = searchQuery.toLowerCase();
    if (!searchQ) return setTags_(eTags);

    let filteredData = eTags.filter((tag) =>
      tag.tag_name.toLowerCase().startsWith(searchQ)
    );
    setTags_(filteredData);
  };

  const submitNewTag = async () => {
    if (!isMounted) return;
    if (!newTag)
      return setDirective({
        header: "Error creating tag",
        message: "Can't create a tag with an empty tag name",
        success: false,
      });
    const tag = {
      tag_name: newTag,
    };
    setLoading(true);
    const result = await createTag(tag);
    if (!isMounted) return;
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error creating tag",
        message: result.error.data.error,
        success: false,
      });
    queryTags();
    setNewTag("");
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handleDelete = async (e) => {
    if (!isMounted) return;
    setModalState("delete");
    const id = e.target.value;
    const foundTag = eTags.filter((tag) => tag._id === id)[0];
    if (!foundTag)
      return setDirective({
        header: "Error deleting tag",
        message: "Could not locate tag",
        success: false,
      });
    await setPendingDelete(foundTag);
    if (!isMounted) return;
    setModalActive(true);
  };

  const applyDelete = async () => {
    if (!isMounted) return;
    const id = pendingDelete._id;
    if (!id)
      return setDirective({
        header: "Error deleting tag",
        message: "Could not locate tag",
        success: false,
      });
    setLoading(true);
    const result = await deleteTag(id);
    if (!isMounted) return;
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error deleting tag",
        message: result.error.data.error,
        success: false,
      });
    closeModal();
    setPendingDelete({});
    queryTags();
  };

  const handleEdit = async (e) => {
    if (!isMounted) return;
    setModalState("edit");
    const id = e.target.value;
    const foundTag = eTags.filter((tag) => tag._id === id)[0];
    if (!foundTag)
      return setDirective({
        header: "Error updating tag",
        message: "Could not locate tag",
        success: false,
      });
    await setPendingEdit(foundTag);
    if (!isMounted) return;
    setEditTag(foundTag.tag_name);
    setModalActive(true);
  };

  const applyEdit = async () => {
    if (!isMounted) return;
    if (!editTag)
      return setDirective({
        header: "Error updating tag",
        message: "Can't create a tag with an empty tag name",
        success: false,
      });
    const id = pendingEdit._id;
    if (!id)
      return setDirective({
        header: "Error updating tag",
        message: "Could not locate tag",
        success: false,
      });
    const updatedTag = {
      tag_name: editTag,
    };
    setLoading(true);
    const result = await updateTag(id, updatedTag);
    if (!isMounted) return;
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error updating tag",
        message: result.error.data.error,
        success: false,
      });
    closeModal();
    setPendingEdit({});
    queryTags();
  };

  const handleBulkActionChange = (_, data) => {
    const value = data.value;
    setBulkAction(value);
  };

  const handleBulkDelete = async () => {
    if (selectedTags.length < 1)
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
    setModalState("bulk");
    setModalActive(true);
  };

  const applyBulkDelete = async () => {
    if (!isMounted) return;
    const result = await bulkDeleteTags(selectedTags);
    if (!isMounted) return;
    if (result.error)
      return setDirective({
        header: "Error applying bulk action",
        message: result.error.data.error,
        success: false,
      });
    closeModal();
    setSelectedTags([]);
    queryTags();
  };

  return (
    <ListTags
      tags={tags_}
      newTag={setNewTag}
      newTagValue={newTag}
      handleQueryChange={handleQueryChange}
      searchQuery={searchQuery}
      clearSearch={clearSearch}
      selectedTags={selectedTags}
      batchSelect={batchSelect}
      handleSelected={handleSelected}
      page={page}
      pages={pages}
      hasPages={hasPages}
      nextPage={nextPage}
      prevPage={prevPage}
      applySearch={applySearch}
      submitNewTag={submitNewTag}
      closeModal={closeModal}
      handleDelete={handleDelete}
      modalActive={modalActive}
      modalState={modalState}
      pendingDelete={pendingDelete}
      applyDelete={applyDelete}
      editTag={setEditTag}
      editTagValue={editTag}
      handleEdit={handleEdit}
      applyEdit={applyEdit}
      pendingEdit={pendingEdit}
      handleBulkActionChange={handleBulkActionChange}
      handleBulkDelete={handleBulkDelete}
      applyBulkDelete={applyBulkDelete}
      loading={loading}
      directive={directive}
    />
  );
}
