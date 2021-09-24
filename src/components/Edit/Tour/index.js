import React from "react";
import DashHeader from "../../DashHeader";
import TextPickerCtrl from "../../../controllers/Forms/TextPicker/TextPickerCtrl";
import MediaPickerCtrl from "../../../controllers/Forms/MediaPicker/MediaPickerCtrl";
import CustomFieldPickerCtrl from "../../../controllers/Forms/CustomFieldPicker/CustomFieldPickerCtrl";
import TextInputCtrl from "../../../controllers/Forms/TextInput/TextInputCtrl";
import TextAreaCtrl from "../../../controllers/Forms/TextArea/TextAreaCtrl";
import TogglerCtrl from "../../../controllers/Forms/Toggler/TogglerCtrl";
import Message from "../../Message";
import ContentPickerCtrl from "../../../controllers/Forms/ContentPicker/ContentPickerCtrl";

export default function EditTour({
  tourData,
  // METHODS
  tourNameChanged,
  descriptionChanged,
  waypointsChanged,
  imagesChanged,
  audioFilesChanged,

  // SELECTION DATA
  eWaypoints,
  eImages,
  eAudios,

  // QUERIES
  queryImages,
  queryAudios,

  loading,


 
}){
  return (
    <div>
      <DashHeader
        title={
          tourData && tourData.tour_name
            ? `Edit ${tourData.tour_name[0].toUpperCase()}${tourData.tour_name.substr(
                1
              )}`
            : "Edit Tour Item"
        }
        action="Update"
        loading={loading}
        // method={() => handleUpdate()}
      />
      <div className="form__grid">
        <div className="col">
          <TextInputCtrl
              label={"Tour Name"}
              eValue={tourData.tour_name}
              setter={(data) => tourNameChanged(data)}
          />
          <TextAreaCtrl
            label={"Description"}
            eValue={tourData.description}
            setter={(data) => descriptionChanged(data)}
          />
           <ContentPickerCtrl
            label={"waypoint"}
            dataLabel={"waypoint"}
            data={eWaypoints}
            selected={tourData.waypoints}
            setter={(data) => waypointsChanged(data)}
          />
        </div>

        <div className="col">
          <MediaPickerCtrl
            label={"image"}
            dataLabel={"image"}
            data={eImages}
            query={queryImages}
            selected={tourData.images}
            setter={(data) => imagesChanged(data)}
          />
           <MediaPickerCtrl
            label={"Audio File"}
            dataLabel={"audio_file"}
            data={eAudios}
            query={queryAudios}
            selected={tourData.audio_files}
            setter={(data) => audioFilesChanged(data)}
          />
       
        </div>

      </div>


    </div>
  )
}