# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Created this CHANGELOG.md to track all future modifications.

### Fixed
- **Startup Error**: Fixed a `module-not-found` error related to `embla-carousel-autoplay` by correcting the import statement in `src/components/sections/menu-section.tsx`.
- **API Update**: Replaced `ReactDOM.useFormState` with `React.useActionState` in `src/components/recommendation-form.tsx` to align with the latest React API.
- **Hydration Errors**:
    - Resolved a hydration mismatch in `src/components/theme-toggle.tsx` by ensuring `localStorage` is only accessed on the client-side within a `useEffect` hook.
    - Corrected a similar hydration issue in `src/components/footer.tsx` by calculating the current year within a `useEffect` hook.
    - Fixed a hydration error in `src/components/header.tsx` by moving scroll-dependent logic into a `useEffect` hook.
    - Resolved a final hydration error in `src/components/sections/hero-section.tsx` by moving scroll-based parallax effect logic into a `useEffect` hook to ensure it runs only on the client.
- **Performance**: 
    - Improved initial page load time by removing the `onLoad` blocking event from the hero section.
    - Removed the artificial loading delay from `src/app/page.tsx` to make the application launch faster.
- **UI Adjustments**:
    - Corrected the hero section background to properly display the animated `.webp` file using a Next.js `Image` component instead of a `<video>` tag.
    - Simplified the `HeroSection` UI to focus on key call-to-action buttons and social links.
    - Re-aligned the primary action buttons in the hero section to be directly above the social media icons for a cleaner layout.
    - Removed the brand name from the header and centered the navigation links for a cleaner look.
- **Image Configuration**: Added `storage.googleapis.com` to the list of allowed image domains in `next.config.js` to fix image loading errors.
- **Menu Section**: The menu now features an automatic, infinite horizontal scrolling effect that starts on hover.

### Changed
- **Dependencies**: Added `embla-carousel-react` and `embla-carousel-autoplay` to support carousel functionality in the products and menu sections.
- **Project Structure**: Created `src/lib/menu.ts` to store menu data, separating it from the UI components.
- **Menu Section**: The menu section was updated to display five menu card images in a horizontal carousel, with a zoom effect on hover for better visibility. The design was updated to prevent overlapping.



