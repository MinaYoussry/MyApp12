import * as ImagePicker from 'expo-image-picker';

export const requestImagePermissions = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

export const pickImageFromLibrary = async (): Promise<string | null> => {
  const permissionGranted = await requestImagePermissions();
  
  if (!permissionGranted) {
    throw new Error('Permission to access media library is required');
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
  
  return null;
};

export const pickImageFromCamera = async (): Promise<string | null> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  
  if (status !== 'granted') {
    throw new Error('Permission to access camera is required');
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
  
  return null;
};

export const createFormData = (imageUri: string, toolId: string): FormData => {
  const formData = new FormData();
  
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'image.jpg',
  } as any);
  
  formData.append('toolId', toolId);
  
  return formData;
};