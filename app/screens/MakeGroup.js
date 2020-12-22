import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function MakeGroup({ navigation }) {
  const [makeGroup, setMakeGroup] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [level, setLevel] = useState(null);
  const [placeholderColor, setPlaceholderColor] = useState('#d4d4d4');

  const makeAGroup = async (level, name, image) => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('kelas_id', level);
      bodyFormData.append('nama', name);
      bodyFormData.append('thumbnail', image);

      const USER_TOKEN = await AsyncStorage.getItem('USER_TOKEN')
      const groupResponse = await axios({
        method: 'POST',
        url: 'http://bta70.omindtech.id/api/grup',
        headers:{
          'Authorization': USER_TOKEN
        },
        data: bodyFormData
      }); 
      setMakeGroup(groupResponse.data.data)
      alert('Grup berhasil dibuat!');
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Maaf! kami membutuhkan pembukaan gallery!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={32} color="#fff" />
        <Text style={styles.title}>
          Buat Grup
        </Text>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 65 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 40 }}>
          <TouchableOpacity onPress={pickImage}>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <View style={styles.square}>
              <FontAwesome name="camera" size={35} color="#808080"/>
            </View>
          </TouchableOpacity>
          <Text style={{ color: '#e3e3e3', fontSize: 20, marginTop: 10 }}>Tambahkan foto grup</Text>
        </View>

        <View style={{ paddingBottom: 20 }}>
          <TextInput
            style={styles.textInputStyling}
            onChangeText={name => setName(name)}
            value={name}
            placeholder="Nama Grup"
            placeholderTextColor={placeholderColor}
          />
        </View>
        <DropDownPicker
          items={[
            { label: 'SD', value: '1' },
            { label: 'SMP', value: '2' },
            { label: 'SMA', value: '3' },
          ]}
          defaultValue={level}
          containerStyle={styles.dropDownStylingContainer}
          style={styles.dropDownStyling}
          placeholder='Jenjang'
          itemStyle={styles.dropDownItem}
          dropDownStyle={styles.dropDownStyling}
          placeholderStyle={styles.dropDownPlaceholderStyling}
          onChangeItem={(items) => { 
            setLevel(items.value)
          }}
        />
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 40 }}>
          <TouchableOpacity style={styles.button} onPress={() => {makeAGroup(level, name, image)}}>
            <Text style={{ color: '#fff' }}>Buat Grup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', 
        alignItems: 'center'}}>
          <View style={styles.spacingBottom}>
            <Ionicons name="home" size={32} color="black" />
            <Text>Home</Text>
          </View>
          <View style={styles.spacingBottom}>
            <MaterialIcons name="live-tv" size={32} color="black" />
            <Text>Live</Text>
          </View>
          <View style={styles.spacingBottom}>
            <Octicons name="comment-discussion" size={32} color="#1f99d3" />
            <Text style={{ color: '#1f99d3' }}>Diskusi</Text>
          </View>
          <View style={styles.spacingBottom}>
            <Ionicons name="person-sharp" size={32} color="black" />
            <Text>Profil</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#1f99d3',
    paddingVertical: 50,
    paddingHorizontal: 20,
    paddingBottom: 1,
    flex: 0
  },
  title: {
    flex: 1,
    fontSize: 25,
    color: '#f7f7f7',
    paddingLeft: 5,
    paddingBottom: 20,
    marginLeft: 10,
    fontWeight: '500'
  },
  square: {
    backgroundColor: '#f4f4f4',
    height: 100,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyling: {
    height: 40,
    padding: 10,
    paddingStart: 15,
    borderRadius: 5,
    color: '#000000',
    backgroundColor: '#f4f4f4'
  },
  button: {
    alignItems: 'center',
    backgroundColor: "#1f99d3",
    padding: 10,
    width: 280,
    height: 'auto',
    borderRadius: 5
  },
  dropDownStylingContainer: {
    height: 40,
    width: 160
  },
  dropDownStyling: {
    backgroundColor: '#f4f4f4',
    borderColor: 'transparent'
  },
  dropDownPlaceholderStyling: {
    color: '#b5b5b5',
    justifyContent: 'flex-start'
  },
  dropDownItem: {
    justifyContent: 'flex-start'
  },
  footer: {
    flex: 0,
    height: 90,
    paddingHorizontal: 45,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 2,
    backgroundColor: '#fff',
    borderColor: '#f7f8fa',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacingBottom: {
    textAlign: 'justify'
  },
});
