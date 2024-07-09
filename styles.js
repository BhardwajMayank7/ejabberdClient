import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe4e1", // Light pink background
  },
  inner: {
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    height: 80,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "ios" ? 40 : 10,
    elevation: 3,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  headerText: {
    flex: 1,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  callButton: {
    marginLeft: 10,
  },
  callIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  dropdownContainer: {
    flex: 1,
   justifyContent: "center",
   alignItems: "center",
  },
  dropdown: {
    backgroundColor: "white",
  },
  dropDownPicker: {
    backgroundColor: "white", 
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  messageIncoming: {
    backgroundColor: "#e1ffc7",
    alignSelf: "flex-start",
  },
  messageOutgoing: {
    backgroundColor: "#d1e7ff",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
    fontFamily: "Helvetica",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  attachmentButton: {
    marginRight: 10,
  },
  attachmentIcon: {
    width: 24,
    height: 24,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    marginLeft: 10,
  },
  sendIcon: {
    width: 30,
    height: 30,
  },
  heartContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  heart: {
    width: 30,
    height: 30,
    tintColor: "rgba(255, 0, 0, 0.5)", // Light red color
    opacity: 0.7,
  },
});
