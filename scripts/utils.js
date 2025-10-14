const fs = require("fs");
const path = require("path");

const continueDir = path.join(__dirname, "..");

// We can't simply touch one of our files to trigger a rebuild, because
// esbuild doesn't always use modifications times to detect changes -
// for example, if it finds a file changed within the last 3 seconds,
// it will fall back to full-contents-comparison for that file
//
// So to facilitate development workflows, we always include a timestamp string
// in the build
function writeBuildTimestamp() {
  const timestampPath = path.join(continueDir, "extensions/vscode/src/.buildTimestamp.ts");
  const timestampDir = path.dirname(timestampPath);

  // Ensure directory exists
  if (!fs.existsSync(timestampDir)) {
    fs.mkdirSync(timestampDir, { recursive: true });
  }

  fs.writeFileSync(
    timestampPath,
    `export default "${new Date().toISOString()}";\n`,
  );
}

module.exports = {
  continueDir,
  writeBuildTimestamp,
};