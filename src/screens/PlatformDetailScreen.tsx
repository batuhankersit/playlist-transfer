import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const playlists = [
  {
    id: '1',
    name: 'Favori Şarkılarım',
    songCount: 45,
    icon: '🎵',
  },
  {
    id: '2',
    name: 'Workout Mix',
    songCount: 30,
    icon: '💪',
  },
  {
    id: '3',
    name: 'Chill Vibes',
    songCount: 25,
    icon: '😌',
  },
  {
    id: '4',
    name: 'Party Time',
    songCount: 50,
    icon: '🎉',
  },
];

const platformIcons: Record<string, string> = {
  spotify: 'spotify',
  youtube: 'youtube',
  apple: 'apple',
  deezer: 'music-circle',
};

export const PlatformDetailScreen = ({route, navigation}: any) => {
  const {platform, onDisconnect} = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  const platformEmoji = platform.emoji || '🎵';
  const platformIconName = platformIcons[platform.id] || 'music-circle';

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderPlaylistItem = ({item}: {item: (typeof playlists)[0]}) => (
    <TouchableOpacity
      style={styles.playlistCard}
      onPress={() => navigation.navigate('PlaylistDetail', {playlist: item})}>
      <Icon
        name="music-note"
        size={32}
        color={platform.color}
        style={styles.playlistIcon}
      />
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistName}>{item.name}</Text>
        <Text style={styles.songCount}>{item.songCount} şarkı</Text>
      </View>
      <Text style={styles.chevronIcon}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[
          styles.modernHeader,
          {backgroundColor: platform.color + '22', shadowColor: platform.color},
        ]}>
        <View style={styles.headerContent}>
          <Icon
            name={platformIconName}
            size={40}
            color={platform.color}
            style={styles.platformEmoji}
          />
          <View style={styles.headerTextGroup}>
            <Text style={styles.platformTitle}>{platform.name}</Text>
            <View style={styles.connectedBadge}>
              <Text style={styles.connectedBadgeText}>Bağlandı</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.disconnectButton}
          onPress={() => {
            if (onDisconnect) onDisconnect();
            navigation.goBack();
          }}>
          <Text style={styles.disconnectText}>Bağlantıyı Kes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Playlist ara..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredPlaylists}
        renderItem={renderPlaylistItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  modernHeader: {
    margin: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: 24,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformEmoji: {
    fontSize: 40,
    marginRight: theme.spacing.md,
  },
  headerTextGroup: {
    justifyContent: 'center',
  },
  platformTitle: {
    fontSize: 26,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  connectedBadge: {
    backgroundColor: theme.colors.success + '33',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  connectedBadgeText: {
    color: theme.colors.success,
    fontSize: 13,
    fontWeight: 'bold',
  },
  disconnectButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.error + '20',
  },
  disconnectText: {
    color: theme.colors.error,
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    margin: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
    fontSize: 20,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: theme.colors.text,
    fontSize: 16,
  },
  list: {
    padding: theme.spacing.lg,
  },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  playlistIcon: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistName: {
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  songCount: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  chevronIcon: {
    fontSize: 24,
    color: theme.colors.textSecondary,
  },
});
