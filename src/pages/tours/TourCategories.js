import React from "react";
import ListCategoriesCtrl from "../../controllers/List/Categories/ListCategoriesCtrl";

export default function TourCategories() {
  return (
    <main>
      <ListCategoriesCtrl
        dataLabel={"tour"}
        label={"Tour"}
        labelPlural={"Tours"}
      />
    </main>
  );
}
