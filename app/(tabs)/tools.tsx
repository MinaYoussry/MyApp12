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
import ToolCard from '@/components/ToolCard';
import { allTools } from '@/data/tools';

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
    toolsContainer: {
      padding: 16,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      justifyContent: 'center',
    },
  });

export default function ToolsScreen() {
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
          <Text style={styles.title}>AI-Powered Image Tools</Text>
          <Text style={styles.subtitle}>
            Professional image editing and creation tools powered by AI. Transform your images with just a few clicks.
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