import React from "react";
import DashHeader from "../../DashHeader";
import TextPickerCtrl from "../../../controllers/Forms/TextPicker/TextPickerCtrl";
import MediaPickerCtrl from "../../../controllers/Forms/MediaPicker/MediaPickerCtrl";
import CustomFieldPickerCtrl from "../../../controllers/Forms/CustomFieldPicker/CustomFieldPickerCtrl";
import TextInputCtrl from "../../../controllers/Forms/TextInput/TextInputCtrl";
import TextAreaCtrl from "../../../controllers/Forms/TextArea/TextAreaCtrl";
import TogglerCtrl from "../../../controllers/Forms/Toggler/TogglerCtrl";
import Message from "../../Message";

/*
  @desc UI component for the AddPlants dashboard. Displays form inputs.
  @controller ~/src/controllers/Add/Plants/AddPlantCtrl.js
*/
export default function AddPlants({
  // METHODS
  handlePublish,
  categoriesChanged,
  tagsChanged,
  locationsChanged,
  imagesChanged,
  audioFilesChanged,
  videosChanged,
  customFieldsChanged,
  plantNameChanged,
  scientificNameChanged,
  isVisibleChanged,
  descriptionChanged,
  // SELECTION DATA
  eLocations,
  eImages,
  eAudios,
  eVideos,
  eTags,
  eCategories,
  // QUERIES
  queryLocations,
  queryImages,
  queryAudios,
  queryVideos,
  queryTags,
  queryCategories,
  // Preloader
  loading,
  directive,
}) {
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
      <DashHeader
        title="Add New Plant"
        action="Publish"
        method={handlePublish}
        loading={loading}
      />
      <br></br>
      <div className="form__grid">
        <div className="col">
          <TextInputCtrl
            label={"Plant Name"}
            setter={(data) => plantNameChanged(data)}
          />
          <TextInputCtrl
            label={"Scientific Name"}
            setter={(data) => scientificNameChanged(data)}
          />
          <CustomFieldPickerCtrl
            label={"Custom Field"}
            setter={(data) => customFieldsChanged(data)}
          />
          <TextAreaCtrl
            label={"Description"}
            setter={(data) => descriptionChanged(data)}
          />
          <TextPickerCtrl
            label={"location"}
            dataLabel={"location"}
            data={eLocations}
            query={queryLocations}
            setter={(data) => locationsChanged(data)}
          />
        </div>
        <div className="col">
          <MediaPickerCtrl
            label={"image"}
            dataLabel={"image"}
            data={eImages}
            query={queryImages}
            setter={(data) => imagesChanged(data)}
          />
          <MediaPickerCtrl
            label={"Audio File"}
            dataLabel={"audio_file"}
            data={eAudios}
            query={queryAudios}
            setter={(data) => audioFilesChanged(data)}
          />
          <MediaPickerCtrl
            label={"video"}
            dataLabel={"video"}
            data={eVideos}
            query={queryVideos}
            setter={(data) => videosChanged(data)}
          />
        </div>
        <div className="col">
          <TextPickerCtrl
            label={"category"}
            dataLabel={"category"}
            data={eCategories}
            query={queryCategories}
            resource="plant"
            setter={(data) => categoriesChanged(data)}
          />
          <TextPickerCtrl
            label={"tag"}
            dataLabel={"tag"}
            data={eTags}
            query={queryTags}
            setter={(data) => tagsChanged(data)}
          />
          <TogglerCtrl
            label={"visibility"}
            eValue={true}
            setter={(data) => isVisibleChanged(data)}
          />
        </div>
      </div>
    </div>
  );
}
