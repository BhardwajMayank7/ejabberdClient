import React from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "../../styles";

const MessageInput = ({ message, setMessage, sendMessage }) => (
  <View style={styles.inputContainer}>
    <TouchableOpacity style={styles.attachmentButton}>
      <Image
        source={require("../../assets/attachment_icon.png")}
        style={styles.attachmentIcon}
      />
    </TouchableOpacity>
    <TextInput
      style={styles.input}
      placeholder="Write a response..."
      value={message}
      onChangeText={setMessage}
    />
    <TouchableOpacity
      style={styles.sendButton}
      onPress={() => sendMessage("text")}
    >
      <Image
        source={require("../../assets/send_icon.png")}
        style={styles.sendIcon}
      />
    </TouchableOpacity>
  </View>
);

export default MessageInput;
