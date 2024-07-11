# feearo-web-note
Web App assigned by Feearo

## Installation

1. Download and Install Node & MongoDB and open mongodb server

2. Install node modules


 ``` bash
npm install
cd client
npm install
```

## Create .env file in root of application
### `.env` variables

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/notes
JWT_SECRET=your_jwt_secret
```

3. run server
```bash
node server.js
cd client
npm start
```