# Auth Server

The world's simplest authentication server using JSON Web Tokens.

## Getting started

### Prerequisites

* Kubernetes cluster with kubectl access
* Properly configured database, see `/app/config/sequelize.js`

### Deploying to Kubernetes

Create a secure private key and store it as a secret:
```
kubectl create secret generic auth-secret --from-literal=private-key=<PRIVATE KEY>
```

Deploy to Kubernetes by running:
```
kubectl apply -f deployment.yaml
```

## Usage
### Create credentials
**URL** : `/api/auth/credentials/:userid`
**Method** : `PUT`
```json
{
    "userid": "some-userid",
    "password": "some-password"
}
```
Note that `userid` in body must match the user id given in the URL.
This endpoint must **NOT** be exposed publicly, as it allows arbitrary manipulation of user credentials.

### Generate token
**URL** : `/api/auth/tokens`
**Method** : `POST`
```json
{
    "userid": "some-userid",
    "password": "some-password"
}
```
This request will return status code `201 Created` if and only if the request body contains valid credentials. The response body will contain the token as plain text.

### Validate token
**URL** : `/api/auth/tokens/:token`
**Method** : `GET`

Validates the token, returns status code `200 OK` if and only if the token is valid.
