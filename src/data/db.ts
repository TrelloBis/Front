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
        }
    ]
}