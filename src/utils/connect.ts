import { connect } from "mongoose";

// const { logExecutionTime } = require("mongoose-execution-time");

// plugin(logExecutionTime);
export const connectToDb = async (dbURL: string) => {
  try {
    connect(dbURL).then(() => {
      console.log("connected to DB");
    });
  } catch (err: any) {
    console.info("unable to connect to DB");
    process.exit(1);
  }
};
