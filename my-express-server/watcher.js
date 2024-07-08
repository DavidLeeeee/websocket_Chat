const { spawn } = require("child_process");
const fs = require("fs");

let serverProcess = spawn("node", ["server.js"]);

serverProcess.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

serverProcess.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

serverProcess.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});

const watchFiles = (dir) => {
  fs.watch(dir, { recursive: true }, (eventType, filename) => {
    if (filename) {
      console.log(`${filename} file Changed`);
      serverProcess.kill();
      serverProcess = spawn("node", ["server.js"]);
      serverProcess.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      serverProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      serverProcess.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
      });
    }
  });
};

watchFiles(__dirname);
