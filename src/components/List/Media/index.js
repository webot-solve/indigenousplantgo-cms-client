import React from "react";
import Table from "./Table";
import DashHeader from "../../DashHeader";
import { Dropdown, Input, Icon } from "semantic-ui-react";
import Modal from "../../Modal";
import { Loader } from "semantic-ui-react";
import Message from "../../Message";

/*
  @desc UI component that Lists media and allows the list to be managed.
  @controller ~/src/controllers/List/Media/ListMediaCtrl.js
*/
export default function ListMedia({
  // Data to List: Medias
  medias,
  // Labels
  label,
  dataLabel,
  // SEARCH -- Attributes
  searchQuery,
  // SEARCH -- METHODS
  handleQueryChange,
  applySearch,
  clearSearch,
  // PAGINATION -- Attributes
  hasPages,
  page,
  pages,
  // PAGINATION -- Methods
  nextPage,
  prevPage,
  // BATCH SELECT -- Attributes
  selectedMedias,
  // BATCH SELECT -- Methods
  handleSelected,
  batchSelect,
  // NEW MEDIA -- METHODS
  setFile,
  setCaption,
  handleUpload,
  // NEW MEDIA -- Attributes
  file,
  caption,
  // MODAL -- Methods
  closeModal,
  // MODAL -- Attributes
  modalState,
  modalActive,
  // DELETE -- Methods
  handleDelete,
  applyDelete,
  // DELETE -- Attributes
  pendingDelete,
  // EDIT -- Methods
  handleEdit,
  handleChangeFile,
  handleCaptionChange,
  applyEdit,
  // EDIT -- Attributes
  pendingEdit,
  editMedia,
  // BULK DELETE -- Methods
  handleBulkActionChange,
  handleBulkDelete,
  applyBulkDelete,
  // LOADING -- Attributes
  loading,
  directive,
  videoLink,
  setVideoLink,
  editVideoLink,
  setEditVideoLink,
}) {
  const renderModal = () => {
    switch (modalState) {
      case "edit":
        return editModal();
      case "delete":
        return deleteModal();
      case "bulk":
        return bulkDeleteModal();
      default:
        return <></>;
    }
  };
  const deleteModal = () => (
    <>
      {dataLabel === "image" && (
        <>
          <p style={style.label}>Thumbnail</p>
          <div className="thumbnail__container">
            <div className="thumbnail__image">
              <img src={pendingDelete[`${dataLabel}_url`]} alt="thumbnail" />
            </div>
            <div className="thumbnail__meta">
              <a href={pendingDelete[`${dataLabel}_url`]} target="blank_">
                View full {label.toLowerCase()} &nbsp;
                <Icon name="sign-out" />
              </a>
            </div>
          </div>
        </>
      )}
      <p>
        Deleting this tag will remove all instances of &nbsp;
        <strong style={{ color: "var(--danger)" }}>
          {pendingDelete.caption}
        </strong>
        . Do you wish to proceed?
      </p>
      <button onClick={() => applyDelete("delete")} className="field__button">
        Yes, I know what I am doing.
      </button>
      <button onClick={() => closeModal()} className="field__button secondary">
        No, cancel my request.
      </button>
    </>
  );

  const editModal = () => (
    <>
      {dataLabel === "image" && (
        <>
          <p style={style.label}>Thumbnail</p>
          <div className="thumbnail__container">
            <div className="thumbnail__image">
              <img src={editMedia.url} alt="thumbnail" />
            </div>
            <div className="thumbnail__meta">
              <a href={editMedia.url} target="blank_">
                View full {label.toLowerCase()} &nbsp;
                <Icon name="sign-out" />
              </a>
            </div>
          </div>
        </>
      )}
      {dataLabel === "audio_file" && (
        <>
          <p style={style.label}>Audio Preview</p>
          <div className="thumbnail__container audio">
            <div className="thumbnail__audio">
              <audio controls src={editMedia.url}>
                Your browser does not support the <code>audio</code> element.
              </audio>
            </div>
          </div>
        </>
      )}
      <fieldset style={style.fieldset}>
        <p style={style.label}>
          Caption <span style={style.req}>*</span>
        </p>
        <Input
          value={editMedia.caption}
          onChange={(e) => handleCaptionChange(e)}
          style={style.input}
          placeholder="Enter caption"
        />
      </fieldset>
      {dataLabel === "video" ? (
        <>
          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Youtube URL <span style={style.req}>*</span>
            </p>

            <Input
              value={editVideoLink}
              onChange={(e) => setEditVideoLink(e.target.value)}
              style={style.input}
              placeholder="Enter Youtube URL"
            />
            <p style={{ fontSize: 12, marginTop: 7 }}>
              Valid Example: https://www.youtube.com/watch?v=lhqNduGgpC8
            </p>
          </fieldset>

          <button className="field__button" onClick={() => applyEdit()}>
            Update {label[0].toUpperCase()}
            {label.substring(1)}
          </button>
        </>
      ) : (
        <>
          <p style={style.label}>
            Upload file: <span style={style.req}>*</span>
          </p>
          <fieldset style={style.fieldset}>
            <div className="field__file">
              <div
                style={{ padding: "10px 10px", minWidth: 100 }}
                className="file__meta"
              >
                <p>
                  {editMedia.file !== null
                    ? editMedia.file?.name
                    : editMedia.url}
                </p>
              </div>
              <input
                filename={editMedia?.file !== null ? editMedia.file : null}
                onChange={(e) => {
                  handleChangeFile(e);
                }}
                style={{ display: "none" }}
                id="file--update"
                type="file"
                accept={
                  dataLabel === "image"
                    ? "image/*"
                    : dataLabel === "audio_file"
                    ? "audio/*"
                    : "video/*"
                }
              />
              <button className="field__button">
                <label htmlFor="file--update">Choose File</label>
              </button>
            </div>
            <button className="field__button" onClick={() => applyEdit()}>
              Update {label[0].toUpperCase()}
              {label.substring(1)}
            </button>
          </fieldset>
        </>
      )}

      <button
        onClick={() => closeModal()}
        style={{ color: "var(--highlight)" }}
      >
        Cancel
      </button>
    </>
  );

  const bulkDeleteModal = () => (
    <>
      <p>
        Deleting&nbsp;
        <strong style={{ color: "var(--danger)" }}>
          {selectedMedias.length}
        </strong>
        &nbsp;{label}s will remove{" "}
        <strong
          style={{
            color: "var(--danger)",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          all
        </strong>{" "}
        instances of the deleted {label}s. Do you wish to proceed?
      </p>
      <button onClick={() => applyBulkDelete()} className="field__button">
        Yes, I know what I am doing.
      </button>
      <button onClick={() => closeModal()} className="field__button secondary">
        No, cancel my request.
      </button>
    </>
  );

  return (
    <div>
      {typeof directive === "object" &&
        directive !== null &&
        Object.keys(directive).length > 0 && (
          <Message
            success={directive.success}
            header={directive.header}
            message={directive.message}
          />
        )}
      <DashHeader title={`${label}s`} />
      <div className="resource__container">
        <div className="resource__col left">
          <h3>Add New {label}</h3>
          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Caption <span style={style.req}>*</span>
            </p>
            <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={style.input}
              placeholder="Enter caption"
            />
          </fieldset>

          {dataLabel === "video" ? (
            <>
              <fieldset style={style.fieldset}>
                <form>
                  <fieldset style={style.fieldset}>
                    <p style={style.label}>
                      Youtube URL <span style={style.req}>*</span>
                    </p>

                    <Input
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                      style={style.input}
                      placeholder="Enter Youtube URL"
                    />
                    <p style={{ fontSize: 12, marginTop: 7 }}>
                      Valid Example: https://www.youtube.com/watch?v=lhqNduGgpC8
                    </p>
                  </fieldset>
                  <button
                    type="button"
                    className="field__button"
                    onClick={() => handleUpload()}
                  >
                    Upload {label[0].toUpperCase()}
                    {label.substring(1)}
                  </button>
                </form>
              </fieldset>
            </>
          ) : (
            <>
              <p style={style.label}>
                Upload file: <span style={style.req}>*</span>
              </p>
              <fieldset style={style.fieldset}>
                <form>
                  <div className="field__file">
                    <div
                      style={{ padding: "10px 10px", minWidth: 100 }}
                      className="file__meta"
                    >
                      <p>{file?.name}</p>
                    </div>
                    <input
                      filename={file}
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                      key={file?.name || ""}
                      style={{ display: "none" }}
                      id="file--upload"
                      type="file"
                      accept={
                        dataLabel === "image"
                          ? "image/*"
                          : dataLabel === "audio_file"
                          ? "audio/*"
                          : "video/*"
                      }
                    />
                    <button type="button" className="field__button">
                      <label htmlFor="file--upload">Choose File</label>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="field__button"
                    onClick={() => handleUpload()}
                  >
                    Upload {label[0].toUpperCase()}
                    {label.substring(1)}
                  </button>
                </form>
              </fieldset>
            </>
          )}
        </div>
        <div className="resource__col right">
          <div style={{ marginBottom: 10, display: "flex" }}>
            <p>
              <strong>Results</strong> ({medias.length}){" "}
            </p>
            {loading && <Loader active inline size="tiny" />}
          </div>

          <div className="table__controls">
            <div style={{ display: "flex" }}>
              <div className="table__action">
                <Dropdown
                  placeholder={"Bulk Actions"}
                  onChange={(e, data) => handleBulkActionChange(e, data)}
                  selection
                  options={[
                    { key: "default", value: "default", text: "Bulk Actions" },
                    { key: "delete", value: "delete", text: "Delete" },
                  ]}
                />
                <button onClick={() => handleBulkDelete()}>Apply</button>
              </div>
            </div>

            <div>
              <div className="table__action" style={{ marginRight: 0 }}>
                {searchQuery && (
                  <button onClick={() => clearSearch()} className="sub__action">
                    Clear search
                  </button>
                )}
                <Input
                  onChange={(e) => handleQueryChange(e)}
                  value={searchQuery}
                  style={{ ...style.input, minWidth: 250 }}
                  placeholder={`Enter search query`}
                />
                <button onClick={() => applySearch()}>Search</button>
              </div>
            </div>
          </div>

          <div className="table__heading table__row">
            <div className="table__col head select">
              <input
                type="checkbox"
                value={"select all"}
                onChange={(e) => batchSelect(e)}
              />
            </div>
            <div className="table__col head title">
              <h3>caption</h3>
            </div>
            <div className="table__col head url">
              <h3>url</h3>
            </div>
            {dataLabel === "image" && (
              <div className="table__col head thumbnail">
                <h3>thumbnail</h3>
              </div>
            )}
            {dataLabel === "audio_file" && (
              <div className="table__col head audio__preview">
                <h3>Preview</h3>
              </div>
            )}
          </div>

          <Table
            medias={hasPages ? pages[page - 1] : medias}
            selectedMedias={selectedMedias}
            dataLabel={dataLabel}
            handleSelected={handleSelected}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          {hasPages && (
            <div className="pagination__control">
              <div>
                <p style={{ marginBottom: "7px" }}>
                  Page {page} of {pages.length}
                </p>
                <div className="control">
                  <button onClick={() => prevPage()}>
                    <Icon name="caret left" />
                  </button>
                  <span>{page}</span>
                  <button onClick={() => nextPage()}>
                    <Icon name="caret right" />
                  </button>
                </div>
              </div>
            </div>
          )}
          <Modal
            isActive={modalActive}
            title={
              modalState === "delete"
                ? `Delete ${pendingDelete.caption}?`
                : modalState === "edit"
                ? `Edit ${pendingEdit.caption}`
                : `Delete all ${selectedMedias.length} ${label}s?`
            }
            closeModal={closeModal}
          >
            {renderModal()}
          </Modal>
        </div>
      </div>
    </div>
  );
}

const style = {
  input: {
    width: "100%",
    color: "var(--darksecondary)",
  },
  textarea: {
    height: 200,
    border: "1px solid lightgrey",
    color: "var(--darkprimary)",
    padding: "7px 14px",
    background: "var(--lighttertiary)",
  },
  label: {
    color: "var(--darksecondary)",
    margin: 0,
    fontSize: 11,
    marginBottom: "3px",
  },
  fieldset: {
    marginBottom: "10px",
    padding: 0,
  },
  req: {
    color: "red",
    fontSize: 14,
  },
};
