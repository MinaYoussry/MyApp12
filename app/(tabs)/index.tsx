import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Sparkles, Zap, Star } from 'lucide-react-native';
import ToolCard from '@/components/ToolCard';
import { featuredTools } from '@/data/tools';

export default function HomeScreen() {
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
                <Sparkles size={28} color="white" />
              </LinearGradient>
              <Text style={styles.logoText}>AlloPhoto AI</Text>
            </View>
            
            <Text style={styles.heroTitle}>Your AI Image Toolbox</Text>
            <Text style={styles.heroSubtitle}>
              Transform, enhance, and create stunning images with our suite of AI-powered tools.
              From background removal to art generation, unleash your creativity with cutting-edge
              technology.
            </Text>

            <View style={styles.heroButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push('/(tabs)/tools')}
              >
                <Text style={styles.primaryButtonText}>Explore Tools</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push('/(tabs)/pricing')}
              >
                <Text style={styles.secondaryButtonText}>View Pricing</Text>
              </TouchableOpacity>
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
                <Zap size={24} color="white" />
              </View>
              <Text style={styles.benefitTitle}>Lightning Fast</Text>
              <Text style={styles.benefitDescription}>
                Process images in seconds with our optimized AI algorithms
              </Text>
            </View>

            <View style={styles.benefitCard}>
              <View style={[styles.benefitIcon, { backgroundColor: '#10B981' }]}>
                <Star size={24} color="white" />
              </View>
              <Text style={styles.benefitTitle}>Professional Quality</Text>
              <Text style={styles.benefitDescription}>
                Achieve studio-level results with advanced AI technology
              </Text>
            </View>

            <View style={styles.benefitCard}>
              <View style={[styles.benefitIcon, { backgroundColor: '#F59E0B' }]}>
                <Sparkles size={24} color="white" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 600,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 56,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 28,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2D2D3A',
  },
  secondaryButtonText: {
    color: '#D1D5DB',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 18,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 28,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  benefitsContainer: {
    gap: 24,
  },
  benefitCard: {
    backgroundColor: '#16213E',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D2D3A',
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  benefitTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
  },
});