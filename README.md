# BillEase Frontend

React + CSS + JavaScript frontend only.

## Run
1. Open this folder in VS Code.
2. Open Terminal.
3. Run:
   npm install
4. Then:
   npm run dev
5. Open the localhost URL shown by Vite.

## Login
Username: admin
Password: admin123

## Important
This version does NOT use localStorage and does NOT use a backend.
Products, customers and bills are kept only in React state, so refreshing the browser resets the data.

When you are ready to connect a backend, replace the state operations in `App.jsx` and the page submit/load logic with API calls.
