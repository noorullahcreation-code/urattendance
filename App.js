{
  "expo": {
    "name": "United Rubber Attendance",
    "slug": "ur-attendance",
    "owner": "noorullah85",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/android-icon-foreground.png",
        "backgroundImage": "./assets/android-icon-background.png",
        "monochromeImage": "./assets/android-icon-monochrome.png"
      },
      "package": "com.unitedrubber.attendance",
      "permissions": ["RECORD_AUDIO"]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-speech-recognition",
        {
          "microphonePermission": "Friday ko aap ki awaz sunne ke liye mic chahiye.",
          "speechRecognitionPermission": "Friday ko aap ki awaz samajhne ke liye speech recognition chahiye.",
          "androidSpeechServicePackages": [
            "com.google.android.googlequicksearchbox",
            "com.google.android.as"
          ]
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "7a411514-d751-4c43-8a8e-a4c48d361445"
      }
    }
  }
}
