import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  const handleSubscribe = () => {
    Alert.alert('Coming Soon', `${plan.name} plan subscription will be available soon!`);
  };

  return (
    <View style={[styles.card, plan.isPopular && styles.popularCard]}>
      {plan.isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularBadgeText}>Most Popular</Text>
        </View>
      )}
      
      <Text style={styles.planName}>{plan.name}</Text>
      
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{plan.price}</Text>
        {plan.period && <Text style={styles.period}>/{plan.period}</Text>}
      </View>
      
      <Text style={styles.description}>{plan.description}</Text>
      
      <View style={styles.featuresContainer}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.feature}>
            <Check size={16} color="#10B981" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubscribe}
      >
        {plan.isPopular ? (
          <LinearGradient
            colors={['#8B5CF6', '#3B82F6']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonTextPrimary}>{plan.buttonText}</Text>
          </LinearGradient>
        ) : (
          <View style={styles.buttonSecondary}>
            <Text style={styles.buttonTextSecondary}>{plan.buttonText}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16213E',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2D2D3A',
    position: 'relative',
  },
  popularCard: {
    borderColor: '#8B5CF6',
    borderWidth: 2,
  },
  popularBadge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  period: {
    fontSize: 18,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    gap: 16,
    marginBottom: 32,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#D1D5DB',
    flex: 1,
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#2D2D3A',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3D3D4A',
  },
  buttonTextPrimary: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  buttonTextSecondary: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D1D5DB',
  },
});