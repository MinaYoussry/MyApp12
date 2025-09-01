import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Sparkles, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const signInButtonScale = useSharedValue(1);
  const socialButtonScale = useSharedValue(1);
  const backButtonScale = useSharedValue(1);

  const signInButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: signInButtonScale.value }],
    };
  });

  const socialButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: socialButtonScale.value }],
    };
  });

  const backButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: backButtonScale.value }],
    };
  });

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Coming Soon', `${provider} login will be available soon!`);
  };

  const handleSignInPressIn = () => {
    signInButtonScale.value = withSpring(0.95);
  };

  const handleSignInPressOut = () => {
    signInButtonScale.value = withSpring(1);
  };

  const handleSocialPressIn = () => {
    socialButtonScale.value = withSpring(0.95);
  };

  const handleSocialPressOut = () => {
    socialButtonScale.value = withSpring(1);
  };

  const handleBackPressIn = () => {
    backButtonScale.value = withSpring(0.9);
  };

  const handleBackPressOut = () => {
    backButtonScale.value = withSpring(1);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <AnimatedTouchableOpacity 
          style={[styles.backButton, backButtonAnimatedStyle]} 
          onPress={() => router.back()}
          onPressIn={handleBackPressIn}
          onPressOut={handleBackPressOut}
        >
          <ArrowLeft size={24} color="#9CA3AF" />
        </AnimatedTouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={['#8B5CF6', '#3B82F6']}
            style={styles.logo}
          >
            <Sparkles size={32} color="white" />
          </LinearGradient>
          <Text style={styles.logoText}>AlloPhoto AI</Text>
        </View>

        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in to your account to continue creating amazing images
        </Text>

        <View style={styles.form}>
              <Sparkles size={isTablet ? 36 : 28} color="white" />
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#9CA3AF" />
                ) : (
                  <Eye size={20} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity 
              style={styles.rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberMeText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          <AnimatedTouchableOpacity 
            style={[styles.signInButton, signInButtonAnimatedStyle, isLoading && styles.buttonDisabled]} 
            onPress={handleSignIn}
            onPressIn={!isLoading ? handleSignInPressIn : undefined}
            onPressOut={!isLoading ? handleSignInPressOut : undefined}
            disabled={isLoading}
          >
            <LinearGradient
              colors={['#8B5CF6', '#3B82F6']}
              style={styles.buttonGradient}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.signInButtonText}>Sign in</Text>
              )}
            </AnimatedTouchableOpacity>
          </TouchableOpacity>

          <Text style={styles.signUpPrompt}>
            Don't have an account?{' '}
            <Text style={styles.signUpLink}>Sign up for free</Text>
          </Text>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
              </LinearGradient>
            </AnimatedTouchableOpacity>
          </View>

          <View style={styles.socialButtons}>
            <AnimatedTouchableOpacity 
              style={[styles.socialButton, socialButtonAnimatedStyle]}
              onPress={() => handleSocialLogin('Google')}
              onPressIn={handleSocialPressIn}
              onPressOut={handleSocialPressOut}
            >
              <Text style={styles.socialButtonText}>Google</Text>
            </AnimatedTouchableOpacity>
            
            <AnimatedTouchableOpacity 
              style={[styles.socialButton, socialButtonAnimatedStyle]}
              onPress={() => handleSocialLogin('GitHub')}
              onPressIn={handleSocialPressIn}
              onPressOut={handleSocialPressOut}
            >
              <Text style={styles.socialButtonText}>GitHub</Text>
            </AnimatedTouchableOpacity>
          </View>
        </View>
      </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: isTablet ? 40 : 24,
    justifyContent: 'center',
    maxWidth: isTablet ? 500 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: isTablet ? 70 : 56,
    height: isTablet ? 70 : 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: isTablet ? 28 : 20,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  input: {
    backgroundColor: '#2D2D3A',
    padding: 14,
    borderRadius: 8,
    fontSize: 15,
    color: 'white',
    borderWidth: 1,
    borderColor: '#3D3D4A',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2D3A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3D3D4A',
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 15,
    color: 'white',
  },
  passwordToggle: {
    padding: 14,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#4B5563',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  checkmark: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  rememberMeText: {
    fontSize: 13,
    color: '#D1D5DB',
  },
  forgotPassword: {
    fontSize: 13,
    color: '#8B5CF6',
  },
  signInButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  signInButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  signUpPrompt: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9CA3AF',
  },
  signUpLink: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2D2D3A',
  },
  dividerText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#2D2D3A',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D3D4A',
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D1D5DB',
  },
});