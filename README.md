## Description

This backend service serves as the backbone for Finku Android Application. Built using the NestJS framework, it provides a robust, modular, and scalable architecture to handle business logic and API integrations efficiently.

The service is designed to leverage Google Cloud Platform (GCP) for seamless cloud-native deployment and management, ensuring high availability and scalability.

## Cloud Computing Team Members
| Team Member              | Cohort ID    |
|--------------------------|--------------|
| Afnan Edsa Ramadhan      | C002B4KY0160 |
| Muhhamad Syauqi Jannatan | C002B4KY3142 |

## Project setup

```bash
$ npm install
```
## Environment Configuration
1. Copy the .env.example file to a new file named .env in the root directory of the project:
2. Open the .env file and replace the placeholder values with your actual configuration.


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation
This backend service provides a set of APIs to support the functionality of the Finku Android Application. The API documentation is automatically generated and can be accessed via the following steps:

### Accessing Swagger UI:
1. Run the backend service using any of the modes mentioned above.
2. Navigate to http://localhost:`PORT`/api in your browser (replace <PORT> with the port number your server is running on, typically defined in your environment variables or default configuration).
3. Explore and interact with the API endpoints directly through the Swagger interface.
4. Alternatively, access the live API documentation hosted on GCP using this [link](https://finku-api-996360456227.asia-southeast2.run.app/api)
### API Endpoints:
#### User Management: 
1. POST /users - Create a new user <br>
Authorization: Bearer <your_access_token> <br>
Request Body:
```bash
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```
Response:
Status 201 (Created)
```bash
{
  "status": "success",
  "message": "User created successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
}
```
2. GET /users - Retrieve all users <br>
Authorization: Bearer <your_access_token> <br>
Response:
   Status 200 (OK)
```bash
{
  "status": "success",
  "message": "All users fetched successfully",
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "created_at": "2024-11-17T12:00:00Z",
      "updated_at": "2024-11-17T13:00:00Z"
    }
  ]
}
```
3. GET /users/{id} - Retrieve user details <br>
   Authorization: Bearer <your_access_token> <br>
   Response:
   Status 200 (OK)
```bash
{
  "status": "success",
  "message": "User fetched successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "user_name",
    "email": "user@example.com",
    "password": "hash_password_user",
    "created_at": "2024-11-17T12:00:00Z",
    "updated_at": "2024-11-17T13:00:00Z"
  }
}
```
4. PATCH /users/{id} - Update user information <br>
   Authorization: Bearer <your_access_token> <br>
   Request Body:
```bash
{
  "name": "string",
  "password": "string"
}
```
   Response:
   Status 200 (OK)
```bash
{
  "status": "success",
  "message": "User with ID #xxxx updated successfully",
  "data": {
    "name": "user_name",
    "password": "password_user_hash",
    "updated_at": "2024-11-17T12:00:00Z"
  }
}
```
5. DELETE /users/{id} - Delete a user <br>
   Authorization: Bearer <your_access_token> <br>
   Response:
   Status 200 (OK)
```bash
{
  "status": "success",
  "message": "User with ID #xxxxxx removed successfully"
}
```
3. GET /users/{id} - Retrieve user details <br>
   Authorization: Bearer <your_access_token> <br>
   Response:
   Status 200 (OK)
```bash
{
  "status": "success",
  "message": "User fetched successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "user_name",
    "email": "user@example.com",
    "password": "hash_password_user",
    "created_at": "2024-11-17T12:00:00Z",
    "updated_at": "2024-11-17T13:00:00Z"
  }
}
```
#### Authentication

POST /auth/login - Authenticate a user and retrieve a token.
Request Body:
```bash
{
  "email": "string",
  "password": "string"
}
```
Response:
Status 200 (OK)
```bash
{
  "id": "12345",
  "name": "johndoe",
  "email": "johndoe@email.com",
  "access_token": "jwt_token"
}
```

Financial Data

1. POST /transactions - Add a new transaction.
Authorization: Bearer <your_access_token> <br>
Request Body:
```bash
{
  "user_id": "string",
  "data": [
    {
      "title": "string",
      "amount": "string",
      "type": "string",
      "date": "string",
      "category": "string",
      "currency": "string"
    }
  ]
}
```
Response:
Status 201 (Created)
```bash
{
  "status": "success",
  "message": "Transactions created successfully",
  "data": [
    {
      "transaction_id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "pecel lele",
      "amount": "30000",
      "type": "debt",
      "date": "2024-11-17",
      "category": "food",
      "currency": "IDR",
      "user_id": "456e1234-e89b-12d3-a456-426614174000",
      "created_at": "2024-11-17T12:00:00Z",
      "updated_at": "2024-11-17T13:00:00Z"
    }
  ]
}
```
2. GET /transactions - Fetch all transactions.
Authorization: Bearer <your_access_token> <br>
   Response:
   Status 200 (OK)
```bash
{
  "status": "success",
  "message": "All transactions fetched successfully",
  "data": [
    {
      "transaction_id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "pecel ayam",
      "amount": "50000",
      "type": "credit",
      "date": "2024-11-17",
      "category": "food",
      "currency": "IDR",
      "user_id": "456e1234-e89b-12d3-a456-426614174000",
      "created_at": "2024-11-17T12:00:00Z",
      "updated_at": "2024-11-17T13:00:00Z"
    }
  ]
}
```
3. GET /transactions/{id} - Fetch detail transactions.
   Authorization: Bearer <your_access_token> <br>
   Response:
   Status 200 (OK)
```bash
{
  "status": "success",
  "message": "Transaction fetched successfully",
  "data": {
    "transaction_id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "pecel ayam",
    "amount": "50000",
    "type": "credit",
    "date": "2024-11-17",
    "category": "food",
    "currency": "IDR",
    "user_id": "456e1234-e89b-12d3-a456-426614174000",
    "created_at": "2024-11-17T12:00:00Z",
    "updated_at": "2024-11-17T13:00:00Z"
  }
}
```
4. GET /transactions/user/{id} - Fetch user detail transactions.
Authorization: Bearer <your_access_token> <br>
    Response:
    Status 200 (OK)
```bash
{
  "status": "success",
  "message": "Transactions for user fetched successfully",
  "data": [
    {
      "transaction_id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "pecel ayam",
      "amount": "50000",
      "type": "credit",
      "date": "2024-11-17",
      "category": "food",
      "currency": "IDR",
      "user_id": "456e1234-e89b-12d3-a456-426614174000",
      "created_at": "2024-11-17T12:00:00Z",
      "updated_at": "2024-11-17T13:00:00Z"
    }
  ]
}
```

#### Machine Learning
1. POST /predict - Perform OCR prediction <br>
   Request Body: multipart/form-data with the key file

Response:
Status 200 (OK)
```bash
{
  "status": "success",
  "message": "Berhasil melakukan ocr",
  "data": {
    "total_debit": 93144,
    "total_credit": 44236,
    "difference": 48908,
    "result": [
      {
        "amount": 25531,
        "type": "CR",
        "category": "Listrik",
        "title": "ayam geprek",
        "currency": "IDR",
        "date": "2024-11-20T01:21:52.454Z"
      }
    ]
  }
}
```

