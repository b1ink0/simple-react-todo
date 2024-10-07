# TODO APP

A simple TODO application built using React that allows users to manage their tasks efficiently. This app demonstrates fundamental React concepts such as state management and component-driven development. 

## Features

- **Add Task**: Easily add tasks to your to-do list.
- **Remove Task**: Delete tasks when they are no longer needed.
- **Edit Task**: Edit tasks to keep your list up to date.
- **Mark as Done**: Mark tasks as completed to track progress.
- **Data Persistance**: Local storage is used for persistence.
- **Filters**: Task filtering based on all, done and remaining.

## Installation

1. Clone the repository:

   ```bash
   git clone <git_url>
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000` to view the app.

## Usage

- **Add a Task**: Enter your task in the input field and click the "Add Icon" button.
- **Edit a Task**: Click the "Edit Icon (Pencil Icon)" button next to a task to modify it.
- **Remove a Task**: Click the "Delete Icon" button next to a task to remove it from the list.
- **Mark as Done**: Click the "Check Icon" next to a task to mark it as completed.

## Technologies Used

- **React**: For building the user interface.
- **JavaScript (ES6+)**: For app logic and interaction handling.
- **CSS**: For styling the app.

## Technical Details

1. **State Management**:
	- The application uses the Context API for state management, ensuring that the state can be easily shared between components without prop drilling. This enables a clean, centralized management of tasks and other global states across the app.

2. **Custom Hooks**:
	- `useTodos`: A custom hook that encapsulates all the core logic related to handling the to-dos. It manages the creation, editing, deletion, and toggling the completion status of tasks, abstracting this logic away from the UI components.
	- `useDB`: Another custom hook that manages the app's interaction with the database. Currently, this is using local storage, but it is designed to be extendable to use other databases in the future.
3. **Task CRUD Operations**:
	- Add, Remove, Edit, Mark as Done: The `useTodos` hook exposes the necessary methods for handling task-related operations such as adding a new task, removing a task, updating task content, and toggling its completion status.

## Screenshot

![TODO Screenshot](https://github.com/b1ink0/cdn/raw/main/assets/dump/todo.png)

---