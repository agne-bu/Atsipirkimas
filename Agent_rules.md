# Atsipirkimas - AI Agent Instructions

These instructions apply to AI agents working in the Atsipirkimas project.

## Project context
Before making changes, read `context.md` in the project root.
Always prefer the newest project code over older documentation.
If code and `context.md` disagree, trust the code and point out the difference.

## Technology
- Use React 19 + Vite 8.
- Use JavaScript and JSX.
- Do not convert to TypeScript.
- Do not add Tailwind CSS or CSS Modules unless explicitly requested.
- Do not add routing, state management, UI or chart libraries unless explicitly requested. The project intentionally uses plain React and custom CSS.
- Keep component styles in separate `.css` files, one per component.
- Keep React components in `src/` unless intentionally reorganizing the project.

## Code changes
- Inspect the current file before modifying it.
- Do not invent project logic or APIs that do not exist.
- Preserve existing functionality unless explicitly asked to change it.
- Avoid unrelated refactors and unnecessary dependencies.
- Prefer simple solutions.
- Use functional React components and React hooks.
- Keep shared state in `App.jsx` and pass it down via props, unless asked to change this.
- Keep constants, formatting helpers and localStorage logic in `src/investicijos.js`.
- Data is stored in the browser (`localStorage`). Do not add a backend unless explicitly requested.
- Do not change the investment record shape `{ id, metai, menuo, suma }` or the localStorage keys without explicit approval, because existing saved data would break.

## Naming conventions
- Variables and functions use Lithuanian names without diacritics (e.g. `irasai`, `pridetiIrasa`, `projektoBusena`).
- CSS classes use the component prefix (e.g. `investicija-forma`, `projekto-busena-antraste`).
- File names must match the import path exactly, including letter case (the project must build on Linux, which is case-sensitive).

## Design
Preserve the existing look of the app:
- minimalist modern UI;
- purple accent for interactive elements;
- light background, clean tables and form fields;
- rounded corners;
- responsive layouts.

Before changing styles, inspect the relevant `.css` file and the current appearance. Do not change the overall design direction unless explicitly requested.

## UI language
- Keep user-facing UI text in Lithuanian unless requested otherwise.
- Keep labels and messages short and clear.
- Preserve existing terminology where practical (e.g. `Nepradėta`, `Vykdoma`, `Baigta`, `Ištrinti`).
- Format money with the helpers in `src/investicijos.js` (`lt-LT`, `Eur`).

## Before finishing
Check that:
1. Code matches the existing project structure.
2. Existing functionality still works (adding and deleting records, total, project status rules, localStorage persistence).
3. No unnecessary dependency was added.
4. UI remains responsive.
5. Imports and file paths are correct, with matching letter case.
6. `npm run lint` and `npm run build` would pass (no unused imports or variables).

## Presenting changes
- Briefly explain what changed.
- Identify each changed or new file by its exact path.
- When code is meant to be pasted manually, provide the complete updated file.
- Clearly state whether a file should be created or replaced.
- Include a short way to test the result.
- If the change affects structure, data, rules, known issues or TODOs, say so and provide the updated `context.md` sections (or the full file).
