import React from 'react'

import DashHeader from "../../DashHeader";
import TextPickerCtrl from "../../../controllers/Forms/TextPicker/TextPickerCtrl";
import MediaPickerCtrl from "../../../controllers/Forms/MediaPicker/MediaPickerCtrl";
import CustomFieldPickerCtrl from "../../../controllers/Forms/CustomFieldPicker/CustomFieldPickerCtrl";
import TextInputCtrl from "../../../controllers/Forms/TextInput/TextInputCtrl";
import TextAreaCtrl from "../../../controllers/Forms/TextArea/TextAreaCtrl";
import TogglerCtrl from "../../../controllers/Forms/Toggler/TogglerCtrl";
import Message from "../../Message";

export default function AddLearnMore({
  // METHODS
  locationsChanged,
  imagesChanged,
  audioFilesChanged,
  videosChanged,

  learnMoreNameChanged,
  customFieldsChanged,
  descriptionChanged,
  categoriesChanged,
  tagsChanged,
  isVisibleChanged,

  // SELECTION DATA
  eLocations,
  eImages,
  eAudios,
  eVideos,
  eCategories,
  eTags,

  // QUERIES
  queryLocations,
  queryImages,
  queryAudios,
  queryVideos,
  queryCategories,
  queryTags,

  
}){

  return (
    <div>
      <DashHeader
        title="Add New Learn More"
        action="Publish"
        // method={handlePublish}
        // loading={loading}
      />
      <br></br>
      <div className="form__grid">
        <div className="col">
          <TextInputCtrl
              label={"Learn More Title"}
              setter={(data) => learnMoreNameChanged(data)}
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
            resource="learnMore"
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
  )
}