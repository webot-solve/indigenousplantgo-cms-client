import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

/* =================================================
GET STORED TOKEN
==================================================*/
const getToken = () => {
  const userData = JSON.parse(
    localStorage.getItem("INDIGENOUSPLANTGOCMS-userData")
  );

  if (userData && userData.accessToken) return userData.accessToken;
  // Else return nothing
  return null;
};

/* =================================================
PING
==================================================*/
export const ping = async () => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.get(`${BASE_URL}/ping`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

/* =================================================
USERS
==================================================*/
export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      user_name: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const updateUser = async (userData, id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const deleteUser = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const createUser = async (user) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/users`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const bulkDeleteUsers = async (array) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const deleteRequests = array.map((userId) =>
      axios.delete(`${BASE_URL}/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(deleteRequests);
    return responses;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/reset_password`,
      email
    );

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

/* =================================================
LOCATIONS
==================================================*/
export const createLocation = async (location) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/locations`, location, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getLocations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/locations`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const bulkDeleteLocations = async (array) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const deleteRequests = array.map((locationId) =>
      axios.delete(`${BASE_URL}/locations/${locationId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(deleteRequests);
    return responses;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const deleteLocation = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.delete(`${BASE_URL}/locations/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const updateLocation = async (id, location) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.put(`${BASE_URL}/locations/${id}`, location, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.message,
    };
  }
};

/* =================================================
IMAGES
==================================================*/

export const createImage = async (formData) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/images`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const deleteImage = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.delete(`${BASE_URL}/images/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const updateImage = async (image, id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.put(`${BASE_URL}/images/${id}`, image, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const bulkDeleteImages = async (array) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const deleteRequests = array.map((imageId) =>
      axios.delete(`${BASE_URL}/images/${imageId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(deleteRequests);
    return responses;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

/* =================================================
AUDIOS
==================================================*/
export const createAudio = async (formData) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/audios`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getAudios = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/audios`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const deleteAudio = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.delete(`${BASE_URL}/audios/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const updateAudio = async (audio, id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.put(`${BASE_URL}/audios/${id}`, audio, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const bulkDeleteAudios = async (array) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const deleteRequests = array.map((audioId) =>
      axios.delete(`${BASE_URL}/audios/${audioId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(deleteRequests);
    return responses;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

/* =================================================
VIDEOS
==================================================*/
export const createVideo = async (video) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/videos`, video, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const deleteVideo = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.delete(`${BASE_URL}/videos/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const updateVideo = async (video, id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.put(`${BASE_URL}/videos/${id}`, video, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const bulkDeleteVideos = async (array) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const deleteRequests = array.map((videoId) =>
      axios.delete(`${BASE_URL}/videos/${videoId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(deleteRequests);
    return responses;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

/* =================================================
TAGS
==================================================*/

export const createTag = async (tag) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/tags`, tag, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const deleteTag = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.delete(`${BASE_URL}/tags/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const updateTag = async (id, tag) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.put(`${BASE_URL}/tags/${id}`, tag, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getTags = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tags`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const bulkDeleteTags = async (array) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const deleteRequests = array.map((tagId) =>
      axios.delete(`${BASE_URL}/tags/${tagId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(deleteRequests);
    return responses;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

/* =================================================
CATEGORIES
==================================================*/

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getCategoryGroup = async (group) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/group/${group}`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const createCategory = async (category) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/categories`, category, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const deleteCategory = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.delete(`${BASE_URL}/categories/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const bulkDeleteCategory = async (array) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const deleteRequests = array.map((categoryId) =>
      axios.delete(`${BASE_URL}/categories/${categoryId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(deleteRequests);
    return responses;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const updateCategory = async (id, category) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.put(`${BASE_URL}/categories/${id}`, category, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

/* =================================================
PLANTS
==================================================*/

export const getAllPlants = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/plants/all`);

    return response.data;
  } catch (error) {
    console.log(error.reponse);
    return {
      error: error.response,
    };
  }
};

export const getPlant = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/plants/${id}`);

    return response.data;
  } catch (error) {
    console.log(error.reponse);
    return {
      error: error.response,
    };
  }
};

export const updatePlant = async (id, plant) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.put(`${BASE_URL}/plants/${id}`, plant, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.message,
    };
  }
};

export const createPlant = async (plant) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/plants`, plant, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const deletePlant = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.delete(`${BASE_URL}/plants/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const bulkDeletePlants = async (array) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const deleteRequests = array.map((plantId) =>
      axios.delete(`${BASE_URL}/plants/${plantId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(deleteRequests);
    return responses;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

/* =================================================
WAYPOINTS
==================================================*/
export const getAllWaypoints = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/waypoints/all`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const deleteWaypoint = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.delete(`${BASE_URL}/waypoints/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const createWaypoint = async (waypoint) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/waypoints`, waypoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getWaypoint = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/waypoints/${id}`);

    return response.data;
  } catch (error) {
    console.log(error.reponse);
    return {
      error: error.response,
    };
  }
};

export const updateWaypoint = async (id, waypoint) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.put(`${BASE_URL}/waypoints/${id}`, waypoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.message,
    };
  }
};

export const bulkDeleteWaypoints = async (array) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const deleteRequests = array.map((waypointId) =>
      axios.delete(`${BASE_URL}/waypoints/${waypointId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(deleteRequests);
    return responses;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};


/* =================================================
LEARN MORE
==================================================*/

export const getAllLearnMore = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/learn_more`);

    return response.data;
  } catch (error) {
    console.log(error.reponse);
    return {
      error: error.response,
    };
  }
};

export const getLearnMore = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/learn_more/${id}`);

    return response.data;
  } catch (error) {
    console.log(error.reponse);
    return {
      error: error.response,
    };
  }
};

export const deleteLearnMore = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.delete(`${BASE_URL}/learn_more/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const bulkDeleteLearnMore = async (array) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const deleteRequests = array.map((learnMoreId) =>
      axios.delete(`${BASE_URL}/learn_more/${learnMoreId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(deleteRequests);
    return responses;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const createLearnMore = async (learnMore) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/learn_more`, learnMore, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const updateLearnMore = async (id, learnMore) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.put(`${BASE_URL}/learn_more/${id}`, learnMore, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.message,
    };
  }
};


/* =================================================
TOURS 
==================================================*/

export const getAllTours = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tours`);

    return response.data;
  } catch (error) {
    console.log(error.reponse);
    return {
      error: error.response,
    };
  }
};