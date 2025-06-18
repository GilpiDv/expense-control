# Expense Control

A simple and intuitive expense management application built with React, TypeScript, and Vite.

## Features

- Define and track your budget
- Add, update, and delete expenses
- Filter expenses by category
- Visualize budget usage with a circular progress bar
- Responsive and modern UI
- Persistent data using localStorage

## Project Structure

```
.
├── public/
│   └── [icons and images]
├── src/
│   ├── components/         # Reusable React components
│   ├── context/            # React context for global state
│   ├── data/               # Static data (categories)
│   ├── helpers/            # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── reducers/           # State reducers
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig*.json
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/expense-control.git
   cd expense-control
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Circular Progressbar](https://www.npmjs.com/package/react-circular-progressbar)
- [React Date Picker](https://www.npmjs.com/package/react-date-picker)
- [React Swipeable List](https://www.npmjs.com/package/react-swipeable-list)
- [uuid](https://www.npmjs.com/package/uuid)

## How to Use

1. Define your initial budget.
2. Add expenses by clicking the "+" button and filling out the form.
3. Filter expenses by category using the dropdown.
4. Update or delete expenses by swiping left or right on an expense item.
5. Track your available and expended budget visually.

## Live Demo

[https://sprightly-granita-f06415.netlify.app/](https://sprightly-granita-f06415.netlify.app/)