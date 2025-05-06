import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../theme/theme';
import {Button} from '../components/Button';

const failedSongs = [
  {
    id: '1',
    title: 'Song 1',
    artist: 'Artist 1',
    reason: 'Şarkı bulunamadı',
  },
  {
    id: '2',
    title: 'Song 2',
    artist: 'Artist 2',
    reason: 'Telif hakkı kısıtlaması',
  },
];

export const TransferResultScreen = ({route, navigation}: any) => {
  const {playlist, targetPlatform, successCount, failCount} = route.params;

  const renderFailedSong = ({item}: any) => (
    <View style={styles.failedSongItem}>
      <View style={styles.failedSongInfo}>
        <Text style={styles.failedSongTitle}>{item.title}</Text>
        <Text style={styles.failedSongArtist}>{item.artist}</Text>
      </View>
      <Text style={styles.failedSongReason}>{item.reason}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Transfer Tamamlandı</Text>
        <Text style={styles.subtitle}>
          {playlist.name} → {targetPlatform}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{successCount}</Text>
          <Text style={styles.statLabel}>Başarılı</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{failCount}</Text>
          <Text style={styles.statLabel}>Başarısız</Text>
        </View>
      </View>

      {failCount > 0 && (
        <View style={styles.failedSongsContainer}>
          <Text style={styles.failedSongsTitle}>Başarısız Şarkılar</Text>
          <FlatList
            data={failedSongs}
            renderItem={renderFailedSong}
            keyExtractor={item => item.id}
            style={styles.failedSongsList}
          />
        </View>
      )}

      <View style={styles.footer}>
        <Button
          title="Ana Sayfaya Dön"
          onPress={() => navigation.navigate('Main')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.lg,
  },
  failedSongsContainer: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  failedSongsTitle: {
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  failedSongsList: {
    flex: 1,
  },
  failedSongItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  failedSongInfo: {
    flex: 1,
  },
  failedSongTitle: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  failedSongArtist: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  failedSongReason: {
    fontSize: 14,
    color: theme.colors.error,
    marginLeft: theme.spacing.md,
  },
  footer: {
    padding: theme.spacing.lg,
  },
});
