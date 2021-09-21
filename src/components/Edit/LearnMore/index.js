import React from 'react';

import DashHeader from "../../DashHeader";
import TextPickerCtrl from "../../../controllers/Forms/TextPicker/TextPickerCtrl";
import MediaPickerCtrl from "../../../controllers/Forms/MediaPicker/MediaPickerCtrl";
import CustomFieldPickerCtrl from "../../../controllers/Forms/CustomFieldPicker/CustomFieldPickerCtrl";
import TextInputCtrl from "../../../controllers/Forms/TextInput/TextInputCtrl";
import TextAreaCtrl from "../../../controllers/Forms/TextArea/TextAreaCtrl";
import TogglerCtrl from "../../../controllers/Forms/Toggler/TogglerCtrl";
import Message from "../../Message";


export default function EditLearnMore({
  learnMoreData,
  learnMoreTitleChanged,
  customFieldsChanged,

  imagesChanged,

  descriptionChanged,

  // SELECTION DATA
  eImages,

  // QUERIES
  queryImages,
 

}){
  return(
    <div>
       <DashHeader
        title={
          learnMoreData && learnMoreData.learn_more_title
            ? `Edit ${learnMoreData.learn_more_title[0].toUpperCase()}${learnMoreData.learn_more_title.substr(
                1
              )}`
            : "Edit Learn More Item"
        }
        action="Update"
        // loading={loading}
        // method={() => handleUpdate()}
      />
      <div className="form__grid">
        <div className="col">
          <TextInputCtrl
            label={"Learn More Title"}
            eValue={learnMoreData.learn_more_title}
            setter={(data) => learnMoreTitleChanged(data)}
          />
          <TextAreaCtrl
            label={"Description"}
            eValue={learnMoreData.description}
            setter={(data) => descriptionChanged(data)}
          />
          <CustomFieldPickerCtrl
            label={"Custom Field"}
            selected={learnMoreData.custom_fields}
            setter={(data) => customFieldsChanged(data)}
         />
        </div>
        <div className="col">
          <MediaPickerCtrl
            label={"image"}
            dataLabel={"image"}
            data={eImages}
            query={queryImages}
            selected={learnMoreData.images}
            setter={(data) => imagesChanged(data)}
          />
        
        </div>


      </div>

    </div>
  )
}