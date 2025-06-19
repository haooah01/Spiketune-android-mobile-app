![image](https://github.com/user-attachments/assets/124cc4e3-a20f-4862-89a7-7a4ce4e5cd62)
# SPIKETUNE Mobile app 🎵

**SPIKETUNE: Your Soundtrack – Your Story.**

SPIKETUNE is a modern, feature-rich music streaming web application designed to provide an immersive and enjoyable listening experience. It's built with React, TypeScript, and Tailwind CSS, focusing on a clean UI, smooth animations, and a responsive design. This project currently uses mock data to simulate a full-fledged music platform.

## Overview

SPIKETUNE Web aims to be your go-to platform for discovering and enjoying music and podcasts. It offers a sleek dark-themed interface, intuitive navigation, and a range of features that make music exploration and playback seamless. From personalized libraries to playlist creation and content uploading, SPIKETUNE Web provides a comprehensive user experience.

## Pics
![image](https://github.com/user-attachments/assets/a56072f5-901e-4d12-a4e8-7e1731cdfa06)
![image](https://github.com/user-attachments/assets/5b70cc84-6546-4c2c-859f-e2ae38b7cacf)
![image](https://github.com/user-attachments/assets/ec87d289-1a53-4357-80ee-875d426904fe)
![image](https://github.com/user-attachments/assets/a316ea8c-8eb6-4194-bbba-da78638ff518)
![image](https://github.com/user-attachments/assets/216b8a8f-26e0-4672-80a8-d551629d0aa1)
![image](https://github.com/user-attachments/assets/8bcec672-1dce-4be5-b6ee-7f8918d50dde)
![image](https://github.com/user-attachments/assets/f35ffd99-7861-4b3c-b8e7-665951224a9a)
![image](https://github.com/user-attachments/assets/e38d4404-0b00-4e8a-bea5-22473ecf1622)
![image](https://github.com/user-attachments/assets/7310d9d2-a9e6-42e6-8a4c-d072d7d95d2a)
![image](https://github.com/user-attachments/assets/3dd81bef-1d0a-4138-9a9d-016e163a9247)
![image](https://github.com/user-attachments/assets/f6ba13be-66d1-4ed9-acc0-3988e2d03519)
![image](https://github.com/user-attachments/assets/c7b08727-89ac-4430-b8a8-09cc6bef5171)
![image](https://github.com/user-attachments/assets/e81bb8b2-a1a4-4ca7-b4db-3ce3e32bb9bf)
![image](https://github.com/user-attachments/assets/96bf93bd-9246-4ae0-89bb-afd3048042a7)
![image](https://github.com/user-attachments/assets/2e7d939c-675d-4bee-adb4-51f801c0bdc9)
![image](https://github.com/user-attachments/assets/5fae88c0-6ea0-48ec-9403-e15a76798d1d)
![image](https://github.com/user-attachments/assets/7de1c1c4-9f58-45fc-b8b5-abb59061b810)
![image](https://github.com/user-attachments/assets/ee0c4739-e36e-4b79-86a2-86efb83ea345)

## Key Features

*   **🎧 Music & Podcast Playback:** Stream tracks, albums, playlists, and podcast episodes (simulated as albums).
*   ✨ **Modern UI & Splash Screen:** Engaging animated splash screen and a visually appealing, contemporary user interface.
*   🧭 **Intuitive Navigation:**
    *   Collapsible sidebar for main sections (Home, Search, Library, Podcasts, etc.).
    *   Header with a global search bar and user authentication/profile access.
*   🎶 **Content Discovery:**
    *   **Home Page:** Curated sections for Trending Songs, Featured Albums, and Popular Artists.
    *   **Search Page:** Search functionality and browsing by music genre categories.
    *   **Podcast Page:** Browse podcast shows by categories.
*   📄 **Detailed Views:**
    *   **Album/Playlist/Podcast Show Detail Pages:** View tracks/episodes, cover art, and metadata.
    *   **Artist Detail Page:** Discover artist biography, top tracks, and albums.
    *   **Lyrics Page:** View song lyrics with a dynamic blurred background matching the cover art.
    *   **Category Detail Pages:** Explore content specific to a chosen music or podcast category.
*   📚 **User Library Management:**
    *   **Liked Songs:** Mark favorite tracks and access them in a dedicated "Liked Songs" playlist.
    *   **Personal Library:** Add/remove albums, playlists, and tracks to your library for easy access.
*   ➕ **Playlist Creation:** Create custom playlists, add songs from your library, and optionally upload cover art.
*   ⬆️ **Song Upload:**
    *   Upload individual audio files with metadata (title, artist, album, cover art).
    *   **Folder Import:** Select a local music folder using the File System Access API for potential bulk import.
*   👤 **User Authentication (Mocked):**
    *   Simulated user signup and login (`user@example.com` / `password123`).
    *   User profile page to update display name and avatar.
*   ⭐ **Premium Features (Mocked):**
    *   Simulation of premium-only tracks and content.
    *   "Become Premium" modal prompting users to upgrade.
*   📱 **Responsive Design:** Adapts to various screen sizes, from mobile to desktop.
*   🔔 **Notification System:** Informative pop-up notifications for actions, errors, and trending alerts.
*   💀 **Skeleton Loaders:** UI skeletons improve perceived performance during content loading.
*   🛠️ **Error Handling:** Global `ErrorBoundary` for critical UI errors and contextual error messages.

## Tech Stack

*   **Frontend:** React 19, TypeScript
*   **Styling:** Tailwind CSS (utility-first)
    *   Custom CSS for global styles, animations (shimmer, page transitions, player bar, notifications), custom scrollbars.
*   **Routing:** React Router v6 (using `HashRouter`)
*   **State Management:** React Context API (`AppContext`) for global state.
*   **Module System:** Modern ES Modules with `type="importmap"` in `index.html` (allows direct import of libraries like React from CDNs without a build step for basic serving).
*   **Audio Playback:** HTML5 `<audio>` element, managed via React context.
*   **Local File System Access:** File System Access API (for "Select Music Folder" feature).
*   **Data:**
    *   Comprehensive mock data module (`src/data/mockData.ts`) to simulate backend responses and content.
    *   TypeScript for type safety (`src/types.ts`).
*   **Development Environment:** Relies on a modern browser's capabilities. No explicit build tool (like Webpack or Vite) is used in the current setup; it's designed to run directly.

## Project Architecture

*   **Component-Based:** The UI is constructed from reusable React functional components with hooks.
*   **Separation of Concerns:**
    *   `components/`: Contains UI elements, categorized by feature or type (e.g., `layout`, `home`, `icons`, `skeletons`, `notifications`, `premium`, `common`).
    *   `pages/`: Represents different views/routes of the application.
    *   `context/`: Houses `AppContext.tsx` for global state management.
    *   `data/`: Includes `mockData.ts` for all application content.
    *   `types.ts`: Defines shared TypeScript interfaces and enums.
    *   `assets/`: (Implicit) For static assets like fallback images (paths referenced in code).
*   **State Management:** `AppContext` serves as a centralized store for player state, library information, user authentication status, notifications, UI states (sidebar, modals), and functions to modify them.
*   **Routing:** React Router handles navigation, with nested routes within a primary `Layout` component to maintain consistent UI structure (Header, Sidebar, Player Bar). Standalone routes for Login/Signup.
*   **Styling:** Primarily uses Tailwind CSS for rapid development, augmented by global CSS in `index.html` for base styles, fonts, animations, and custom scrollbars.

## Design & UI/UX Philosophy

*   **Aesthetic:** A modern, clean, and immersive dark theme is employed throughout the application, aiming for a premium feel. The "Orbitron" font is used for prominent titles and branding, while "Inter" is used for general text, providing a balance of futuristic and readable typography.
*   **User Experience (UX):**
    *   **Intuitive Navigation:** Clear pathways to content via the sidebar, header search, and clickable cards.
    *   **Smooth Transitions:** Subtle animations for page loading (`pageEnter`), player bar visibility (`playerBarSlideUp`), notification display (`notification-slide-enter`/`exit`), and dropdowns (`profileDropdownAppear`) enhance the user journey.
    *   **Feedback:** Notifications provide immediate feedback for user actions (e.g., song upload, login, adding to library) and system events.
*   **User Interface (UI):**
    *   **Responsiveness:** The layout adapts fluidly to different screen sizes, ensuring usability on mobile, tablet, and desktop devices.
    *   **Performance:** Skeleton loaders (`animate-shimmer`) are used across various components (track items, detail pages, category cards) to improve perceived loading times and reduce user frustration.
    *   **Visual Consistency:** Custom scrollbars and consistent icon sets contribute to a unified look and feel.
*   **Accessibility:** Basic ARIA attributes are included in some interactive elements (buttons, inputs, links) to improve usability for assistive technologies. This is an area for ongoing improvement.

## Core Technical Highlights

*   **`importmap` for Dependency Management:** `index.html` utilizes an import map, allowing browsers to resolve bare module specifiers (e.g., `import React from 'react'`) directly from CDN URLs. This simplifies the setup by avoiding a traditional JavaScript bundling step for development.
*   **Tailwind CSS Utility-First Approach:** Enables rapid and consistent styling by composing utility classes directly in the JSX.
*   **Custom CSS Animations:** Keyframe animations defined in `index.html` provide polished visual effects for page transitions, component appearances (e.g., splash screen elements, player button), and notifications.
*   **HTML5 Audio Management via Context:** The `AppContext` centrally manages an HTML5 `<audio>` element instance, handling track loading, playback controls (play, pause, seek, volume, mute), and state updates (current time, duration, playing status).
*   **File System Access API Integration:** The "Upload Song" page demonstrates the use of `window.showDirectoryPicker()` to allow users to select local folders, showcasing modern browser capabilities for local file interaction.
*   **Comprehensive Mock Data:** `data/mockData.ts` provides a rich set of albums, tracks, artists, playlists, and categories, complete with relationships, cover art URLs (using Picsum Photos for placeholders), and even mock lyrics. This enables full-featured UI development and testing without a live backend.
*   **Global Error Handling:** An `ErrorBoundary` component wraps the main application to catch React rendering errors and display a user-friendly fallback UI, preventing a blank screen.

## Project File Structure

The project is organized into the following main directories:

```
/
├── components/         # Reusable UI components
│   ├── common/         # General-purpose components (e.g., BackButton)
│   ├── home/           # Components specific to the HomePage
│   ├── icons/          # SVG icon components
│   ├── layout/         # Layout components (Header, Sidebar, MainContent, Player)
│   ├── notifications/  # Notification system components
│   ├── premium/        # Premium feature related components (e.g., Modal)
│   ├── search/         # Components for the SearchPage (e.g., CategoryCard)
│   └── skeletons/      # Skeleton loader components
├── context/            # React Context providers (AppContext.tsx)
├── data/               # Mock data (mockData.ts)
├── pages/              # Top-level page components for routes
├── App.tsx             # Main application component with router setup
├── index.html          # HTML entry point, includes importmap and global styles
├── index.tsx           # React root rendering
├── metadata.json       # Application metadata (name, description)
├── types.ts            # TypeScript type definitions and interfaces
└── README.md           # This file
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

*   A **modern web browser** that supports ES Modules, `importmap`, and the File System Access API (e.g., latest Chrome, Edge).
*   A **local web server**. While some parts of the app might work by opening `index.html` directly, using a local server is highly recommended for:
    *   Proper ES module resolution.
    *   Correct behavior of APIs like the File System Access API (which often has security restrictions when run via `file:///` protocol).
    *   Avoiding CORS issues if you were to integrate actual API calls.
    Popular choices include:
        *   VS Code "Live Server" extension.
        *   Python's built-in server: `python -m http.server PORT`
        *   Node.js `serve` package: `npx serve . -l PORT`

### Running the Application

1.  **Clone or Download:**
    Get the project files onto your local machine.
    ```bash
    # If you have git
    git clone <repository_url>
    cd <project_directory>
    ```
2.  **Serve the Project:**
    Navigate to the root directory of the project in your terminal and start your local web server.
    For example, using `npx serve`:
    ```bash
    npx serve .
    ```
    This will typically serve the application on a local port (e.g., `http://localhost:3000`). The server will indicate the URL.

3.  **Open in Browser:**
    Open the URL provided by your local web server (e.g., `http://localhost:3000` or `http://127.0.0.1:PORT`) in your web browser.

### API Key (for future Gemini API integration)

*   This application is architected to potentially integrate with the Google Gemini API in the future.
*   The API client initialization expects the API key to be available via `process.env.API_KEY`.
*   **For the current version of this application, no API key setup is required by the user.** The application uses mock data and does not make live calls to the Gemini API.
*   The application **will not** prompt for an API key. Its availability is assumed to be handled externally if/when live API integration is implemented.

## Usage Guide

Explore SPIKETUNE Web's features:

*   **Initial Experience:** The application greets you with an animated **Splash Screen**.
*   **Navigation:**
    *   **Sidebar:** Access `Home`, `Search`, `Your Library`, `Create Playlist`, `Liked Songs`, `Upload Song`, and `Podcasts`. The sidebar is collapsible on smaller screens.
    *   **Header:** Use the `Search` bar to find content by keywords. Access user `Profile` (dropdown menu with options like "Update Profile", "Settings" (placeholder), and "Logout") or `Login`/`Sign up` buttons.
*   **Music Playback:**
    *   Click the play icon on **MediaItemCards** (for albums, playlists) or individual **TrackItems**.
    *   The **Bottom Player Bar** appears when a track starts. It displays current track info (title, artist, cover art), playback controls (play/pause, seek forward/backward), a progress bar, volume control (slider and mute), and a like button. You can also hide the player bar using the chevron icon.
*   **Content Discovery:**
    *   **Home Page:** Scroll through horizontally-swipeable rows of "Trending Songs," "Featured Albums," and "Popular Artists."
    *   **Search Page:** Type in the header search bar to filter categories or directly navigate to search results. Browse various music genre `CategoryCards`. Clicking a category takes you to its detail page.
    *   **Podcast Page:** Similar to the search page, browse `PodcastCategoryCards` to discover podcast shows (which are presented like albums).
*   **Detailed Views:**
    *   **Album/Playlist/Podcast Show Detail Pages:** View cover art, artist/creator, release information, and a list of tracks/episodes. Play the entire collection or individual items. Add the entire album/playlist to your library.
    *   **Artist Detail Page:** See the artist's cover image, bio, a "Follow" button (placeholder), top popular tracks, and a list of their albums.
    *   **Lyrics Page:** When viewing a track in the player bar, its title is a link to the Lyrics Page. This page displays the track's cover art, metadata, and lyrics (if available) against a blurred background of the cover art.
*   **Library Management:**
    *   **Liked Songs:** Click the heart icon ❤️ on any track (in lists, detail pages, or the player bar) to add it to your "Liked Songs." Access all liked songs from the sidebar link.
    *   **Your Library:** Click the bookmark icon 🔖 on albums, playlists, or tracks to add/remove them from your personal library. The "Your Library" page displays these items, sorted by date added and categorized by type.
*   **Playlists:**
    *   Navigate to "Create Playlist" from the sidebar.
    *   Provide a name (required), description (optional), and cover art (optional, defaults to first track's art or a generic image).
    *   Add songs from your existing library by searching and selecting them.
    *   The new playlist is added to the mock data and (optionally) to your library.
*   **Song Upload:**
    *   **Individual Upload:** Go to "Upload Song." Fill in the title, artist, album (optional), select an audio file, and optionally upload cover art. (This is a simulated upload).
    *   **Folder Import:** Click "Select Music Folder." Your browser will prompt you to pick a local folder. This uses the File System Access API. The app currently logs the selection; further processing of folder contents would be an additional feature.
*   **User Account (Mocked):**
    *   Click "Log in" or "Sign up" from the header.
    *   For login, use `user@example.com` and `password123`.
    *   After login, the header shows your avatar and name. The dropdown allows access to "Update Profile" (change display name, upload/remove avatar) and "Logout."
*   **Premium Features (Mocked):**
    *   Certain tracks are marked with a premium icon ⭐.
    *   If you attempt to play a premium track without being "premium," a "Become Premium" modal appears.
    *   You can simulate becoming premium via a button in `AppContext` (developer-facing, not a UI button for users yet, but the modal has a "Go Premium Now" button that sets this state). Premium status unlocks these tracks and changes UI elements (e.g., premium badge color).
*   **Notifications:**
    *   The app displays temporary pop-up notifications in the top-right corner for various events:
        *   Trending song alerts on the Home page.
        *   Success/error messages for login, signup, profile updates, song uploads.
        *   Information messages (e.g., logout).

## Error Handling

*   **Global ErrorBoundary:** `components/ErrorBoundary.tsx` wraps the main application. If a critical JavaScript error occurs during rendering in any component, this boundary will catch it and display a user-friendly fallback page with an option to reload, instead of a blank or broken screen. In development mode, it also shows error details.
*   **User-Facing Notifications:** For non-critical errors or feedback (e.g., invalid login, failed file upload validation, network issues if they were real), the application uses a notification system (`components/notifications/`) to display brief, informative messages to the user.

## Future Considerations

*   **Real Backend Integration:** Replace mock data with a live backend for user authentication, data persistence, and real-time updates.
*   **Gemini API Integration:**
    *   Personalized music recommendations.
    *   AI-powered playlist generation.
    *   Lyric analysis or generation.
    *   Artist information retrieval.
*   **Enhanced Search:** Implement more sophisticated search with filtering and sorting.
*   **Advanced Playlist Management:** Features like collaborative playlists, reordering tracks, etc.
*   **Social Features:** Sharing, following users, activity feeds.
*   **Full Build System:** Integrate Vite or Webpack for production builds, optimizations, and advanced development features.
*   **Robust Accessibility (A11y):** Conduct thorough accessibility audits and implement improvements.

---

## SPIKETUNE on Android (via Capacitor) 📱

Beyond the web version, SPIKETUNE can be easily packaged into an Android application (.apk) using [Capacitor](https://capacitorjs.com/). This allows you to experience SPIKETUNE as a native app on your phone, with all its modern features and interface.

### Android Version Features

*   **Identical UI/UX to Web Version**: The entire experience, effects, and functionality are preserved.
*   **Runs Standalone as an Android App**: Includes an icon, splash screen, and can be installed from an .apk file.
*   **Touch Support & Optimized Responsiveness**: The interface automatically adapts to phone screens.
*   **Potential for Native Feature Access (if extended)**: Such as push notifications, file system access, etc. (easily upgradeable if needed).

---

## Packaging SPIKETUNE into an .apk File

### 1. Build the Web Version

If your project uses npm/yarn scripts for building (e.g., with Vite or Create React App), run the build command. If you are running directly via `importmap` as described, ensure your web assets are finalized in a `dist` (or similar) folder. For `importmap` setups without a build step, you might need to manually prepare your files or adapt a simple build process.

Assuming a typical project structure where `npm run build` outputs to a `dist` folder:
```bash
# If you have a build script (e.g., using Vite, CRA)
npm install # or yarn install
npm run build # or yarn build
```
*If your project does not have a build step (runs directly from source using `importmap`), you'll need to ensure your `webDir` in `capacitor.config.ts` points to your project's root or the folder containing `index.html` and other assets.*

### 2. Install Capacitor and Initialize

```bash
npm install --save @capacitor/core @capacitor/cli
# or: yarn add @capacitor/core @capacitor/cli
npx cap init
```
During initialization, you'll be prompted for:
-   **App name**: `SPIKETUNE`
-   **App ID**: `com.yourcompany.spiketune` (replace `yourcompany` with your actual domain or a unique identifier)

### 3. Add Android Platform

```bash
npx cap add android
```

### 4. Ensure Correct Configuration (`capacitor.config.ts`)

Create or verify your `capacitor.config.ts` (or `capacitor.config.json`) file in the project root:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.spiketune', // Make sure this matches your init step
  appName: 'SPIKETUNE',
  webDir: 'dist', // Or your web asset directory (e.g., 'public', or '.')
  // Optional: Add server configuration if needed for live reload during development
  // server: {
  //   androidScheme: 'http' 
  // }
};

export default config;
```

### 5. Copy Web Assets to Android Project

```bash
npx cap copy
# or specifically for android
npx cap sync android
```

### 6. Open in Android Studio and Build .apk

```bash
npx cap open android
```
-   Android Studio will open the native Android project located in the `android/` directory.
-   Wait for Android Studio to sync and index the project.
-   From the Android Studio menu, select **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
-   After the build completes, the .apk file will typically be located in `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## Installing and Running the .apk on an Android Device

1.  **Transfer the .apk file to your phone** (via USB cable, Google Drive, email, etc.).
2.  **On your phone**, locate and open the transferred .apk file using a file manager.
3.  If prompted, **allow installation of apps from unknown sources**. This setting is usually found in your phone's security settings.
    *   *Settings > Security > Install unknown apps* (The exact path may vary by Android version and manufacturer).
4.  Tap **Install**.
5.  Once the installation is complete, you should find the SPIKETUNE icon on your home screen or in your app drawer. Tap it to experience the app like a native Android application!

---

## Notes

-   To publish on Google Play, you would need to build a release version, sign your app, and adhere to Google's guidelines.
-   This app should work best on Android 8.0 (Oreo) and above.
-   Ensure your `webDir` in `capacitor.config.ts` correctly points to the directory containing your `index.html` and other web assets. For projects without a build step, this might be the root directory (`.`) or a specific public folder.

---

**Enjoy the SPIKETUNE experience on both web and Android!**  
If you encounter difficulties during packaging or installation, review the steps above or consult the official Capacitor documentation.
