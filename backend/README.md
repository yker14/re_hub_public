# Backend Server

This directory contains a simple Python web server that serves the frontend application and handles file uploads.

## Prerequisites

- Python 3.x

## Running the Server

1.  Navigate to the `backend` directory in your terminal:
    ```bash
    cd backend
    ```
2.  Run the server script:
    ```bash
    python server.py
    ```
3.  The server will start, and you should see output similar to:
    ```
    Serving at port 8000
    Serving webapp from: /path/to/your/project/root
    Uploads will be saved to: /path/to/your/project/root/backend/uploads
    ```
4.  Open your web browser and go to `http://localhost:8000` to view the application.

## Functionality

-   Serves static files (HTML, CSS, JavaScript, images, fonts) from the project's root directory (which is considered the `frontend/webapp` directory).
-   Handles file uploads sent via POST request to the `/upload` endpoint.
-   Uploaded files are saved in the `backend/uploads` directory.
-   The `backend/uploads` directory has a `.gitignore` file to prevent uploaded files from being committed to the repository.
