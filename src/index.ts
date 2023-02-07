import { ConfigPlugin, withDangerousMod } from '@expo/config-plugins';
import fs from 'fs/promises';
import path from 'path';

const withTestflightDevDeploy: ConfigPlugin<{ enabled: boolean }> = (config, { enabled = false }) => {
  withDangerousMod(config, [
    'ios',
    async (config) => {
      if (!enabled) {
        return config;
      }
      const projectRoot = config._internal!['projectRoot'];
      const keyCommandPath = path.join(projectRoot, 'node_modules/react-native/React/Base/RCTKeyCommands.m');

      const code = await fs.readFile(keyCommandPath, { encoding: 'utf-8' });
      const patchedCode = code.replace(/^#if RCT_DEV/m, '#if 0');
      await fs.writeFile(keyCommandPath, patchedCode);

      console.log('Patched RCTKeyCommands.m');

      return config;
    },
  ]);
  return config;
};

export default withTestflightDevDeploy;
