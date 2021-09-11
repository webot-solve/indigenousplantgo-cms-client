export const sidebarLinks = [
  // DASHBOARD
  {
    label: "dashboard",
    formattedLabel: "Dashboard",
    navigationPath: "/",
    subItems: [],
  },
  // PLANTS
  {
    label: "plants",
    formattedLabel: "Plants",
    navigationPath: "/plants",
    subItems: [
      {
        label: "All Plants",
        navigationPath: "/plants",
      },
      {
        label: "Add New",
        navigationPath: "/plants/add",
      },
      {
        label: "Categories",
        navigationPath: "/plants/categories",
      },
    ],
  },
  // WAYPOINTS
  {
    label: "waypoints",
    formattedLabel: "Waypoints",
    navigationPath: "/waypoints",
    subItems: [
      {
        label: "All Waypoints",
        navigationPath: "/waypoints",
      },
      {
        label: "Add New",
        navigationPath: "/waypoints/add",
      },
      {
        label: "Categories",
        navigationPath: "/waypoints/categories",
      },
    ],
  },
  // Tours
  // {
  //   label: "tours",
  //   formattedLabel: "Tours",
  //   navigationPath: "/tours",
  //   subItems: [
  //     {
  //       label: "All Tours",
  //       navigationPath: "/tours",
  //     },
  //     {
  //       label: "Add New",
  //       navigationPath: "/tours/add",
  //     },
  //     {
  //       label: "Categories",
  //       navigationPath: "/tours/categories",
  //     },
  //   ],
  // },
  // LEARN MORE v2
  {
    label: "learnmore",
    formattedLabel: "Learn More",
    navigationPath: "/learnmore",
    subItems: [
      {
        label: "All Learn More",
        navigationPath: "/learnmore",
      },
      {
        label: "Add New",
        navigationPath: "/learnmore/add",
      },
      {
        label: "Categories",
        navigationPath: "/learnmore/categories",
      },
    ],
  },
  // USERS
  {
    label: "users",
    formattedLabel: "Users",
    navigationPath: "/users",
    subItems: [
      {
        label: "All Users",
        navigationPath: "/users",
      },
      {
        label: "Add New",
        navigationPath: "/users/add",
      },
    ],
  },
  // LOCATIONS
  {
    label: "locations",
    formattedLabel: "Locations",
    navigationPath: "/locations",
    subItems: [
      {
        label: "All Locations",
        navigationPath: "/locations",
      },
    ],
  },
  // MEDIA
  {
    label: "media",
    formattedLabel: "Media",
    navigationPath: "/media/images",
    subItems: [
      { label: "Images", navigationPath: "/media/images" },
      { label: "Video", navigationPath: "/media/videos" },
      { label: "Audio", navigationPath: "/media/audiofiles" },
    ],
  },
  // TAGS
  {
    label: "tags",
    formattedLabel: "Tags",
    navigationPath: "/tags",
    subItems: [
      {
        label: "All Tags",
        navigationPath: "/tags",
      },
    ],
  },
];
