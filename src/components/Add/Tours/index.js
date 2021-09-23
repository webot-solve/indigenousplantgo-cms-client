import React from "react"
import DashHeader from "../../DashHeader";
import TextPickerCtrl from "../../../controllers/Forms/TextPicker/TextPickerCtrl";
import MediaPickerCtrl from "../../../controllers/Forms/MediaPicker/MediaPickerCtrl";
import CustomFieldPickerCtrl from "../../../controllers/Forms/CustomFieldPicker/CustomFieldPickerCtrl";
import TextInputCtrl from "../../../controllers/Forms/TextInput/TextInputCtrl";
import TextAreaCtrl from "../../../controllers/Forms/TextArea/TextAreaCtrl";
import TogglerCtrl from "../../../controllers/Forms/Toggler/TogglerCtrl";
import Message from "../../Message";


export default function AddTour({
  // METHODS
  handlePublish,

  tourNameChanged,
  descriptionChanged,
  customFieldsChanged,
  imagesChanged,
  audioFilesChanged,
  videosChanged,

   // SELECTION DATA
   eImages,
   eAudios,
   eVideos,

   // QUERIES
  queryImages,
  queryAudios,
  queryVideos,

  // Preloader
  loading,


  
  
 
}){
  return (
    <div>
      <DashHeader
        title="Add New Tour"
        action="Publish"
        method={handlePublish}
        loading={loading}
      />
      <br></br>
      <div className="form__grid">
        <div className="col">
          <TextInputCtrl
                label={"Tour Name"}
                setter={(data) => tourNameChanged(data)}
          />    
          <TextAreaCtrl
          label={"Description"}
          setter={(data) => descriptionChanged(data)}
          />
           <CustomFieldPickerCtrl
            label={"Custom Field"}
            setter={(data) => customFieldsChanged(data)}
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

      </div>


    </div>
  )
}