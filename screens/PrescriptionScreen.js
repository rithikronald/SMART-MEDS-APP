import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";

export default function PrescriptionScreen({ navigation }) {
  const [diseaseName, setDiseaseName] = useState("");
  const [duration, setDuration] = useState(1);
  useEffect(() => console.log(duration), []);
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>New Prescription</Text>
      <ScrollView>
        <View style={styles.medicationContainer}>
          <TextInput
            style={styles.diseaseInput}
            placeholder="Disease Name"
            onChangeText={(text) => {
              setDiseaseName(text);
            }}
          />
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.rockerzButton}
              onPress={() => setDuration((prev) => prev + 1)}
            >
              <Text style={{ fontSize: 25 }}>+</Text>
            </TouchableOpacity>
            <View style={styles.counterInput} value={duration}>
              <Text style={{ fontSize: 20 }}>{duration}</Text>
            </View>
            <TouchableOpacity
              style={styles.rockerzButton}
              onPress={() =>
                duration != 1 ? setDuration((prev) => prev - 1) : null
              }
            >
              <Text style={{ fontSize: 25 }}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.titleText, { marginTop: "10%" }]}>Medicine</Text>
        <View style={styles.medicineContainer}>
          <TextInput style={styles.medicineInput} placeholder="Medicine name" />
          <View style={styles.timeContainer}>
            <TouchableOpacity
              style={[styles.rockerzButton, { justifyContent: "center" }]}
            >
              <Text>M</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rockerzButton, { justifyContent: "center" }]}
            >
              <Text>A</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rockerzButton, { justifyContent: "center" }]}
            >
              <Text>N</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.addMedicineButton}>
          <Text> + Add Another</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: "#f94144", flex: 1 }]}
        >
          <Text style={{ fontSize: 20, color: "#fff" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: "#90be6d", flex: 1 }]}
        >
          <Text style={{ fontSize: 20, color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEBD7",
    paddingHorizontal: "6%",
    paddingTop: "10%",
    paddingBottom: "3%",
  },
  titleText: {
    fontSize: 26,
    color: "#423E37",
  },
  medicationContainer: {
    alignItems: "center",
    marginTop: "5%",
  },
  diseaseInput: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    fontSize: 20,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
  },
  counterInput: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginHorizontal: "3%",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rockerzButton: {
    backgroundColor: "#e3b23c",
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: "center",
  },
  medicineContainer: {
    marginTop: "6%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  medicineInput: {
    width: "60%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: "row",
    width: "38%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  addMedicineButton: {
    backgroundColor: "#e3b23c",
    width: "40%",
    height: 30,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "8%",
  },
  bottomButtonContainer: {
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
  },
  bottomButton: {
    alignItems: "center",
    borderRadius: 10,
    height: 40,
    marginHorizontal: "2%",
    justifyContent: "center",
  },
});
