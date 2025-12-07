1. Overview (3–5 lines)
This project implements a Retail Sales Management dashboard for TruEstate.
It provides a single-page UI to search, filter, sort, and paginate retail transactions.
The backend exposes one transactions endpoint, while the frontend consumes it and presents a structured layout.

2. Tech Stack
- Backend: Node.js, Express
- Frontend: React (Create React App style), Axios
- Data: In-memory JSON seed

3. Search Implementation Summary
- Backend search over customer_name and customer_phone using a q query parameter.
- Case-insensitive substring matching implemented in the transactions service.

4. Filter Implementation Summary
- Filters include region, gender, age range, product category, tags, payment method, and date range.
- All filter logic lives in a single service function to avoid duplication.

5. Sorting Implementation Summary
- Backend-driven sorting with a sort query parameter (e.g., occurred_at_desc, quantity_asc, customer_name_asc).
- Sorting is applied after filtering and handles missing values gracefully.

6. Pagination Implementation Summary
- Pagination uses page and pageSize with validation.
- Backend returns data, total, page, and pageSize; frontend derives total pages and drives navigation.

7. Setup Instructions
- Backend:
  - cd backend
  - npm install
  - npm start
- Frontend:
  - cd frontend
  - npm install
  - npm start
- Visit http://localhost:3000 in your browser.
