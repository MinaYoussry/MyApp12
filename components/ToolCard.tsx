import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface ToolCardProps {
  tool: Tool;
}

const { width } = Dimensions.get('window');
const cardWidth = width > 768 ? (width - 80) / 3 : (width - 60) / 2; // 3 cards on tablet, 2 on mobile

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function ToolCard({ tool }: ToolCardProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePress = () => {
    router.push(`/tool-details?toolId=${tool.id}`);
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
  };

  return (
    <AnimatedTouchableOpacity 
      style={[styles.card, { width: cardWidth, minHeight: 200 }, animatedStyle]} 
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={[styles.iconContainer, { backgroundColor: tool.color }]}>
        {tool.icon}
      </View>
      
      <Text style={styles.title}>{tool.name}</Text>
      <Text style={styles.description}>{tool.description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.tryText}>Try it now</Text>
        <ChevronRight size={16} color="#8B5CF6" />
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16213E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D3A',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
    lineHeight: 20,
  },
  description: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
    marginBottom: 12,
    flexGrow: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  tryText: {
    fontSize: 13,
    color: '#8B5CF6',
    fontWeight: '600',
  },
});