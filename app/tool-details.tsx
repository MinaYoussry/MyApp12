import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Upload, Download } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/contexts/AuthContext';
import { allTools } from '@/data/tools';
import { api } from '@/api';

export default function ToolDetailsScreen() {
  const { toolId } = useLocalSearchParams<{ toolId: string }>();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0F0F23', '#1A1A2E']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        
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
              <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
                <Text style={styles.changeImageText}>Change Image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Upload size={32} color="#8B5CF6" />
              <Text style={styles.uploadButtonText}>Select Image</Text>
              <Text style={styles.uploadHint}>Tap to choose from your gallery</Text>
            </TouchableOpacity>
          )}
        </View>

        {selectedImage && (
          <View style={styles.processSection}>
            <TouchableOpacity 
              style={[styles.processButton, isProcessing && styles.buttonDisabled]}
              onPress={processImage}
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
            </TouchableOpacity>
          </View>
        )}

        {processedImage && (
          <View style={styles.resultSection}>
            <Text style={styles.sectionTitle}>Result</Text>
            <View style={styles.imageContainer}>
              <Image source={{ uri: processedImage }} style={styles.previewImage} />
              <TouchableOpacity style={styles.downloadButton}>
                <Download size={20} color="white" />
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  toolIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  toolTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  toolDescription: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  uploadSection: {
    marginBottom: 32,
  },
  imageContainer: {
    alignItems: 'center',
  },
  previewImage: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  changeImageButton: {
    backgroundColor: '#2D2D3A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3D3D4A',
  },
  changeImageText: {
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#16213E',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2D2D3A',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B5CF6',
    marginTop: 12,
  },
  uploadHint: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  processSection: {
    marginBottom: 32,
  },
  processButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  processButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  resultSection: {
    marginBottom: 32,
  },
  downloadButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  downloadText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 32,
  },
  infoText: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    textAlign: 'center',
    margin: 20,
  },
});