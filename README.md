# 1&1 Rancher UI Driver for Custom Docker Machine Drivers

## Installation
To install this component, you will need a working instance of the Rancher Management Server. Instructions to set this up [can be found here](https://docs.rancher.com/rancher/v1.2/en/installing-rancher/installing-server/).

For a quick set up, you can run the Rancher Management Server inside a docker container with the following command:

```
docker run -d --restart=always -p 8080:8080 rancher/server
```

It is always useful to rename a running Docker container.

```
docker rename <container-id> rancher
```

To see the output logs for the running Rancher Management Server container:

```
docker logs -f rancher
```

### Requirements
- A [1&1 API key](https://www.1and1.com/cloud-community/develop/11-cloud-server-api/displaying-the-api-key/) with full access rights. 
- A link to the latest release of the 1&1 docker-machine driver for your platform. These can be [found here](https://github.com/1and1/docker-machine-driver-oneandone/releases) and are available for OSX, Linux and Windows (all 64bit). All you need to do is copy the link location, which should look something like ```https://github.com/1and1/docker-machine-driver-oneandone/releases/download/v1.1.1/docker-machine-driver-oneandone-linux-amd64-v1.1.1.tar.gz```.
- The built component files for this module hosted on a web server accessible by your browser.

### Building and hosting
To build the component files, clone this repository and run the following commands:

```
$ npm install
$ bower install
$ npm run build
```

You will then need to copy the contents of the ```dist/``` directory to your webserver. There should be three files in total as follows:

- component.css
- component.js
- logo.png

**Note:** If your Rancher is configured to use HA or SSL, the server must also be available via HTTPS.

### Installing via the Rancher Management Server UI
- Go to ```Machine Drivers (Admin -> Machine Drivers)```
- Click on the ```Add Machine Driver``` button and a modal drop down will appear.
- Enter the URL for the 1&1 docker-machine driver in the ```Download URL``` field.
- Enter the URL for the UI component driver JS in the ```Custom UI URL``` field. This should look something like ```http://example.com/dist/component.js```.
- Wait for the machine driver to become active.

## Using
- Navigate to the Hosts section ```(Infrastructure -> Hosts)```
- Click on the ```Add Host``` button and a new screen will appear that shows a list of hosting providers along the top.
- Choose 1&1 and a new form will appear underneath the selection.
- You will now be able to customise and create your server that can be managed through the Rancher Management Server.

## Support, discussion and community

Please submit any bugs, issues and feature requests to [1and1/ui-driver-oneandone](https://github.com/1and1/ui-driver-oneandone).