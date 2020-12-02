import { join } from 'path';
const YAML_PATH = join(process.cwd(), 'serverless.yml');

const SUPORT_MIGRATE_COMPONENT = ['framework', 'scf', 'website', 'websocket'];

export { YAML_PATH, SUPORT_MIGRATE_COMPONENT };
