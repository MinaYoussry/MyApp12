import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  SafeAreaView,
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
import { Sparkles, Zap, Star } from 'lucide-react-native';
import ToolCard from '@/components/ToolCard';
import { featuredTools } from '@/data/tools';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const createStyles = (isTablet: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0A0A0F',
    },
    heroSection: {
      paddingHorizontal: 16,
      paddingVertical: 40,
      alignItems: 'center',
    },
    heroContent: {
      alignItems: 'center',
      width: '100%',
      maxWidth: isTablet ? 600 : '100%',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    logo: {
      width: isTablet ? 56 : 44,
      height: isTablet ? 56 : 44,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    logoText: {
      fontSize: isTablet ? 28 : 20,
      fontWeight: 'bold',
      color: 'white',
    },
    heroTitle: {
      fontSize: isTablet ? 48 : 32,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 12,
      lineHeight: isTablet ? 56 : 38,
      paddingHorizontal: 8,
    },
    heroSubtitle: {
      fontSize: isTablet ? 18 : 16,
      color: '#D1D5DB',
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: isTablet ? 28 : 24,
      paddingHorizontal: 8,
    },
    heroButtons: {
      flexDirection: isTablet ? 'row' : 'column',
      gap: 16,
      width: '100%',
      maxWidth: 300,
    },
    heroButtonsTablet: {
      flexDirection: 'row',
      maxWidth: 400,
    },
    primaryButton: {
      backgroundColor: '#8B5CF6',
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#2D2D3A',
      alignItems: 'center',
    },
    secondaryButtonText: {
      color: '#D1D5DB',
      fontSize: 16,
      fontWeight: '600',
    },
    section: {
      paddingHorizontal: 16,
      paddingVertical: 32,
    },
    sectionTitle: {
      fontSize: isTablet ? 32 : 24,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    sectionSubtitle: {
      fontSize: isTablet ? 18 : 16,
      color: '#9CA3AF',
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: isTablet ? 28 : 24,
      paddingHorizontal: 8,
    },
    toolsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      justifyContent: 'center',
    },
    benefitsContainer: {
      gap: 16,
    },
    benefitCard: {
      backgroundColor: '#16213E',
      padding: 20,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#2D2D3A',
    },
    benefitIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    benefitTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 6,
    },
    benefitDescription: {
      fontSize: 14,
      color: '#9CA3AF',
      textAlign: 'center',
      lineHeight: 20,
    },
  });

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const styles = React.useMemo(() => createStyles(isTablet), [isTablet]);
  const primaryButtonScale = useSharedValue(1);
  const secondaryButtonScale = useSharedValue(1);
  const primaryHoverScale = useSharedValue(1);
  const secondaryHoverScale = useSharedValue(1);

  const primaryButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: primaryButtonScale.value * primaryHoverScale.value }],
    };
  });

  const secondaryButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: secondaryButtonScale.value * secondaryHoverScale.value }],
    };
  });

  const handlePrimaryButtonPressIn = () => {
    primaryButtonScale.value = withSpring(0.95);
  };

  const handlePrimaryButtonPressOut = () => {
    primaryButtonScale.value = withSpring(1);
  };

  const handleSecondaryButtonPressIn = () => {
    secondaryButtonScale.value = withSpring(0.95);
  };

  const handleSecondaryButtonPressOut = () => {
    secondaryButtonScale.value = withSpring(1);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        {/* Hero Section */}
        <LinearGradient
          colors={['#0F0F23', '#1A1A2E']}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#8B5CF6', '#3B82F6']}
                style={styles.logo}
              >
                <Sparkles size={isTablet ? 32 : 24} color="white" />
              </LinearGradient>
              <Text style={styles.logoText}>AlloPhoto AI</Text>
            </View>
            
            <Text style={styles.heroTitle}>Your AI Image Toolbox</Text>
            <Text style={styles.heroSubtitle}>
              Transform, enhance, and create stunning images with our suite of AI-powered tools.
              From background removal to art generation, unleash your creativity.
            </Text>

            <View style={[styles.heroButtons, isTablet && styles.heroButtonsTablet]}>
              <AnimatedPressable
                style={[styles.primaryButton, primaryButtonAnimatedStyle]}
                onPress={() => router.push('/(tabs)/tools')}
                onPressIn={handlePrimaryButtonPressIn}
                onPressOut={handlePrimaryButtonPressOut}
                onHoverIn={() => (primaryHoverScale.value = withSpring(1.03))}
                onHoverOut={() => (primaryHoverScale.value = withSpring(1))}
              >
                <Text style={styles.primaryButtonText}>Explore Tools</Text>
              </AnimatedPressable>
              
              <AnimatedPressable
                style={[styles.secondaryButton, secondaryButtonAnimatedStyle]}
                onPress={() => router.push('/(tabs)/pricing')}
                onPressIn={handleSecondaryButtonPressIn}
                onPressOut={handleSecondaryButtonPressOut}
                onHoverIn={() => (secondaryHoverScale.value = withSpring(1.03))}
                onHoverOut={() => (secondaryHoverScale.value = withSpring(1))}
              >
                <Text style={styles.secondaryButtonText}>View Pricing</Text>
              </AnimatedPressable>
            </View>
          </View>
        </LinearGradient>

        {/* Featured Tools Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Powerful AI Tools for Every Creator</Text>
          <Text style={styles.sectionSubtitle}>
            Professional-grade image processing tools powered by the latest AI technology
          </Text>

          <View style={styles.toolsGrid}>
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose AlloPhoto AI?</Text>
          <Text style={styles.sectionSubtitle}>
            Experience the future of image editing with our advanced AI-powered platform
          </Text>

          <View style={styles.benefitsContainer}>
            <View style={styles.benefitCard}>
              <View style={[styles.benefitIcon, { backgroundColor: '#8B5CF6' }]}>
                <Zap size={20} color="white" />
              </View>
              <Text style={styles.benefitTitle}>Lightning Fast</Text>
              <Text style={styles.benefitDescription}>
                Process images in seconds with our optimized AI algorithms
              </Text>
            </View>

            <View style={styles.benefitCard}>
              <View style={[styles.benefitIcon, { backgroundColor: '#10B981' }]}>
                <Star size={20} color="white" />
              </View>
              <Text style={styles.benefitTitle}>Professional Quality</Text>
              <Text style={styles.benefitDescription}>
                Achieve studio-level results with advanced AI technology
              </Text>
            </View>

            <View style={styles.benefitCard}>
              <View style={[styles.benefitIcon, { backgroundColor: '#F59E0B' }]}>
                <Sparkles size={20} color="white" />
              </View>
              <Text style={styles.benefitTitle}>Easy to Use</Text>
              <Text style={styles.benefitDescription}>
                Intuitive interface designed for creators of all skill levels
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}