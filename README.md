# Personal Task Manager

A modern, responsive Personal Task Manager web application built with React, TypeScript, and Tailwind CSS. This application allows users to efficiently manage their daily tasks with API integration, drag-and-drop reordering, color-coded categories, and dark/light theme support.

## 🌟 Features

### Core Functionality
- ✅ **Task Management**: Add, edit, delete, and toggle completion status of tasks via API integration
- 🔄 **API Integration**: Full CRUD operations with DummyJSON API
- 🔍 **Filter & Search**: Filter tasks by status (All, Active, Completed) and search functionality
- 🎯 **Drag & Drop**: Reorder tasks by dragging them to new positions with visual feedback
- 🏷️ **Categories**: Create and assign color-coded categories to tasks
- 🌓 **Theme Toggle**: Switch between dark and light modes with localStorage persistence
- 💾 **Data Persistence**: localStorage for categories and theme preferences (tasks managed via API)
- ⚠️ **Error Handling**: Graceful handling of API errors, network issues, and empty states

### Technical Features
- ⚡ Built with React 18 and TypeScript
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design (mobile-first approach)
- ♿ Accessibility compliant (WCAG AA)
- ⌨️ Keyboard navigation support
- 🎭 Smooth animations and micro-interactions
- 🔄 Loading states and skeleton screens

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bosta-task
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Technology Stack

- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type safety
- **Vite 5.0.8** - Build tool and dev server
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **react-beautiful-dnd 13.1.1** - Drag and drop functionality
- **DummyJSON API** - Mock API for task management

## 📁 Project Structure

```
bosta-task/
├── src/
│   ├── components/          # React components
│   │   ├── AddTaskForm.tsx
│   │   ├── CategorySelector.tsx
│   │   ├── ErrorDisplay.tsx
│   │   ├── FilterBar.tsx
│   │   ├── TaskList.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useCategories.ts
│   │   ├── useTaskFilter.ts
│   │   ├── useTasks.ts
│   │   └── useTheme.ts
│   ├── services/            # API service layer
│   │   └── api.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── category.ts
│   │   ├── filter.ts
│   │   └── task.ts
│   ├── utils/               # Utility functions
│   │   └── taskStorage.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind config
└── vite.config.ts           # Vite config
```

## 🎯 API Integration

The application integrates with the DummyJSON API for task management:

- **Base URL**: `https://dummyjson.com`
- **Endpoints**:
  - `GET /todos` - Fetch all tasks
  - `GET /todos/{id}` - Fetch specific task
  - `POST /todos/add` - Create new task
  - `PUT /todos/{id}` - Update existing task
  - `DELETE /todos/{id}` - Delete task

### API Features
- No authentication required
- Realistic mock data responses
- Standard REST API patterns
- JSON request/response format

## 🎨 Features in Detail

### Task Management
- Add new tasks with a simple form
- Edit tasks inline by clicking on the task text
- Delete tasks with a confirmation-style button
- Toggle task completion status with checkboxes
- All operations sync with the API in real-time

### Filtering & Search
- Filter tasks by status: All, Active, or Completed
- Real-time search across all tasks
- Combined filtering and search for precise results

### Drag & Drop
- Reorder tasks by dragging the handle icon
- Visual feedback during dragging
- Smooth animations and transitions

### Categories
- Pre-defined color-coded categories (Work, Personal, Shopping, Health, Other)
- Assign categories to tasks
- Categories persist in localStorage
- Visual category badges on tasks

### Theme Toggle
- Dark and light mode support
- Theme preference persists in localStorage
- Respects system preference on first load
- Smooth theme transitions

### Error Handling
- Network error detection
- Request timeout handling (10 seconds)
- Input validation
- User-friendly error messages
- Retry functionality for failed requests

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px and up (mobile-first approach)
- **Tablet**: 768px and up
- **Desktop**: 1024px and up

## ♿ Accessibility

- WCAG AA compliant color contrast ratios
- Full keyboard navigation support
- Screen reader friendly markup
- Focus indicators for all interactive elements
- ARIA labels and roles where appropriate

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Functional components with hooks
- Modern ES6+ syntax with async/await

## 📝 Known Limitations

- Task reordering is local only (API doesn't support order persistence)
- Categories are stored locally (not synced with API)
- No user authentication (uses mock API)
- No due dates or reminders (future enhancement)

## 🚀 Future Enhancements

- Due dates with calendar integration
- Keyboard shortcuts for power users
- Export tasks to JSON/CSV functionality
- Task completion statistics and analytics
- Task priority levels
- Subtasks support
- Task notes/descriptions

## 📄 License

This project is created as part of a technical assessment.

## 👤 Author

Created as part of the Junior Frontend Engineer Assessment.

---

**Note**: This application uses the DummyJSON API for demonstration purposes. In a production environment, you would replace this with your own backend API.

