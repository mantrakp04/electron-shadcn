import { ipcMain } from "electron";
import { promises as fs } from "fs";
import { Route, ApiContext } from "@/types";
import { executeQuery } from "./db/db";

function readFile(_: any, filePath: string) {
  return fs.readFile(filePath, "utf-8");
}

export const routes = [
  {
    name: "file",
    methods: [
      {
        name: "read",
        handler: readFile,
      },
    ],
  },
  {
    name: "db",
    methods: [
      {
        name: "execute",
        handler: executeQuery,
      },
    ],
  },
] satisfies Route[];

export function exposeApiContext() {
  const { contextBridge, ipcRenderer } = window.require("electron");
  const apiMethods: Partial<ApiContext> = {};

  routes.forEach((route) => {
    apiMethods[route.name] = {};
    route.methods.forEach((method) => {
      apiMethods[route.name]![method.name] = (...args: Parameters<typeof method.handler>) => {
        const channel = `${route.name}:${method.name}`;
        return ipcRenderer.invoke(channel, ...args);
      };
    });
  });

  contextBridge.exposeInMainWorld("api", apiMethods);
}

export function addApiEventListeners() {
  routes.forEach((route) => {
    route.methods.forEach((method) => {
      const channel = `${route.name}:${method.name}`;
      ipcMain.handle(channel, method.handler);
    });
  });
}
