import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { User, Settings, CreditCard, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const createStyles = (isTablet: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0A0A0F',
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 32,
      alignItems: 'center',
    },
    profileInfo: {
      alignItems: 'center',
    },
    avatar: {
      width: isTablet ? 90 : 70,
      height: isTablet ? 90 : 70,
      borderRadius: isTablet ? 45 : 35,
      backgroundColor: '#8B5CF6',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    avatarText: {
      fontSize: isTablet ? 36 : 28,
      fontWeight: 'bold',
      color: 'white',
      textTransform: 'uppercase',
    },
    userName: {
      fontSize: isTablet ? 24 : 20,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 3,
    },
    userEmail: {
      fontSize: 14,
      color: '#9CA3AF',
    },
    content: {
      flex: 1,
      padding: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
    },
    statCard: {
      flex: 1,
      backgroundColor: '#16213E',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#2D2D3A',
    },
    statNumber: {
      fontSize: isTablet ? 24 : 20,
      fontWeight: 'bold',
      color: '#8B5CF6',
      marginBottom: 3,
    },
    statLabel: {
      fontSize: 12,
      color: '#9CA3AF',
      textAlign: 'center',
    },
    menuContainer: {
      gap: 3,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#16213E',
      padding: 14,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#2D2D3A',
    },
    menuText: {
      fontSize: 15,
      color: '#D1D5DB',
      marginLeft: 10,
      flex: 1,
    },
    logoutItem: {
      marginTop: 12,
    },
    logoutText: {
      color: '#EF4444',
    },
    signInPrompt: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    signInIcon: {
      width: isTablet ? 90 : 70,
      height: isTablet ? 90 : 70,
      borderRadius: isTablet ? 45 : 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    signInTitle: {
      fontSize: isTablet ? 24 : 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 12,
    },
    signInSubtitle: {
      fontSize: 14,
      color: '#9CA3AF',
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 20,
    },
    signInButton: {
      backgroundColor: '#8B5CF6',
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 8,
      minWidth: 120,
      alignItems: 'center',
    },
    signInButtonText: {
      color: 'white',
      fontSize: 15,
      fontWeight: '600',
    },
  });

function AnimatedMenuItem({ 
  children, 
  onPress, 
  style 
}: { 
  children: React.ReactNode; 
  onPress?: () => void; 
  style?: any;
}) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const hover = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value * hover.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
    opacity.value = withTiming(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
  };

  return (
    <AnimatedPressable
      style={[style, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={() => (hover.value = withSpring(1.02))}
      onHoverOut={() => (hover.value = withSpring(1))}
    >
      {children}
    </AnimatedPressable>
  );
}

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const styles = React.useMemo(() => createStyles(isTablet), [isTablet]);
  const { user, logout } = useAuth();
  const signInButtonScale = useSharedValue(1);
  const signInButtonHover = useSharedValue(1);

  const signInButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: signInButtonScale.value * signInButtonHover.value }],
    };
  });

  const handleSignInPressIn = () => {
    signInButtonScale.value = withSpring(0.95);
  };

  const handleSignInPressOut = () => {
    signInButtonScale.value = withSpring(1);
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: logout 
        },
      ]
    );
  };

  const handleSignIn = () => {
    router.push('/signin');
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.signInPrompt}>
          <LinearGradient
            colors={['#8B5CF6', '#3B82F6']}
            style={styles.signInIcon}
          >
            <User size={isTablet ? 36 : 28} color="white" />
          </LinearGradient>
          
          <Text style={styles.signInTitle}>Welcome to AlloPhoto AI</Text>
          <Text style={styles.signInSubtitle}>
            Sign in to access your tools, view your usage, and manage your account.
          </Text>

          <AnimatedPressable 
            style={[styles.signInButton, signInButtonAnimatedStyle]} 
            onPress={handleSignIn}
            onPressIn={handleSignInPressIn}
            onPressOut={handleSignInPressOut}
            onHoverIn={() => (signInButtonHover.value = withSpring(1.03))}
            onHoverOut={() => (signInButtonHover.value = withSpring(1))}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </AnimatedPressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0F0F23', '#1A1A2E']}
        style={styles.header}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name?.charAt(0) || user.email.charAt(0)}</Text>
          </View>
          <Text style={styles.userName}>{user.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>47</Text>
            <Text style={styles.statLabel}>Images Processed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>Pro</Text>
            <Text style={styles.statLabel}>Current Plan</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <AnimatedMenuItem style={styles.menuItem}>
            <Settings size={20} color="#9CA3AF" />
            <Text style={styles.menuText}>Account Settings</Text>
          </AnimatedMenuItem>

          <AnimatedMenuItem style={styles.menuItem}>
            <CreditCard size={20} color="#9CA3AF" />
            <Text style={styles.menuText}>Billing & Subscription</Text>
          </AnimatedMenuItem>

          <AnimatedMenuItem style={styles.menuItem}>
            <HelpCircle size={20} color="#9CA3AF" />
            <Text style={styles.menuText}>Help & Support</Text>
          </AnimatedMenuItem>

          <AnimatedMenuItem 
            style={[styles.menuItem, styles.logoutItem]} 
            onPress={handleLogout}
          >
            <LogOut size={20} color="#EF4444" />
            <Text style={[styles.menuText, styles.logoutText]}>Sign Out</Text>
          </AnimatedMenuItem>
        </View>
      </View>
    </SafeAreaView>
  );
}