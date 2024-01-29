import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const Stack = createNativeStackNavigator();

function CalculatorScreen({ navigation }) {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);

  const buttonPressed = (operation) => {
    const num1Value = parseFloat(num1);
    const num2Value = parseFloat(num2);

    if (!isNaN(num1Value) && !isNaN(num2Value)) {
      let newResult = '';
      if (operation === '+') {
        newResult = `${num1Value} ${operation} ${num2Value} = ${num1Value + num2Value}`;
      } else if (operation === '-') {
        newResult = `${num1Value} ${operation} ${num2Value} = ${num1Value - num2Value}`;
      }
      setData([...data, { key: newResult }]);
      setResult(newResult);
    } else {
      setResult('Syötä kelvolliset numerot');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setNum1(text)}
        placeholder="Numero 1"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) => setNum2(text)}
        placeholder="Numero 2"
        keyboardType="numeric"
      />

      <Button onPress={() => buttonPressed('+')} title="+" />
      <Button onPress={() => buttonPressed('-')} title="-" />

      <Button onPress={() => navigation.navigate('History', { data: data })} title="History" />

      <StatusBar style="auto" />
    </View>
  );
}

function HistoryScreen({ route }) {
  const data = route.params.data || [];

  return (
    <View>
      <Text>History</Text>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default function CalculatorWithHistory() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
    width: 200,
  },
  list: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
    width: 200,
  },
});
