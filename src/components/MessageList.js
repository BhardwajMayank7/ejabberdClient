import React, { useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../../styles";

const MessageList = ({ messages }) => {
  const renderMessage = useCallback(
    ({ item }) => (
      <View
        style={[
          styles.messageContainer,
          item.text.startsWith("You:")
            ? styles.messageOutgoing
            : styles.messageIncoming,
        ]}
      >
        <Text style={styles.messageText}>{item.text.replace("You:", "").trim()}</Text> 
        </View>
    ),
    []
  );

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderMessage}
      style={styles.messageList}
    />
  );
};

export default MessageList;
