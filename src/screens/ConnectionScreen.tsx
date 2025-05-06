import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../theme/theme';
import {Button} from '../components/Button';

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

export const ConnectionScreen = ({navigation}: any) => {
  const handleConnect = (platformId: string) => {
    // Platform bağlantı işlemleri burada yapılacak
    console.log(`Connecting to ${platformId}`);
  };

  // En az bir platform bağlıymış gibi kabul ediyorum
  const isAnyPlatformConnected = true;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Müzik Platformlarını Bağlayın</Text>
          <Text style={styles.subtitle}>
            Playlistlerinizi transfer etmek için en az bir platform bağlayın
          </Text>
        </View>

        <View style={styles.platformsContainer}>
          {platforms.map(platform => (
            <TouchableOpacity
              key={platform.id}
              style={[styles.platformCard, {backgroundColor: platform.color}]}
              onPress={() => handleConnect(platform.id)}>
              <Text style={styles.platformName}>{platform.name}</Text>
              <Text style={styles.connectText}>Bağlan</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Button
            title="Devam Et"
            onPress={() => navigation.replace('Main')}
            size="large"
            disabled={!isAnyPlatformConnected}
          />
        </View>
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
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  platformsContainer: {
    padding: theme.spacing.md,
  },
  platformCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  platformName: {
    fontSize: 20,
    color: theme.colors.text,
  },
  connectText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  footer: {
    padding: theme.spacing.lg,
  },
});
