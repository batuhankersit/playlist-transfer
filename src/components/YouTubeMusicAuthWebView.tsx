import React, {useRef, useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {
  Linking,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';

const CLIENT_ID = 'GOOGLE_CLIENT_ID.apps.googleusercontent.com'; // Google Console'dan alınacak
const REDIRECT_URI = 'com.yourapp:/oauth2redirect/google'; // Google Console'da tanımlı olmalı
const SCOPES = [
  'openid',
  'profile',
  'email',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube',
];
const AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI,
)}&scope=${encodeURIComponent(SCOPES.join(' '))}`;

type YouTubeMusicAuthWebViewProps = {
  onSuccess: (token: string) => void;
  onClose: () => void;
};

export const YouTubeMusicAuthWebView: React.FC<
  YouTubeMusicAuthWebViewProps
> = ({onSuccess, onClose}) => {
  const webviewRef = useRef(null);
  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    // Emülatör/simülatör veya geliştirme ortamında doğrudan WebView aç
    if (__DEV__ && (Platform.OS === 'android' || Platform.OS === 'ios')) {
      setShowWebView(true);
      setLoading(false);
      return;
    }
    Linking.canOpenURL('vnd.youtube://').then(supported => {
      if (supported) {
        Linking.openURL(AUTH_URL).catch(() => {
          if (isActive) setShowWebView(true);
        });
        setLoading(false);
      } else {
        setShowWebView(true);
        setLoading(false);
      }
    });
    return () => {
      isActive = false;
    };
  }, [onClose]);

  const handleNavigationStateChange = (navState: any) => {
    if (navState.url.startsWith(REDIRECT_URI)) {
      const match = navState.url.match(/access_token=([^&]+)/);
      if (match) {
        const token = match[1];
        onSuccess(token);
      }
      onClose();
    }
  };

  if (loading && !showWebView) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.infoText}>
          YouTube Music uygulaması açılıyor...
        </Text>
        <Text style={styles.infoText}>
          Eğer açılmazsa, lütfen geri dönüp tekrar deneyin veya Web üzerinden
          giriş yapın.
        </Text>
      </View>
    );
  }

  if (!showWebView) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>
          YouTube Music uygulamasından giriş yaptıktan sonra buraya geri
          dönebilirsiniz.
        </Text>
      </View>
    );
  }

  return (
    <WebView
      ref={webviewRef}
      source={{uri: AUTH_URL}}
      onNavigationStateChange={handleNavigationStateChange}
      startInLoadingState
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#111',
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});
