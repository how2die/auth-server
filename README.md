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

