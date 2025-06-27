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
   USER_EMAIL=your-email@example.com
   TOOLJET_APP_ID=your-app-id-here
   ```

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
| `USER_EMAIL` | User email for authentication | `admin@tooljet.com` |
| `TOOLJET_APP_ID` | ToolJet application ID | `2e9be257-31ba-46bb-8451-fcb601227aa7` |

## 🎯 How It Works

1. **Initial Load**: User accesses the root URL and sees the welcome page
2. **Load App**: User clicks "Load App" button
3. **API Call**: Frontend makes GET request to `/api/embed-app-url`
4. **ToolJet API**: Backend calls ToolJet embed API with credentials
5. **Iframe Load**: Frontend loads the returned `redirectUrl` in an iframe
6. **Message Handling**: Listens for messages from the embedded app
7. **Error Handling**: Shows re-authentication dialog on errors

## 📡 API Endpoints

### GET /api/embed-app-url

Calls the ToolJet embed API and returns the redirect URL.

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
  "error": 500,
  "message": "Error description"
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

The application handles error scenario:
- **ToolJet App Errors**: Messages from the embedded application


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

## 📞 Support

For issues related to:
- **This setup**: Check the troubleshooting section above
- **ToolJet**: Refer to [ToolJet documentation](https://docs.tooljet.com/)
- **Express.js**: Check [Express.js documentation](https://expressjs.com/)