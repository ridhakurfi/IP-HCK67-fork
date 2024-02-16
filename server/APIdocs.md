# Career Portal API Server

Features :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

### POST /login

> Login to Main Page

_Request Header_

```
{
  none
}
```

_Request Body_

```
{
        "username": "Budi",
        "email": "budi@gmail.com"
}
```

_Response (200 - Ok)_

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJpZCI6MSwiaWF0IjoxNzA2ODk2NzgzfQ.nI6DlxBwmBAfqtw5HkLYFWC-SIsUUaOiut-36Yi64pU"
}
```

_Response (401 - Unauthorized)_

```
{
  "message": "Invalid Password"
}
```

_Response (400 - Bad request)_

```
{
  "message": "Please input email/password"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### POST /login/google

> Create new User

_Request Header_

```
{
    "google_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJpZCI6MSwiaWF0IjoxNzA2ODk2NzgzfQ.nI6DlxBwmBAfqtw5HkLYFWC-SIsUUaOiut-36Yi64pU"
}
```

_Request Body_

```
{
    none
}
```

_Response (201 - Created)_

```
{
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJpZCI6MSwiaWF0IjoxNzA2ODk2NzgzfQ.nI6DlxBwmBAfqtw5HkLYFWC-SIsUUaOiut-36Yi64pU"
}
```

_Response (400 - Bad Request)_

```
{
  none
}
```

### POST /register

> Post New User data

_Request Header_

```
{
    none
}
```

_Request Body_

```
{
        "username": "Siti",
        "email": "siti@gmail.com",
        "password": "pass456",
        "rank": "Basic"
}
```

_Response (200 - Ok)_

```
{
  "message": "Succesfully Created"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### GET /reviews

> Read Comapnies data

_Request Header_

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJpZCI6MSwiaWF0IjoxNzA2ODk2NzgzfQ.nI6DlxBwmBAfqtw5HkLYFWC-SIsUUaOiut-36Yi64pU"
}
```

_Request Body_

```
{
    none
}
```

_Response (200 - Ok)_

```
[
    {
        "desc": "Harus coba, makanan ini murah meriah",
        "score": 9,
        "FoodId": 2,
        "UserId": 3
    },
    {
        "desc": "Makanan enak, harga terjangkau",
        "score": 8,
        "FoodId": 1,
        "UserId": 4
    }
    ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### GET /maps/:id

> Read Company data by ID

_Request Header_

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJpZCI6MSwiaWF0IjoxNzA2ODk2NzgzfQ.nI6DlxBwmBAfqtw5HkLYFWC-SIsUUaOiut-36Yi64pU"
}
```

_Request Body_

```
{
    none
}
```

_Request Params_

```
{
    id: 1
}
```

_Response (200 - Ok)_

```

{
        "name": "Warung Pak Soni",
        "lat": -6.285068006298165,
        "lng": 106.8044031545991
    }


```

_Response (404 - Not Found)_

```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### GET /user

> Get User Info

_Request Header_

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJpZCI6MSwiaWF0IjoxNzA2ODk2NzgzfQ.nI6DlxBwmBAfqtw5HkLYFWC-SIsUUaOiut-36Yi64pU"
}
```

_Request Body_

```
{
  none
    }
```

_Request Params_

```
{
    none
}
```

_Response (200 - Ok)_

```
{
        "username": "Siti",
        "email": "siti@gmail.com",
        "password": "pass456",
        "rank": "Basic"
    }

```

_Response (400 - Bad Request)_

```
{
  "message": "Name cannot be empty"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```