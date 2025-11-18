# Personal Task Manager - Project Documentation

## Table of Contents
1. [Project Description and Key Features](#project-description-and-key-features)
2. [Installation and Setup Instructions](#installation-and-setup-instructions)
3. [Technology Stack and Dependencies](#technology-stack-and-dependencies)
4. [Screenshots or GIF Demonstrations](#screenshots-or-gif-demonstrations)
5. [Known Limitations and Future Enhancements](#known-limitations-and-future-enhancements)
6. [Personal Reflection on Development Process](#personal-reflection-on-development-process)

---

## Project Description and Key Features

### Overview
The Personal Task Manager is a modern, full-featured web application designed to help users efficiently manage their daily tasks. Built with React 18, TypeScript, and Tailwind CSS, it provides a clean, intuitive interface with powerful features including API integration, drag-and-drop reordering, color-coded categories, dark/light theme support, and comprehensive task analytics.

This application was developed as part of a technical assessment, demonstrating proficiency in modern front-end development practices, API integration, state management, and user experience design.

### Core Features

#### 1. Task Management (CRUD Operations)
- **Create**: Add new tasks through a simple, accessible form with keyboard shortcut support
- **Read**: View all tasks with real-time updates from the API
- **Update**: Edit tasks inline by clicking on the task text, with instant save functionality
- **Delete**: Remove tasks with a clear, accessible delete button
- **Toggle Completion**: Mark tasks as complete or incomplete with checkboxes
- **Real-time Sync**: All operations synchronize with the DummyJSON API immediately

#### 2. API Integration
- Full REST API integration with DummyJSON (`https://dummyjson.com`)
- Endpoints utilized:
  - `GET /todos` - Fetch all tasks
  - `GET /todos/{id}` - Fetch specific task
  - `POST /todos/add` - Create new task
  - `PUT /todos/{id}` - Update existing task
  - `DELETE /todos/{id}` - Delete task
- Comprehensive error handling for network failures, timeouts (10-second limit), and API errors
- Loading states and user feedback for all async operations
- Input validation to prevent invalid data submission

#### 3. Drag and Drop Reordering
- Intuitive drag-and-drop interface using `@hello-pangea/dnd` (React 18 compatible)
- Visual feedback during dragging (scale, shadow, border highlight)
- Smooth animations and transitions
- Drag handle icon for clear affordance
- Disabled during editing states to prevent conflicts
- Immediate state updates for instant feedback
- Works seamlessly with filtered and searched task lists

#### 4. Color-Coded Categories
- **Pre-defined Categories**: Work, Personal, Shopping, Health, and Other (with default colors)
- **Custom Categories**: Create unlimited custom categories with color selection
- **Category Management**: Full CRUD operations for categories:
  - Create new categories with custom names and colors
  - Edit existing category names and colors
  - Delete categories (with automatic cleanup from tasks)
- **Color Picker**: 10 preset colors for easy selection
- **Visual Badges**: Color-coded category badges on each task
- **Category Assignment**: Click on category badge or "Add category" button to assign/change categories
- **Persistence**: Categories stored in localStorage for offline access
- **Category Statistics**: View task breakdown by category in statistics panel

#### 5. Due Date Management
- Native HTML5 date picker for easy date selection
- **Visual Indicators**:
  - Red: Overdue tasks
  - Orange: Due today
  - Default: Upcoming tasks
- **Relative Date Formatting**: Displays "Due in 3 days", "Overdue by 2 days", etc.
- **Calendar Integration**: Click date picker icon to open calendar
- **Due Date Overview**: Statistics panel shows overdue, due today, and due this week counts
- **Persistence**: Due dates stored in localStorage

#### 6. Dark/Light Theme Toggle
- Seamless theme switching between dark and light modes
- **System Preference Detection**: Respects user's system theme on first load
- **Persistence**: Theme preference saved in localStorage
- **Smooth Transitions**: Animated theme changes for better UX
- **Accessibility**: Maintains WCAG AA contrast ratios in both themes
- **Theme Toggle Button**: Easily accessible in the header

#### 7. Filtering and Search
- **Status Filtering**: Filter tasks by:
  - All tasks
  - Active (incomplete) tasks
  - Completed tasks
- **Real-time Search**: Search across all task text with instant results
- **Combined Filtering**: Search and status filters work together
- **Keyboard Shortcuts**: Quick access via `/` or `Ctrl/Cmd + K`
- **Clear Visual Feedback**: Active filter state clearly indicated

#### 8. Keyboard Shortcuts
- **Platform-Aware Display**: Shows `⌘` on Mac, `Ctrl` on Windows/Linux
- **Available Shortcuts**:
  - `Ctrl/Cmd + Shift + A`: Focus add task input
  - `Ctrl/Cmd + K` or `/`: Focus search bar
  - `Esc`: Cancel editing, close modals, or cancel category selection
  - `Enter`: Save task when editing
- **Smart Detection**: Shortcuts disabled when typing in input fields
- **Help Modal**: Accessible keyboard shortcuts reference modal
- **Escape Key Handling**: Comprehensive Escape key support for closing all modals and canceling operations

#### 9. Statistics and Analytics
- **Completion Statistics**:
  - Total tasks count
  - Completed tasks count
  - Active tasks count
  - Completion percentage with visual progress bar
- **Category Breakdown**: 
  - Task count per category
  - Individual progress bars for each category
  - Visual representation of category distribution
- **Due Date Overview**:
  - Overdue tasks count
  - Due today count
  - Due this week count
- **Real-time Updates**: Statistics update automatically as tasks change
- **Visual Design**: Clean, card-based layout with color-coded indicators

#### 10. Export Functionality
- **JSON Export**: Export all tasks with full metadata (categories, due dates) in JSON format
- **CSV Export**: Export tasks to CSV for spreadsheet compatibility
- **Timestamped Filenames**: Exported files include timestamps for easy organization
- **One-Click Export**: Simple dropdown menu in header
- **Complete Data**: Includes all task properties, categories, and due dates

#### 11. Error Handling
- **Network Error Detection**: Handles connection failures gracefully
- **Timeout Handling**: 10-second timeout for API requests
- **Input Validation**: Prevents invalid data submission
- **User-Friendly Messages**: Clear error messages with actionable information
- **Error Display**: Dedicated error display component with retry suggestions
- **Empty States**: Helpful messages when no tasks are found
- **Loading States**: Visual feedback during async operations

#### 12. Responsive Design
- **Mobile-First Approach**: Designed for mobile devices first, enhanced for larger screens
- **Breakpoints**:
  - Mobile: 320px and up
  - Tablet: 768px and up
  - Desktop: 1024px and up
- **Touch-Friendly**: Large touch targets for mobile interaction
- **Adaptive Layout**: Components reorganize for optimal viewing on all screen sizes
- **Responsive Typography**: Font sizes scale appropriately

#### 13. Accessibility (WCAG AA Compliant)
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and roles
- **Color Contrast**: WCAG AA compliant contrast ratios in both themes
- **Focus Indicators**: Clear focus states for all interactive elements
- **Semantic HTML**: Proper use of semantic HTML elements
- **Alt Text**: Descriptive labels for all icons and images

---

## Installation and Setup Instructions

### Prerequisites

Before installing the application, ensure you have the following installed on your system:

- **Node.js**: Version 16.0.0 or higher
  - Check your version: `node --version`
  - Download from: [nodejs.org](https://nodejs.org/)
- **npm**: Version 7.0.0 or higher (comes with Node.js)
  - Check your version: `npm --version`
  - Alternative: **yarn** (v1.22.0 or higher) can be used instead of npm

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd bosta-task
```

If you don't have the repository URL, you can download the project files and navigate to the project directory.

#### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

This command will install all required dependencies listed in `package.json`, including:
- React 18.2.0
- TypeScript 5.2.2
- Vite 5.0.8
- Tailwind CSS 3.4.0
- @hello-pangea/dnd 16.3.0
- And all development dependencies

**Expected Output**: The installation should complete without errors. You'll see a `node_modules` directory created with all dependencies.

#### 3. Start the Development Server

```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

**Expected Output**: 
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

#### 4. Access the Application

Open your web browser and navigate to:
```
http://localhost:5173
```

The application should load and display the Personal Task Manager interface.

### Development Scripts

The project includes several npm scripts for different purposes:

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server with hot module replacement |
| `npm run build` | Creates an optimized production build |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint to check code quality |

### Building for Production

To create a production build:

```bash
npm run build
```

This will:
1. Run TypeScript type checking
2. Compile and optimize the code
3. Create a `dist` directory with the production-ready files

To preview the production build:

```bash
npm run preview
```

### Troubleshooting

#### Common Issues

1. **Port Already in Use**
   - If port 5173 is already in use, Vite will automatically try the next available port
   - You can also specify a port: `npm run dev -- --port 3000`

2. **Node Version Issues**
   - Ensure you're using Node.js 16 or higher
   - Use `nvm` (Node Version Manager) to switch versions if needed

3. **Dependency Installation Errors**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again
   - On Mac/Linux, you might need `sudo` for global packages (not recommended)

4. **TypeScript Errors**
   - Run `npm run lint` to see detailed error messages
   - Ensure all files have proper TypeScript types

5. **API Connection Issues**
   - The app uses DummyJSON API which should be publicly accessible
   - Check your internet connection
   - Verify the API is reachable: `https://dummyjson.com/todos`

### Environment Setup

The application doesn't require any environment variables for basic functionality. All configuration is done through:
- `vite.config.ts` - Vite and build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

### Browser Compatibility

The application is tested and works on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Technology Stack and Dependencies

### Core Technologies

#### Frontend Framework
- **React 18.2.0**
  - Modern React with hooks and functional components
  - Concurrent rendering capabilities
  - Strict Mode enabled for better development experience
  - Purpose: UI library for building component-based interface

#### Programming Language
- **TypeScript 5.2.2**
  - Strict type checking enabled
  - Enhanced developer experience with IntelliSense
  - Compile-time error detection
  - Purpose: Type safety and improved code quality

#### Build Tool
- **Vite 5.0.8**
  - Lightning-fast development server
  - Hot Module Replacement (HMR)
  - Optimized production builds
  - Purpose: Build tool and development server

#### Styling
- **Tailwind CSS 3.4.0**
  - Utility-first CSS framework
  - Responsive design utilities
  - Dark mode support built-in
  - Purpose: Rapid UI development with consistent design system

#### Drag and Drop
- **@hello-pangea/dnd 16.3.0**
  - React 18 compatible fork of react-beautiful-dnd
  - Smooth drag and drop animations
  - Accessible drag and drop implementation
  - Purpose: Task reordering functionality

### Development Dependencies

#### Type Definitions
- **@types/react 18.2.43**: TypeScript definitions for React
- **@types/react-dom 18.2.17**: TypeScript definitions for React DOM

#### Linting and Code Quality
- **ESLint 8.55.0**: JavaScript/TypeScript linter
- **@typescript-eslint/eslint-plugin 6.14.0**: TypeScript-specific ESLint rules
- **@typescript-eslint/parser 6.14.0**: ESLint parser for TypeScript
- **eslint-plugin-react-hooks 4.6.0**: React Hooks linting rules
- **eslint-plugin-react-refresh 0.4.5**: React Fast Refresh linting

#### Build Tools
- **@vitejs/plugin-react 4.2.1**: Vite plugin for React support
- **autoprefixer 10.4.16**: Automatic vendor prefixing for CSS
- **postcss 8.4.32**: CSS transformation tool

### Project Architecture

#### Component Structure
```
src/
├── components/          # Reusable UI components
│   ├── AddTaskForm.tsx
│   ├── CategoryManager.tsx
│   ├── CategorySelector.tsx
│   ├── DatePicker.tsx
│   ├── ErrorDisplay.tsx
│   ├── ExportButton.tsx
│   ├── FilterBar.tsx
│   ├── KeyboardShortcutsHelp.tsx
│   ├── Statistics.tsx
│   ├── TaskList.tsx
│   └── ThemeToggle.tsx
├── hooks/              # Custom React hooks
│   ├── useCategories.ts
│   ├── useKeyboardShortcuts.ts
│   ├── useTaskFilter.ts
│   ├── useTasks.ts
│   └── useTheme.ts
├── services/           # API service layer
│   └── api.ts
├── types/              # TypeScript type definitions
│   ├── category.ts
│   ├── filter.ts
│   └── task.ts
├── utils/              # Utility functions
│   ├── export.ts
│   └── taskStorage.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

#### Design Patterns Used

1. **Custom Hooks Pattern**: Business logic separated into reusable hooks
2. **Component Composition**: Small, focused components that compose together
3. **Separation of Concerns**: UI, business logic, and data access separated
4. **Type Safety**: Comprehensive TypeScript types throughout
5. **Error Boundaries**: Graceful error handling at component level

### API Integration

- **Base URL**: `https://dummyjson.com`
- **Protocol**: REST API over HTTPS
- **Data Format**: JSON
- **Authentication**: None required (mock API)
- **Rate Limiting**: Not applicable for this mock API

### Data Persistence

- **API**: Tasks stored via DummyJSON API
- **localStorage**: 
  - Categories (custom categories and assignments)
  - Due dates (task due date assignments)
  - Theme preference (dark/light mode)
- **No Database**: Application uses external API and browser storage

### Configuration Files

- **package.json**: Project metadata and dependencies
- **tsconfig.json**: TypeScript compiler configuration
- **tsconfig.node.json**: TypeScript config for Node.js tooling
- **vite.config.ts**: Vite build tool configuration (includes CSP headers)
- **tailwind.config.js**: Tailwind CSS configuration
- **postcss.config.js**: PostCSS configuration for Tailwind
- **.eslintrc.cjs**: ESLint configuration

---

## Screenshots or GIF Demonstrations

### Note on Screenshots/GIFs

Due to the text-based nature of this documentation, actual screenshots and GIFs cannot be included. However, the following sections describe what visual demonstrations would show:

### Recommended Screenshots/GIFs to Include

#### 1. Main Application Interface
**Description**: Full application view showing:
- Header with title, export button, keyboard shortcuts help, and theme toggle
- Category manager panel (collapsed/expanded states)
- Add task form
- Statistics panel with completion metrics
- Filter bar with search and status filters
- Task list with multiple tasks showing categories and due dates

**Key Elements to Highlight**:
- Clean, modern UI design
- Dark/light theme examples
- Responsive layout on different screen sizes

#### 2. Task Management Features
**Screenshot/GIF Sequence**:
- Adding a new task (form interaction)
- Editing a task inline (click to edit, save)
- Toggling task completion (checkbox interaction)
- Deleting a task (delete button interaction)
- Task list with various states (completed, active, with categories, with due dates)

#### 3. Drag and Drop Demonstration
**Animated GIF Recommended**:
- Dragging a task from one position to another
- Visual feedback during drag (scaling, shadow, border highlight)
- Smooth drop animation
- Final reordered list

#### 4. Category Management
**Screenshot/GIF Sequence**:
- Category manager panel expanded
- Creating a new category (name input, color selection)
- Editing an existing category
- Assigning category to a task (clicking category badge)
- Task list showing color-coded category badges

#### 5. Due Date Management
**Screenshot/GIF Sequence**:
- Clicking date picker icon
- Calendar popup with date selection
- Task showing due date with color indicator (red for overdue, orange for today)
- Relative date formatting display ("Due in 3 days")

#### 6. Filtering and Search
**Screenshot/GIF Sequence**:
- Using search bar to filter tasks
- Switching between filter statuses (All, Active, Completed)
- Combined search and filter results
- Empty state when no tasks match

#### 7. Statistics Dashboard
**Screenshot**:
- Statistics panel showing:
  - Completion percentage with progress bar
  - Category breakdown with individual progress bars
  - Due date overview (overdue, due today, due this week)

#### 8. Export Functionality
**Screenshot/GIF**:
- Export button dropdown menu
- Selecting JSON or CSV export
- Downloaded file preview (showing exported data structure)

#### 9. Keyboard Shortcuts
**Screenshot**:
- Keyboard shortcuts help modal
- Demonstrating shortcuts in action:
  - `Cmd/Ctrl + Shift + A` focusing add task input
  - `/` or `Cmd/Ctrl + K` focusing search
  - `Esc` closing modals

#### 10. Theme Toggle
**Animated GIF Recommended**:
- Toggling between dark and light themes
- Smooth transition animation
- UI elements adapting to theme change

#### 11. Responsive Design
**Screenshot Series**:
- Mobile view (320px+)
- Tablet view (768px+)
- Desktop view (1024px+)
- Showing how layout adapts to different screen sizes

#### 12. Error Handling
**Screenshot**:
- Error display component showing network error
- Empty state when no tasks available
- Loading states during API calls

### How to Create Screenshots/GIFs

1. **Screenshots**: Use browser developer tools or screenshot tools
2. **GIFs**: Use tools like:
   - **LICEcap** (Windows/Mac)
   - **Peek** (Linux)
   - **Kap** (Mac)
   - Browser extensions for screen recording

3. **Recommended Tools for Animated Demonstrations**:
   - Screen recording software (OBS, QuickTime)
   - Convert to GIF using online tools or FFmpeg

---

## Known Limitations and Future Enhancements

### Known Limitations

#### 1. API-Related Limitations
- **No Order Persistence**: Task reordering is local only. The DummyJSON API doesn't support persisting task order, so when the page is refreshed, tasks return to their original order.
- **No User Authentication**: The application uses a mock API without authentication. All users see the same shared task list.
- **Limited API Features**: The DummyJSON API has limited functionality compared to a production API (no user-specific data, no advanced filtering, etc.).

#### 2. Data Persistence Limitations
- **Local Storage Only**: Categories and due dates are stored in browser localStorage, which means:
  - Data is browser-specific (doesn't sync across devices)
  - Data can be lost if browser data is cleared
  - No cloud synchronization
  - Limited storage capacity (~5-10MB depending on browser)
- **No Offline Support**: The application requires an internet connection to fetch and update tasks from the API.

#### 3. Feature Limitations
- **No Task Priority Levels**: Tasks cannot be assigned priority levels (high, medium, low).
- **No Subtasks**: Tasks cannot have nested subtasks or checklists.
- **No Task Notes/Descriptions**: Tasks only have a title; no additional description or notes field.
- **No Task Reminders**: No notification system for due dates or reminders.
- **No Recurring Tasks**: Cannot create tasks that repeat daily, weekly, monthly, etc.
- **No Task Templates**: Cannot save and reuse task templates.
- **No Task Attachments**: Cannot attach files, images, or links to tasks.
- **No Task Tags**: Only categories are supported, not multiple tags per task.
- **No Task Dependencies**: Cannot set task dependencies (task B depends on task A).

#### 4. Collaboration Limitations
- **No Multi-User Support**: Cannot share tasks or collaborate with other users.
- **No Task Assignment**: Cannot assign tasks to different users or team members.
- **No Comments/Activity Feed**: No way to add comments or see task activity history.
- **No Real-Time Updates**: Changes made by one user (if multi-user) wouldn't appear in real-time for others.

#### 5. UI/UX Limitations
- **No Undo/Redo**: Cannot undo or redo actions.
- **No Bulk Operations**: Cannot select multiple tasks for bulk delete, category assignment, etc.
- **No Task Archiving**: Cannot archive completed tasks (only delete).
- **No Custom Views**: Cannot create custom filtered views or saved searches.
- **No Keyboard Shortcuts for All Actions**: Some actions don't have keyboard shortcuts.

#### 6. Performance Limitations
- **No Virtualization**: All tasks are rendered at once, which could be slow with hundreds of tasks.
- **No Pagination**: All tasks load at once without pagination.
- **No Lazy Loading**: All components load immediately.

#### 7. Accessibility Limitations
- **Limited Screen Reader Testing**: While ARIA labels are included, comprehensive screen reader testing with actual users hasn't been conducted.
- **No High Contrast Mode**: No dedicated high contrast theme option.

#### 8. Browser Compatibility
- **No IE11 Support**: The application uses modern JavaScript features not supported in Internet Explorer 11.
- **Requires Modern Browser**: Requires browsers with ES6+ support.

### Future Enhancements

#### High Priority Enhancements

1. **User Authentication and Multi-User Support**
   - User registration and login
   - User-specific task lists
   - Task sharing between users
   - Team collaboration features

2. **Enhanced Task Features**
   - Task priority levels (high, medium, low, none)
   - Subtasks and checklists
   - Task notes/descriptions
   - Task attachments (files, images, links)
   - Multiple tags per task (in addition to categories)

3. **Improved Data Persistence**
   - Cloud synchronization
   - Cross-device sync
   - Offline support with sync when online
   - API support for categories and due dates

4. **Task Reminders and Notifications**
   - Browser notifications for due dates
   - Email reminders
   - Push notifications (for PWA)
   - Custom reminder times

5. **Recurring Tasks**
   - Daily, weekly, monthly, yearly recurrence
   - Custom recurrence patterns
   - Recurrence end dates

#### Medium Priority Enhancements

6. **Advanced Filtering and Views**
   - Custom saved views
   - Advanced search with filters (date range, category, priority)
   - Task sorting options (by date, priority, category, etc.)
   - Task grouping options

7. **Bulk Operations**
   - Multi-select tasks
   - Bulk delete, complete, category assignment
   - Bulk due date assignment

8. **Task Templates**
   - Create task templates
   - Quick task creation from templates
   - Template library

9. **Task Dependencies**
   - Set task dependencies
   - Visual dependency graph
   - Automatic task blocking/unblocking

10. **Enhanced Statistics and Analytics**
    - Time tracking
    - Productivity metrics
    - Task completion trends over time
    - Category performance analysis
    - Export statistics to reports

11. **UI/UX Improvements**
    - Undo/redo functionality
    - Task archiving (instead of deletion)
    - Custom themes (beyond dark/light)
    - Customizable layout
    - Drag and drop for categories

12. **Performance Optimizations**
    - Virtual scrolling for large task lists
    - Pagination or infinite scroll
    - Lazy loading of components
    - Code splitting
    - Service worker for offline support

#### Lower Priority Enhancements

13. **Advanced Collaboration**
    - Task assignment to team members
    - Comments and activity feed
    - Real-time collaborative editing
    - Task mentions and notifications

14. **Integration Features**
    - Calendar integration (Google Calendar, Outlook)
    - Email integration
    - Third-party app integrations (Slack, Trello, etc.)
    - API for third-party integrations

15. **Mobile App**
    - Native mobile app (React Native)
    - Progressive Web App (PWA) enhancements
    - Mobile-specific features (camera for attachments, location, etc.)

16. **Advanced Features**
    - Task time estimation and tracking
    - Gantt chart view
    - Kanban board view
    - Calendar view
    - Task automation and workflows
    - AI-powered task suggestions

17. **Accessibility Enhancements**
    - High contrast mode
    - Font size customization
    - Comprehensive screen reader testing and improvements
    - Keyboard navigation for all features

18. **Internationalization**
    - Multi-language support
    - Date/time localization
    - RTL (Right-to-Left) language support

---

## Personal Reflection on Development Process

### Project Overview and Initial Approach

This project was developed as part of a technical assessment for a Junior Frontend Engineer position. The task required building a comprehensive task management application with specific core requirements and optional features. My approach was to start with a solid foundation and incrementally build features, ensuring each component was well-tested and functional before moving to the next.

### Development Methodology

#### Incremental Development and Git Commits
I adopted an incremental development approach, breaking down the project into logical, commit-sized chunks. Each feature was implemented, tested, and committed separately, which provided several benefits:

1. **Clear History**: Each commit represents a complete, working feature or fix
2. **Easy Rollback**: If an issue arose, I could easily revert to a previous working state
3. **Better Organization**: The commit history serves as a development log
4. **Learning Documentation**: Each commit message explains what was done and why

This approach was particularly valuable when debugging issues, as I could trace exactly when and why changes were made.

#### Technology Choices and Rationale

**React 18 with TypeScript**: I chose React 18 for its modern features and excellent developer experience. TypeScript was essential for catching errors early and providing better IDE support. The strict type checking helped prevent many potential runtime errors.

**Vite**: I selected Vite over Create React App because of its significantly faster development server and build times. The HMR (Hot Module Replacement) is nearly instantaneous, which greatly improved development speed.

**Tailwind CSS**: I chose Tailwind for rapid UI development. The utility-first approach allowed me to build a consistent, responsive design quickly without writing custom CSS. The built-in dark mode support was a bonus.

**@hello-pangea/dnd**: Initially, I used `react-beautiful-dnd`, but encountered React 18 compatibility issues. I switched to `@hello-pangea/dnd`, a maintained fork that works seamlessly with React 18. This experience taught me the importance of checking library compatibility and having fallback options.

### Challenges Encountered and Solutions

#### Challenge 1: Drag and Drop Compatibility
**Problem**: The original `react-beautiful-dnd` library had compatibility issues with React 18's Strict Mode, causing "Unable to find draggable" errors.

**Solution**: Researched alternatives and found `@hello-pangea/dnd`, a maintained fork specifically designed for React 18. After switching, I also had to refine the drag implementation to prevent event propagation conflicts with interactive elements within draggable items.

**Learning**: Always check library compatibility with your React version, and have a backup plan for critical dependencies.

#### Challenge 2: Event Propagation in Drag and Drop
**Problem**: Interactive elements (checkboxes, buttons) within draggable tasks were interfering with drag functionality.

**Solution**: Added `stopPropagation()` to all interactive elements and used `isDragDisabled` to disable dragging during editing states. This required careful event handling to ensure both drag and click interactions worked correctly.

**Learning**: Complex interactions require careful event management. Testing user interactions thoroughly is crucial.

#### Challenge 3: Keyboard Shortcut Conflicts
**Problem**: Initial shortcut `Ctrl+N` conflicted with browser's "New Window" function, and `Cmd+Shift+N` conflicted with incognito mode.

**Solution**: Changed to `Cmd/Ctrl+Shift+A` which is less likely to conflict with browser shortcuts. Also implemented platform-aware display to show `⌘` on Mac and `Ctrl` on Windows/Linux.

**Learning**: Always consider platform differences and browser conflicts when implementing keyboard shortcuts. User testing on different platforms is valuable.

#### Challenge 4: Content Security Policy (CSP)
**Problem**: Added CSP headers to fix development warnings, but initially blocked API calls to dummyjson.com.

**Solution**: Updated CSP to include `connect-src 'self' https://dummyjson.com;` to allow API connections while maintaining security.

**Learning**: Security configurations need careful balancing between security and functionality. Test thoroughly after security changes.

#### Challenge 5: State Management Complexity
**Problem**: Managing task categories, due dates, and their relationships with tasks required careful state synchronization.

**Solution**: Created custom hooks (`useCategories`, `useTasks`) to encapsulate state logic. Used localStorage utilities to persist data consistently. Implemented `useEffect` hooks to sync state when tasks change.

**Learning**: Custom hooks are powerful for encapsulating complex state logic and making components cleaner.

#### Challenge 6: Mac Detection for Keyboard Shortcuts
**Problem**: Mac detection wasn't working reliably, causing incorrect display of keyboard shortcuts.

**Solution**: Implemented multiple detection methods (platform, user agent, and Mac-specific properties) with fallbacks. Also added Mac detection to multiple components for consistency.

**Learning**: Platform detection can be tricky. Using multiple methods with fallbacks improves reliability.

### Technical Decisions and Trade-offs

#### Custom Hooks vs. Context API
I chose custom hooks over Context API for state management because:
- **Simplicity**: Hooks are easier to understand and maintain for this project size
- **Performance**: No unnecessary re-renders from context updates
- **Flexibility**: Each component can use only the hooks it needs

**Trade-off**: For a larger application with deeply nested components, Context API might be more appropriate.

#### localStorage vs. API for Categories/Due Dates
I stored categories and due dates in localStorage because:
- The API doesn't support these features
- Immediate persistence without API calls
- Works offline

**Trade-off**: Data doesn't sync across devices, but this was acceptable for the assessment scope.

#### Inline Editing vs. Modal Editing
I chose inline editing for tasks because:
- Faster workflow (no modal to open/close)
- Better mobile experience
- More intuitive UX

**Trade-off**: Less space for complex editing, but sufficient for simple task titles.

### Code Quality and Best Practices

#### TypeScript Usage
I used TypeScript extensively with strict mode enabled. This caught many potential errors during development. The type definitions for tasks, categories, and filters made the codebase more maintainable.

#### Component Structure
I organized components by feature, keeping them small and focused. Each component has a single responsibility, making them easier to test and maintain.

#### Error Handling
I implemented comprehensive error handling at multiple levels:
- API level: Network errors, timeouts, invalid responses
- Component level: User-friendly error messages
- Input validation: Prevent invalid data submission

#### Accessibility
I made accessibility a priority from the start:
- ARIA labels on all interactive elements
- Keyboard navigation support
- WCAG AA color contrast
- Semantic HTML

### What Went Well

1. **Incremental Development**: Breaking the project into small commits made development manageable and provided clear progress tracking.

2. **TypeScript**: The type safety caught many errors early and improved code quality significantly.

3. **Component Architecture**: The modular component structure made it easy to add features incrementally.

4. **Error Handling**: Comprehensive error handling resulted in a robust application that handles edge cases gracefully.

5. **Responsive Design**: The mobile-first approach with Tailwind made responsive design straightforward.

6. **User Experience**: Features like keyboard shortcuts, drag and drop, and inline editing create a smooth, efficient user experience.

### Areas for Improvement

1. **Testing**: I didn't implement unit tests or integration tests. In a production environment, comprehensive testing would be essential.

2. **Performance Optimization**: For large task lists (100+ tasks), virtualization would improve performance. This wasn't necessary for the assessment but would be important at scale.

3. **Documentation**: While the code is well-commented, more detailed inline documentation and JSDoc comments would be beneficial.

4. **Error Recovery**: While error handling is comprehensive, automatic retry mechanisms for failed API calls could be improved.

5. **Loading States**: More granular loading states (skeleton screens) would provide better user feedback during data fetching.

### Lessons Learned

1. **Library Compatibility**: Always verify library compatibility with your React version before committing to a solution. Have alternatives ready.

2. **Platform Differences**: Consider platform differences (Mac vs. Windows) from the start, especially for keyboard shortcuts and UI elements.

3. **Event Handling**: Complex interactions (like drag and drop with interactive children) require careful event management. Test thoroughly.

4. **Security vs. Functionality**: Security configurations need careful consideration. Test all functionality after security changes.

5. **Incremental Development**: Breaking work into small, commit-sized chunks makes development more manageable and provides better version control.

6. **User Testing**: Testing on different platforms and browsers revealed issues (like keyboard shortcut conflicts) that wouldn't have been caught otherwise.

### Future Development Considerations

If I were to continue developing this application, I would:

1. **Add Testing**: Implement comprehensive unit and integration tests using Jest and React Testing Library.

2. **Performance Optimization**: Add virtualization for large lists, implement code splitting, and optimize bundle size.

3. **Enhanced Error Handling**: Add automatic retry mechanisms, offline support, and better error recovery.

4. **User Authentication**: Implement proper user authentication and user-specific data.

5. **Real Backend**: Replace the mock API with a real backend supporting all features (categories, due dates, task ordering).

6. **Progressive Web App**: Convert to a PWA with offline support and push notifications.

7. **Advanced Features**: Add priority levels, subtasks, task dependencies, and collaboration features.

### Conclusion

This project was an excellent learning experience that allowed me to demonstrate proficiency in modern React development, TypeScript, API integration, and user experience design. The incremental development approach, combined with careful attention to detail and user experience, resulted in a polished, functional application.

The challenges encountered (drag and drop compatibility, event handling, platform differences) provided valuable learning opportunities and improved my problem-solving skills. The final application demonstrates not just technical capability, but also attention to user experience, accessibility, and code quality.

I'm proud of the final result and believe it showcases the skills necessary for a Junior Frontend Engineer position, with room for growth and learning in areas like testing, performance optimization, and advanced features.

---

## Appendix: Development Timeline

While not explicitly tracked, the development followed this general progression:

1. **Initial Setup**: Project scaffolding, dependencies, basic configuration
2. **Core Features**: Task CRUD operations, API integration, basic UI
3. **Enhanced Features**: Drag and drop, filtering, search
4. **Optional Features**: Categories, due dates, theme toggle
5. **Advanced Features**: Statistics, export, keyboard shortcuts
6. **Polish and Refinement**: Error handling, accessibility, responsive design
7. **Bug Fixes and Optimization**: Resolving issues, performance improvements

Each phase was committed incrementally, providing a clear development history.

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Author**: Junior Frontend Engineer Assessment Candidate

