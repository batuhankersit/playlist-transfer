import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../theme/theme';
import {Button} from '../components/Button';

const slides = [
  {
    id: '1',
    title: 'Playlist Transfer',
    description:
      'Müzik platformları arasında playlistlerinizi kolayca transfer edin.',
    icon: '🎵',
  },
  {
    id: '2',
    title: 'Çoklu Platform Desteği',
    description: 'Spotify, YouTube Music, Apple Music ve daha fazlası...',
    icon: '🎧',
  },
  {
    id: '3',
    title: 'Hızlı ve Güvenli',
    description: 'Şarkılarınızı hızlı ve güvenli bir şekilde transfer edin.',
    icon: '⚡',
  },
];

export const OnboardingScreen = ({onFinish}: {onFinish: () => void}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.slideContainer}>
          {slides.map(slide => (
            <View key={slide.id} style={styles.slide}>
              <Text style={styles.icon}>{slide.icon}</Text>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Başla" onPress={onFinish} size="large" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  slide: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  icon: {
    fontSize: 80,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});
