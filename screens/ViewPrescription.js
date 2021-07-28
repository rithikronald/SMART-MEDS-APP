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
  ActivityIndicator,
} from "react-native";
import { getPrescription } from "../apiClients/doctor/index";

export default function ViewPrescription({ route, navigation }) {
  const { id } = route.params;
  const [diseaseName, setDiseaseName] = useState("");
  const [duration, setDuration] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    getPrescription()
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
    console.log(data);
  }, []);
  return (
    <View style={styles.container}>
      {data != null ? (
        <>
          <Text style={styles.titleText}>Prescription</Text>
          <ScrollView>
            <View style={styles.medicationContainer}>
              <View style={styles.counter}>
                <Text style={{ fontSize: 16 }}>DiseaseName</Text>
                <View style={styles.counterInput}>
                  <Text style={{ fontSize: 20 }}>{data.diseaseName}</Text>
                </View>
              </View>
              <View style={styles.counter}>
                <Text style={{ fontSize: 16 }}>MedicationPeriod</Text>
                <View style={styles.counterInput}>
                  <Text style={{ fontSize: 20 }}>{data.medicationPeriod}</Text>
                </View>
              </View>
            </View>
            <Text style={[styles.titleText, { marginTop: "10%" }]}>
              Medicine
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: "5%",
              }}
            >
              <Text style={{ fontSize: 16 }}>Medicine Name</Text>
              <Text style={{ fontSize: 16 }}>Timings</Text>
            </View>
            {data.medicines.map((item, index) => (
              <View style={styles.medicineContainer} key={index}>
                <View style={styles.medicineInput}>
                  <Text style={{ fontSize: 16 }}>{item.name}</Text>
                </View>
                <View style={styles.timeContainer}>
                  {item.intakes[0] == true ? (
                    <TouchableOpacity
                      style={[
                        styles.rockerzButton,
                        { justifyContent: "center" },
                      ]}
                    >
                      <Text>M</Text>
                    </TouchableOpacity>
                  ) : null}
                  {item.intakes[1] == true ? (
                    <TouchableOpacity
                      style={[
                        styles.rockerzButton,
                        { justifyContent: "center" },
                      ]}
                    >
                      <Text>A</Text>
                    </TouchableOpacity>
                  ) : null}
                  {item.intakes[2] == true ? (
                    <TouchableOpacity
                      style={[
                        styles.rockerzButton,
                        { justifyContent: "center" },
                      ]}
                    >
                      <Text>N</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={[
                styles.bottomButton,
                { backgroundColor: "#f94144", flex: 1 },
              ]}
            >
              <Text style={{ fontSize: 20, color: "#fff" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.bottomButton,
                { backgroundColor: "#90be6d", flex: 1 },
              ]}
              onPress={() =>
                navigation.navigate("PharmacyPrescription", { id: 1 })
              }
            >
              <Text style={{ fontSize: 20, color: "#fff" }}>Send</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )}
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
    marginTop: "5%",
  },
  diseaseInput: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
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
    justifyContent: "center",
    alignItems: "center",
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
