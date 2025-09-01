import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ToolCard({ tool }: ToolCardProps) {
  const { width } = useWindowDimensions();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const hoverScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value * hoverScale.value }],
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

  // Responsive card width: 1 column on small phones, 2 on small tablets, 3 on large screens
  const numColumns = width >= 1024 ? 3 : width >= 600 ? 2 : 1;
  const gap = 12;
  const horizontalPadding = 32; // matches containers using ~16px padding each side
  const computedCardWidth = Math.min(
    360,
    (width - horizontalPadding * 2 - gap * (numColumns - 1)) / numColumns
  );

  return (
    <AnimatedPressable 
      style={[styles.card, { width: computedCardWidth, minHeight: 200 }, animatedStyle]} 
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={() => (hoverScale.value = withSpring(1.03))}
      onHoverOut={() => (hoverScale.value = withSpring(1))}
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
    </AnimatedPressable>
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