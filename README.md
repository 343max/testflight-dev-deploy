# testflight-dev-deploy

Deploy your expo dev client app via TestFlight to your dev devices.

<video src="https://raw.githubusercontent.com/343max/testflight-dev-deploy/main/images/demo.mp4" width="100%" controls="controls" autoplay="autoplay" loop="loop" muted="muted" playsinline="playsinline"></video>

<video src="https://private-user-images.githubusercontent.com/33906/346911964-28b54b31-7fe5-4441-a093-9778f59fa1b1.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjA2OTA4MDYsIm5iZiI6MTcyMDY5MDUwNiwicGF0aCI6Ii8zMzkwNi8zNDY5MTE5NjQtMjhiNTRiMzEtN2ZlNS00NDQxLWEwOTMtOTc3OGY1OWZhMWIxLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA3MTElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzExVDA5MzUwNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWFhNzQ5MGM4OWRkYjcyYThlMmU0MzAwYWMxNzliMDQ3NzA3MGExOGRmNzI5MTIwNmRhMDFmYjQ4NDBjYTkzYTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.g0OdcKjLv4hR2_vBP7Vl-mR7zQqGLl-byxt85_sbdao" width="100%" controls="controls" autoplay="autoplay" loop="loop" muted="muted" playsinline="playsinline"></video>

# TestFlight Enabler for the Dev Client

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
