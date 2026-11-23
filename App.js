import React, { useRef } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Speech from 'expo-speech';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';

const html = require('./attendanceHtml');
const LANG = 'ur-PK';

export default function App() {
  const web = useRef(null);

  // Send an event into the page (handled by window.frNativeEvent in the HTML)
  const toPage = (ev) => {
    web.current?.injectJavaScript(
      `window.frNativeEvent && window.frNativeEvent(${JSON.stringify(ev)}); true;`
    );
  };

  useSpeechRecognitionEvent('result', (e) => {
    if (e.isFinal && e.results?.[0]?.transcript) {
      toPage({ type: 'transcript', text: e.results[0].transcript });
    }
  });
  useSpeechRecognitionEvent('end', () => toPage({ type: 'listenEnd' }));
  useSpeechRecognitionEvent('error', (e) =>
    toPage({ type: 'error', message: e.message || e.error || 'unknown' })
  );

  const onMessage = async (event) => {
    let msg;
    try { msg = JSON.parse(event.nativeEvent.data); } catch { return; }

    if (msg.type === 'listen') {
      Speech.stop();
      const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!perm.granted) {
        toPage({ type: 'error', message: 'Mic ki ijazat nahi mili. Settings mein ijazat dein.' });
        return;
      }
      ExpoSpeechRecognitionModule.start({ lang: LANG, interimResults: false, continuous: false });
    } else if (msg.type === 'stopListen') {
      ExpoSpeechRecognitionModule.stop();
    } else if (msg.type === 'speak') {
      Speech.stop();
      Speech.speak(String(msg.text || ''), { language: LANG, rate: 0.95 });
    } else if (msg.type === 'stopSpeak') {
      Speech.stop();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <WebView
        ref={web}
        originWhitelist={['*']}
        // baseUrl gives the page a real origin so localStorage keeps data between launches
        source={{ html, baseUrl: 'https://attendance.local/' }}
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
        onMessage={onMessage}
        style={styles.web}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  web: { flex: 1, backgroundColor: '#f8fafc' },
});
