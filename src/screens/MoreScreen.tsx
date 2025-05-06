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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const menuItems = [
  {
    id: 'platforms',
    title: 'Platformlar',
    icon: '⚙️',
    route: 'Platforms',
  },
  {
    id: 'privacy',
    title: 'Gizlilik Politikası',
    icon: '❓',
    route: 'Privacy',
  },
  {
    id: 'terms',
    title: 'Kullanım Koşulları',
    icon: 'ℹ️',
    route: 'Terms',
  },
  {
    id: 'contact',
    title: 'Bize Ulaşın',
    icon: '📞',
    route: 'Contact',
  },
  {
    id: 'about',
    title: 'Hakkımızda',
    icon: 'ℹ️',
    route: 'About',
  },
];

const menuIcons: Record<string, string> = {
  platforms: 'cog',
  privacy: 'shield-lock',
  terms: 'information',
  contact: 'phone',
  about: 'information-outline',
};

export const MoreScreen = ({navigation}: any) => {
  const handleMenuItemPress = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Daha Fazla</Text>
        </View>

        <View style={styles.premiumCard}>
          <View style={styles.premiumContent}>
            <Text style={styles.premiumTitle}>Premium'a Yükselt</Text>
            <Text style={styles.premiumDescription}>
              Sınırsız transfer, öncelikli destek ve daha fazlası için premium
              üye olun.
            </Text>
            <Button
              title="Premium'a Geç"
              onPress={() => navigation.navigate('Premium')}
              size="large"
              style={styles.premiumButton}
            />
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item.route)}>
              <Icon
                name={menuIcons[item.id]}
                size={28}
                color={theme.colors.primary}
                style={{marginRight: 16}}
              />
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.chevronIcon}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versiyon 1.0.0</Text>
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
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  premiumCard: {
    margin: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  premiumContent: {
    alignItems: 'center',
  },
  premiumTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  premiumDescription: {
    ...theme.typography.body,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  premiumButton: {
    backgroundColor: theme.colors.text,
  },
  menuContainer: {
    padding: theme.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  menuTitle: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  chevronIcon: {
    fontSize: 24,
    color: theme.colors.textSecondary,
  },
  versionContainer: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  versionText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
});
