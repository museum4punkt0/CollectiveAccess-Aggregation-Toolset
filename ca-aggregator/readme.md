# CollectiveAccess Data Aggregator

### Table of Contents  
- [Description](#Description)  
- [Resources](#Resources)
- [Installation](#Installation)
- [Usage](#Usage)
- [Credits](#Credits) 
- [Licensing](#Licensing) 

## Description

This module was developed for the collection database of [German Emigration Center](https://dah-bremerhaven.de/english/), Bremerhaven, Germany in the context of the [museum4punkt0 initiative](https://www.museum4punkt0.de/en/). It provides a lightweight middleware that aggregates and processes data from a CollectiveAccess REST API and stores it in a MongoDB NoSQL database. Aggregation is meant to be done independendly from data usage by a frontend or public API, so e.g. by triggering a URL or priodically via a cronjob. The goal is to reduce the size and complexitity of the data to the extend that is necessary for specific usages in decoupled systems. The module can also be used to store all relevant data in a largly software-agnosic format, in order to minimize the lock-in effect associated with choosing a Database Management System.

The CollectiveAccess Data Aggregator runs a NodeJS Express Server with Axios to query the CollectiveAccess REST API and Mongoose to store data to Mongo DB.

## Funding

This CollectiveAccess Data Aggregator is part of the project museum4punkt0 - Digital Strategies for the Museum of the Future, sub-project Experience the History of Migration Digitally. The project museum4punkt0 is funded by the Federal Government Commissioner for Culture and the Media in accordance with a resolution issued by the German Bundestag (Parliament of the Federal Republic of Germany). Further information: [www.museum4punkt0.de/en/](www.museum4punkt0.de/en/)

## Resources

For the main software components used see:

* [Express Server documentation](https://github.com/expressjs/express)
* [Axios documentation](https://github.com/axios/axios)
* [Mongoose documentation](https://github.com/Automattic/mongoose)

CollectiveAccess' REST API is documented in the [Web Service section](https://docs.collectiveaccess.org/wiki/Web_Service_API) of the CollectiveAccess [documentation Wiki](https://docs.collectiveaccess.org/wiki/Main_Page).

## Installation

The JavaScript runtime [Node.js](https://nodejs.org/en/) >= version 10.x must be installed to run the express server.

Download or clone this repository, then run

```bash
$ npm install
```
in order to install dependencies.

To run a local development server with [nodemon](https://github.com/remy/nodemon) on localhost:3000 run

```bash
$ npm run start
```

## Usage

Configure the middleware according to your needs:

### Environment Variables

Create a .env file and provide your MongoDB connection, service url and user credetials. You can use the template in _env, replace the parts in <> and save as .env.

### Collectors

Rename src/collectors/dah.js with a name that corresponds to your project; rename the function collectDah accordingly. Adapt the fetch functionality according to your data models and the output your REST API creates.

### Models

Rename src/models/dah.js with a name that corresponds to your project; rename and adapt the exported schema according to your data model.

### App.js

Make sure that import, middelware calls and endpoint urls correspond to the naming in Collectors and Models.

## Credits

Contracting entity: Deutsches Auswandererhaus Bremerhaven

Programming: Culture to go GbR

## Licensing

[MIT license](/mit-licence.txt)

© 2020 Deutsches Auswandererhaus Bremerhaven, programming by Culture to go GbR.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The portions of the project that were developed by Culture to go GbR as part of the project are provided under the MIT license.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
