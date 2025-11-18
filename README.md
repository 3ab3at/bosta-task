# Personal Task Manager

A modern, responsive Personal Task Manager web application built with React, TypeScript, and Tailwind CSS. This application allows users to efficiently manage their daily tasks with API integration, drag-and-drop reordering, color-coded categories, and dark/light theme support.

## 🌟 Features

### Core Functionality
- ✅ **Task Management**: Add, edit, delete, and toggle completion status of tasks via API integration
- 🔄 **API Integration**: Full CRUD operations with DummyJSON API
- 🔍 **Filter & Search**: Filter tasks by status (All, Active, Completed) and search functionality
- 🎯 **Drag & Drop**: Reorder tasks by dragging them to new positions with visual feedback
- 🏷️ **Categories**: Create, edit, and manage custom color-coded categories with full CRUD operations
- 📅 **Due Dates**: Set due dates for tasks with calendar integration and overdue indicators
- 🌓 **Theme Toggle**: Switch between dark and light modes with localStorage persistence
- 💾 **Data Persistence**: localStorage for categories, due dates, and theme preferences (tasks managed via API)
- ⚠️ **Error Handling**: Graceful handling of API errors, network issues, and empty states
- ⌨️ **Keyboard Shortcuts**: Power user shortcuts for quick navigation and task management
- 📊 **Statistics & Analytics**: Comprehensive dashboard with completion rates, category breakdowns, and due date overview
- 📥 **Export Functionality**: Export tasks to JSON or CSV format with all metadata

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
│   │   ├── CategoryManager.tsx
│   │   ├── CategorySelector.tsx
│   │   ├── DatePicker.tsx
│   │   ├── ErrorDisplay.tsx
│   │   ├── ExportButton.tsx
│   │   ├── FilterBar.tsx
│   │   ├── KeyboardShortcutsHelp.tsx
│   │   ├── Statistics.tsx
│   │   ├── TaskList.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useCategories.ts
│   │   ├── useKeyboardShortcuts.ts
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
│   │   ├── export.ts
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
- Create, edit, and delete custom color-coded categories
- Pre-defined categories (Work, Personal, Shopping, Health, Other) available by default
- Color picker with 10 preset colors
- Assign categories to tasks with visual badges
- Categories persist in localStorage
- Full category management UI with expandable panel

### Theme Toggle
- Dark and light mode support
- Theme preference persists in localStorage
- Respects system preference on first load
- Smooth theme transitions

### Due Dates
- Set due dates for tasks with native date picker
- Visual indicators for overdue tasks (red), due today (orange), and upcoming tasks
- Relative date formatting (e.g., "Due in 3 days", "Overdue by 2 days")
- Due dates persist in localStorage
- Calendar integration with date selection

### Keyboard Shortcuts
- `Ctrl/Cmd + Shift + A` - Focus add task input
- `Ctrl/Cmd + K` or `/` - Focus search bar
- `Esc` - Cancel editing or close modals
- Keyboard shortcuts help modal accessible from header
- Smart detection to avoid conflicts when typing in inputs

### Statistics & Analytics
- Real-time completion statistics (total, completed, active, completion rate)
- Visual progress bar for completion percentage
- Tasks breakdown by category with individual progress bars
- Due date overview (overdue, due today, due this week)
- Statistics update automatically as tasks change

### Export Functionality
- Export all tasks to JSON format with full metadata (categories, due dates)
- Export tasks to CSV for spreadsheet compatibility
- Exported files include timestamps in filename
- One-click export from header button

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

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Shift + A` | Focus add task input |
| `Ctrl/Cmd + K` | Focus search bar |
| `/` | Focus search bar |
| `Esc` | Cancel editing / Close modals |
| `Enter` | Save task when editing |
| `Escape` | Cancel editing |

## 📝 Known Limitations

- Task reordering is local only (API doesn't support order persistence)
- Categories and due dates are stored locally (not synced with API)
- No user authentication (uses mock API)
- No task reminders or notifications
- No task priority levels

## 🚀 Future Enhancements

- Task priority levels
- Subtasks support
- Task notes/descriptions
- Task reminders and notifications
- Recurring tasks
- Task templates
- Collaboration features
- Task sharing

## 📄 License

This project is created as part of a technical assessment.

## 👤 Author
Abdelaty Rehab
Created as part of the Junior Frontend Engineer Assessment.

---

