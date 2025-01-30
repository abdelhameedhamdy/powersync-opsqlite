import "@azure/core-asynciterator-polyfill";

import { OPSqliteOpenFactory } from "@powersync/op-sqlite";
import {
  PowerSyncDatabase,
  AbstractPowerSyncDatabase,
} from "@powersync/react-native";
import React from "react";
import Logger from "js-logger";
import { BackendConnector } from "./BackendConnector";
import { AppSchema } from "./AppSchema";

const DB_NAME = "tracks.sqlite";

const factory = new OPSqliteOpenFactory({
  dbFilename: DB_NAME,
});

Logger.useDefaults();
export class System {
  powersync: AbstractPowerSyncDatabase;
  powersyncConnector: BackendConnector;

  constructor() {
    this.powersync = new PowerSyncDatabase({
      database: factory,
      schema: AppSchema,
    });
    this.powersyncConnector = new BackendConnector();
  }

  async init() {
    await this.powersync.init();
    await this.powersync.connect(this.powersyncConnector);
  }
}

export const system = new System();

export const SystemContext = React.createContext(system);
export const useSystem = () => React.useContext(SystemContext);
