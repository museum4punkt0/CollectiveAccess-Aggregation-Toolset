# CollectiveAccess Aggregation Toolset

## Description

The toolset was developed for the collection database of [German Emigration Center](https://dah-bremerhaven.de/english/), Bremerhaven, Germany in the context of the [museum4punkt0 initiative](https://www.museum4punkt0.de/en/). It allows to fetch data from a CollectiveAccess database, cache it in MongoDB and make it available via a GraphQL API.

## Components

The toolset consists of an express.js based [CollectiveAccess Data Aggregator](https://github.com/museum4punkt0/CollectiveAccess-Aggregation-Toolset/tree/main/ca-aggregator) and an express.js based [GraphQL API](https://github.com/museum4punkt0/CollectiveAccess-Aggregation-Toolset/tree/main/ca-monogdb-api) with MongoDB Atlas as database.

## Usage Scenarios

The purpose of the toolset is to preprocess data from the native CollectiveAccess API and decouple data aggregation from end user interaction. Item relations can be denormalized and all relevant data embedded in a single document. With GraphQL it is possible to easily execute very specific requests and to avoid underfetching (subsequent requests necessary) or overfetching (to much ballast of unnecessary data). Using the toolset as as mid layer makes it more convenient to use CollectiveAccess as a headless collection documentation system.
