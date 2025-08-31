import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
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
const cardWidth = (width - 60) / 2; // 2 cards per row with margins

export default function ToolCard({ tool }: ToolCardProps) {
  const handlePress = () => {
    router.push(`/tool-details?toolId=${tool.id}`);
  };

  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]} onPress={handlePress}>
      <View style={[styles.iconContainer, { backgroundColor: tool.color }]}>
        {tool.icon}
      </View>
      
      <Text style={styles.title}>{tool.name}</Text>
      <Text style={styles.description}>{tool.description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.tryText}>Try it now</Text>
        <ChevronRight size={16} color="#8B5CF6" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16213E',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2D2D3A',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
    flexGrow: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tryText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
});