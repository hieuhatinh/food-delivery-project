import React, { useState } from 'react';
import { View, Button } from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';

const YourComponent = () => {
  const [fileUri, setFileUri] = useState(null);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: false,
      });

      if (result.type === 'success') {
        setFileUri(result.uri);
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      
      // Thêm file ảnh vào FormData
      formData.append('image', {
        uri: fileUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      // Thêm mảng ObjectId vào FormData
      formData.append('categories', JSON.stringify(['objectId1', 'objectId2', '...']));

      // Gửi request lên server
      const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <View>
      <Button title="Pick Image" onPress={handleFilePick} />
      <Button title="Upload" onPress={handleUpload} />
    </View>
  );
}

export default YourComponent;
