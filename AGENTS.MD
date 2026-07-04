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
- When testing from a phone through a VS Code tunnel, keep the frontend API base URL pointed at the real backend URL. Do not add a Vite proxy unless explicitly requested; mobile CORS failures should be fixed in the backend CORS configuration.
- `dist` and `dev-dist` are generated outputs and should not be linted or manually edited.

## Styling Conventions

- Use `styled-components` for component styling.
- Keep component structure and styles separated:
  - Component/rendering logic lives in `.tsx` files.
  - Styled-components live in neighboring `*.styles.ts` files, for example `Header.tsx` and `Header.styles.ts`.
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
- Both publish buttons open the shared `src/components/publishOptions/PublishOptions.tsx` popover.
- Publish options use a 53x53 secondary-color icon circle and a 220x53 secondary-color text container with `10px` border radius, separated by `15px` between options.
- Publish option routes are `/publicar/animal`, `/publicar/colecta`, and `/publicar/campania`.

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
- The login form uses `react-hook-form` with a Yup schema in `src/pages/login/loginSchema.ts`; keep validation rules there instead of inline in the component.
- Use `@hookform/resolvers/yup` for Yup integration.
- Login validation currently requires:
  - `username`: trimmed, required, minimum 3 characters, maximum 50 characters.
  - `password`: required, minimum 6 characters, maximum 72 characters.
- Keep login validation errors rendered below each field through styled-components from `Login.styles.ts`.
- The login page background uses `theme.colors.neutral`; the login card uses `theme.colors.background`.
- Keep the login card and footer horizontally centered. On short/mobile viewports, move the layout upward with `justify-content: flex-start`, but do not change horizontal centering with `align-items`.
- The login card should flex to occupy the available vertical space above the footer, so the neutral background does not appear as a large bottom band.
- Desktop login sizing is intentionally narrower than the original mobile/tablet max width:
  - normal desktop card/footer width: `min(100%, 380px)`
  - short desktop/notebook card/footer width, for example around 710px viewport height: `min(100%, 340px)`
  - preserve the internal form width at `284px` so fields do not become cramped
- Short desktop/notebook viewports use a dedicated compact breakpoint: `@media (min-width: 768px) and (max-height: 720px)`. Keep this separate from general mobile height rules so desktop rules do not accidentally re-expand the layout.
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
- When the password is hidden, its placeholder should look hidden, currently `********`; when visible, the placeholder can read `contraseña`.

## Register UI Details

- The register page is a full-screen route at `/registro`, sharing the same unauthenticated `AppContent` behavior as `/login`.
- Register uses `react-hook-form` with a Yup schema in `src/pages/register/registerSchema.ts`; keep validation rules there instead of inline in the component.
- Keep register component logic in `src/pages/register/Register.tsx` and styled-components in `src/pages/register/Register.styles.ts`.
- The signup endpoint lives in `src/app/services/apis/authApi.ts` as an injected `baseApi` mutation for `POST /auth/signup`.
- Signup sends `username`, `password`, `repeatedPassword`, and `email`. It sends `roles` only when at least one role is selected.
- Register maps `¿Sos rescatista?` to the `RESCUER` role and `¿Deseas ser transportista?` to the `CARRIAGE` role; both can be sent together.
- The register page starts with `/logo.svg`, then the title `¡Bienvenido a la Manada!`, then the text `Formá parte de nuestra comunidad de rescatistas y voluntarios.`.
- The register panel uses a white background with the same 8px bottom gradient band as login, `12px` top border radius, and square bottom corners.
- The neutral register page background has `48px` vertical padding.
- Keep register inputs `24px` away from the white panel's horizontal edges.
- Register inputs use `padding: 15px 24px`.
- Register inputs use `border-radius: 8px`, `border: 2px solid #F7DDD3`, and `background: #FDF8F4`.
- Register fields keep `8px` between label and input, and `24px` between consecutive fields.
- Register fields are, in order:
  - `Nombre de usuario`, required.
  - `Número de teléfono`, optional.
  - `Correo electrónico`, required.
  - `Contraseña`, required.
  - `Repetir contraseña`, required and matching the password.
- Password fields use a composed input with a `lucide-react` `Eye` / `EyeOff` toggle button.
- The rounded switches ask `¿Sos rescatista?` and `¿Deseas ser transportista?`; keep them inside a container with `padding: 24px`, `gap: 24px`, `border-radius: 12px`, `border: 1px solid #F7DDD3`, and `background: #FFF1EC`.
- The rescatista switch label includes the `lucide-react` `HandHeart` icon on the left; the transportista switch label includes `CarFront` on the left.
- Active register switches use `theme.colors.brand`.
- Keep the informational text below the switches: `Esta información podrás modificarla en cualquier momento desde tu perfil`.
- The register action is `Registrarse`, spans the full form width, and includes a `lucide-react` paw icon to the right of the text.
- The login redirect text is `¿Ya tienes cuenta? Iniciar sesión`, with `Iniciar sesión` in `#9F3D00`.
- The register footer sits below the white panel on the neutral background and uses the same copyright text as login: `© 2026 Manada Solidaria - Cuidando huellas juntos`.

## Current Architecture Notes

- `src/main.tsx` owns app-level providers: `Provider` from React Redux, `PersistGate` from redux-persist, `ThemeProvider`, `GlobalStyle`, `BrowserRouter`, and `ToastProvider`.
- Redux Toolkit and RTK Query are the app state/API standard.
- App infrastructure lives under `src/app`:
  - `src/app/store/store.ts` configures the Redux store.
  - `src/app/store/hooks.ts` exports typed `useAppDispatch` and `useAppSelector`.
  - `src/app/store/authSlice.ts` owns auth tokens and authentication state.
  - Auth state is persisted with `redux-persist` using `storageSession`; keep reducers pure and configure persistence in `store.ts`.
  - `src/app/services/base/baseApi.ts` defines the shared RTK Query `baseApi` with `VITE_API_BASE_URL`.
  - `src/app/services/apis/*.ts` contains endpoint implementations that use `baseApi.injectEndpoints`.
- Do not create one-off `createApi` instances for each feature. Add future APIs by injecting endpoints into `baseApi`.
- The login endpoint is implemented in `src/app/services/apis/authApi.ts`.
- Auth login calls `POST /auth/login` with `Authorization: Basic <base64(username:password)>` and no body.
- Login stores `accessToken` and `refreshToken` through `authSlice`; `redux-persist` writes the auth slice to session storage, and logout must clear the auth state.
- Hooks are grouped by domain under `src/hooks/<domain>/`:
  - auth state hooks live in `src/hooks/auth/`.
  - current-user/profile hooks live in `src/hooks/user/`.
  - browser permission hooks live in `src/hooks/permissions/`.
  - toast provider/context/hooks live in `src/hooks/toast/`.
- Browser permissions are centralized in `src/hooks/permissions/useAppPermissions.ts`.
  - After a successful login, request geolocation and notification permissions without blocking navigation to `/home`.
  - Use `src/hooks/geolocation/useGeolocation.ts` whenever a screen needs the user's coordinates for nearby publications.
  - Push notifications require the browser notification permission; if the browser requires a stronger user gesture, request it from an explicit in-app action.
  - Camera and gallery access are handled through Capacitor. Use `src/hooks/camera/useCamera.ts` whenever a screen needs to take a photo or choose from gallery.
  - Use the reusable image upload trigger in `src/components/imageUpload/ImageUpload.tsx` and the reusable bottom sheet in `src/components/bottomSheet/BottomSheet.tsx` for photo source selection UI; it presents as a bottom sheet on mobile and as a centered modal on desktop.
  - Hook usage examples live next to each hook:
    - `src/hooks/camera/README.md`
    - `src/hooks/geolocation/README.md`
    - `src/hooks/permissions/README.md`
  - `src/main.tsx` registers `@ionic/pwa-elements` so Capacitor Camera can provide a camera modal on Web/PWA instead of falling back directly to a file picker.
  - Native Capacitor builds use `capacitor.config.ts` with `webDir: 'dist'`; run a production build before syncing native projects.
- Toast logic is split so Fast Refresh stays happy:
  - `src/hooks/toast/ToastProvider.tsx`
  - `src/hooks/toast/useToast.tsx`
  - `src/hooks/toast/toastContext.ts`
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
