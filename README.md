```
Routes:
GET /connections
```




```
No token error:
{
    "errors": {
        "status": 401,
        "title": "Authentication failed",
        "detail": "Error Decoding JWT Token"
    }
}

Expired token error:
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

GET /connections/:id (Show connection (header and lines))
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

`GET /headers/search?search=test`
(search header)

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
            "Other": "Test linje 2",
            "Created": "2021-03-11T13:22:29.360Z",
            "Updated": null,
            "Deleted": null
        }
    ]
}
```

`GET /headers  (show all headers)`

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
            "Other": "Test linje 2",
            "Created": "2021-03-11T13:22:29.360Z",
            "Updated": null,
            "Deleted": null
        }
    ]
}
```