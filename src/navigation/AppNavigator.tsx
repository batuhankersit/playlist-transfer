import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import {theme} from '../theme/theme';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

// Screens
import {SplashScreen} from '../screens/SplashScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {ConnectionScreen} from '../screens/ConnectionScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {ActivityScreen} from '../screens/ActivityScreen';
import {MoreScreen} from '../screens/MoreScreen';
import {PlatformDetailScreen} from '../screens/PlatformDetailScreen';
import {PlaylistDetailScreen} from '../screens/PlaylistDetailScreen';
import {TransferProgressScreen} from '../screens/TransferProgressScreen';
import {TransferResultScreen} from '../screens/TransferResultScreen';

type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Connection: undefined;
  Main: undefined;
  PlatformDetail: {platform: any};
  PlaylistDetail: {playlist: any};
  TransferProgress: {playlist: any; targetPlatform: string};
  TransferResult: {
    playlist: any;
    targetPlatform: string;
    successCount: number;
    failCount: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: theme.spacing.sm,
          height: 60,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({color}) => (
            <Text style={{color, fontSize: 20}}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="ActivityTab"
        component={ActivityScreen}
        options={{
          tabBarLabel: 'Aktiviteler',
          tabBarIcon: ({color}) => (
            <Text style={{color, fontSize: 20}}>📊</Text>
          ),
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreScreen}
        options={{
          tabBarLabel: 'Daha Fazla',
          tabBarIcon: ({color}) => (
            <Text style={{color, fontSize: 20}}>⚙️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: theme.colors.background},
        }}>
        <Stack.Screen
          name="Splash"
          options={{gestureEnabled: false}}
          component={(
            props: NativeStackScreenProps<RootStackParamList, 'Splash'>,
          ) => (
            <SplashScreen
              {...props}
              onFinish={() => props.navigation.replace('Onboarding')}
            />
          )}
        />
        <Stack.Screen
          name="Onboarding"
          options={{gestureEnabled: false}}
          component={(
            props: NativeStackScreenProps<RootStackParamList, 'Onboarding'>,
          ) => (
            <OnboardingScreen
              {...props}
              onFinish={() => props.navigation.replace('Connection')}
            />
          )}
        />
        <Stack.Screen name="Connection" component={ConnectionScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="PlatformDetail" component={PlatformDetailScreen} />
        <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
        <Stack.Screen
          name="TransferProgress"
          component={TransferProgressScreen}
        />
        <Stack.Screen name="TransferResult" component={TransferResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
