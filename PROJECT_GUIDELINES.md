# Project Guidelines & Architecture

This document outlines the coding standards, folder structure, and best practices for the DataHub project.

## 🏗 Architecture
The project follows a modular, feature-based architecture where business logic is separated from UI components.

### Folder Structure
```text
src/
 ├── components/       # UI Components
 │    ├── common/      # Reusable UI (Buttons, Inputs, etc.)
 │    └── [feature]/   # Feature-specific (Recipes, Posts, etc.)
 ├── pages/            # Page-level components & Redux slices
 ├── services/         # API Service layer (Axios instances)
 ├── theme/            # Theme provider, colors, and typography
 ├── routes/           # Centralized React Router config
 ├── storage/          # Redux Store & persistence
 └── modals/           # TypeScript interfaces/models
```

## 💻 Coding Standards
- **TypeScript**: Mandatory strict typing. No `any`.
- **Components**: Functional components only. Use `React.FC`.
- **Styling**: Ant Design v5 + Custom CSS. **No Tailwind CSS**.
- **Theming**: Always support Light/Dark mode via `ThemeContext`.
- **API**: Use the `apiHelper` (Axios) in the service layer.
- **Strings**: No hardcoded text in JSX. Use `src/constants/Strings.ts`.

## 🚀 Key Rules
1. **Theme Awareness**: Use `isDarkMode` from `useThemeContext()` to apply conditional styles.
2. **Responsive Layout**: Always test on Mobile (Drawer Sidebar) and Desktop (Full Sidebar).
3. **Form Validation**: Use Ant Design `rules` for all inputs.
4. **Error Handling**: Use `try/catch` and `message.error()` for user feedback.

## 🛠 Feature Checklist
- [ ] Responsive design verified.
- [ ] Light/Dark theme support verified.
- [ ] TypeScript interfaces defined.
- [ ] API service implemented.
- [ ] Routing integrated.
- [ ] No console warnings/errors.

---

## 🤖 Universal AI Agent Rules
- **Mandatory History Logging**: EVERY task, conversation, or modification undertaken by ANY AI Agent (Antigravity, Cursor, Gemini, etc.) MUST be automatically logged in `HISTORY.md`.
- **Log Format**:
    - **Date**: [YYYY-MM-DD]
    - **Time**: [HH:MM AM/PM]
    - **Agent Name**: [e.g., Antigravity, Cursor, etc.]
    - **Task Title**: [Brief title of the task]
    - **Prompt**: [The user's core request/prompt]
    - **Response Summary**: [Summary of changes and actions taken]
    - **Status**: [Pending / Completed / Failed]
- **Maintenance**: Entries must be maintained in reverse chronological order (newest at the top).
- **Completion Criteria**: No task is considered complete until it has been logged in `HISTORY.md` in the specified format.
