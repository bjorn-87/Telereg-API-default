# Install Teleregister-API
1. Clone this repo
2. Navigate to root-folder for repo then run `npm install`
3. Create a `.env` file in the root directory with following:

For databaseconnection:
```
DATABASE=database
DB_USER=username
DB_PASS=Password
DB_SERVER=server
```
For Azure AD configuration:
```
JWK_URI=https://
ISS=https://
AUD=api://
```
General settings
```
NODE_ENV=production
NODE_PORT=8080
```
For Testing and dev purposes:
```
NODE_ENV=development
JWT_SECRET=secret (64 characters secure token for testing purposes)
DEV_DATABASE=database
DEV_DB_USER=username
DEV_DB_PASS=Password
DEV_DB_SERVER=server
```
4. Run command `npm start` to start in development mode or `npm run production` for production mode

## External dependencies
* [cors](https://www.npmjs.com/package/cors)
* [express](https://www.npmjs.com/package/express)
* [helmet](https://www.npmjs.com/package/helmet)
* [mssql](https://www.npmjs.com/package/mssql)
* [morgan](https://www.npmjs.com/package/morgan)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

********************************
#### Required parameter in header for all routes:  
`authorization: (Azure autenthication token)`

#### Errors
`No token error:`
```
{
    "errors": {
        "status": 401,
        "title": "Authentication failed",
        "detail": "Error Decoding JWT Token"
    }
}
```
`Expired token error:`
```
{
    "errors": {
        "status": 401,
        "title": "Authentication failed",
        "detail": {
            "name": "TokenExpiredError",
            "message": "jwt expired",
            "expiredAt": "2021-03-26T09:54:29.000Z"
        }
    }
}
```
************************************
## Headers

#### Get headers with pagination
`GET /headers/limit=<limit>&offset=<offset>`  

```
Optional parameters in querystring

limit
offset

Limit defaults to 50 (max 100)  
Offset defaults to 0  
```

Returns:
```
{
    "data": [
        {
            "Id": 4,
            "Number": "00",
            "Name": "",
            "Func": "",
            "Address": "",
            "Drawing": "",
            "Apptype": "",
            "Document": "",
            "UserId": "",
            "ApptypeTwo": "",
            "UserFullName": null,
            "Contact": null,
            "Other": "",
            "Created": "",
            "Updated": null,
            "Deleted": null
        },
        {
            "Id": 5,
            ...
        },
        ...
    ],
    "total": 4341
}
```
************************************
#### Search headers with pagination
`GET /headers/search?search=<search>&type=<type>&limit=<limit>&offset=<offset>`  
```
Required parameter in querystring

search
```
```
Optional parameter 

type  
limit  
offset  
```
```
type can be set to:

number
address
name
function

Defaults to number

limit defaults to 50
offset defaults to 0
```


Returns:
```
{
    "data": [
        {
            "Id": 1,
            "Number": "01",
            "Name": "Test",
            "Func": "Fiber",
            "Address": "Malmberget",
            "Drawing": null,
            "Apptype": "Switch",
            "Document": null,
            "UserId": "john.doe@lkab.com",
            "ApptypeTwo": null,
            "UserFullName": "John Doe",
            "Contact": ""
            "Other": "Test linje 1",
            "Created": "2021-03-11T13:22:29.353Z",
            "Updated": null,
            "Deleted": null
        },
        {
            "Id": 2,
            "Number": "02",
            "Name": "Test 2",
            "Func": "Tele",
            "Address": "Manskapshuset",
            "Drawing": null,
            "Apptype": "Telefon",
            "Document": null,
            "UserId": "john.doe@lkab.com",
            "ApptypeTwo": null,
            "UserFullName": "John Doe",
            "Contact": ""
            "Other": "Test linje 2",
            "Created": "2021-03-11T13:22:29.360Z",
            "Updated": null,
            "Deleted": null
        }
    ]
}
```
*************************************
#### Create a new header
`POST /api/v1/headers`
```
Required parameter in body

number
```
Optional parameters:
```
name
func
address
drawing
apptype
document
userid
apptypetwo
userfullname
contact
other
```

Returns:  
```
{
    "data": {
        "status": 201,
        "title": "CREATED",
        "message": "Successfully created",
        "id": "Id of created row"
    }
}
```
*****************************
#### Update header
`PUT /api/v1/headers`
```
Required parameters in body 

number
id
```
Optional parameters:
```
number
name
func
address
drawing
apptype
document
userid
apptypetwo
userfullname
contact
other
```
Returns status 204 NO CONTENT  
*************************************
## Connections

#### Show connection (header + connected lines)  
`GET /connections/:id`
```
Required parameter

id
```
Result:  
```
{
    "data": {
        "head": {
            "Id": 1,
            "Number": "01",
            "Name": "Test",
            "Func": "Fiberlinje",
            "Address": "Malmberget",
            "Drawing": "",
            "Apptype": "Switch",
            "Document": "",
            "UserId": "john.doe@lkab.com",
            "ApptypeTwo": "",
            "UserFullName": "John Doe",
            "Contact": ""
            "Other": "Test linje 1",
            "Created": "2021-03-11T13:22:29.360Z",
            "Updated": "",
            "Deleted": ""
        },
        "line": [
            {
                "Id": 2,
                "TeleregNumber": "01",
                "Position": 1,
                "Note": "",
                "Rack": "",
                "FieldFrom": "",
                "NrFrom": "",
                "KlFrom": "",
                "FieldTo": "",
                "NrTo": "",
                "KlTo": "",
                "Comment": "",
                "Created": "2021-03-11T13:22:29.380Z",
                "Updated": "",
                "Deleted": ""
            }
        ]
    }
}
```
********************************
`GET /api/v1/connections/report?rack=sm&field=01&nrfrom=01&nrto=99`
```
Required query parameter:

rack
field
```
Optional query parameters:
```
nrfrom
nrto

nrfrom defaults to '01'  
nrto defaults to '9999'  
```

return:
```
{
    "data": [
        {
            "Rack": "SM",
            "Field": "01",
            "Nr": "02",
            "Kl": "04",
            "Number": "5586",
            "Name": "Bergsspel B7",
            "Address": "KS 107M",
            "Other": null
        },
        {
            "Rack": "SM",
            "Field": "01",
            "Nr": "11",
            "Kl": "02",
            "Number": "5582",
            "Name": "Bergsspel B7",
            "Address": "KS 87M",
            "Other": null
        }
    ]
}
```
*********************************
#### Deleting a connection (header + lines)
`DELETE /api/v1/connections`  
```
Required parameter in body 

id
```
Return status `204 NO CONTENT`
*********************************
## Lines

#### Creating a new line

`POST /api/v1/lines`
```
Required parameter in body 

teleregid
```

Result:  
```
{
    "data": {
        "status": 201,
        "title": "CREATED",
        "message": "Successfully created"
    }
}
```
*******************************
#### Updating a line
`PUT /api/v1/lines`
```
Required parameter in body

id
```
Optional parameters:
```
position
note
rack
fieldfrom
nrfrom
klfrom
fieldto
nrto
klto
comment
userid
userfullname
```
Return status `200 OK`
********************************
#### Deleting a line
`DELETE /api/v1/lines`
```
Required parameter in body:

id
```
Return status `204 NO CONTENT`