import { Request, Response } from 'express';
import fs from 'fs';
import YAML from 'js-yaml';
import { MIGRATE_METHOD_MAP, SupportComponents } from '@slsplus/migrate';
import { isFrameworkComponent } from '@slsplus/migrate/dist/utils';
import { typeOf } from '@ygkit/object';
import { YAML_PATH, SUPORT_MIGRATE_COMPONENT } from '../config';

/**
 * POST /init
 * init serverless config api.
 */
export const init = (req: Request, res: Response): void => {
  if (fs.existsSync(YAML_PATH)) {
    const oldYaml = fs.readFileSync(YAML_PATH, 'utf-8');
    const config = YAML.load(oldYaml);
    const { component } = config;
    // only supported component need migrate
    if (SUPORT_MIGRATE_COMPONENT.indexOf(component) !== -1) {
      let migrateMethod = MIGRATE_METHOD_MAP.framework;
      if (!isFrameworkComponent(component)) {
        migrateMethod = MIGRATE_METHOD_MAP[component as SupportComponents];
      }
      if (migrateMethod && typeOf(migrateMethod) === 'Function') {
        config.inputs = migrateMethod(config.inputs);
      }
    }
    res.json({
      code: 0,
      yaml: YAML.dump(config),
      js: config,
    });
  } else {
    res.json({
      code: 1,
    });
  }
};

/**
 * POST /generate
 * generate serverless yaml api.
 */
export const generate = (req: Request, res: Response): void => {
  const { config } = req.body;
  fs.writeFileSync(YAML_PATH, config);
  res.json({
    yamlPath: YAML_PATH,
    config,
  });
};
