import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ToolCard from '@/components/ToolCard';
import { allTools } from '@/data/tools';

export default function ToolsScreen() {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <LinearGradient
          colors={['#0F0F23', '#1A1A2E']}
          style={styles.header}
        >
          <Text style={styles.title}>AI-Powered Image Tools</Text>
          <Text style={styles.subtitle}>
            Professional image editing and creation tools powered by advanced artificial
            intelligence. Transform your images with just a few clicks.
          </Text>
        </LinearGradient>

        <View style={styles.toolsContainer}>
          {allTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
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
  toolsContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
});