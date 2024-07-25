# Ideal Chat Interests

Welcome to the Ideal Chat Interests project! This repository contains both the backend and frontend code for a chat application with interest-based features.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [How Project Works](#how-the-project-works)


## Project Structure
ideal-chat-interests/ 
- ├── db.sqlite3 
- ├── envsmart/ 
- ├── frontend-chat/ 
- ├── ideal_chat_interests/ 
- ├── interest_app/ 
- ├── manage.py 
- ├── Readme.md 
- └── requirements.txt


## Getting Started

### Backend Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/yourusername/ideal-chat-interests.git
    cd ideal-chat-interests
    ```

2. **Create and activate a virtual environment:**

    ```sh
    python -m venv envsmart
    source envsmart/Scripts/activate  # On Windows
    # source envsmart/bin/activate    # On macOS/Linux
    ```

3. **Install the dependencies:**

    ```sh
    pip install -r requirements.txt
    ```

4. **Apply migrations:**

    ```sh
    python manage.py migrate
    ```

5. **Create a superuser:**

    ```sh
    python manage.py createsuperuser
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```sh
    cd frontend-chat
    ```

2. **Install the dependencies:**

    ```sh
    yarn
    ```

3. **Create a `.env.local` file:**

    ```sh
    echo "REACT_APP_COMMON_URL=localhost:8000" > .env.local
    ```

## Running the Application

### Backend

Start the Django development server:

```sh
python manage.py runserver
```

### Frontend
Start the React development server:
```sh
yarn start
```

## How the Project Works

This project is a chat application with interest-based features. Below is a step-by-step guide on how to use the application and test its functionalities.

### 1. Register a New User

1. Open the application in your browser.
2. Navigate to the registration page.
3. Fill in the required details and submit the form to create a new account.

### 2. Login

1. After registering, navigate to the login page.
2. Enter your credentials and log in to the application.

### 3. Add Other Users

1. Register additional users by following the same registration steps.
2. Log in with these new users to create multiple accounts for testing.

### 4. Send Friend Requests

1. While logged in, search for other users by their username or interests.
2. Send friend requests to these users.

### 5. Show and Manage Friend Requests

1. Navigate to the "Show Invites" page to see the list of sent and received friend requests.
2. Accept or reject received friend requests.

### 6. Chat with Friends

1. Once a friend request is accepted, navigate to the chat page.
2. Start a real-time chat with your friends.

### 7. Test in Incognito Mode

1. Open a new browser window or an incognito mode.
2. Log in with a different user account.
3. Test the real-time chat functionality by sending and receiving messages between the two accounts.

### Enjoy Real-Time Chat

1. Experience real-time chat with your friends.
2. Messages should appear instantly in the chat window.

## Testing the Application

To ensure the application works as expected, follow these steps:

1. **Register and Login:**
   - Register multiple users.
   - Log in with each user to verify the registration and login process.

2. **Send and Manage Friend Requests:**
   - Send friend requests from one user to another.
   - Accept or reject friend requests and verify the status updates.

3. **Real-Time Chat:**
   - Open multiple browser windows or use incognito mode to log in with different users.
   - Send and receive messages to test the real-time chat functionality.

By following these steps, you can thoroughly test the application's features and ensure everything works as expected.