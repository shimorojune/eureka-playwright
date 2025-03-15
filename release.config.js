
module.exports = {
  branches: ["eureka-main"], // The branch you release from
  tagFormat: "1.51.1-${version}",
  plugins: [
    "@semantic-release/commit-analyzer", // Analyzes commits to determine version bump
    "@semantic-release/release-notes-generator", // Generates release notes
    "@semantic-release/changelog", // Updates the CHANGELOG.md file
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "node ./utils/update-package-version.js 1.51.1-${nextRelease.version}",
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "node ./utils/workspace.js --ensure-consistent 1.51.1-${nextRelease.version} && npm run build && npm pack ./packages/playwright-core && mv playwright-*.tgz pw-core.tgz && npm pack ./packages/playwright && mv playwright-*.tgz pw.tgz",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: [
          { path: "pw-core.tgz", label: "pw-core.tgz" },
          { path: "pw.tgz", label: "pw.tgz" },
        ],
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "package-lock.json"], // Push updated files to Git
        message:
          "chore(release): 1.51.1-${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
