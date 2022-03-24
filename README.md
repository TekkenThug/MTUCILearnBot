
# 🤖 MTUCILearn Telegram Bot

Telegram bot for MTUCILearn


## Features

- 🔎 Searching necessary schedule for today/tomorrow and for target educational group
- 📧 Sending feedback to application author

## Changelog

#### v0.4.0
- `Added` - Add pagination for group selecting
- `Fixed` - Fix feedback link
- `Fixed` - Fix README errors

#### v0.3.0
- `Added` - Select educational group
- `Added` - Send feedback to application author
- `Added` - Get schedule for today/tomorrow
## Roadmap

- To be continue...



## How to run
Install dependencies

```bash
npm install
```

Start the watcher (for development)

```bash
npm run dev
```

Make production build

```bash
npm run build
```


## Project structure

```bash
├─app.ts       // App entry point
├─config.ts    // App config
├─utils.ts     // Different util functions
├─assets       // Media assets
│   └─images   // Images
├─commands     // Command handlers (replies, button handlers and etc.)
├─keyboards    // Kit of Keyboards
├─providers    // Bot providers
├─services     // Bot services
│   └─api      // Requests to API  
├─types        // TypeScript types   
└─views        // Bot response views
```
