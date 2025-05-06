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

const CLIENT_ID = 'dd95cb828a374d6f9b8493e93c01f89d';
const REDIRECT_URI = 'music-transfer-app-login://callback-url';
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-library-read',
  'user-library-modify',
  'user-follow-read',
  'user-follow-modify',
  'user-read-recently-played',
  'user-read-currently-playing',
  'user-top-read',
];
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI,
)}&scope=${encodeURIComponent(SCOPES.join(' '))}`;

type SpotifyAuthWebViewProps = {
  onSuccess: (token: string) => void;
  onClose: () => void;
};

export const SpotifyAuthWebView: React.FC<SpotifyAuthWebViewProps> = ({
  onSuccess,
  onClose,
}) => {
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
    Linking.canOpenURL('spotify://').then(supported => {
      if (supported) {
        Linking.openURL(AUTH_URL).catch(() => {
          if (isActive) {
            setShowWebView(true);
          }
        });
        // Kullanıcıdan geri dönüş bekle, Modal'ı hemen kapatma
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
        <Text style={styles.infoText}>Spotify uygulaması açılıyor...</Text>
        <Text style={styles.infoText}>
          Eğer açılmazsa, lütfen geri dönüp tekrar deneyin veya Web üzerinden
          giriş yapın.
        </Text>
      </View>
    );
  }

  if (!showWebView) {
    // Kullanıcıdan geri dönüş bekleniyor
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>
          Spotify uygulamasından giriş yaptıktan sonra buraya geri
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
