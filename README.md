# ToolJet Embed App Setup

A complete solution for embedding ToolJet applications with Express.js backend and responsive HTML frontend.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A ToolJet instance with embed API access

## 🛠️ Installation

1. **Clone or create the project structure:**
   ```
   tooljet-embed-app/
   ├── server.js
   ├── package.json
   ├── .env
   └── public/
       └── index.html
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Edit the `.env` file with your actual values:
   ```env
   PORT=3000
   TOOLJET_EMBED_APP_URL=https://your-tooljet-instance.com/api/embed-app
   TOOLJET_AUTH_TOKEN=your-base64-encoded-auth-token
   ```
   
   Note: Email and App ID are now entered via the frontend form.

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `TOOLJET_EMBED_APP_URL` | ToolJet embed API endpoint | `http://localhost:8082/api/embed-app` |
| `TOOLJET_AUTH_TOKEN` | Base64 encoded auth token for Basic auth | `dG9vbGpldDp0b29samV0` |

**Frontend Form Fields:**
| Field | Description | Required | Example |
|-------|-------------|----------|---------|
| Email | User email for authentication | Yes | `admin@tooljet.com` |
| App ID | ToolJet application ID | Yes | `2e9be257-31ba-46bb-8451-fcb601227aa7` |
| Session Expiry | Session expiry time in milliseconds | No | `10000` |
| PAT Expiry | Personal Access Token expiry in milliseconds | No | `10000` |

## 🎯 How It Works

1. **Initial Load**: User accesses the root URL and sees the configuration form
2. **Configure**: User fills in email, app ID, and optional expiry settings
3. **Load App**: User clicks "Load App" button (enabled only when required fields are filled)
4. **API Call**: Frontend makes POST request to `/api/embed-app-url` with form data
5. **ToolJet API**: Backend calls ToolJet embed API with user credentials
6. **Iframe Load**: Frontend loads the returned `redirectUrl` in an iframe
7. **Message Handling**: Listens for messages from the embedded app
8. **Error Handling**: Shows re-authentication dialog on errors

## 📡 API Endpoints

### POST /api/embed-app-url

Calls the ToolJet embed API with user-provided credentials and optional expiry settings.

**Request Body:**
```json
{
  "email": "user@example.com",
  "appId": "2e9be257-31ba-46bb-8451-fcb601227aa7",
  "sessionExpiry": 10000,  // Optional
  "patExpiry": 10000       // Optional
}
```

**Response (Success):**
```json
{
  "success": true,
  "redirectUrl": "http://localhost:8082/embed-apps/app-id?personal-access-token=token"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": 400,
  "message": "Email and App ID are required"
}
```

## 🔄 Message Handling

The frontend listens for messages from the embedded ToolJet application:

```javascript
// Example message from ToolJet
{
  type: 'TJ_EMBED_APP_LOGOUT',
  error: 400,
  message: 'Missing token or appId'
}
```

When a logout message is received:
1. The iframe is hidden
2. An error dialog appears
3. User can choose to re-authenticate


## 🛡️ Error Handling

The application handles various error scenarios:

- **Network Errors**: API connection failures
- **Authentication Errors**: Invalid credentials or expired tokens
- **ToolJet App Errors**: Messages from the embedded application
- **Server Errors**: Backend processing issues

## 🔍 Troubleshooting

### Common Issues

1. **"Failed to load application"**
   - Check if ToolJet instance is running
   - Verify `TOOLJET_EMBED_APP_URL` is correct
   - Ensure network connectivity

2. **"Missing token or appId"**
   - Verify `USER_EMAIL` and `TOOLJET_APP_ID` in `.env`
   - Check if `TOOLJET_AUTH_TOKEN` is correctly base64 encoded
   - Ensure the user has access to the app

3. **"Authentication Failed"**
   - Verify `TOOLJET_AUTH_TOKEN` is valid and not expired
   - Check if the token has proper permissions for embed API

4. **CORS Issues**
   - Ensure ToolJet instance allows your domain
   - Check ToolJet CORS configuration

### Debug Mode

Enable detailed logging by checking the browser console and server logs:

```bash
# Server logs
npm run dev

# Browser console
F12 → Console tab
```

## 📁 Project Structure

```
tooljet-embed-app/
├── server.js              # Express.js server
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── README.md             # This file
└── public/
    └── index.html        # Frontend application
```

5. Submit a pull request

## 📞 Support

For issues related to:
- **ToolJet**: Refer to [ToolJet documentation](https://docs.tooljet.com/)
- **Express.js**: Check [Express.js documentation](https://expressjs.com/)