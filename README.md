# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

   or 
   npm install
   npx expo start --tunnel

   ### when it not work for tunnel: npx expo start --tunnel then ctrl+c then repeat untill it works

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


## File structure
```
├── .expo
├── .git
├── .vscode
├── app
│    ├── auth_screen
│    │   ├── _layout.tsx
│    │   └──index.tsx
│    ├── dashboard
│    │   ├── _layout.tsx
│    │   └──index.tsx
│    ├── page_layout
│    │   ├── Footer.tsx
│    │   └── Header.tsx
│    ├── profile
│    │   ├── _layout.tsx
│    │   └──index.tsx
│    ├── stats
│    │   ├── _layout.tsx
│    │   └──index.tsx
│    ├── styudy
│    │   ├── _layout.tsx
│    │   └──index.
│    ├── subjects
│    │      ├── ds
│    │      |    ├── _layout.tsx
│    │      |    └── index.tsx
│    │      ├── dslab
│    │      |    ├── _layout.tsx
│    │      |    └── index.tsx
│    │      ├── ppds
│    │      |    ├── _layout.tsx
│    │      |    └── index.tsx
│    │      ├── ppdslab
│    │      |    ├── _layout.tsx
│    │      |    └── index.tsx
|    │      ├── _layout.tsx
|    │      └── index.tsx
│    ├── _layout.tsx
│    └── index.tsx
│
├── assets
│   └── images
├── node_modules
├── src
│   ├── components
│   │      ├── cards
│   │      │    ├── ModuleCards.tsx
│   │      └── progress_bar
│   │          └── ProgressBar.tsx
|   |
│   ├── constants
│   |      ├── colors.tsx
│   |      └── ThemeToken.tsx
|   |      
│   ├── service
│   │      ├── NevigationService.tsx
|   |
|   |
│   └── utils
│       └── theme
│           └── ThemeProvider.tsx
|
|
├── .gitignore
├── app.json
├── eslint.config.js
├── expo-env.d.ts
├── Notes.md
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

