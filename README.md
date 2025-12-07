1. Overview (3–5 lines)
This project implements a Retail Sales Management dashboard for TruEstate.
It provides a single-page UI to search, filter, sort, and paginate retail transactions.
The backend exposes one transactions endpoint, while the frontend consumes it and presents a structured layout.

3. Tech Stack
 Backend: Node.js, Express
 Frontend: React (Create React App style), Axios
 Data: In-memory JSON seed

4. Search Implementation Summary
 Backend search over customer_name and customer_phone using a q query parameter.
 Case-insensitive substring matching implemented in the transactions service.

5. Filter Implementation Summary
 Filters include region, gender, age range, product category, tags, payment method, and date range.
 All filter logic lives in a single service function to avoid duplication.

6. Sorting Implementation Summary
 Backend-driven sorting with a sort query parameter (e.g., occurred_at_desc, quantity_asc, customer_name_asc).
 Sorting is applied after filtering and handles missing values gracefully.

7. Pagination Implementation Summary
 Pagination uses page and pageSize with validation.
 Backend returns data, total, page, and pageSize; frontend derives total pages and drives navigation.

8. Setup Instructions
Backend:https://truestateintern.onrender.com
   cd backend
   npm install
   npm start
 Frontend:https://truestateintern-9tbx.vercel.app/
   cd frontend
   npm install
 npm start
