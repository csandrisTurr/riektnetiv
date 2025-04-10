import { StyleSheet, Button, TouchableOpacity, Text } from "react-native";

export default function Butt({ text, onPress }) {
  return (
    <div>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{ text }</Text>
      </TouchableOpacity>
    </div>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F43F5E',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#F4F4F5',
  }
});
