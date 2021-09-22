import React from "react";
import ListCategoriesCtrl from "../../controllers/List/Categories/ListCategoriesCtrl";

export default function LearnMoreCategories() {
  return (
    <main>
      LearnMoreCategories
      <ListCategoriesCtrl
        dataLabel={"learn_more"}
        label={"Learn More"}
        labelPlural={"Learn More"}
      />
    </main>
  );
}
