# Focus Mate

Focus Mate is a comprehensive system designed to manage user profiles and schedule meetings. The project consists of a backend service that handles data processing and a frontend application that provides an intuitive user interface. This README covers the setup and usage for both the backend and frontend, as well as instructions for contributing to the project.

<img src="public/asset/front-end.png" alt="Invoice Data Table" width="600">

## Project Structure

- **Backend**: Handles data management, including user profiles and meeting scheduling.
- **Frontend**: Provides a user interface for interacting with the backend service.

### Backend

#### Features

- User profile management
- Meeting scheduling and link generation
- Semantic similarity computation between users

#### Technologies

- **Python**: Programming language for backend development
- **Flask**: Web framework for creating RESTful APIs
- **SQLite**: Lightweight database for storing data
- **Transformers**: Library for NLP tasks
- **NumPy**: Library for numerical computations
- **Scikit-learn**: Library for machine learning (used for distance calculations)

#### Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/focus-mate.git
cd focus-mate
```

### 2. Setup Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

The application will be available at http://localhost:3000.

### 4. Initialise Database

Run the database creation script:

```bash
python create_db.py
```

### 5. Generate Random Meetings

```bash
python generate_random_meetings.py
```

### 6. Run the Server

```bash
python app.py
```

The server will be available at http://localhost:5000.

## Usage

### 1. Main Person and Sidebar

- The Header displays the main person's profile.
- The Sidebar shows upcoming meetings and allows interaction with selected users.

### 2. Calendar Component

- Displays meetings in a calendar format.
- Users can select a person to add them to the sidebar's upcoming meetings section.

### 3. Select and Manage Users

- Use the Select button in the calendar to add a user to the sidebar.
- Users can be removed from the sidebar by clicking the Remove button.

## Future Improvements

- Enhance user interaction with more detailed profiles.
- Implement advanced filtering and search in the calendar.
- Add user authentication and profile management features.
- Optimize performance and enhance accessibility features.

## License

This project is licensed under the MIT License. See the [LICENSE](https://chatgpt.com/c/LICENSE) file for details.
