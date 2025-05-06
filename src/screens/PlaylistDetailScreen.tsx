import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../theme/theme';
import {Button} from '../components/Button';

const songs = [
  {
    id: '1',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    duration: '3:53',
  },
  {
    id: '2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    duration: '3:20',
  },
  {
    id: '3',
    title: 'Dance Monkey',
    artist: 'Tones and I',
    duration: '3:29',
  },
  // ... diğer şarkılar
];

const platforms = [
  {
    id: 'spotify',
    name: 'Spotify',
    color: '#1DB954',
  },
  {
    id: 'youtube',
    name: 'YouTube Music',
    color: '#FF0000',
  },
  {
    id: 'apple',
    name: 'Apple Music',
    color: '#FC3C44',
  },
  {
    id: 'deezer',
    name: 'Deezer',
    color: '#00C7F2',
  },
];

export const PlaylistDetailScreen = ({route, navigation}: any) => {
  const {playlist} = route.params;
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const renderSongItem = ({item}: {item: (typeof songs)[0]}) => (
    <View style={styles.songItem}>
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
      <Text style={styles.songDuration}>{item.duration}</Text>
    </View>
  );

  const handleTransfer = () => {
    if (selectedPlatform) {
      setShowTransferModal(false);
      navigation.navigate('TransferProgress', {
        playlist,
        targetPlatform: selectedPlatform,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={playlist.image} style={styles.playlistImage} />
        <View style={styles.playlistInfo}>
          <Text style={styles.playlistName}>{playlist.name}</Text>
          <Text style={styles.songCount}>{playlist.songCount} şarkı</Text>
        </View>
      </View>

      <View style={styles.songsContainer}>
        <FlatList
          data={songs}
          renderItem={renderSongItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.songsList}
        />
      </View>

      <View style={styles.footer}>
        <Button
          title="Transfer Et"
          onPress={() => setShowTransferModal(true)}
          size="large"
        />
      </View>

      <Modal
        visible={showTransferModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTransferModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Transfer Et</Text>
            <Text style={styles.modalSubtitle}>
              Şu platformlara transfer edebilirsiniz:
            </Text>

            <View style={styles.platformsGrid}>
              {platforms.map(platform => (
                <TouchableOpacity
                  key={platform.id}
                  style={[
                    styles.platformButton,
                    {backgroundColor: platform.color},
                    selectedPlatform === platform.id && styles.selectedPlatform,
                  ]}
                  onPress={() => setSelectedPlatform(platform.id)}>
                  <Text style={styles.platformName}>{platform.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Button
                title="İptal"
                onPress={() => setShowTransferModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <Button
                title="Transfer Et"
                onPress={handleTransfer}
                disabled={!selectedPlatform}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistImage: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.lg,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistName: {
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  songCount: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
  songsContainer: {
    flex: 1,
  },
  songsList: {
    padding: theme.spacing.lg,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  songArtist: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  songDuration: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
  },
  modalTitle: {
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  modalSubtitle: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  platformsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  platformButton: {
    width: '50%',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    margin: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedPlatform: {
    opacity: 0.8,
  },
  platformName: {
    color: theme.colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: theme.spacing.sm,
  },
});
