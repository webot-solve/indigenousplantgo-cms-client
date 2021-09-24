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
  // METHODS
  categoriesChanged,
  tagsChanged,
  learnMoreTitleChanged,
  customFieldsChanged,
  imagesChanged,
  audioFilesChanged,
  videosChanged,
  descriptionChanged,
  isVisibleChanged,
  handleUpdate,

  // SELECTION DATA
  eImages,
  eAudios,
  eVideos,
  eCategories,
  eTags,

  // QUERIES
  queryImages,
  queryAudios,
  queryVideos,
  queryCategories,
  queryTags,
  loading,
  directive,

}){
  
  return(
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
          learnMoreData && learnMoreData.learn_more_title
            ? `Edit ${learnMoreData.learn_more_title[0].toUpperCase()}${learnMoreData.learn_more_title.substr(
                1
              )}`
            : "Edit Learn More Item"
        }
        action="Update"
        loading={loading}
        method={() => handleUpdate()}
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
          <MediaPickerCtrl
            label={"Audio File"}
            dataLabel={"audio_file"}
            data={eAudios}
            query={queryAudios}
            selected={learnMoreData.audio_files}
            setter={(data) => audioFilesChanged(data)}
          />
           <MediaPickerCtrl
            label={"video"}
            dataLabel={"video"}
            data={eVideos}
            query={queryVideos}
            selected={learnMoreData.videos}
            setter={(data) => videosChanged(data)}
          />
        </div>
        <div className="col">
          <TextPickerCtrl
            label={"category"}
            dataLabel={"category"}
            data={eCategories}
            query={queryCategories}
            selected={learnMoreData.categories}
            resource="learn_more"
            setter={(data) => categoriesChanged(data)}
          />
          <TextPickerCtrl
            label={"tag"}
            dataLabel={"tag"}
            data={eTags}
            selected={learnMoreData.tags}
            query={queryTags}
            setter={(data) => tagsChanged(data)}
          />
            <TogglerCtrl
            label={"visibility"}
            eValue={learnMoreData.isPublish}
            setter={(data) => isVisibleChanged(data)}
          />
        </div>
      </div>
    </div>
  );
}