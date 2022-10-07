import {google} from "googleapis";

export const auth = new google.auth.GoogleAuth({
  keyFile: "keys.json", //the key file
  //url to spreadsheets API
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const authClientObject = await auth.getClient();

export const googleSheetsInstance = google.sheets({version: "v4", auth: authClientObject});

export const sheet_id = "1ce72GHS1gehCOao9g_1AxYwCK_CUjvmZkUcjMo2wYE8";