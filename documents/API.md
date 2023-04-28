# Routes

## POST /auth/register

Creates a new user.

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "first_name": "Adham",
  "last_name": "Haddad",
  "username": "adhamhaddad",
  "role": 0,
  "email": "adhamhaddad.dev@gmail.com",
  "password": "secret-password"
}
```

### Response

If the user is successfully created, the server will respond with a status code of 201 and a JSON object representing the new user:

```json
{
  "id": 1,
  "first_name": "Adham",
  "last_name": "Haddad",
  "username": "adhamhaddad",
  "email": "adhamhaddad.dev@gmail.com"
}
```

## POST /auth/login

Authenticate user.

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "email": "adhamhaddad.dev@gmail.com",
  "password": "secret-password"
}
```

### Response

If the user is exists and authenticated successfully, the server will respond with a status code of 200 and a JSON object representing the authenticated user:

```json
{
  "user": {
    "id": 1,
    "first_name": "Adham",
    "last_name": "Haddad",
    "username": "adhamhaddad",
    "role": 0,
    "created_at": "",
    "updated_at": null
  },
  "accessToken": "<Access-Token>"
}
```

## POST /auth/refresh-token

Refresh the access and refresh tokens.

### Request Headers

The request headers should have a Cookies with the following properties:

```json
  refreshToken="<Refresh-Token>"
```

### Response

If the refresh token is exists in redis and valid, the server will respond with a status code of 200 and a JSON object representing a new tokens:

```json
{
  "accessToken": "<Access-Token>",
}
```

## GET /users/:userId

Get a user by id.

### Request Headers

The request headers should have a Cookies with the following properties:

```json
  accessToken="<Access-Token>"
  refreshToken="<Refresh-Token>"
```

### Response

If the user is exists, the server will respond with a status code of 200 and a JSON object representing the received user:

```json
{
  "id": 1,
  "first_name": "Adham",
  "last_name": "Haddad",
  "username": "adhamhaddad",
  "email": "adhamhaddad.dev@gmail.com",
  "role": 0,
  "created_at": "",
  "updated_at": null
}
```

## PATCH /users/:userId

Get a user by id.

### Request Headers

The request headers should have a Cookies with the following properties:

```json
  accessToken="<Access-Token>"
  refreshToken="<Refresh-Token>"
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "first_name": "Adham",
  "last_name": "Ashraf",
  "username": "adhamhaddad",
  "email": "adhamhaddad.dev@gmail.com"
}
```

### Response

If the user is exists and updated, the server will respond with a status code of 204 and a JSON object representing the received user:

```json
{
  "id": 1,
  "first_name": "Adham",
  "last_name": "Ashraf",
  "username": "adhamhaddad",
  "email": "adhamhaddad.dev@gmail.com"
}
```

## POST /parcels

Create a new parcel.

### Request Headers

The request headers should have a Cookies with the following properties:

```json
  accessToken="<Access-Token>"
  refreshToken="<Refresh-Token>"
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "sender_id": 2,
  "pick_up_address": "address 1",
  "drop_off_address": "address 2"
}
```

### Response

If the user is a sender and valid, the server will respond with a status code of 201 and a JSON object representing the created parcel:

```json
{
  "id": 1,
  "sender_id": 2,
  "first_name": "address 1",
  "last_name": "address 2",
  "status": "PENDING",
  "created_at": "",
  "updated_at": null,
}
```

## POST /orders

Create a new order.

### Request Headers

The request headers should have a Cookies with the following properties:

```json
  accessToken="<Access-Token>"
  refreshToken="<Refresh-Token>"
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "biker_id": 1,
  "parcel_id": 1
}
```

### Response

If the user is a biker and valid, the server will respond with a status code of 201 and a JSON object representing the created order:

```json
{
  "id": 1,
  "sender_id": 1,
  "parcel_id": 1,
  "delivered_at": null,
  "created_at": "",
  "updated_at": null,
}
```

## PATCH /orders/:orderId

Update the order by id.

### Request Headers

The request headers should have a Cookies with the following properties:

```json
  accessToken="<Access-Token>"
  refreshToken="<Refresh-Token>"
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "biker_id": 1
}
```

### Response

If the user is a biker and valid, the server will respond with a status code of 201 and a JSON object representing the updated order:

```json
{
  "id": 1,
  "sender_id": 1,
  "parcel_id": 1,
  "delivered_at": "",
  "created_at": "",
  "updated_at": "",
}
```
