import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connectYouTubeMusic} from '../api/platformAuth';
import {SpotifyAuthWebView as SpotifyAuthWebViewComponent} from '../components/SpotifyAuthWebView';
import {YouTubeMusicAuthWebView} from '../components/YouTubeMusicAuthWebView';

const initialPlatforms = [
  {
    id: 'spotify',
    name: 'Spotify',
    color: '#1DB954',
    emoji: '🎵',
    connected: false,
  },
  {
    id: 'youtube',
    name: 'YouTube Music',
    color: '#FF0000',
    emoji: '📺',
    connected: false,
  },
  {
    id: 'apple',
    name: 'Apple Music',
    color: '#FC3C44',
    emoji: '🍎',
    connected: false,
  },
  {
    id: 'deezer',
    name: 'Deezer',
    color: '#00C7F2',
    emoji: '💧',
    connected: false,
  },
];

const recentTransfers = [
  {
    id: '1',
    from: 'Spotify',
    to: 'YouTube Music',
    playlistName: 'Favori Şarkılarım',
    date: '2024-03-20',
    status: 'completed',
  },
  {
    id: '2',
    from: 'Apple Music',
    to: 'Spotify',
    playlistName: 'Workout Mix',
    date: '2024-03-19',
    status: 'completed',
  },
];

export const HomeScreen = ({navigation}: any) => {
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [showSpotifyAuth, setShowSpotifyAuth] = useState(false);
  const [showYouTubeAuth, setShowYouTubeAuth] = useState(false);

  const handlePlatformPress = (platform: (typeof platforms)[0]) => {
    if (platform.connected) {
      navigation.navigate('PlatformDetail', {
        platform,
        onDisconnect: () => handleDisconnect(platform.id),
      });
    } else {
      handleConnect(platform.id);
    }
  };

  const handleConnect = async (platformId: string) => {
    if (platformId === 'spotify') {
      setShowSpotifyAuth(true);
    } else if (platformId === 'youtube') {
      setLoadingId(platformId);
      const result = await connectYouTubeMusic();
      setLoadingId(null);
      if (result.success && result.token) {
        await AsyncStorage.setItem('youtube_token', result.token);
        setPlatforms(prev =>
          prev.map(p => (p.id === platformId ? {...p, connected: true} : p)),
        );
      } else {
        Alert.alert(
          'Bağlantı Hatası',
          'YouTube Music bağlantısı başarısız: ' +
            (result.error?.message || JSON.stringify(result.error) || ''),
        );
      }
    } else {
      setPlatforms(prev =>
        prev.map(p => (p.id === platformId ? {...p, connected: true} : p)),
      );
    }
  };

  const handleSpotifySuccess = async (token: string) => {
    setShowSpotifyAuth(false);
    if (token) {
      await AsyncStorage.setItem('spotify_token', token);
      setPlatforms(prev =>
        prev.map(p => (p.id === 'spotify' ? {...p, connected: true} : p)),
      );
    } else {
      Alert.alert('Bağlantı Hatası', 'Spotify bağlantısı başarısız.');
    }
  };

  const handleYouTubeSuccess = async (token: string) => {
    setShowYouTubeAuth(false);
    if (token) {
      await AsyncStorage.setItem('youtube_token', token);
      setPlatforms(prev =>
        prev.map(p => (p.id === 'youtube' ? {...p, connected: true} : p)),
      );
    } else {
      Alert.alert('Bağlantı Hatası', 'YouTube Music bağlantısı başarısız.');
    }
  };

  const handleDisconnect = async (platformId: string) => {
    if (platformId === 'spotify') {
      await AsyncStorage.removeItem('spotify_token');
    } else if (platformId === 'youtube') {
      await AsyncStorage.removeItem('youtube_token');
    }
    setPlatforms(prev =>
      prev.map(p => (p.id === platformId ? {...p, connected: false} : p)),
    );
  };

  const renderPlatformCard = ({item}: {item: (typeof platforms)[0]}) => (
    <TouchableOpacity
      style={[
        styles.platformCard,
        {backgroundColor: item.color + '22', shadowColor: item.color},
        item.connected && styles.platformCardConnected,
      ]}
      activeOpacity={0.85}
      onPress={() => handlePlatformPress(item)}
      disabled={!!loadingId}>
      <View style={styles.platformEmojiContainer}>
        <Text style={styles.platformEmoji}>{item.emoji}</Text>
      </View>
      <View style={styles.platformInfoContainer}>
        <Text style={styles.platformName}>{item.name}</Text>
        {item.connected ? (
          <View style={styles.connectedBadge}>
            <Text style={styles.connectedBadgeText}>Bağlandı</Text>
          </View>
        ) : loadingId === item.id ? (
          <ActivityIndicator
            size="small"
            color={item.color}
            style={{marginTop: 2}}
          />
        ) : (
          <Text style={styles.connectText}>Bağlan</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderTransferItem = ({item}: {item: (typeof recentTransfers)[0]}) => (
    <TouchableOpacity
      style={styles.transferCard}
      onPress={() => navigation.navigate('TransferDetail', {transfer: item})}>
      <View style={styles.transferHeader}>
        <Text style={styles.playlistName}>{item.playlistName}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.transferInfo}>
        <Text style={styles.transferText}>
          {item.from} → {item.to}
        </Text>
        <View style={[styles.statusBadge, styles[`${item.status}Badge`]]}>
          <Text style={styles.statusText}>
            {item.status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Playlist Transfer</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platformlar</Text>
          <FlatList
            data={platforms}
            renderItem={renderPlatformCard}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.platformsList}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Son Transferler</Text>
          {recentTransfers.map(transfer => (
            <View key={transfer.id}>
              {renderTransferItem({item: transfer})}
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal visible={showSpotifyAuth} animationType="slide">
        <SpotifyAuthWebViewComponent
          onSuccess={handleSpotifySuccess}
          onClose={() => setShowSpotifyAuth(false)}
        />
      </Modal>
      <Modal visible={showYouTubeAuth} animationType="slide">
        <YouTubeMusicAuthWebView
          onSuccess={handleYouTubeSuccess}
          onClose={() => setShowYouTubeAuth(false)}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  platformsList: {
    paddingVertical: theme.spacing.sm,
  },
  platformCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.card,
    minWidth: 160,
    minHeight: 64,
    shadowColor: theme.colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  platformCardConnected: {
    borderWidth: 2,
    borderColor: theme.colors.success,
  },
  platformEmojiContainer: {
    marginRight: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformEmoji: {
    fontSize: 32,
  },
  platformInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  platformName: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  connectedBadge: {
    backgroundColor: theme.colors.success + '33',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  connectedBadgeText: {
    color: theme.colors.success,
    fontSize: 13,
    fontWeight: 'bold',
  },
  connectText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  transferCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  transferHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  playlistName: {
    fontSize: 20,
    color: theme.colors.text,
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  transferInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transferText: {
    color: theme.colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  completedBadge: {
    backgroundColor: theme.colors.success + '20',
  },
  inProgressBadge: {
    backgroundColor: theme.colors.warning + '20',
  },
  statusText: {
    fontSize: 12,
    color: theme.colors.text,
  },
});
