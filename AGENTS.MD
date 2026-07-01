# AGENTS.MD

Guidance for future coding agents working in this repository.

## Project Overview

- This is the `manada-solidaria-frontend` React/Vite application.
- The app is a PWA configured through `vite-plugin-pwa`; do not remove or alter PWA behavior unless explicitly requested.
- Styling is intentionally based on `styled-components`.
- Tailwind CSS and DaisyUI were removed and should not be reintroduced without a clear user request.

## Commands

- On Windows PowerShell, prefer `npm.cmd` over `npm` because `npm.ps1` can be blocked by execution policy.
- Use:
  - `npm.cmd run build`
  - `npm.cmd run lint`
  - `npm.cmd run dev`
- `dist` and `dev-dist` are generated outputs and should not be linted or manually edited.

## Styling Conventions

- Use `styled-components` for component styling.
- Keep component structure and styles separated:
  - Component/rendering logic lives in `.tsx` files.
  - Styled-components live in neighboring `*.styles.ts` files, for example `AppHeader.tsx` and `AppHeader.styles.ts`.
  - Export styled-components as named exports from `*.styles.ts` and import them into the component file.
  - Keep helper style fragments private to the `*.styles.ts` file unless they are intentionally shared.
- Keep global styles in `src/styles/GlobalStyle.ts`.
- Keep theme tokens in `src/styles/theme.ts`.
- Wrap app-level UI with `ThemeProvider` from `styled-components`.
- Do not add new `.css` files unless the user explicitly changes the styling direction.
- Do not use Tailwind/DaisyUI classes such as `bg-base-100`, `btn`, or `btn-primary`.

## Design Tokens

- Base design tokens live in `src/styles/theme.ts`; reuse them instead of hardcoding new colors or typography values.
- Current color tokens:
  - `brand`: `#EA5F09`
  - `tertiary`: `#CBB6FF`
  - `neutral`: `#F5E7D4`
  - `black`: `#000000`
  - `secondary`: `#A95C28`
  - `success`: `#60B100`
  - `darkColor`: `#594137`
  - `stroke`: `#E1BFB2`
  - `background`: `#FFFFFF`
- Compatibility aliases such as `primary`, `accent`, `surface`, `surfacePlain`, `text`, `border`, and `focus` may exist in `theme.ts`; prefer the semantic UX token when implementing new UI.
- Typography uses Montserrat through `theme.fonts.body`.
- Reuse `theme.typography` for the five UX hierarchy levels:
  - `header1`: 24px titles.
  - `header2`: 20px secondary titles.
  - `header3`: 16px tertiary titles.
  - `body`: 14px normal text.
  - `descriptive`: 12px secondary/descriptive text.
- `GlobalStyle.ts` applies the base body typography and global `h1`, `h2`, `h3`, and `small` styles from these tokens.

## Navbar UI Details

- The selected bottom navbar option uses `theme.colors.secondary` for text, icon, and top indicator.
- Publish buttons use:
  - `background: theme.colors.secondary`
  - `border-color: theme.colors.secondary` when a border is present
  - `color: theme.colors.neutral`, so the paw icon inherits the neutral color
- Keep the desktop floating publish button and mobile navbar publish button visually aligned through these same tokens.

## Menu UI Details

- Menu items use:
  - `height: 40px`
  - `padding: 12px 16px`
  - `gap: 8px` between items
  - `font-family: Montserrat, Arial, sans-serif`
  - `font-size: 14px`
  - `font-style: normal`
  - `font-weight: 400`
  - `line-height: 20px`
  - base color `#594137`
- The selected menu item keeps the orange selected text color.
- The selected menu item also has a left indicator:
  - rectangular line
  - `4px` wide
  - no border radius

## Login UI Details

- The login page is a full-screen route. In `src/App.tsx`, `/login` should remain part of the full-screen `AppContent` behavior so the login background can cover the viewport.
- The login page background uses `theme.colors.neutral`; the login card uses `theme.colors.background`.
- Keep the login card and footer horizontally centered. On short/mobile viewports, move the layout upward with `justify-content: flex-start`, but do not change horizontal centering with `align-items`.
- The login card should flex to occupy the available vertical space above the footer, so the neutral background does not appear as a large bottom band.
- The footer text sits below the card on the neutral background and should stay close to the device bottom:
  - text: `© 2026 Manada Solidaria - Cuidando huellas juntos`
  - color `#594137`
  - Montserrat, 12px, weight 700, line-height 16px
- The login card has rounded corners and an 8px bottom gradient band:
  - `linear-gradient(90deg, #EA5F09 0%, #CBB6FF 50%, #A95C28 100%)`
- The login form keeps the fields, forgot-password action, and submit button inside a shared container with `gap: 18px`; avoid recreating spacing between those controls with individual margins.
- Login field labels use:
  - color `#594137`
  - Montserrat, 14px, weight 600, line-height 20px
  - `letter-spacing: 0.14px`
- Login inputs use:
  - height `56px`
  - padding `16.5px 24px`
  - border radius `12px`
  - transparent 2px border
  - background `#FFF1EC`
- The password field should remain a composed input with a `lucide-react` `Eye` / `EyeOff` toggle button that switches between `type="password"` and `type="text"`.

## Current Architecture Notes

- `src/main.tsx` owns `ThemeProvider`, `GlobalStyle`, `BrowserRouter`, and `ToastProvider`.
- Toast logic is split so Fast Refresh stays happy:
  - `src/hooks/ToastProvider.tsx`
  - `src/hooks/useToast.tsx`
  - `src/hooks/toastContext.ts`
- Shared UI uses neighboring `*.styles.ts` files for styled-components, including:
  - app shell and desktop drawer in `src/App.styles.ts`
  - header
  - bottom navbar
  - modal
  - toaster
  - floating publish button
  - PWA install button
  - login
  - menu

## Verification Checklist

After UI/styling changes, run:

```powershell
npm.cmd run build
npm.cmd run lint
```

For dependency/style cleanup, useful checks:

```powershell
rg -n 'tailwindcss|daisyui|@plugin|bg-base-100|btn btn-primary|theme-controller|data-theme' src package.json vite.config.ts package-lock.json
rg --files -g "*.css" src
```
