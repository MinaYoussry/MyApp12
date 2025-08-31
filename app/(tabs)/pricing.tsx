import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import PricingCard from '@/components/PricingCard';
import { pricingPlans } from '@/data/pricing';

export default function PricingScreen() {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <LinearGradient
          colors={['#0F0F23', '#1A1A2E']}
          style={styles.header}
        >
          <Text style={styles.title}>Simple, Transparent Pricing</Text>
          <Text style={styles.subtitle}>
            Choose the perfect plan for your needs. Start free and upgrade anytime. No hidden
            fees, no surprises.
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 600,
  },
  pricingContainer: {
    padding: 20,
    gap: 20,
  },
  faqSection: {
    padding: 20,
    paddingTop: 40,
  },
  faqTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 32,
  },
  faqItem: {
    backgroundColor: '#16213E',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2D2D3A',
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
  },
});