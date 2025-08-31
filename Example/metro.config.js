// Metro configuration for a workspace with a local linked package
// Ensures Metro can resolve files outside the app's projectRoot

const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
// Workspace root is the repository root containing the local library
const workspaceRoot = path.resolve(__dirname, '..');

/** @type {import('metro-config').MetroConfig} */
const extraConfig = {
  projectRoot,
  watchFolders: [workspaceRoot],
  resolver: {
    // Resolve modules only from the app's node_modules
    nodeModulesPaths: [path.resolve(projectRoot, 'node_modules')],
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), extraConfig);
