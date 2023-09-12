# Covid Case Checker

---

A NodeJS/Express API that checks covid cases based on different scales.

Using async/await functions for API endpoints and sqlite3 as log database.

This was developed for Team-33 final project for UNC COMP 426 Fall 2022



# Data Source

---

Data source for this project is from disease.node.js wrapper developed by the disease.sh.

Disease.sh Documentation: [Documentation](https://disease.sh/docs/#/COVID-19%3A%20Worldometers/get_v3_covid_19_all)

Disease.sh NodeJS Wrapper Documentation: [Documentation](https://www.npmjs.com/package/novelcovid/v/3.0.2)

Disease.sh Github Project: [Project](https://github.com/disease-sh/API)

# Project Planner

-----

This section shows how this project is decided, and how the project is implemented by different steps throughout the week.

## Project Structure

the structure image (by code-block) of this project

```
.
|- lib
    |- covid-api.js
    |- sql-operations.js
|
|- docs
    |- documentation.md
    |- docuementation-webpage.html
|
|- db
    |- logs.db
|
.gitignore
LICENSE
package.json
package-lock.json
README.md
server.js
```

- server.js: server file

- lib folder: all exportable functions for server to use.

- docs folder: documentation folder. One for markdown file, another one for html webpage with css and table of contents.

- db folder: folder for databases.

## Project Roles

- Back end lead: Suihan Gao (TimG233)

- Database lead: Suihan Gao (TimG233)

- Design/structure lead: Suihan Gao (TimG233)

## Planning Timetable

Timetable of important timepoint of the development of this project.

| Time         | Development                                                                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `12/08/2022` | **Group decision:** Record demonstration video. <br> **TimG233:** Cleanup useless comment and code \| Updated documentation <br> **Lukeschmidt:** Trim the demonstration video                        |
| `12/07/2022` | **TimG233:** Remove mongodb and changed to sqlite3 \| Added logging to database \| Added log related endpoints                                                                                        |
| `12/06/2022` | **Group decision:** talk about project and decide when to record demonstration video. <br>**TimG233:** remove unused packages \| Added mongodb setup \| change server.js endpoint functions to async. |
| `12/03/2022` | **TimG233:** Added documentation folder and files \| Added error handling in server.js \| remove duplicate codes.                                                                                     |
| `12/02/2022` | **TimG233:** Setup backend server \| setting up the server to connect to a workable covid api. (server and lib folder structure)                                                                      |
| `12/01/2022` | **Group decision:** Decide to do a project linked with covid case. <br> **TimG233:** Update Readme.md for project walkthrough. Starting fork and pull request.                                        |

# Installation

---

- Git clone this project to your ubuntu environment:
  
  ```shell
  $ git clone git@github.com:comp426-2022-fall/a99-Team-33.git
  ```

- If you do not have node.js and npm installed, please install node.js and npm first:
  
  ```shell
  $ sudo apt update
  $ sudo apt install nodejs
  $ node -v
  $ sudo apt install npm
  ```

- **Using NPM to install dependencies**:
  
  ```shell
  $ npm install novelcovid
  $ npm install minimist
  $ npm install express
  $ npm install better-sqlite3 
  ```

# API Documentation

---

## Endpoints

---

In this parts of documentation, all the endpoints of the server will be explained. The response body shows which **API path** you need to use. If you want to test it in terminal, you need more information to do this. Check out "[tests](#tests)" section for more testing examples.

In the explanations below, `${PORT}` means the port that the server runs.

For all endpoints except `/app/` and `/app/logs/`, the server supports `--j` for stringify JSON result. If no `--j` provided, the result will be a nice and user-friendly formatted result by the server. To see the expected stringify JSON result, check out [JSON Result](#json-result)

### /app/

It responds "200 OK".

#### Response body

```shell
curl -s http://localhost:${PORT}/app/
```

#### Expected Output

```shell
200 OK
```

### /app/global/

It responds all global data for covid.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/global/
```

#### Expected Output (Example)

```
            **Covid Global Data Result**
            Request Time: Sat, 03 Dec 2022 03:16:48 GMT
            API Last Updated: 9 minutes, 42 seconds ago
            Total Cases: 649273133
            Today Cases: 60979
            Total Deaths: 6644705
            Today Deaths: 69
            Total Recovered: 626730709
            Today Recovered: 106687
            Total Affected Countries: 230
```

### /app/global/yesterday/

It responds all <u>yesterday</u> global data for covid.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/global/yesterday
```

#### Expected Output (Example)

```
            **Covid Global Data Result Yesterday**
            Request Time: Sat, 03 Dec 2022 03:19:20 GMT
            API Last Updated: 12 minutes, 12 seconds ago
            Total Cases: 649212154
            Yesterday Cases: 416326
            Total Deaths: 6644636
            Yesterday Deaths: 1003
            Total Recovered: 626624022
            Yesterday Recovered: 215417
            Total Affected Countries: 230
```

### /app/country/

It responds all current covid data for a specified country.

**Required**: Use `--c <country>` to specify a country

#### Response body

```shell
curl -s http://localhost:${PORT}/app/country/
```

#### Expected Output (Example)

```
                    **Covid Data Result of United States**
                    Request Time: Sat, 03 Dec 2022 03:22:19 GMT
                    API Last Updated: 2 minutes, 26 seconds ago
                    Population: 334805269
                    Total Cases: 100787779
                    Today Cases: 0
                    Total Deaths: 1106607
                    Today Deaths: 0
                    Total Recovered: 98236954
                    Today Recovered: 0
```

### /app/country/yesterday/

It responds all <u>yesterday</u> covid data for a specifed country.

**Required**: Use `--c <country>` to specify a country.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/country/yesterday
```

#### Expected Output (Example)

```
                    **Covid Data Result Yesterday of United Kingdom**
                    Request Time: Sat, 03 Dec 2022 03:24:25 GMT
                    API Last Updated: 4 minutes, 33 seconds ago
                    Population: 68497907
                    Total Cases: 24000101
                    Yesterday Cases: 0
                    Total Deaths: 196821
                    Yesterday Deaths: 0
                    Total Recovered: 23747479
                    Yesterday Recovered: 2624              
```

### /app/state/

It responds the covid data for specified state in United States.

**Required**: Use `--s <state>` to specify a state.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/state/
```

#### Expected Output (Example)

```
                    **Covid Data Result of North Carolina in United States**
                    Request Time: Sat, 03 Dec 2022 03:27:01 GMT
                    API Last Updated: 7 minutes, 12 seconds ago
                    State Population: 10488084
                    Total Cases: 3275343
                    Today Cases: 0
                    Total Deaths: 27371
                    Today Deaths: 0
                    Total Recovered: 0
```

### /app/state/yesterday/

It responds all the <u>yesterday</u> covid data for specified state in United States.

**Required**: Use `--s <state>` to specify a state.

#### Response body

```shell
curl -s http://localhost:5000/app/state/yesterday/
```

#### Expected Output (Example)

```
                    **Covid Data Result Yesterday of California in United States**
                    Request Time: Sat, 03 Dec 2022 03:29:55 GMT
                    API Last Updated: 5 seconds ago
                    State Population: 39512223
                    Total Cases: 11483568
                    Yesterday Cases: 4819
                    Total Deaths: 97515
                    Yesterday Deaths: 14
                    Total Recovered: 0                 
```

### /app/global/historical/

It responds the historical global data for covid.

**Optional**: Use `--d <day>` to specify number of days of historical data. The maximum days for this endpoint is `90` days.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/global/historical/
```

#### Expected Output (Example)

```
**Historical Covid Data (7 days)**
Request Time: Sat, 03 Dec 2022 03:36:15 GMT
{
    "cases": {
        "11/25/22": 641067526,
        "11/26/22": 641337568,
        "11/27/22": 641599490,
        "11/28/22": 642024485,
        "11/29/22": 642749423,
        "11/30/22": 643274699,
        "12/1/22": 644001063
    },
    "deaths": {
        "11/25/22": 6629862,
        "11/26/22": 6630316,
        "11/27/22": 6630837,
        "11/28/22": 6631992,
        "11/29/22": 6633444,
        "11/30/22": 6635022,
        "12/1/22": 6637750
    },
    "recovered": {
        "11/25/22": 0,
        "11/26/22": 0,
        "11/27/22": 0,
        "11/28/22": 0,
        "11/29/22": 0,
        "11/30/22": 0,
        "12/1/22": 0
    }
}
```

### /app/country/historical/

It responds the historical covid data for a specified country.

**Required**: Use `--c <country>` to specify a country.

**Optional**: Use `--d <day>` to specify number of days of historical data. The maximum days for this endpoint is `90` days.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/country/historical/
```

#### Expected Output (Example)

```
**Historical Covid Data of France (7 days)**
Request Time: Sat, 03 Dec 2022 03:45:54 GMT
{
    "country": "France",
    "province": [
        "french guiana",
        "french polynesia",
        "guadeloupe",
        "martinique",
        "mayotte",
        "new caledonia",
        "reunion",
        "saint barthelemy",
        "saint pierre and miquelon",
        "st martin",
        "wallis and futuna",
        "mainland"
    ],
    "timeline": {
        "cases": {
            "11/25/22": 37789817,
            "11/26/22": 37789817,
            "11/27/22": 37789817,
            "11/28/22": 37885199,
            "11/29/22": 37979248,
            "11/30/22": 38046448,
            "12/1/22": 38115885
        },
        "deaths": {
            "11/25/22": 159679,
            "11/26/22": 159679,
            "11/27/22": 159679,
            "11/28/22": 159811,
            "11/29/22": 159915,
            "11/30/22": 159990,
            "12/1/22": 160066
        },
        "recovered": {
            "11/25/22": 0,
            "11/26/22": 0,
            "11/27/22": 0,
            "11/28/22": 0,
            "11/29/22": 0,
            "11/30/22": 0,
            "12/1/22": 0
        }
    }
}
```

### /app/logs/

It responds the latest 10 logs in the log table from the database.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/logs/
```

#### Expected Output (Example)

```
[
    {
        "id": 12,
        "time": "Thu, 08 Dec 2022 05:11:55 GMT",
        "status": "success",
        "endpoint": "/app/global/",
        "detail": "json flag"
    },
    {
        "id": 11,
        "time": "Thu, 08 Dec 2022 05:11:44 GMT",
        "status": "success",
        "endpoint": "/app/global/",
        "detail": "no json flag"
    },
    {
        "id": 10,
        "time": "Thu, 08 Dec 2022 05:11:33 GMT",
        "status": "success",
        "endpoint": "/app/global/",
        "detail": "no json flag"
    },
    {
        "id": 9,
        "time": "Thu, 08 Dec 2022 05:10:28 GMT",
        "status": "success",
        "endpoint": "/app/global/",
        "detail": "no json flag"
    },
    {
        "id": 8,
        "time": "Thu, 08 Dec 2022 05:10:14 GMT",
        "status": "success",
        "endpoint": "/app/global/",
        "detail": "json flag"
    },
    {
        "id": 7,
        "time": "Thu, 08 Dec 2022 05:10:03 GMT",
        "status": "success",
        "endpoint": "/app/country/",
        "detail": "json flag"
    },
    {
        "id": 6,
        "time": "Thu, 08 Dec 2022 05:09:49 GMT",
        "status": "success",
        "endpoint": "/app/global/",
        "detail": "json flag"
    },
    {
        "id": 5,
        "time": "Thu, 08 Dec 2022 04:31:17 GMT",
        "status": "success",
        "endpoint": "/app/logs/",
        "detail": "dafault as json style"
    },
    {
        "id": 4,
        "time": "Thu, 08 Dec 2022 04:31:07 GMT",
        "status": "failure",
        "endpoint": "/app/logs/clear/",
        "detail": "500 Internal server: error when truncating logs from log database."
    },
    {
        "id": 3,
        "time": "Thu, 08 Dec 2022 04:30:59 GMT",
        "status": "success",
        "endpoint": "/app/logs/",
        "detail": "dafault as json style"
    }
]
```

### /app/logs/clear/

It responds whether it successfully truncate/clear the table.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/logs/clear/
```

### Expected Output

```
Successfully truncated the log table in the database.
```

## Tests

-----

In this part of documentation, tests in the terminal will be shown. In order to start checking covid cases by API, you need to start the server also in your argument.

#### An example of terminal by calling `/app/country/historical` API endpoints

```shell
$ PORT="$(shuf -i 2000-65535 -n 1)"; (timeout --signal=SIGINT 5 node server.js --port=$PORT --d 7 --c "France" --j; exit 0) & sleep 1s && curl -s http://localhost:${PORT}/app/country/historical && sleep 5s
```

Specify a port:

```shell
# specify port 6666 for API server listening port
$ PORT="6666"
```

Get a random port in a given range:

```shell
# port range 2000 - 65535
$ PORT="$(shuf -i 2000-65535 -n 1)"
```

Adding flags. Current support of flags are:

- country/region flag: `--c <country>`

- days: `--d <day>`

- state: `--s <state>`

- Stringify Json result (All existing API endpoints except `/app/` supports this): `--j`

```shell
# flags should be added in this part of argument
(timeout --signal=SIGINT 5 node server.js --port=$PORT --d 7 --c "France" --j; exit 0)
```

Specify endpoint to use:

```shell
# modify the endpoint to get different COVID data
curl -s http://localhost:${PORT}/app/country/historical
```

Sleep time after returning the result:

```shell
# sleep for 5 seconds after finishing the result
sleep 5s
```

### JSON Result

If a `--j` flag is given in the shell terminal input, the result will be a stringified JSON.

#### Success

On success, an example JSON like this would be returned (Example of "United States" yesterday covid data):

```
{
    "updated": 1670056733321,
    "country": "USA",
    "countryInfo": {
        "_id": 840,
        "iso2": "US",
        "iso3": "USA",
        "lat": 38,
        "long": -97,
        "flag": "https://disease.sh/assets/img/flags/us.png"
    },
    "cases": 100787779,
    "todayCases": 0,
    "deaths": 1106607,
    "todayDeaths": 0,
    "recovered": 98236954,
    "todayRecovered": 0,
    "active": 1444218,
    "critical": 3495,
    "casesPerOneMillion": 301034,
    "deathsPerOneMillion": 3305,
    "tests": 1141488941,
    "testsPerOneMillion": 3409412,
    "population": 334805269,
    "continent": "North America",
    "oneCasePerPeople": 3,
    "oneDeathPerPeople": 303,
    "oneTestPerPeople": 0,
    "activePerOneMillion": 4313.61,
    "recoveredPerOneMillion": 293415.2,
    "criticalPerOneMillion": 10.44
}
```

#### Error

If there is a missing value error for a **required flag** (e.g. use country specified API without giving a country flag), **this will not pass the validation step**. Therefore, it will not make this API call to disease.sh database to decrease unnecessary traffic. Expected return:

```
400 Bad Request
There is no specified country/region found in your input.
```

If the flags are all correct but the value cannot be accepted by disease.sh database, then, there will be a `400 Bad Request` and a error message stringified JSON returned. Expected return example:

```
400 Bad Request
Country/region "United States1" not found or doesn't have any cases.
{
    "message": "Country not found or doesn't have any cases"
}
```

If there is an error when extracting data from disease.sh in `.then()` (this could be a disease.sh database issue or network issue), there will be a `500 Internal Server Error` given. **This will not return a stringified JSON. Also, this rarely happens.** Expected return:

```
500 Internal Server Error
There is an error occured in the server when extracting data. Please try again later.
```

## Database

-----

In this project, sqlite3 is used as its database. The program uses "better-sqlite3" npm package to interact with the database. Currently, the server endpoints can record its log into the sqlite3 database (log table).

### Structure of the table for log

The structure of table for log (log table) has 5 columns. Therefore, a record has:

- `id` : unique identifier for different logs. It is the primary key of the database, and it is autoincreamenting.

- `time`: the UTC time when this log is generated to database.

- `status`: the status (success/failure) for the api endpoints which generates this record.

- `endpoint`: the endpoint that is used when this record is generated.

- `detail`: details for this log (input flags, error explanation if failure)

Table setup:

```sql
CREATE TABLE backendlog (
    id INTEGER NOT NULL PRIMARY KEY,
    time TEXT NOT NULL,
    status TEXT NOT NULL,
    endpoint TEXT NOT NULL,
    detail TEXT
)
```

### How database works

Every time when there is a endpoint (including non-existent) is used, there will always be a log to the database whether the execution is successful or not. And the log will include the status information of this execution.

View logs needs `/app/logs/` endpoint, though it only shows 10 latest logs for better readalibility.

Clear all existing logs in the table needs `/app/logs/clear/` endpoint. After the clear/truncate, the autoincrementing primary key `id` is also set back to `1` automatically.

# Projects Link

Here is the link to this project on Github: [Github Link](https://github.com/comp426-2022-fall/a99-Team-33)