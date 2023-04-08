# ser516-spring23-trinity-sbs

Scrum Board Simulator is a web-based application to simulate scrum process, and has the capability to run with or without user intervention

## Local Development

### Setup

- Install Maven 3.9.x
- Install Java 19 (we are using Eclipse Temurin for releases)
- Install Node 18.15.0+
- Install Docker

The modules have been designed in such a way that you would ideally be working on one particular module. The build process also supports live-reload of UI related files, so you need not to build it again and again.

To build a module, you need to navigate to the module directory and run the docker compose command.

```
cd sbs-driver
docker compose -f docker-compose.dev.yaml build
```
Or below to avoid caching related issues with layers
```
docker compose -f docker-compose.dev.yaml build --no-cache
```

For developers who don't want to use Docker, they have to navigate to ui and api folder of the module and build each sub-module individually.
```
# For UI
cd sbs-driver/ui
npm install
npm build

# For API
cd sbs-driver/api
mvn clean package
```

### Test
```
# For API
cd sbs-driver/api
mvn clean test

# For UI
cd sbs-driver/ui
npm install
ng test
```

### Run

To run a module, you need to navigate to the module directory and run the docker compose command.

By default, the ui module would be running on port 4200, and the api module would be running on port 8080.

If you are working on multiple modules at a time, you need to edit the port related configuration in each module.
```
# If you have already built the images, it will run them, else it will build them and run.
cd sbs-driver
docker compose -f docker-compose.dev.yaml up

# Or below to force build images first, before starting containers
docker compose -f docker-compose.dev.yaml up --build
```

For developers who don't want to use Docker, they have to navigate to ui and api folder of the module and launch each sub-module individually.
```
# For UI
cd sbs-driver/ui
ng serve

# For API
cd sbs-driver/api
java -jar target/<fat_jar_name>-with-dependencies.jar
```
The *-api modules can also be launched from the IDE

## One command to run them all

To launch up everything instead of any particular module, go to the root of the project and run below Docker command
```
docker compose up --build
```
The below images are created and the container for each module starts. The application is accessible at http://localhost/
```
sbs-driver-ui
sbs-driver-api
sbs-metrics-ui
sbs-metrics-api
sbs-project-management-ui
sbs-project-management-api
```

## Release

Run the below command at the root of the project
```
docker compose build --no-cache
```
This will generate below images which can be exported using [docker save](https://docs.docker.com/engine/reference/commandline/save/) and imported on other system using [docker load](https://docs.docker.com/engine/reference/commandline/load/)
```
sbs-driver-ui
sbs-driver-api
sbs-metrics-ui
sbs-metrics-api
sbs-project-management-ui
sbs-project-management-api
```

## CI/CD

### How the setup was done?

We have used Github Actions to create automated CI/CD pipeline.

Currently, it builds the module (based on whether it was changed or not), run the static code analyzer, run the unit tests, and publish the status of the checks on the PR.

### How to trigger the pipeline?

The workflow is triggered whenever a commit is done on main branch, and when a PR is opened/synchronized from feature to main.

> It is recommended for a dev to open a draft PR Links to an external site. early in the development, and commit in small batches. This will ensure that the pipeline gives the feedback early.

## Contact Us

[Send us an email](mailto:project2trinity-aaaajdirx5t4bst4x7bymlnlv4@asu.org.slack.com)
