module.exports = {
  roots: ["<rootDir>"],
  testMatch: ["**/tests/**/*.+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { diagnostics: false }],
  },
  verbose: true,
};
