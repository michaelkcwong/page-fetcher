//Implement a small command line node app called fetcher.js which should take a URL as a command-line argument as well as a local file path and download the resource to the specified path.
// Function that inputs a URL and file path as command line arguements and downloads the body of the URL to the file.

const request = require('request');
const argv = process.argv.slice(2); //slice starting at 2 discards argv[0] pth to node and argv[1] path to script code
const fs = require('fs');

request(argv[0], (error, response, body) => {

  if (error) {
    console.log("URL is invalid " + error); //URL is invalid
    process.exit();
  }

  if (response.statusCode !== 200) { //Status code is anything but 200
    console.log("HTTP Status Code Error " + response.statusCode);
    process.exit();
  }

  fs.appendFile(argv[1], body, error => { //append data to a file. If the file does not exist, its created
    if (error) {
      console.log("Error appending file: ", error);
      process.exit();
    } else {
      console.log("Downloaded and saved " + body.length + " bytes to " + argv[1]);
      process.exit();
    }
  });
});