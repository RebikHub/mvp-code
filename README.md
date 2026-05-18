# Pet MVP

Production-ready frontend template for building modern web applications with React, TypeScript, and best practices.

## Tech Stack

- **React 18** — UI library
- **TypeScript** — type safety
- **Vite** — fast build tool
- **Zustand** — lightweight state management
- **TanStack Query (React Query)** — server state
- **React Hook Form** — form handling
- **React Router v6** — routing
- **AWS Cognito** — authentication
- **AWS S3** — file uploads
- **PWA** — offline support

## Project Structure

```
src/app/
├── api/              # API layer
│   ├── baseApi.ts    # Base API configuration
│   ├── endpoints/    # API endpoint definitions
│   ├── hooks/        # React Query hooks
│   ├── cognito/      # AWS Cognito integration
│   └── s3/           # AWS S3 file service
├── components/       # Reusable UI components
│   ├── ui-kit/       # Base UI components
│   ├── calendar/     # Calendar component
│   ├── modal/        # Modal system
│   ├── toast/        # Toast notifications
│   └── ...
├── pages/            # Page components
│   ├── auth/
│   ├── home/
│   ├── main/
│   └── layout/
├── router/           # Route definitions
├── store/            # Zustand stores
│   ├── user.ts       # User state
│   ├── order.ts      # Order state
│   └── ...
├── styles/           # Global styles
└── types/            # TypeScript types
```

## Features

### Authentication
- AWS Cognito integration
- User registration/login
- Password recovery
- Session management

### State Management
- **Server State**: TanStack Query with caching and optimistic updates
- **Client State**: Zustand with persist middleware
- Selectors for efficient re-renders

### Forms
- React Hook Form integration
- Type-safe form validation
- Reusable form components

### UI Components
- Button, Input, Select, Checkbox, Radio
- Calendar with date picker
- Modal system
- Toast notifications
- Tooltips
- Sidebar navigation
- Install PWA prompt

### PWA
- Service worker for offline support
- Web app manifest
- Install prompt

### Localization
- Multi-language support
- RTL support ready

### AWS Integration
- S3 file upload/download
- Presigned URLs
- File type validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```
