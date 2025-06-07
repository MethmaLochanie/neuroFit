⚠ **Notice**

This project is proprietary. No use, reproduction, modification, or distribution of this software or its source code is allowed without explicit written permission from the author, Methma Lochanie Rathnayaka.

If you wish to reference this work or request usage permissions, please contact the author directly.

Unauthorized use will be considered a violation of copyright and may lead to legal action.


# NeuroFit

NeuroFit is a full-stack application that combines machine learning capabilities with a modern web interface for neurological fitness assessment and analysis.

## Project Structure

The project is divided into three main components:

### 1. Client (Frontend)
- Built with React and TypeScript
- Uses modern UI libraries including Ant Design and PrimeReact
- Features:
  - Redux for state management
  - React Router for navigation
  - Axios for API communication
  - Modern UI components and icons

### 2. Server (Backend)
- Node.js/Express.js backend
- MongoDB database integration
- Features:
  - JWT authentication
  - Azure Blob Storage integration
  - File upload handling with Multer
  - CORS support
  - Secure password handling with bcrypt

### 3. ML-API (Machine Learning Service)
- Python-based machine learning service
- Features:
  - PyTorch for deep learning
  - Transformers library integration
  - Torch Geometric for graph neural networks
  - Flask web framework
  - Model training and inference capabilities

## Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- MongoDB
- Azure Storage Account (for file storage)

## Installation

### Client Setup
```bash
cd Client
npm install
npm start
```

### Server Setup
```bash
cd Server
npm install
# Create a .env file with required environment variables
npm run dev
```

### ML-API Setup
```bash
cd ml-api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Environment Variables

### Server (.env)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
AZURE_STORAGE_CONNECTION_STRING=your_azure_connection_string


## Development

- Client runs on: http://localhost:3000
- Server runs on: http://localhost:5000
- ML-API runs on: http://localhost:5001

## Features

- User authentication and authorization
- Secure file upload and storage
- Machine learning model integration
- Real-time data processing
- Modern, responsive UI
- Graph-based neural network analysis

## Dependencies

### Client
- React 18
- TypeScript
- Ant Design
- PrimeReact
- Redux Toolkit
- React Router DOM

### Server
- Express.js
- MongoDB/Mongoose
- JWT
- Azure Storage
- Multer
- CORS

### ML-API
- PyTorch
- Transformers
- Flask
- Torch Geometric
- NumPy
- SciPy

## License

This project is licensed under the proprietary License.
