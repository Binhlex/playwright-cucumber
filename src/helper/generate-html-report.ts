const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-result",
  reportPath: "test-result/multiple-html-report",
  reportName: "Playwright automation report",
  pageTitle: "Multiple HTML report",
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "120",
    },
    device: "Local test machine",
    platform: {
      name: "ubuntu",
      version: "16.04",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Book Cart Application" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "B11221.34321" },
      { label: "Execution Start Time", value: "Nov 19th 2023, 02:31 PM EST" },
      { label: "Execution End Time", value: "Nov 19th 2023, 02:56 PM EST" },
    ],
  },
});
