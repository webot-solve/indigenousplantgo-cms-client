import React from "react";
import ListCategoriesCtrl from "../../controllers/List/Categories/ListCategoriesCtrl";

export default function WaypointCategories() {
  return (
    <main>
      <ListCategoriesCtrl
        dataLabel={"waypoint"}
        label={"Waypoint"}
        labelPlural={"Waypoints"}
      />
    </main>
  );
}
