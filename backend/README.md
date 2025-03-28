# Dashboard Backend

A TypeScript-based REST API backend for managing dashboard data with MongoDB integration.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/dashboard
```

3. Build the project:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

For development:
```bash
npm run dev
```

## API Endpoints

- `POST /api/dashboard` - Create a new dashboard entry
- `GET /api/dashboard` - Get all dashboard entries
- `GET /api/dashboard/:id` - Get a specific dashboard entry
- `PUT /api/dashboard/:id` - Update a dashboard entry
- `DELETE /api/dashboard/:id` - Delete a dashboard entry

## Request/Response Format

### Create/Update Dashboard
```json
{
  "altitude": 1000,
  "his": 180,
  "adi": 0
}
```

### Validation Rules
- `altitude`: Must be a non-negative number
- `his`: Must be a number between 0 and 360 degrees
- `adi`: Must be a number between -100 and 100

### Example Response
```json
{
  "_id": "65f2e8b7c261e8b7c261e8b7",
  "altitude": 1000,
  "his": 180,
  "adi": 0
}
```

## Technologies Used

- TypeScript
- Express.js
- MongoDB with Mongoose
- SOLID Principles 