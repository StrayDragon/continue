const fs = require("fs");

const { writeBuildTimestamp } = require("./utils");

const esbuild = require("esbuild");

const flags = process.argv.slice(2);

const esbuildConfig = {
  entryPoints: ["extensions/vscode/src/conti.ts"],
  bundle: true,
  outfile: "extensions/vscode/out/extension.js",
  external: ["vscode", "esbuild"],
  format: "cjs",
  platform: "node",
  sourcemap: flags.includes("--sourcemap"),
  loader: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ".node": "file",
  },
  metafile: true,
  plugins: [
    {
      name: "on-end-plugin",
      setup(build) {
        build.onEnd((result) => {
          if (result.errors.length > 0) {
            console.error("Build failed with errors:", result.errors);
            throw new Error(result.errors);
          } else {
            try {
              // Ensure build directory exists
              if (!fs.existsSync("./build")) {
                fs.mkdirSync("./build", { recursive: true });
              }
              fs.writeFileSync(
                "./build/meta.json",
                JSON.stringify(result.metafile, null, 2),
              );
            } catch (e) {
              console.error("Failed to write esbuild meta file", e);
            }
            console.log("Conti Extension esbuild complete");
          }
        });
      },
    },
  ],
};

void (async () => {
  // Create .buildTimestamp.js before starting the first build
  writeBuildTimestamp();

  // Bundles the extension into one file
  if (flags.includes("--watch")) {
    const ctx = await esbuild.context(esbuildConfig);
    await ctx.watch();
  } else if (flags.includes("--notify")) {
    const inFile = esbuildConfig.entryPoints[0];
    const outFile = esbuildConfig.outfile;

    // The watcher automatically notices changes to source files
    // so the only thing it needs to be notified about is if the
    // output file gets removed.
    if (fs.existsSync(outFile)) {
      console.log("Conti Extension esbuild up to date");
      return;
    }

    fs.watchFile(outFile, (current, previous) => {
      if (current.size > 0) {
        console.log("Conti Extension esbuild rebuild complete");
        fs.unwatchFile(outFile);
        process.exit(0);
      }
    });

    console.log("Triggering Conti Extension esbuild rebuild...");
    writeBuildTimestamp();
  } else {
    await esbuild.build(esbuildConfig);
  }
})();