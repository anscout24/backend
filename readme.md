## CONTENT
1. How to build and run
2. Description how app works
3. Assumptions and design decisions
4. Known constraints and/or limits
5. Possible improvements
6. Considaration of work that would be needed to productionize your code


## 1. How to build and run

To run the backend-scout24 you have the following
options:
- Docker-Compose (pulls both images from docker hub and starts)
- Docker Container (need to start frontend and backend)
- npm start (need to start frontend and backend)

Before starting with next steps first extract the provided zip file
or use the Docker-Compose file (get in email).

### Docker-Compose

Use the docker-compose file provided in email and execute the following command:
### ` docker-compose -up -d`
As you can see in the docker-compose file, the port on which you can access
the API is 3050. 
Swagger ist on http://localhost:3050/api/v1/doc 

- "3050:3050" 

### Docker Container

In the project directory (!), you execute the following 2 commands:
### 1 ` docker build -t backend-scout24 .`
If you are not in the directory use option -f with file path. Like:
docker build -f  <Dockerfile Path and Name> -t backend-scout24
Do not forget "." at the end.

### 2` docker run -it -p 3050:3050 --rm  backend-scout24:latest`
Now you should start the frontend. 


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3050/api/v1/doc](http://localhost:3000/api/v1/doc) to view the App in the browser.


## 2. Description how app works (Front && Backend)

(1) On Starting Backend (Nodejs - JS ) the targetlist.csv will be imported and stored in the in-memory db.
The import runs directly with the start to make sure the targetlist items are stored
when the frontend request for them.

(2) The geodata (long/lat) are requested from google. To ensure that the requests to google
are only made to the extent necessary, they are carried out in the backend and stored in the in-memory DB.

(3) Frontend has no logic or data other than that provided by the backend.

(4) For clarity and reduction of redundancies Redux is used in the frontend.

(5) For the visualization of the geodata google map is used.


## 3. Assumptions and design decisions (BACKEND)
In the following only the essential program parts are explained

###In-Memory DB: lokijs:
The external library is currently being maintained, the error messages
(over 650) have already been processed (status: closed).
Furthermore, the number of weekly downloads is over 190 thousand.
Beside it was very MongoDB like. 


### Map Utils: node-geocoder
(Ref: Point 2 (2))
For the use case, node-geocoder is sufficient for me. For productive use, 
a custom development to connect to google would certainly make sense.

## 4. Known constraints and/or limits
Error handling might not be sufficient for all error possibilities.

##5. Possible improvements
To improve the core functionalities, the expansion of error
handling and test procedures is useful.

##6. Considaration of work that would be needed to productionize your code
After extending the error handling and test procedures already mentioned,
especially in the context of a CI process, the next step would be to
evaluate the scaling of the application. The first steps have been taken
for the productive and scalable use of the application.
The application can be run as a Docker container.