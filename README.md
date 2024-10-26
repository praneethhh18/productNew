# Delivery Estimation App

A React Native application for estimating product delivery dates based on pincode and logistics provider.

## Features

- Product catalog with 5000+ items
- Pincode-based delivery estimation
- Real-time delivery countdown timer
- Support for multiple logistics providers
- Responsive and user-friendly interface

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Key Design Decisions

- Used React Native for cross-platform compatibility
- Implemented efficient product filtering and search
- Modular component architecture for maintainability
- Real-time delivery time calculations
- Optimized performance for large datasets

## Assumptions

- Product availability is randomly generated (80% in stock)
- Limited set of pincodes for demonstration
- Simplified logistics provider rules
- All times are in local timezone

## Tech Stack

- React Native
- TypeScript
- React Navigation
- date-fns for date manipulation
- Zustand for state management

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Main application screens
├── utils/          # Helper functions and utilities
├── types/         # TypeScript type definitions
└── App.tsx        # Application entry point
```