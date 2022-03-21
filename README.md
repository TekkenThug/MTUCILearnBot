
# 🤖 MTUCILearn Telegram Bot

Telegram bot for MTUCILearn


## Features

- 🔎 Searching neccessary schedule for today/tomorrow and for target educational group
- 📧 Sending feedback to application author

## Changelog

#### v0.3.0
- `Added` - Select educational group
- `Added` - Send feedback to application author
- `Added` - Get schedule for today/tommorow
## Roadmap

- To be continue...



## How to run
Install dependencies

```bash
npm install
```

Start the watcher (for development)

```bash
npm run watch
```

Make production build

```bash
npm run build
```


## Project structure

```bash
├─app.ts       // App entry point
├─utils.ts     // Different util functions
├─assets       // Media assets
│   └─images   // Images
├─commands     // Command handlers (replies, button handlers and etc.)
├─keyboards    // Kit of Keyboards
├─services     // Bot provided services
│   └─api      // Requests to API  
├─types        // TypeScript types   
└─views        // Views for Bot reponses
```