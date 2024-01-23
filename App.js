import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CalculatorWithHistory() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState([])

  const buttonPressed = (operation) => {
    const num1Value = parseFloat(num1);
    const num2Value = parseFloat(num2);

    if (!isNaN(num1Value) && !isNaN(num2Value)) {
      if (operation === "+") {
        setResult(`${num1Value} ${operation} ${num2Value} = ${num1Value + num2Value}`);
        
      } else if (operation === "-") {
        setResult(`${num1Value} ${operation} ${num2Value} = ${num1Value - num2Value}`);
      }
    } else {
      setResult("Syötä kelvolliset numerot");
    }

    setData([...data, {key: result}])
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

      <Button onPress={() => buttonPressed("+")} title="+" />
      <Button onPress={() => buttonPressed("-")} title="-" />

      <Text>Historia</Text>
      <FlatList style={styles.list}
        data={data}
        renderItem={({ item }) =>
          <Text>{item.key}</Text>
        }
        keyExtractor={(item, index) => index.toString()}
      />

      <StatusBar style="auto" />
    </View>
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
  },list:{

  }

});