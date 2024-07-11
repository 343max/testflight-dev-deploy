# testflight-dev-deploy

Deploy your expo dev client app via TestFlight to your dev devices.

<video src="https://raw.githubusercontent.com/343max/testflight-dev-deploy/main/images/demo.mp4" width="100%" controls="controls" autoplay="autoplay" loop="loop" muted="muted" playsinline="playsinline"></video>

# Enable TestFlight for Expo Dev Client apps

Expo Custom Dev Client can only be deployed to the iOS Simulator or to IPA Packages that are cumbersome to maintain and hard to install or update. It would be much easier to be able to deploy Expo Dev Client Apps through TestFlight: everyone on the team could install them very easily on all their devices and updates would run in the background or can be triggered by the press of a button.

Out of the box Expo dev client apps can't be distributed through TestFlight: React Natives developer tools use so called "non-public API" and Apple therefore will automatically reject the app.

This config plugin removes the usage of non-public API. Luckily for us the only place where it's used is to read some short cut keys that we don't really need on a device.

So all this actually does is replace a `#if RCT_DEV` macro by a `#if 0` at the top of `react-native/React/Base/RCTKeyCommands.m`.

# Usage

- install expo module

```sh
expo install testflight-dev-deploy
```

- add the plugin to the `app.json` or `app.config.ts` in the root of our expo app like this:

```js
{
  plugins: [["testflight-dev-deploy", { enabled: true }]]
}
```

- add a development build configuration to our `eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "store"
    }
  }
}
```

Now we can trigger a build:

```
eas build --profile development --platform ios --auto-submit
```
