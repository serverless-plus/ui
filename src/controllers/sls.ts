import { Request, Response } from 'express';
import fs from 'fs';
import YAML from 'js-yaml';
import { YAML_PATH } from '../config';

/**
 * POST /init
 * init serverless config api.
 */
export const init = (req: Request, res: Response): void => {
  if (fs.existsSync(YAML_PATH)) {
    const oldYaml = fs.readFileSync(YAML_PATH, 'utf-8');
    res.json({
      code: 0,
      yaml: oldYaml,
      js: YAML.load(oldYaml),
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
