import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { User, Settings, CreditCard, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

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
            <User size={32} color="white" />
          </LinearGradient>
          
          <Text style={styles.signInTitle}>Welcome to AlloPhoto AI</Text>
          <Text style={styles.signInSubtitle}>
            Sign in to access your tools, view your usage, and manage your account.
          </Text>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
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
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={24} color="#9CA3AF" />
            <Text style={styles.menuText}>Account Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <CreditCard size={24} color="#9CA3AF" />
            <Text style={styles.menuText}>Billing & Subscription</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle size={24} color="#9CA3AF" />
            <Text style={styles.menuText}>Help & Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
            <LogOut size={24} color="#EF4444" />
            <Text style={[styles.menuText, styles.logoutText]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#16213E',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D2D3A',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  menuContainer: {
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213E',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2D2D3A',
  },
  menuText: {
    fontSize: 16,
    color: '#D1D5DB',
    marginLeft: 12,
    flex: 1,
  },
  logoutItem: {
    marginTop: 16,
  },
  logoutText: {
    color: '#EF4444',
  },
  signInPrompt: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  signInIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  signInTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  signInSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  signInButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});