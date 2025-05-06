import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../theme/theme';

const transfers = [
  {
    id: '1',
    from: 'Spotify',
    to: 'YouTube Music',
    playlistName: 'Favori Şarkılarım',
    date: '2024-03-20',
    status: 'completed',
    songCount: 45,
    successCount: 42,
    failCount: 3,
  },
  {
    id: '2',
    from: 'Apple Music',
    to: 'Spotify',
    playlistName: 'Workout Mix',
    date: '2024-03-19',
    status: 'completed',
    songCount: 30,
    successCount: 30,
    failCount: 0,
  },
  {
    id: '3',
    from: 'Spotify',
    to: 'Deezer',
    playlistName: 'Chill Vibes',
    date: '2024-03-18',
    status: 'completed',
    songCount: 25,
    successCount: 25,
    failCount: 0,
  },
];

export const ActivityScreen = ({navigation}: any) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTransfers = transfers.filter(transfer => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'success') return transfer.failCount === 0;
    if (selectedFilter === 'partial') return transfer.failCount > 0;
    return true;
  });

  const getPlatformColor = (platformName: string) => {
    switch (platformName) {
      case 'Spotify':
        return '#1DB954';
      case 'YouTube Music':
        return '#FF0000';
      case 'Apple Music':
        return '#FC3C44';
      case 'Deezer':
        return '#00C7F2';
      default:
        return theme.colors.primary;
    }
  };

  const renderTransferItem = ({item}: {item: (typeof transfers)[0]}) => (
    <TouchableOpacity
      style={styles.transferCard}
      onPress={() => navigation.navigate('TransferDetail', {transfer: item})}>
      <View style={styles.transferHeader}>
        <View style={styles.platformInfo}>
          <View
            style={[
              styles.platformBadge,
              {backgroundColor: getPlatformColor(item.from)},
            ]}>
            <Text style={styles.platformText}>{item.from}</Text>
          </View>
          <Text style={styles.playlistName}>{item.playlistName}</Text>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.transferDetails}>
        <View style={styles.transferInfo}>
          <Text style={styles.transferText}>
            {item.from} → {item.to}
          </Text>
          <Text style={styles.songCount}>
            {item.songCount} şarkı • {item.successCount} başarılı •{' '}
            {item.failCount} başarısız
          </Text>
        </View>
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
          <Text style={styles.title}>Aktiviteler</Text>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'all' && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter('all')}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === 'all' && styles.filterTextActive,
                ]}>
                Tümü
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'success' && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter('success')}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === 'success' && styles.filterTextActive,
                ]}>
                Başarılı
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'partial' && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter('partial')}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === 'partial' && styles.filterTextActive,
                ]}>
                Kısmi
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={filteredTransfers}
          renderItem={renderTransferItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      </ScrollView>
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
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  filterButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.card,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  filterTextActive: {
    color: theme.colors.text,
  },
  list: {
    padding: theme.spacing.lg,
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
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
  },
  platformText: {
    color: theme.colors.text,
    fontSize: 12,
  },
  playlistName: {
    fontSize: 20,
    color: theme.colors.text,
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  transferDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transferInfo: {
    flex: 1,
  },
  transferText: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  songCount: {
    color: theme.colors.textSecondary,
    fontSize: 12,
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
