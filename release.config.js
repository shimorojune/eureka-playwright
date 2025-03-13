module.exports = {
  branches: ["eureka-main", "main"], // The branch you release from
  tagFormat: "1.51.0-${version}",
  plugins: [
    "@semantic-release/commit-analyzer", // Analyzes commits to determine version bump
    "@semantic-release/release-notes-generator", // Generates release notes
    "@semantic-release/changelog", // Updates the CHANGELOG.md file
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json", "package-lock.json"], // Push updated files to Git
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "node ./utils/workspace.js --ensure-consistent && npm run build && npm pack ./packages/playwright-core && mv playwright-*.tgz pw-core.tgz && npm pack ./packages/playwright && mv playwright-*.tgz pw.tgz",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: [
          { path: "pw-core.tgz", label: "Playwright Core" },
          { path: "pw.tgz", label: "Playwright" },
        ],
      },
    ],
  ],
};
