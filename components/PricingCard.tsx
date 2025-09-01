import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
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
import { Check } from 'lucide-react-native';

const createStyles = (isTablet: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: '#16213E',
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: '#2D2D3A',
      position: 'relative',
      marginHorizontal: isTablet ? 8 : 0,
      maxWidth: isTablet ? 350 : '100%',
    },
    popularCard: {
      borderColor: '#8B5CF6',
      borderWidth: 2,
    },
    popularBadge: {
      backgroundColor: '#8B5CF6',
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 16,
      position: 'absolute',
      top: -10,
      alignSelf: 'center',
    },
    popularBadgeText: {
      color: 'white',
      fontSize: 11,
      fontWeight: '600',
    },
    planName: {
      fontSize: isTablet ? 24 : 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 6,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center',
      marginBottom: 6,
    },
    price: {
      fontSize: isTablet ? 48 : 36,
      fontWeight: 'bold',
      color: 'white',
    },
    period: {
      fontSize: isTablet ? 18 : 14,
      color: '#9CA3AF',
      marginLeft: 2,
    },
    description: {
      fontSize: 14,
      color: '#9CA3AF',
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 20,
    },
    featuresContainer: {
      gap: 12,
      marginBottom: 24,
    },
    feature: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    featureText: {
      fontSize: 14,
      color: '#D1D5DB',
      flex: 1,
      lineHeight: 20,
    },
    button: {
      borderRadius: 8,
      overflow: 'hidden',
    },
    buttonGradient: {
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSecondary: {
      backgroundColor: '#2D2D3A',
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#3D3D4A',
    },
    buttonTextPrimary: {
      fontSize: 15,
      fontWeight: '600',
      color: 'white',
    },
    buttonTextSecondary: {
      fontSize: 15,
      fontWeight: '600',
      color: '#D1D5DB',
    },
  });

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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PricingCard({ plan }: PricingCardProps) {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const styles = React.useMemo(() => createStyles(isTablet), [isTablet]);

  const buttonScale = useSharedValue(1);
  const buttonOpacity = useSharedValue(1);
  const buttonHover = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value * buttonHover.value }],
      opacity: buttonOpacity.value,
    };
  });

  const handleSubscribe = () => {
    Alert.alert('Coming Soon', `${plan.name} plan subscription will be available soon!`);
  };

  const handleButtonPressIn = () => {
    buttonScale.value = withSpring(0.95);
    buttonOpacity.value = withTiming(0.8);
  };

  const handleButtonPressOut = () => {
    buttonScale.value = withSpring(1);
    buttonOpacity.value = withTiming(1);
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
      
      <AnimatedPressable 
        style={[styles.button, buttonAnimatedStyle]} 
        onPress={handleSubscribe}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
        onHoverIn={() => (buttonHover.value = withSpring(1.03))}
        onHoverOut={() => (buttonHover.value = withSpring(1))}
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
      </AnimatedPressable>
    </View>
  );
}