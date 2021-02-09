const { app, BrowserWindow } = require("electron");

// Set-up/Initialize environment
process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV != "production" ? true : false;
const isMac = process.platform === "darwin" ? true : false;

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "consoli-pic",
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  // mainWindow.loadFile("./app/index.html");
  // above commented line does same as ln 12, just a shorthand version
}

app.on("ready", createMainWindow);
