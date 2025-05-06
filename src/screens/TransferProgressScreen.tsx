import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../theme/theme';
import {Button} from '../components/Button';

export const TransferProgressScreen = ({route, navigation}: any) => {
  const {playlist, targetPlatform} = route.params;
  const [progress, setProgress] = useState(0);
  const [currentSong, setCurrentSong] = useState('');
  const [status, setStatus] = useState<'inProgress' | 'completed'>(
    'inProgress',
  );
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setStatus('completed');
          setSuccessCount(42);
          setFailCount(3);
          return 100;
        }
        return prev + 5;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const handleViewDetails = () => {
    navigation.navigate('TransferResult', {
      playlist,
      targetPlatform,
      successCount,
      failCount,
    });
  };

  const handleDone = () => {
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Transfer Ediliyor</Text>
        <Text style={styles.subtitle}>
          {playlist.name} → {targetPlatform}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressIcon}>🔄</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {width: `${progress}%`},
              status === 'completed' && styles.progressFillCompleted,
            ]}
          />
        </View>
        <Text style={styles.progressText}>%{progress}</Text>
      </View>

      <View style={styles.currentSongContainer}>
        <Text style={styles.currentSongLabel}>Şu an transfer ediliyor:</Text>
        <Text style={styles.currentSong}>
          {currentSong || 'Hazırlanıyor...'}
        </Text>
      </View>

      <View style={styles.footer}>
        {status === 'completed' ? (
          <>
            <Button
              title="Detayları Gör"
              onPress={handleViewDetails}
              variant="outline"
              style={styles.footerButton}
            />
            <Button
              title="Tamamlandı"
              onPress={handleDone}
              style={styles.footerButton}
            />
          </>
        ) : (
          <Button
            title="İptal Et"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        )}
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
  progressContainer: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  progressIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.lg,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  progressFillCompleted: {
    backgroundColor: theme.colors.success,
  },
  progressText: {
    fontSize: 18,
    color: theme.colors.text,
  },
  currentSongContainer: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  currentSongLabel: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  currentSong: {
    fontSize: 18,
    color: theme.colors.text,
  },
  footer: {
    padding: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    flex: 1,
    marginHorizontal: theme.spacing.sm,
  },
});
