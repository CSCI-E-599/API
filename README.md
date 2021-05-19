# PharmaDB Web Application API

## About
The PharmaDB Web Application API is responsible for all the interfacing between the PharmaDB Angular Web App, the PharmaDB ETL pipeline and various other outside APIs. It can be used with the ETL pipeline as a standalone API or in combination with the Angular web application for more humand readable data visualzations. The API serves two main functions. It provides endpoints for searching for an FDA approved drug as well as getting in depth metadata about that drug. It also provides an endpoint for fetching all of the drug labels related to a drug, the differences between those drug labels and patent claims that appear to be related to the differences in drug labels.

## Getting Started

### Requirements
- Internet connection for access to other APIs from the FDA, DailyMed and others
- [NodeJS Runtime](https://nodejs.org/en/download/)
- [NPM package manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Starting the API
#### 1. Pull the repository
The PharmaDB API repository can be pulled using the below command.

```git clone https://github.com/pharmaDB/pharmadb_api```

#### 2. Run NPM install
Install all the required NPM packages using the below commands, first you must CD into the project directory.

```cd pharmadb_api```

```npm install```

#### 3. Add you MongoDB Connection string
The API requires a MongoDB data source for the patents, labels and label scores. This is provided by the [PharmaDB ETL pipeline](https://github.com/pharmaDB/etl_pipeline)
which when run will populate a MongoDB database which then will provide the data this API requires. To configure this, simply
replace the MONGOADDRESS param in `.env` with the connection string of your MongoDB database that was populated with your running instance of the [ETL pipeline](https://github.com/pharmaDB/etl_pipeline).

#### 4. Start the Webpack build server
In order to transpile typescript to javascript, you must run the below command and keep it running while running the API in another terminal window.

```npm run webpack```

#### 5. Start the API server

To start the web server, run the below command...

```npm run start```

You should then see the following text returned, which will tell you what port ther server is listening on...

```{"message":"Listening on port 3000","level":"info"}```

#### Testing and Validating Functionality

To test the API, you can call the API endpoints in the next section using CURL or Postman. Listed below are the example endpoints targeted to a local  API instance...

> localhost:3000/drugs?searchQuery=lipitor&searchType=brand_name

> localhost:3000/drugs/NDA020702?splHistory=false&images=false&currentSplLabel=false

## API Endpoints

### Search for a Drug

**Endpoint**

> **{your host}**/drugs?searchQuery=**{searchQuery}**&searchType=**{searchType}**

**Query Parameters**
* **searchQuery:** A string that
* **searchType:** A string that determines what param will be searched on (brand_name, application_number, active_ingredients, manufacturer_name)

**Example Request**
> https://api.pharmadb.org/drugs?searchQuery=lipitor&searchType=brand_name

**Example Response**
> [{"application_number":"NDA020702","openfda":{"application_number":["NDA020702"],"brand_name":["LIPITOR","ATORVASTATIN CALCIUM"],"generic_name":["ATORVASTATIN CALCIUM"],"manufacturer_name":["Parke-Davis Div of Pfizer Inc","Greenstone LLC"],"product_ndc":["0071-0155","0071-0156","0071-0157","0071-0158","59762-0155","59762-0156","59762-0157","59762-0158"],"product_type":["HUMAN PRESCRIPTION DRUG"],"route":["ORAL"],"substance_name":["ATORVASTATIN CALCIUM TRIHYDRATE"],"rxcui":["259255","262095","617310","617311","617312","617314","617318","617320"],"spl_id":["0ba214c6-250e-42a0-aea8-5e44aba04882","77ffa111-a87b-4108-ba93-7fe639456515"],"spl_set_id":["c6e131fe-e7df-4876-83f7-9156fc4e8228","59b924d0-e27f-4567-a0c4-467f9a61df3e"],"package_ndc":["0071-0155-23","0071-0155-40","0071-0155-10","0071-0155-97","0071-0156-23","0071-0156-40","0071-0156-10","0071-0156-96","0071-0157-23","0071-0157-73","0071-0157-40","0071-0157-97","0071-0158-23","0071-0158-73","0071-0158-92","59762-0155-1","59762-0155-2","59762-0156-1","59762-0156-2","59762-0157-1","59762-0157-2","59762-0158-1","59762-0158-2"],"unii":["48A5M73Z4Q"]},"products":[{"product_number":"004","reference_drug":"Yes","brand_name":"LIPITOR","active_ingredients":[{"name":"ATORVASTATIN CALCIUM","strength":"EQ 80MG BASE"}],"reference_standard":"Yes","dosage_form":"TABLET","route":"ORAL","marketing_status":"Prescription","te_code":"AB"},{"product_number":"002","reference_drug":"Yes","brand_name":"LIPITOR","active_ingredients":[{"name":"ATORVASTATIN CALCIUM","strength":"EQ 20MG BASE"}],"reference_standard":"No","dosage_form":"TABLET","route":"ORAL","marketing_status":"Prescription","te_code":"AB"},{"product_number":"003","reference_drug":"Yes","brand_name":"LIPITOR","active_ingredients":[{"name":"ATORVASTATIN CALCIUM","strength":"EQ 40MG BASE"}],"reference_standard":"No","dosage_form":"TABLET","route":"ORAL","marketing_status":"Prescription","te_code":"AB"},{"product_number":"001","reference_drug":"Yes","brand_name":"LIPITOR","active_ingredients":[{"name":"ATORVASTATIN CALCIUM","strength":"EQ 10MG BASE"}],"reference_standard":"No","dosage_form":"TABLET","route":"ORAL","marketing_status":"Prescription","te_code":"AB"}]}]

### Fetch Drug by NDA Number

**Endpoint**
> **{your host}**/drugs/**{NDA Number}**?splHistory=**{boolean}**&images=**{boolean}**&currentSplLabel=**{boolean}**&labels=**{boolean}**&patents=**{boolean}**

**URL Parameters**
* **NDA Number:** A string

**Query Parameters**
* **splHistory:** A Boolean that determines whether SPL history metadata will be returned
* **images:** A Boolean that determines whether Drug image URLs will be returned
* **currentSplLabel:** A Boolean that determines whether the current SPL Label will be returned
* **labels:** A Boolean that determines whether historical labels will be returned
* **patent:** A Boolean that determines whether drug patent data will be returned

**Example Request**
> https://api.pharmadb.org/drugs/NDA020702?splHistory=false&images=false&currentSplLabel=false

**Example Response**
> {"applicationNumber":"NDA020702","metadata":{"applicationNumber":"NDA020702","brandNames":["LIPITOR","ATORVASTATIN CALCIUM"],"genericName":"ATORVASTATIN CALCIUM","manufacturerName":"Parke-Davis Div of Pfizer Inc","productNdc":["0071-0155","0071-0156","0071-0157","0071-0158","59762-0155","59762-0156","59762-0157","59762-0158"],"productType":"HUMAN PRESCRIPTION DRUG","substanceName":["ATORVASTATIN CALCIUM TRIHYDRATE"],"splId":"0ba214c6-250e-42a0-aea8-5e44aba04882","splSetId":["c6e131fe-e7df-4876-83f7-9156fc4e8228","59b924d0-e27f-4567-a0c4-467f9a61df3e"],"packageNdc":["0071-0155-23","0071-0155-40","0071-0155-10","0071-0155-97","0071-0156-23","0071-0156-40","0071-0156-10","0071-0156-96","0071-0157-23","0071-0157-73","0071-0157-40","0071-0157-97","0071-0158-23","0071-0158-73","0071-0158-92","59762-0155-1","59762-0155-2","59762-0156-1","59762-0156-2","59762-0157-1","59762-0157-2","59762-0158-1","59762-0158-2"]}}
