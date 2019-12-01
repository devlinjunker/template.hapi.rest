/**
 * @flow
 */
const path = require('path');
const YAML = require('yamljs');
const fs = require('fs');

const configYamlPath: string = path.resolve(__dirname, '../../conf/config.yaml');

const yamlContent: string = fs.readFileSync(configYamlPath, 'utf-8');

// TODO: env.properties file with replacements/defaults in config.yaml?

const config: Config = YAML.parse(yamlContent);

export default config;

export interface Config {
  SERVER: {
    protocol: string;
    host: string;
    name: string;
    port: number;
    tmpDir: string; // For generating files
  };
  DB: {
    name: string;
    host: string;
    user: string;
    password: string;
  };
}
