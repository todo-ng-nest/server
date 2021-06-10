FROM node:14 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]


#### Considering that we are in the current directory

### Build image
## docker build -f Dockerfile -t todo.api .
# -t: the target is the name of the image,
# we will refere it when run it the container

### Run container 
## docker run -d -p 3000:3000 --name todo.api todo.api
# -d: detachable mode
# -p: port mapping
# --name: the name of the container
# at last i specified the image name to run the container


############## Breakdown

######### The build process is divided into two steps (multi-step build);

#### The First step uses node:14 as base image, installs dependencies and transpiles Typescript files to Javascript. Full node image is used for this process since it contains all the necessarity build tools required for dependencies with native build (node-gyp, python, gcc, g++, make)
#### The Second step uses node:10-alpine (lightweight version), copies file-system from the first step's (intermediate) container, sets command for running the application. A multi step build process was setup to efficiently install our dependencies at first step and to run a lightweight container from image the of our final step.

######### In First step;

##### We will set our application directory to "/app", so our application is bundled into "/app" in our docker image file-system
##### We will COPY our "package.json" then run "npm install" before we copy the remaining project files because that will prevent unnecessary installs anytime we re-build our image and make use of cached installs.
##### We will run "npm run build" to generate production files at "dist/main" directory which is required by our "run" command in production context i.e (npm run start:prod)

########## In Final step;

##### We will set our application directory to "/app", so our application is bundled into "/app" in our docker image file-system
##### We will copy the file-system of the previous step.
##### We will set command for running our application