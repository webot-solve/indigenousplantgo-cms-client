import React from "react";
import DashHeader from "../../DashHeader";
import TextPickerCtrl from "../../../controllers/Forms/TextPicker/TextPickerCtrl";
import MediaPickerCtrl from "../../../controllers/Forms/MediaPicker/MediaPickerCtrl";
import ContentPickerCtrl from "../../../controllers/Forms/ContentPicker/ContentPickerCtrl";
import CustomFieldPickerCtrl from "../../../controllers/Forms/CustomFieldPicker/CustomFieldPickerCtrl";
import TextInputCtrl from "../../../controllers/Forms/TextInput/TextInputCtrl";
import TextAreaCtrl from "../../../controllers/Forms/TextArea/TextAreaCtrl";
import TogglerCtrl from "../../../controllers/Forms/Toggler/TogglerCtrl";
import Message from "../../Message";

/*
  @desc UI component for the EditWaypoint dashboard. Displays form inputs, allows users to update a waypoint's data.
  @controller ~/src/controllers/Edit/Waypoint/EditWaypointCtrl.js
*/
export default function EditWaypoint({
  // METHODS
  waypointData,
  categoriesChanged,
  tagsChanged,
  locationsChanged,
  imagesChanged,
  audioFilesChanged,
  customFieldsChanged,
  videosChanged,
  waypointNameChanged,
  descriptionChanged,
  plantsChanged,
  isVisibleChanged,
  handleUpdate,
  // SELECTION DATA
  eLocations,
  eImages,
  eAudios,
  eVideos,
  eTags,
  eCategories,
  ePlants,
  // QUERIES
  queryLocations,
  queryImages,
  queryAudios,
  queryVideos,
  queryTags,
  queryCategories,
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
        title={
          waypointData && waypointData.waypoint_name
            ? `Edit ${waypointData.waypoint_name[0].toUpperCase()}${waypointData.waypoint_name.substr(
                1
              )}`
            : "Edit Waypoint"
        }
        loading={loading}
        action="Update"
        method={() => handleUpdate()}
      />
      <div className="form__grid">
        <div className="col">
          <TextInputCtrl
            label={"Waypoint Name"}
            eValue={waypointData.waypoint_name}
            setter={(data) => waypointNameChanged(data)}
          />
          <TextAreaCtrl
            label={"Description"}
            eValue={waypointData.description}
            setter={(data) => descriptionChanged(data)}
          />
          <CustomFieldPickerCtrl
            label={"Custom Field"}
            selected={waypointData.custom_fields}
            setter={(data) => customFieldsChanged(data)}
          />
          <TextPickerCtrl
            label={"location"}
            dataLabel={"location"}
            data={eLocations}
            query={queryLocations}
            selected={waypointData.locations}
            setter={(data) => locationsChanged(data)}
          />
          <ContentPickerCtrl
            label={"plant"}
            dataLabel={"plant"}
            data={ePlants}
            selected={waypointData.plants}
            setter={(data) => plantsChanged(data)}
          />
        </div>
        <div className="col">
          <MediaPickerCtrl
            label={"image"}
            dataLabel={"image"}
            data={eImages}
            query={queryImages}
            selected={waypointData.images}
            setter={(data) => imagesChanged(data)}
          />
          <MediaPickerCtrl
            label={"Audio File"}
            dataLabel={"audio_file"}
            data={eAudios}
            query={queryAudios}
            selected={waypointData.audio_files}
            setter={(data) => audioFilesChanged(data)}
          />
          <MediaPickerCtrl
            label={"video"}
            dataLabel={"video"}
            data={eVideos}
            query={queryVideos}
            selected={waypointData.videos}
            setter={(data) => videosChanged(data)}
          />
        </div>
        <div className="col">
          <TextPickerCtrl
            label={"category"}
            dataLabel={"category"}
            data={eCategories}
            query={queryCategories}
            selected={waypointData.categories}
            resource="plant"
            setter={(data) => categoriesChanged(data)}
          />
          <TextPickerCtrl
            label={"tag"}
            dataLabel={"tag"}
            data={eTags}
            selected={waypointData.tags}
            query={queryTags}
            setter={(data) => tagsChanged(data)}
          />
          <TogglerCtrl
            label={"visibility"}
            eValue={waypointData.isPublish}
            setter={(data) => isVisibleChanged(data)}
          />
        </div>
      </div>
    </div>
  );
}
