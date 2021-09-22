import React from "react";
import ListCategoriesCtrl from "../../controllers/List/Categories/ListCategoriesCtrl";

export default function LearnMoreCategories() {
  return (
    <main>
      <ListCategoriesCtrl
        dataLabel={"learn_more"}
        label={"Learn More"}
        labelPlural={"Learn More"}
      />
    </main>
  );
}
