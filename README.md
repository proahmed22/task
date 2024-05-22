### Real Estate Management API

This is a RESTful API for managing real estate listings (ads), property requests, and user authentication. It is built with Node.js, Express, and MongoDB. It uses JWT for authentication and authorization, and Joi for input validation.

**API Documentation:**

For detailed API documentation, including request/response schemas and examples, please visit the SwaggerHub documentation:

**[https://app.swaggerhub.com/apis-docs/proahmed22/dealapp-be-task-api/1.0.0#/](https://app.swaggerhub.com/apis-docs/proahmed22/dealapp-be-task-api/1.0.0#/)**

**Key Features:**

*   **User Authentication:**
    *   `POST /api/v1/auth/signup`: Register a new user (client).
        *   Request Body:
            *   `name` (string, required): User's name.
            *   `phone` (string, required): User's phone number (must be a valid Egyptian phone number).
            *   `password` (string, required): User's password (must meet complexity requirements).
            *   `rePassword` (string, required): Must match the `password` field.
    *   `POST /api/v1/auth/login`: Authenticate a user and get a JWT token.
        *   Request Body:
            *   `phone` (string, required): User's phone number.
            *   `password` (string, required): User's password.
*   **Property Listings (Ads):**
    *   `POST /api/v1/ads`: Create a new property listing (requires agent/admin role).
        *   Request Body:
            *   `propertyType` (string, required): One of 'VILLA', 'HOUSE', 'LAND', 'APARTMENT'.
            *   `area` (number, required): Area of the property.
            *   `price` (number, required): Price of the property.
            *   `city` (string, required): City where the property is located.
            *   `district` (string, required): District where the property is located.
            *   `description` (string, required): Description of the property (minimum 10 characters).
    *   `GET /api/v1/ads`: Get all property listings (admin only).
    *   `GET /api/v1/ads/:id`: Get details of a specific property listing.
        *   URL Parameters:
            *   `id` (string, required): ID of the property listing.
    *   `GET /api/v1/ads/match/:id`: Get property requests matching a specific ad.
        *   URL Parameters:
            *   `id` (string, required): ID of the property listing.
    *   `PUT /api/v1/ads`: Update a property listing (requires agent role and ownership).
        *   Request Body:
            *   `id` (string, required): ID of the property listing.
            *   `description` (string, required): Updated description of the property.
            *   `area` (number, required): Updated area of the property.
            *   `price` (number, required): Updated price of the property.
    *   `DELETE /api/v1/ads`: Delete a property listing (requires agent role and ownership).
        *   Request Body:
            *   `id` (string, required): ID of the property listing.
*   **Property Requests:**
    *   `POST /api/v1/requests`: Create a new property request (requires client role).
        *   Request Body:
            *   `propertyType` (string, required): One of 'VILLA', 'HOUSE', 'LAND', 'APARTMENT'.
            *   `area` (number, required): Desired area of the property.
            *   `price` (number, required): Desired price of the property.
            *   `city` (string, required): City where the property is desired.
            *   `district` (string, required): District where the property is desired.
            *   `description` (string, required): Description of the desired property (minimum 10 characters).
    *   `GET /api/v1/requests`: Get all property requests (accessible by clients, agents, and admins).
    *   `GET /api/v1/requests/:id`: Get details of a specific property request.
        *   URL Parameters:
            *   `id` (string, required): ID of the property request.
    *   `PUT /api/v1/requests/:id`: Update a property request (requires client role and ownership).
        *   URL Parameters:
            *   `id` (string, required): ID of the property request.
        *   Request Body:
            *   `description` (string, required): Updated description of the desired property.
            *   `area` (number, required): Updated desired area of the property.
            *   `price` (number, required): Updated desired price of the property.
    *   `DELETE /api/v1/requests/:id`: Delete a property request (requires client role and ownership).
        *   URL Parameters:
            *   `id` (string, required): ID of the property request.
*   **User Statistics (Admin):**
    *   `GET /api/v1/user`: Get statistics on users, their ads, and requests (admin only).

**Error Handling:**

*   Centralized error handling using custom `AppError` class and `asyncHandler` middleware.
*   Provides consistent error responses with status codes and messages.

**Validation:**

*   Joi validation for input data on all endpoints.
*   Ensures data integrity and prevents invalid requests.

**Authentication and Authorization:**

*   JWT-based authentication for secure access.
*   Role-based authorization (`allowedTo` middleware) to restrict access to certain endpoints.

**Running with Docker:**

1. **Install Docker:** Make sure you have Docker installed and running on your system.
2. **Build the Image:** In the project's root directory, run the following command to build the Docker image:
   ```bash
   docker build -t dealapp .
   ```
3. **Run the Container:** 
   ```bash
   docker run -d --name dealapp -p 3000:3000 --env-file .env dealapp

   ```
 

**Getting Started (without Docker):**

1.  **Set up MongoDB:** Install and configure MongoDB.
2.  **Environment Variables:** Create a `.env` file to store sensitive information like `JWT_SECRET` and database connection details.
3.  **Install Dependencies:** Run `npm install` to install required packages.
4.  **Start the Server:** Run `npm start` to start the server.
