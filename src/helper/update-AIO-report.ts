// src/helper/update-AIO-report.ts
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";
require("dotenv").config();

const jiraProjectKey = "LP";
const cyclekey = "LP-CY-1";

function importResultToAIOTest() {
  console.log("...Updating test result to AIO Test");
  const promises: Promise<any>[] = [];
  fs.readdirSync("./test-result/json").forEach((file) => {
    const jsonPath = path.join(
      __dirname,
      "..",
      "..",
      "test-result",
      "json",
      file
    );
    const bodyFormData = new FormData();
    bodyFormData.append("file", fs.createReadStream(jsonPath));
    bodyFormData.append("addCaseToCycle", "true");
    bodyFormData.append("createCase", "true");
    promises.push(
      axios
        .post(
          `https://tcms.aiojiraapps.com/aio-tcms/api/v1/project/${jiraProjectKey}/testcycle/${cyclekey}/import/results?type=Cucumber`,
          bodyFormData,
          {
            headers: {
              Authorization: `AioAuth ${process.env.AIO_TOKEN}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("Response data: " + JSON.stringify(response.data));
        })
        .catch((e) => console.log("error: " + e.message))
    );
  });
  Promise.all(promises);
}

importResultToAIOTest();
