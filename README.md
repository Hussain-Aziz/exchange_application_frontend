# Exchange Application Frontend

![frontend tests](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/Hussain-Aziz/ee13ac4a5e7a22f597804cfe438b1891/raw/FrontendTestBadge.json)

## Building Steps

### Prerequisites

1. Download nodejs 20.11.0 from <https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi>

### Initial setup

1. Open a powershell terminal and navigate to the directory where you want the project
2. Run the following commands

```bash
git clone git@github.com:Hussain-Aziz/exchange_application_frontend.git
cd exchange_application_frontend

npm install --no-fund --no-audit
```

### Environment variables

The app requires the following environment variables to be set (in an .env.local file in the root dir)

```bash
UPLOADTHING_SECRET
UPLOADTHING_APP_ID
```

### Running the application

1. Open vscode and open the project folder
2. Open a powershell terminal and run the following commands

```bash
npm run dev
```
