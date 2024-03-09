# qp-assessment

## Description

qp-assessment project.

# Technology Stack
 * [Node.js](https://nodejs.org) server.
 * [My-SQL] database.
 * [TypeScript]
 * [Express] node.js framework for building REST APIs

## Usage
This section is for getting started with service on your development environment.

1. **Clone the repository**
  ```
  git clone <link>
  ```
2. **Install all the packages**
  ```
  npm install
   ``` 
   if recieving any optional dependency warnings then use this :

   ```
  npm install --no-optional
   ```

  It will prompt for your github access token in order to install our inbuilt package.
  
3. **Change  envsample to .env**: Put all your constant, credentials, and path etc here.
## Authentication

- JWT token is required for accessing protected routes.
- Include the token in the request header as `Authorization: Bearer <token>`.

## Authorization

- Admin role is required for accessing grocery routes.

### Default Admin User

- Username: admin
- Password: admin

## Routes

### User Routes

- `POST /api/user/login`
  - Sample Body: `{ "username": "example_user", "password": "password123" }`
  - Logs in the user and generates a JWT token.

- `POST /api/user/signup`
  - Sample Body: `{ "username": "new_user", "password": "password123" }`
  - Creates a new user.

### Grocery Routes

- `POST /api/grocery`
  - Sample Body: `{ "name": "Item Name", "price": 10.99, "inventory": 100 }`
  - Adds a new grocery item to the system.

- `GET /api/grocery`
  - Retrieves all existing grocery items.

- `DELETE /api/grocery/:id`
  - Deletes a grocery item by ID.

- `PUT /api/grocery/:id`
  - Updates details of a grocery item by ID.

### Order Routes

- `POST /api/orders`
  - Sample Body: `{ "items": [{ "item_id": 1, "quantity": 5 }, { "item_id": 2, "quantity": 3 }] }`
  - Creates a new order with multiple grocery items.
