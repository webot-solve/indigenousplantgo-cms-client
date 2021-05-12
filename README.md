# Indigenous Plant Go
Indigenous Plant Go is a mobile application that allows BCIT Students to explore the BCIT Burnaby campus and discover plants, and points-of-interests that have significance in the indigenous culture.

**Table Of Contents**
1. [Core Application Features](#core-application-features)
2. [Application Features](#application-features)
3. [Road-mapped Features](#road-mapped-features)
4. [Technology Stack](#technology-stack)
5. [Wireframes](#wireframes)
6. [Installation Documents](#installation)

### Content Management System (Client)
This specific repository houses the client-side user interface of the mobile application's content management system (cms).

#### Core Application Features
* User authentication
* Users can create, read, update, delete resources:
    * Plants
    * Waypoints
    * Locations
    * Media (Images, Video, Audio)
    * Categories + Tags
* CMS Exposes a Restful API for the Mobile application to consume

#### Application Features
* Users can create, read, update, delete resources using a visual, tabular dashboard.
* The tabular dashboard can be filtered, and searched.
* Users can bulk-delete any resource
* All DESTRUCTIVE requests will prompt the user for confirmation.
* Users can upload images and audio files directly from the CMS.
* A user can create other users.

#### Road-mapped Features
* Interface is mobile-responsive
* Allow input for a QR code data for a plant and/or waypoint
* Implement (2) more resource types: "tours", and "learn more"
* Enhanced media previews allow the user to see the exact image/video/audio before upload.

### Technology Stack
* Client: ReactJS, axios
* Deployment: Netlify

### Wireframes
#### Home

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/DASHBOARDHOME.png)

#### Plant Content Type

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS1.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS2.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS3.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS4.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS5.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS6.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS7.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS8.png)

#### Waypoint Content Type

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/WAYPOINTS1.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/WAYPOINTS2.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/WAYPOINTS3.png)

#### Learn More Content Type

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/LEARNMORE1.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/LEARNMORE2.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/LEARNMORE3.png)

#### Users

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/USERS1.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/USERS2.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/USERS3.png)

#### Profile

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PROFILE.png)

#### Tags

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/TAGS.png)

#### Locations

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/LOCATIONS.png)

#### Media Uploads

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/MEDIA1.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/MEDIA2.png)

### Installation
#### Local Installment
1. Clone the repo with the following code:
```
git clone https://github.com/BCITConstruction/indigenousplantgo-cms-client.git
```
And navigate into the folder:
```
cd indigenousplantgo-cms-client
```
2. Install all the node module with `npm install`.
3. Add a .env file with the base url of your server-side code.
  - If you run the server-side locally, the link will be `http://localhost:8080/api`.
  - If you run the server-side on heroku, the link will be where the the url provided by heroku followed by /api.
```
REACT_APP_BASE_URL="<Your link>/api"
```
4. Running `npm start` now should run it at `http://localhost:3000`.
