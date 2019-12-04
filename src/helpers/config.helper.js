/**
 * @flow
 */
import path from 'path';
import YAML from 'yamljs';
import fs from 'fs'; // eslint-disable-line

/**
 * YAML file content
 * @type {string}
 */
const yamlContent: string = fs.readFileSync(path.resolve(__dirname, '../../conf/config.yaml'), 'utf-8');

// TODO: env.properties file with replacements/defaults in config.yaml?



/**
 * CONFIG object with SERVER and DB properties
 * @type {Config}
 */
const CONFIG: Config = YAML.parse(yamlContent);
export default CONFIG;

/**
 * Config Helper Expected Properties
 * @type {Config}
 */
export interface Config {
  SERVER: {
    protocol: string;
    host: string;
    name: string;
    port: number;
    tmpDir: string; // For generating files
    docs: boolean; // should display docs?
  };
  DB: {
    name: string;
    host: string;
    user: string;
    password: string;
  };
}
