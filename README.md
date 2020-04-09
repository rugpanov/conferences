# Conferences

NodeJS + Express + MongoDB

## Available routes

List of available routes with required payload.

```json
# Get conferences by titles which include specified pattern
POST /api/conferences/get-by-title
{
    "pattern": "Conf"
}
```
```json
# Get conferences with exact start date
POST /api/conferences/get-by-date
{
    "dateStart": "2019-01-22T12:00:00.000Z",
}

# Get conferences with dates in specified range, i. e. with start >= dateStart and end <= dateFinish
POST /api/conferences/get-by-date
{
    "dateStart": "2019-01-22T12:00:00.000Z",
    "dateFinish": "2019-01-22T12:00:00.000Z"
}
```
```json
# Get conferences associated with specified projects
POST /api/conferences/get-by-projects
{
    "projects": ["Sales"]
}
```
```json
# Get conferences with specified tags
POST /api/conferences/get-by-tags
{
    "tags": ["some-tag"]
}
```
```json
# Add conference
POST /api/conferences/add
{
    "projects": [
        "PyCharm",
        "DataLore",
        "IDEA"
    ],
    "location": {
        "city": "Prague",
        "country": "Czech Republic"
    },
    "tags": [],
    "dateStart": "2019-02-22T12:00:00.000Z",
    "dateFinish": "2019-02-24T12:00:00.000Z",
    "participants": [
        {
            "name": "Anna.Smolkina",
            "type": "PARTICIPANT",
            "status": "INVITED",
            "invited": true
        }
    ],
    "ytLink": "https://youtrack.jetbrains.com/issue/PANDA-3940",
    "attendance": 1000,
    "link": "https://mlprague.com",
    "comments": [],
    "status": "ACCEPTED"
}
```

## How to run

### docker-compose

```shell
docker-compose up --build
```

### Manually

You will need mongodb instance running to run this project. Set `DATABASE_CONNECTION_URL` environment variable to mongodb connection url, i. e.:

```shell
DATABASE_CONNECTION_URL="mongodb://localhost:27017/conferences"
```

Run project:

```shell
npm ci && npm run build && node .
```

By default backend listens on `9000` port. You can change this behaviour with `PORT` environment variable.
