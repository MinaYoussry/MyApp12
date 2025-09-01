import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  useWindowDimensions,
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Upload, Download } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/contexts/AuthContext';
import { allTools } from '@/data/tools';
import { api } from '@/api';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const createStyles = (width: number) => {
  const isTablet = width > 768;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0A0A0F',
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    headerContent: {
      alignItems: 'center',
    },
    toolIcon: {
      width: isTablet ? 70 : 56,
      height: isTablet ? 70 : 56,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    toolTitle: {
      fontSize: isTablet ? 24 : 20,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 6,
    },
    toolDescription: {
      fontSize: 14,
      color: '#D1D5DB',
      textAlign: 'center',
      lineHeight: 20,
      paddingHorizontal: 8,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 12,
    },
    uploadSection: {
      marginBottom: 24,
    },
    imageContainer: {
      alignItems: 'center',
    },
    previewImage: {
      width: isTablet ? 350 : Math.min(width - 64, 280),
      height: isTablet ? 233 : Math.min((width - 64) * 0.67, 187),
      borderRadius: 12,
      marginBottom: 12,
    },
    changeImageButton: {
      backgroundColor: '#2D2D3A',
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#3D3D4A',
    },
    changeImageText: {
      color: '#D1D5DB',
      fontSize: 13,
      fontWeight: '600',
    },
    uploadButton: {
      backgroundColor: '#16213E',
      padding: isTablet ? 40 : 32,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#2D2D3A',
      borderStyle: 'dashed',
      width: '100%',
    },
    uploadButtonText: {
      fontSize: isTablet ? 18 : 16,
      fontWeight: '600',
      color: '#8B5CF6',
      marginTop: 10,
    },
    uploadHint: {
      fontSize: 13,
      color: '#9CA3AF',
      marginTop: 3,
    },
    processSection: {
      marginBottom: 24,
    },
    processButton: {
      borderRadius: 8,
      overflow: 'hidden',
    },
    buttonGradient: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 6,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    processButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: 'white',
    },
    resultSection: {
      marginBottom: 24,
    },
    downloadButton: {
      backgroundColor: '#10B981',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    downloadText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    infoSection: {
      marginBottom: 24,
    },
    infoText: {
      fontSize: 14,
      color: '#9CA3AF',
      lineHeight: 20,
    },
    errorText: {
      fontSize: 18,
      color: '#EF4444',
      textAlign: 'center',
      margin: 20,
    },
  });
};

export default function ToolDetailsScreen() {
  const { width } = useWindowDimensions();
  const styles = React.useMemo(() => createStyles(width), [width]);
  const { toolId } = useLocalSearchParams<{ toolId: string }>();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const backButtonScale = useSharedValue(1);
  const backButtonHover = useSharedValue(1);
  const uploadButtonScale = useSharedValue(1);
  const uploadButtonHover = useSharedValue(1);
  const processButtonScale = useSharedValue(1);
  const processButtonHover = useSharedValue(1);
  const downloadButtonScale = useSharedValue(1);
  const downloadButtonHover = useSharedValue(1);
  const changeImageButtonScale = useSharedValue(1);
  const changeImageButtonHover = useSharedValue(1);

  const backButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: backButtonScale.value * backButtonHover.value }],
    };
  });

  const uploadButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: uploadButtonScale.value * uploadButtonHover.value }],
    };
  });

  const processButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: processButtonScale.value * processButtonHover.value }],
    };
  });

  const downloadButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: downloadButtonScale.value * downloadButtonHover.value }],
    };
  });

  const changeImageButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: changeImageButtonScale.value * changeImageButtonHover.value }],
    };
  });

  const tool = allTools.find(t => t.id === toolId);

  if (!tool) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Tool not found</Text>
      </SafeAreaView>
    );
  }

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setProcessedImage(null);
    }
  };

  const processImage = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }

    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to use this tool');
      router.push('/signin');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, use the same image as result
      setProcessedImage(selectedImage);
      
      Alert.alert('Success', `Image processed successfully with ${tool.name}!`);
    } catch (error) {
      Alert.alert('Error', 'Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const createPressHandlers = (scaleValue: any) => ({
    onPressIn: () => {
      scaleValue.value = withSpring(0.95);
    },
    onPressOut: () => {
      scaleValue.value = withSpring(1);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0F0F23', '#1A1A2E']}
        style={styles.header}
      >
        <AnimatedPressable 
          style={[styles.backButton, backButtonAnimatedStyle]} 
          onPress={() => router.back()}
          {...createPressHandlers(backButtonScale)}
          onHoverIn={() => (backButtonHover.value = withSpring(1.05))}
          onHoverOut={() => (backButtonHover.value = withSpring(1))}
        >
          <ArrowLeft size={24} color="white" />
        </AnimatedPressable>
        
        <View style={styles.headerContent}>
          <View style={[styles.toolIcon, { backgroundColor: tool.color }]}>
            {tool.icon}
          </View>
          <Text style={styles.toolTitle}>{tool.name}</Text>
          <Text style={styles.toolDescription}>{tool.description}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>Upload Image</Text>
          
          {selectedImage ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
              <AnimatedPressable 
                style={[styles.changeImageButton, changeImageButtonAnimatedStyle]} 
                onPress={pickImage}
                {...createPressHandlers(changeImageButtonScale)}
                onHoverIn={() => (changeImageButtonHover.value = withSpring(1.03))}
                onHoverOut={() => (changeImageButtonHover.value = withSpring(1))}
              >
                <Text style={styles.changeImageText}>Change Image</Text>
              </AnimatedPressable>
            </View>
          ) : (
            <AnimatedPressable 
              style={[styles.uploadButton, uploadButtonAnimatedStyle]} 
              onPress={pickImage}
              {...createPressHandlers(uploadButtonScale)}
              onHoverIn={() => (uploadButtonHover.value = withSpring(1.03))}
              onHoverOut={() => (uploadButtonHover.value = withSpring(1))}
            >
              <Upload size={width > 768 ? 36 : 28} color="#8B5CF6" />
              <Text style={styles.uploadButtonText}>Select Image</Text>
              <Text style={styles.uploadHint}>Tap to choose from your gallery</Text>
            </AnimatedPressable>
          )}
        </View>

        {selectedImage && (
          <View style={styles.processSection}>
            <AnimatedPressable 
              style={[styles.processButton, processButtonAnimatedStyle, isProcessing && styles.buttonDisabled]}
              onPress={processImage}
              onPressIn={!isProcessing ? () => processButtonScale.value = withSpring(0.95) : undefined}
              onPressOut={!isProcessing ? () => processButtonScale.value = withSpring(1) : undefined}
              disabled={isProcessing}
            >
              <LinearGradient
                colors={['#8B5CF6', '#3B82F6']}
                style={styles.buttonGradient}
              >
                {isProcessing ? (
                  <>
                    <ActivityIndicator color="white" size="small" />
                    <Text style={styles.processButtonText}>Processing...</Text>
                  </>
                ) : (
                  <Text style={styles.processButtonText}>Process Image</Text>
                )}
              </LinearGradient>
            </AnimatedPressable>
          </View>
        )}

        {processedImage && (
          <View style={styles.resultSection}>
            <Text style={styles.sectionTitle}>Result</Text>
            <View style={styles.imageContainer}>
              <Image source={{ uri: processedImage }} style={styles.previewImage} />
              <AnimatedPressable 
                style={[styles.downloadButton, downloadButtonAnimatedStyle]}
                {...createPressHandlers(downloadButtonScale)}
                onHoverIn={() => (downloadButtonHover.value = withSpring(1.03))}
                onHoverOut={() => (downloadButtonHover.value = withSpring(1))}
              >
                <Download size={18} color="white" />
                <Text style={styles.downloadText}>Download</Text>
              </AnimatedPressable>
            </View>
          </View>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>How it works</Text>
          <Text style={styles.infoText}>
            {tool.name} uses advanced AI technology to {tool.description.toLowerCase()}. 
            Simply upload your image and let our AI do the magic. The process typically 
            takes just a few seconds to complete.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

 