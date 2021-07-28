import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { StackActions } from "@react-navigation/native";

import { createPrescription } from "../apiClients/doctor";

const PATIENT_ID = "61010d8bbd45929210a6b08b";

export default function PrescriptionScreen({ navigation }) {
  const [diseaseName, setDiseaseName] = useState("");
  const [medicineList, setMedicineList] = useState([
    { name: "", intakes: [false, false, false] },
  ]);
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);

  const createPrescriptionForPatient = () => {
    const prescription = { diseaseName };
    prescription["medicationPeriod"] = duration;
    prescription["medicines"] = medicineList.filter((m) => m.name !== "");
    prescription["patientId"] = PATIENT_ID;

    setLoading(true);
    createPrescription(prescription).then(() => {
      ToastAndroid.show(
        "Digital Prescription generated successfully!",
        ToastAndroid.LONG
      );
      navigation.dispatch(StackActions.popToTop());
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>New Prescription</Text>
      {loading ? (
        <View
          style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#000" />
          <Text style={[styles.titleText, { fontSize: 16, marginTop: "4%" }]}>
            Creating Prescription
          </Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <View style={styles.medicationContainer}>
              <TextInput
                style={styles.diseaseInput}
                placeholder="Disease Name"
                onChangeText={(text) => {
                  setDiseaseName(text);
                }}
              />
              <Text style={[styles.titleText, { marginTop: "10%" }]}>
                Medication Period
              </Text>
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
            <Text style={[styles.titleText, { marginTop: "10%" }]}>
              Medicine
            </Text>
            {medicineList.map((m, index) => (
              <MedicineForm
                key={`${index}`}
                value={m}
                onChange={(val) =>
                  //console.log(val)
                  setMedicineList((prev) => [
                    ...prev.map((med, ind) => (ind === index ? val : med)),
                  ])
                }
              />
            ))}

            <TouchableOpacity
              style={styles.addMedicineButton}
              onPress={() =>
                setMedicineList((prev) => [
                  ...prev,
                  { name: "", intakes: [false, false, false] },
                ])
              }
            >
              <Text> + Add Another</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={[
                styles.bottomButton,
                { backgroundColor: "#f94144", flex: 1 },
              ]}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ fontSize: 20, color: "#fff" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.bottomButton,
                { backgroundColor: "#90be6d", flex: 1 },
              ]}
            >
              <Text
                style={{ fontSize: 20, color: "#fff" }}
                onPress={() => createPrescriptionForPatient()}
              >
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const MedicineForm = ({ value, onChange }) => {
  const toggleTime = (pos) => {
    onChange({
      ...value,
      intakes: [...value.intakes.map((v, ind) => (ind === pos ? !v : v))],
    });
  };

  return (
    <View style={styles.medicineContainer}>
      <TextInput
        style={styles.medicineInput}
        value={value.name}
        onChangeText={(e) => onChange({ ...value, name: e })}
        placeholder="Medicine name"
      />
      <View style={styles.timeContainer}>
        <TouchableOpacity
          style={[
            styles.rockerzButton,
            value.intakes[0] ? styles.rockerzButtonEnabled : null,
          ]}
          onPress={() => toggleTime(0)}
        >
          <Text>M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.rockerzButton,
            value.intakes[1] ? styles.rockerzButtonEnabled : null,
          ]}
          onPress={() => toggleTime(1)}
        >
          <Text>A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.rockerzButton,
            value.intakes[2] ? styles.rockerzButtonEnabled : null,
          ]}
          onPress={() => toggleTime(2)}
        >
          <Text>N</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    // alignItems: "center",
    marginTop: "5%",
  },
  diseaseInput: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    fontSize: 20,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "4%",
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
    justifyContent: "center",
  },
  rockerzButtonEnabled: {
    backgroundColor: "#90be6d",
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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
