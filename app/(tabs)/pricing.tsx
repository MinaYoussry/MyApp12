import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import PricingCard from '@/components/PricingCard';
import { pricingPlans } from '@/data/pricing';

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
    title: {
      fontSize: isTablet ? 32 : 24,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    subtitle: {
      fontSize: isTablet ? 18 : 16,
      color: '#D1D5DB',
      textAlign: 'center',
      lineHeight: isTablet ? 28 : 24,
      maxWidth: isTablet ? 600 : '100%',
      paddingHorizontal: 8,
    },
    pricingContainer: {
      padding: 16,
      gap: 16,
    },
    faqSection: {
      padding: 16,
      paddingTop: 32,
    },
    faqTitle: {
      fontSize: isTablet ? 24 : 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 24,
      paddingHorizontal: 8,
    },
    faqItem: {
      backgroundColor: '#16213E',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#2D2D3A',
    },
    faqQuestion: {
      fontSize: 16,
      fontWeight: '600',
      color: 'white',
      marginBottom: 6,
    },
    faqAnswer: {
      fontSize: 14,
      color: '#9CA3AF',
      lineHeight: 20,
    },
  });

export default function PricingScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const styles = React.useMemo(() => createStyles(isTablet), [isTablet]);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <LinearGradient
          colors={['#0F0F23', '#1A1A2E']}
          style={styles.header}
        >
          <Text style={styles.title}>Simple, Transparent Pricing</Text>
          <Text style={styles.subtitle}>
            Choose the perfect plan for your needs. Start free and upgrade anytime.
          </Text>
        </LinearGradient>

        <View style={styles.pricingContainer}>
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Can I cancel my subscription anytime?</Text>
            <Text style={styles.faqAnswer}>
              Yes, you can cancel your Pro subscription at any time. You'll continue to have access until the end of your billing period.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What happens if I exceed my daily limit?</Text>
            <Text style={styles.faqAnswer}>
              If you reach your daily processing limit, you can either wait until the next day or upgrade to a higher plan for more capacity.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Is the Max plan really lifetime access?</Text>
            <Text style={styles.faqAnswer}>
              Yes! The Max plan is a one-time payment that gives you lifetime access to all features. No recurring charges, ever.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

 