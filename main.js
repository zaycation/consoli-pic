const { app, BrowserWindow, Menu, globalShortcut } = require("electron");

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
    resizable: isDev ? true : false,
    backgroundColor: "transparent",
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  // mainWindow.loadFile("./app/index.html");
  // above commented line does same as ln 12, just a shorthand version
}

app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  globalShortcut.register("CmdOrCtrl+R", () => {
    mainWindow.reload();
  });

  globalShortcut.register(isMac ? "Command+Alt+I" : "Ctrl+Shift+I", () => {
    mainWindow.toggleDevTools();
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: isMac ? "Cmd+W" : "Ctrl+W",
        //        accelerator: "CmdOrCtrl+W",
        click: () => {
          app.quit();
        },
      },
    ],
  },
];

app.allowRendererProcessReuse = true;

// allows app to quit self if user is not using a mac
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

// recreate window in app when dock icon is closed on mac and no other window is open
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
