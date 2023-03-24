import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins"
import fs from "fs/promises"
import path from "path"

const withTestflightDevDeploy: ConfigPlugin<{ enabled: boolean }> = (
  config,
  { enabled = false }
) => {
  const podfilePatch = [
    "",
    "# This was added by testflight-dev-deploy",
    'key_command_path = File.join(__dir__, "../node_modules/react-native/React/Base/RCTKeyCommands.m")',
    "file_content = File.read(key_command_path)",
    'file_content.sub!(/#if RCT_DEV/, "#if 0")',
    "File.write(key_command_path, file_content)",
    'puts "Patched RCTKeyCommands.m to disable key commands in dev mode"',
    "# end testflight-dev-deploy",
    "",
  ]
    .map((s) => `    ${s}`)
    .join("\n")

  withDangerousMod(config, [
    "ios",
    async (config) => {
      if (!enabled) {
        return config
      }

      const podfilePath = path.join(
        config.modRequest.platformProjectRoot,
        "Podfile"
      )

      const code = await fs.readFile(podfilePath, { encoding: "utf-8" })
      const patchedCode = code.replace(
        /^\s*post_integrate do \|installer\|/m,
        (match) => {
          return `${match}\n${podfilePatch}`
        }
      )
      await fs.writeFile(podfilePath, patchedCode)

      console.log("Patched Podfile to patch RCTKeyCommands.m")

      return config
    },
  ])
  return config
}

export default withTestflightDevDeploy
