import { StyleSheet, TextInput } from "react-native";

export default function Input({ onChangeText, text, placeholder }) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={text}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#27272A',
    color: '#71717A',
    borderColor: '#18181B80',
    borderWidth: 2,
    height: 40,
    padding: 10,
    borderRadius: 8,
  },
});
