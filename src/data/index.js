export const locations = [
  {
    _id: "0fb14ca5-8548-4361-82c3-361c9d7e2125",
    location_name: "Location Name 1",
    coordinates: "-33.868820, 151.209290",
  },
  {
    _id: "0fb14ca5-8548-4361-82c3-387c9d7e2125",
    location_name: "Location Name 2",
    coordinates: "-33.868820, 151.209290",
  },
  {
    _id: "0fb14ca5-8952-4361-82c3-387c9d7e2125",
    location_name: "Location Name 3",
    coordinates: "-33.868820, 157.209290",
  },
  {
    _id: "0fb14ca5-8952-4361-82c3-387c9d7e228b",
    location_name: "Location Name 4",
    coordinates: "-33.868820, 157.209290",
  },
];

export const categories = [
  {
    _id: "0fb14ca5-8548-4361-82c3-361c9d23e125",
    category_name: "prennenial",
  },
  {
    _id: "0fb14ca5-8548-4361-82c3-3870dm7e2125",
    category_name: "seasonal",
  },
  {
    _id: "8365bnh75-8952-4361-82c3-387c9d7e2125",
    category_name: "summer",
  },
  {
    _id: "0fb14ca5-kjds-827b-82c3-387c9d7e228b",
    category_name: "exotic",
  },
];

export const tags = [
  {
    _id: "0fb14ca5-8548-4361-82c3-361c9d23e125",
    tag_name: "Flower",
  },
  {
    _id: "0fb14ca5-8548-4361-82c3-3870dm7e2125",
    tag_name: "Bloom",
  },
  {
    _id: "8365bnh75-8952-4361-82c3-387c9d7e2125",
    tag_name: "Purple",
  },
  {
    _id: "0fb14ca5-kjds-827b-82c3-387c9d7e228b",
    tag_name: "Pink",
  },
];

export const images = [
  {
    _id: "607e399e59c8feg7e2af65r7",
    image_url: "s3.aws.indigenousplantgo.com/images/lavender-1",
    caption: "lavender in a big field",
  },
  {
    _id: "607e834ne59c8feg7e2834n5r7",
    image_url: "s3.aws.indigenousplantgo.com/images/rose.jpg",
    caption: "roses in a big field",
  },
  {
    _id: "607e88723b59c8feg7e2834n5r7",
    image_url: "s3.aws.indigenousplantgo.com/images/blueberry.jpg",
    caption: "blueberries in a field",
  },
];

export const videos = [
  {
    _id: "607e384559c86677e2af65r7",
    video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
    caption: "A lavender flower blooming timelapse",
  },
  {
    _id: "607e384559c23hj77ejdas65r7",
    video_url: "s3.aws.indigenousplantgo.com/video/rose-bloom.mp4",
    caption: "A rose flower blooming timelapse",
  },
  {
    _id: "489ne384559c76g77ejdas65r7",
    video_url: "s3.aws.indigenousplantgo.com/video/blueberry-bloom.mp4",
    caption: "A blueberry field timelapse",
  },
];

export const audio = [
  {
    _id: "607e384559c866784hf65r7",
    audio_file_url: "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
    caption: "A speech about lavender",
  },
  {
    _id: "607e384559c8ydn84hf65r7",
    audio_file_url: "s3.aws.indigenousplantgo.com/audio/rose-speech.mp3",
    caption: "A speech about roses",
  },
  {
    _id: "607e384559c8y239nhf65r7",
    audio_file_url: "s3.aws.indigenousplantgo.com/audio/blueberry-speech.mp3",
    caption: "A speech about blueberries",
  },
];

export const plants = [
  {
    _id: "607e399e59c7645shde2af6587",
    plant_name: "Lavender 2",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 2",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "607e399e59c8687hde2af6587",
    plant_name: "Lavender",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "607e399e5863b87hde2af6587",
    plant_name: "Lavender 3",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 3",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "607e399e586983bhe2af6587",
    plant_name: "Lavender 4",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 4",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "607e399e5884bnsdbhe2af6587",
    plant_name: "Lavender 5",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 5",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "607e399e586983893hj6587",
    plant_name: "Lavender 6",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 6",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "607e399e586972he3hj6587",
    plant_name: "Lavender 7",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 7",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "607e3998937hj972he3hj6587",
    plant_name: "Lavender 8",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 8",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
      {
        _id: "0fb14ca5-kjds-827b-82c3-387c9d7e228b",
        category_name: "exotic",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "607e39988267hj972he3hj6587",
    plant_name: "Lavender 9",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 9",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "607e39988267756db24e3hj6587",
    plant_name: "Lavender 10",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 10",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "607e3998826774624e3hj6587",
    plant_name: "Lavender 11",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 11",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "607e399874jfu2wee3hj6587",
    plant_name: "Lavender 12",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 12",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "60787fbh74jfu2wee3hj6587",
    plant_name: "Lavender 13",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 13",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "60787fbh787ashjwee3hj6587",
    plant_name: "Lavender 14",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 14",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
  {
    _id: "60787fbh837hshjwee3hj6587",
    plant_name: "Lavender 15",
    description:
      "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
    scientific_name: "Lavandula 15",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
        caption: "A speech about lavender",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        category_name: "Prennenial",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
        field_title: "Medicial Properties",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Sweet&lt;/p&gt;",
        field_title: "Aroma",
      },
    ],
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "lavender in a big field",
        image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
      },
    ],
    locations: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        coordinates:
          "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
        description: "",
        location_name: "Lot A",
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "flower",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "purple",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption: "A lavender flower blooming timelapse",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
  },
];

export const waypoints = [
  {
    _id: "607e399e59c86677e2af6587",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/gathering-place.mp3",
        caption: "A speech about The Indigenous Initiatives ",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        tag_name: "Building",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content:
          "&lt;ul&gt;&lt;li&gt;Activity 1&lt;/li&gt;&lt;li&gt;Activity 2&lt;/li&gt;&lt;/ul&gt;",
        field_title: "Activities:",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Burnaby&lt;/p&gt;",
        field_title: "Campus",
      },
    ],
    description:
      "The Indigenous Gathering Place is a comfortable, welcoming and safe space for students, families and staff. Mi Chap Tukw, the BCIT Indigenous Gathering Place (IGP) is located on the Burnaby campus at SW1-1521.",
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "The Indigenous Initiatives Gathering Place",
        image_url: "s3.aws.indigenousplantgo.com/images/gathering-place.jpg",
      },
    ],
    location: {
      _id: "607e3ab0a0d3df815abfcfb1",
      coordinates: "49.2508575,-123.0030182",
      description: "",
      location_name: "SW1",
    },
    plants: [
      {
        _id: "607e399e59c86677e2af6587",
        audio_files: [
          {
            _id: "607e399459c86677e2af65r7",
            audio_file_url:
              "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
            caption: "A speech about lavender",
          },
        ],
        categories: [
          {
            _id: "607e4qwee59c86677e2ewe3447",
            tag_name: "Prennenial",
          },
        ],
        custom_fields: [
          {
            _id: "607e399e59c86677e2af65r7",
            content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
            field_title: "Medicial Properties",
          },
          {
            _id: "607e399e59c86677e465r7",
            content: "&lt;p&gt;Sweet&lt;/p&gt;",
            field_title: "Aroma",
          },
        ],
        description:
          "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
        images: [
          {
            _id: "607e399e59c8feg7e2af65r7",
            caption: "lavender in a big field",
            image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
          },
        ],
        location: [
          {
            _id: "607e3ab0a0d3df815abfcfb1",
            coordinates:
              "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
            description: "",
            location_name: "Lot A",
          },
        ],
        plant_name: "Lavender",
        revision_history: [
          {
            _id: "607e3ab0a0d3df815abfcfb1",
            date: "April 20, 2021 at 6:30am",
            user: {
              _id: "607e3ab0a0d3df815abfcfb1",
              email: "patrickfortaleza@gmail.com",
              role: "Manager",
              user_name: "Patrick Fortaleza",
            },
          },
          {
            _id: "607e3ab0a0d3df815abfcfb1",
            date: "April 20, 2021 at 2:30am",
            user: {
              _id: "607e3ab0a0d3df815abfcfb1",
              email: "patrickfortaleza@gmail.com",
              role: "Manager",
              user_name: "Patrick Fortaleza",
            },
          },
        ],
        scientific_name: "Lavandula",
        tags: [
          {
            _id: "607e4qwee59c86677e2af65r7",
            tag_name: "flower",
          },
          {
            _id: "607e4qwee59c86677e2ewe5r7",
            tag_name: "purple",
          },
        ],
        videos: [
          {
            _id: "607e384559c86677e2af65r7",
            caption: "A lavender flower blooming timelapse",
            video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
          },
        ],
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "gathering place",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "Burnaby Campus",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption:
          "The construction of The Indigenous Initiatives Gathering Place",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
    waypoint_name: "The Indigenous Initiatives Gathering Place",
  },
  {
    _id: "607e399e59c8667776bg6587",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/gathering-place.mp3",
        caption: "A speech about The Indigenous Initiatives ",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        tag_name: "Building",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content:
          "&lt;ul&gt;&lt;li&gt;Activity 1&lt;/li&gt;&lt;li&gt;Activity 2&lt;/li&gt;&lt;/ul&gt;",
        field_title: "Activities:",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Burnaby&lt;/p&gt;",
        field_title: "Campus",
      },
    ],
    description:
      "The Indigenous Gathering Place is a comfortable, welcoming and safe space for students, families and staff. Mi Chap Tukw, the BCIT Indigenous Gathering Place (IGP) is located on the Burnaby campus at SW1-1521.",
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "The Indigenous Initiatives Gathering Place",
        image_url: "s3.aws.indigenousplantgo.com/images/gathering-place.jpg",
      },
    ],
    location: {
      _id: "607e3ab0a0d3df815abfcfb1",
      coordinates: "49.2508575,-123.0030182",
      description: "",
      location_name: "SW1",
    },
    plants: [
      {
        _id: "607e399e59c86677e2af6587",
        audio_files: [
          {
            _id: "607e399459c86677e2af65r7",
            audio_file_url:
              "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
            caption: "A speech about lavender",
          },
        ],
        categories: [
          {
            _id: "607e4qwee59c86677e2ewe3447",
            tag_name: "Prennenial",
          },
        ],
        custom_fields: [
          {
            _id: "607e399e59c86677e2af65r7",
            content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
            field_title: "Medicial Properties",
          },
          {
            _id: "607e399e59c86677e465r7",
            content: "&lt;p&gt;Sweet&lt;/p&gt;",
            field_title: "Aroma",
          },
        ],
        description:
          "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
        images: [
          {
            _id: "607e399e59c8feg7e2af65r7",
            caption: "lavender in a big field",
            image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
          },
        ],
        location: [
          {
            _id: "607e3ab0a0d3df815abfcfb1",
            coordinates:
              "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
            description: "",
            location_name: "Lot A",
          },
        ],
        plant_name: "Lavender",
        revision_history: [
          {
            _id: "607e3ab0a0d3df815abfcfb1",
            date: "April 20, 2021 at 6:30am",
            user: {
              _id: "607e3ab0a0d3df815abfcfb1",
              email: "patrickfortaleza@gmail.com",
              role: "Manager",
              user_name: "Patrick Fortaleza",
            },
          },
          {
            _id: "607e3ab0a0d3df815abfcfb1",
            date: "April 20, 2021 at 2:30am",
            user: {
              _id: "607e3ab0a0d3df815abfcfb1",
              email: "patrickfortaleza@gmail.com",
              role: "Manager",
              user_name: "Patrick Fortaleza",
            },
          },
        ],
        scientific_name: "Lavandula",
        tags: [
          {
            _id: "607e4qwee59c86677e2af65r7",
            tag_name: "flower",
          },
          {
            _id: "607e4qwee59c86677e2ewe5r7",
            tag_name: "purple",
          },
        ],
        videos: [
          {
            _id: "607e384559c86677e2af65r7",
            caption: "A lavender flower blooming timelapse",
            video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
          },
        ],
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "gathering place",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "Burnaby Campus",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption:
          "The construction of The Indigenous Initiatives Gathering Place",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
    waypoint_name: "The Indigenous Initiatives Gathering Place 2",
  },
  {
    _id: "607e399e59c87bsdn54bg6587",
    audio_files: [
      {
        _id: "607e399459c86677e2af65r7",
        audio_file_url:
          "s3.aws.indigenousplantgo.com/audio/gathering-place.mp3",
        caption: "A speech about The Indigenous Initiatives ",
      },
    ],
    categories: [
      {
        _id: "607e4qwee59c86677e2ewe3447",
        tag_name: "Building",
      },
    ],
    custom_fields: [
      {
        _id: "607e399e59c86677e2af65r7",
        content:
          "&lt;ul&gt;&lt;li&gt;Activity 1&lt;/li&gt;&lt;li&gt;Activity 2&lt;/li&gt;&lt;/ul&gt;",
        field_title: "Activities:",
      },
      {
        _id: "607e399e59c86677e465r7",
        content: "&lt;p&gt;Burnaby&lt;/p&gt;",
        field_title: "Campus",
      },
    ],
    description:
      "The Indigenous Gathering Place is a comfortable, welcoming and safe space for students, families and staff. Mi Chap Tukw, the BCIT Indigenous Gathering Place (IGP) is located on the Burnaby campus at SW1-1521.",
    images: [
      {
        _id: "607e399e59c8feg7e2af65r7",
        caption: "The Indigenous Initiatives Gathering Place",
        image_url: "s3.aws.indigenousplantgo.com/images/gathering-place.jpg",
      },
    ],
    location: {
      _id: "607e3ab0a0d3df815abfcfb1",
      coordinates: "49.2508575,-123.0030182",
      description: "",
      location_name: "SW1",
    },
    plants: [
      {
        _id: "607e399e59c86677e2af6587",
        audio_files: [
          {
            _id: "607e399459c86677e2af65r7",
            audio_file_url:
              "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
            caption: "A speech about lavender",
          },
        ],
        categories: [
          {
            _id: "607e4qwee59c86677e2ewe3447",
            tag_name: "Prennenial",
          },
        ],
        custom_fields: [
          {
            _id: "607e399e59c86677e2af65r7",
            content: "&lt;p&gt;Helps alleviate headaches and nausea&lt;/p&gt;",
            field_title: "Medicial Properties",
          },
          {
            _id: "607e399e59c86677e465r7",
            content: "&lt;p&gt;Sweet&lt;/p&gt;",
            field_title: "Aroma",
          },
        ],
        description:
          "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
        images: [
          {
            _id: "607e399e59c8feg7e2af65r7",
            caption: "lavender in a big field",
            image_url: "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
          },
        ],
        location: [
          {
            _id: "607e3ab0a0d3df815abfcfb1",
            coordinates:
              "49°15&amp;#39;16.2&amp;quot;N 122°59&amp;#39;53.7&amp;quot;W",
            description: "",
            location_name: "Lot A",
          },
        ],
        plant_name: "Lavender",
        revision_history: [
          {
            _id: "607e3ab0a0d3df815abfcfb1",
            date: "April 20, 2021 at 6:30am",
            user: {
              _id: "607e3ab0a0d3df815abfcfb1",
              email: "patrickfortaleza@gmail.com",
              role: "Manager",
              user_name: "Patrick Fortaleza",
            },
          },
          {
            _id: "607e3ab0a0d3df815abfcfb1",
            date: "April 20, 2021 at 2:30am",
            user: {
              _id: "607e3ab0a0d3df815abfcfb1",
              email: "patrickfortaleza@gmail.com",
              role: "Manager",
              user_name: "Patrick Fortaleza",
            },
          },
        ],
        scientific_name: "Lavandula",
        tags: [
          {
            _id: "607e4qwee59c86677e2af65r7",
            tag_name: "flower",
          },
          {
            _id: "607e4qwee59c86677e2ewe5r7",
            tag_name: "purple",
          },
        ],
        videos: [
          {
            _id: "607e384559c86677e2af65r7",
            caption: "A lavender flower blooming timelapse",
            video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
          },
        ],
      },
    ],
    revision_history: [
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 6:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
      {
        _id: "607e3ab0a0d3df815abfcfb1",
        date: "April 20, 2021 at 2:30am",
        user: {
          _id: "607e3ab0a0d3df815abfcfb1",
          email: "patrickfortaleza@gmail.com",
          role: "Manager",
          user_name: "Patrick Fortaleza",
        },
      },
    ],
    tags: [
      {
        _id: "607e4qwee59c86677e2af65r7",
        tag_name: "gathering place",
      },
      {
        _id: "607e4qwee59c86677e2ewe5r7",
        tag_name: "Burnaby Campus",
      },
    ],
    videos: [
      {
        _id: "607e384559c86677e2af65r7",
        caption:
          "The construction of The Indigenous Initiatives Gathering Place",
        video_url: "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
      },
    ],
    waypoint_name: "The Indigenous Initiatives Gathering Place 3",
  },
];
