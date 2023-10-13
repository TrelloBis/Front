# Install and launch

Run `npm install` to install the project, then `npm run dev to launch development server`.

Access via http://localhost:5173/

## Project

Project has 3 pages :
- '/' is home page. It checks if user is connected and navigate either to
- '/auth' if user is not connected,
- '/list' is user is connected.

From the auth page, it is possible to create a new user, or there is one alreaddy existing user:
- username: test
- password: test

From the list page, all tasks linked to the connected user are displayed. The already existing user already has some tasks saved. It is also possible to add, modify and delete tasks.