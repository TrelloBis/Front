export const priorityList = ["Low", "Medium", "High"]

export const statesList = ["To Do", "In Progress", "Done"]

export const db = {
    "users": [
        {
            "id": 1,
            "username": "test",
            "password": "test" // will be hashed
        }
    ],
    "tasks": [
        {
            "id": 1,
            "title": "Titre 1",
            "description": "Description 1",
            "priority": "Low",
            "state": "To Do",
            "userId": 1
        },
        {
            "id": 2,
            "title": "Titre 2",
            "description": "Description 2",
            "priority": "Medium",
            "state": "In Progress",
            "userId": 1
        },
        {
            "id": 3,
            "title": "Titre 3",
            "description": "Description 3",
            "priority": "High",
            "state": "Done",
            "userId": 1
        },
        {
            "id": 4,
            "title": "Titre 4",
            "description": "Description 4",
            "priority": "Low",
            "state": "To Do",
            "userId": 1
        },
        {
            "id": 5,
            "title": "Titre 5",
            "description": "Description 5",
            "priority": "Medium",
            "state": "In Progress",
            "userId": 1
        },
        {
            "id": 6,
            "title": "Titre 6",
            "description": "Description 6",
            "priority": "High",
            "state": "Done",
            "userId": 1
        }
    ]
}