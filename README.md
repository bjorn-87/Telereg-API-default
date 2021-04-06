Required in body for all routes:
`authorization: "Azure autenthication token"`

No token error:
```
{
    "errors": {
        "status": 401,
        "title": "Authentication failed",
        "detail": "Error Decoding JWT Token"
    }
}
```
Expired token error:
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

`GET /headers/limit=<limit>&offset=<offset>`
Limit defaults to 50 (max 100)
Offset defaults to 0

Returns rows depending on limit and offset plus total number of rows in table Telereg.
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


`GET /headers/search?search=<search>`
(search header)
Required parameter "search" in querystring

Result:
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

`POST /api/v1/headers`
Required parameter number
returns
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

`PUT /api/v1/headers`
Required parameter number & id
Returns status 204 NO CONTENT

`GET /connections/:id `
(Show connection (header and lines))
Required parameter id (Id of Telereg row)
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

`GET /api/v1/connections/report?rack=sm&field=01`
return
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

`DELETE /api/v1/connections`
Required parameter in body "id"
Return status 204 NO CONTENT


`POST /api/v1/lines`
Required parameter in body "teleregid"
Returns
```
{
    "data": {
        "status": 201,
        "title": "CREATED",
        "message": "Successfully created"
    }
}
```
`PUT /api/v1/lines`
Requied parameter in body "id"
Return status 200 OK

`DELETE /api/v1/lines`
Required parameter in body "id"
Return status 204 NO CONTENT