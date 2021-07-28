import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { StackActions } from "@react-navigation/native";

import {
  getPrescription,
  deliverPrescription,
} from "../apiClients/pharmacy/index";

export default function PharmacyPrescription({ route, navigation }) {
  const { patientId } = route.params;
  const [data, setData] = useState(null);
  const [loaderMessage, setLoaderMessage] = useState("Loading Prescription");
  const [loading, setLoading] = useState(true);

  const deliverPrescriptionForPatient = () => {
    setLoading(true);
    deliverPrescription(data.prescriptionId).then(() => {
      ToastAndroid.show("Medicines delivered successfully!", ToastAndroid.LONG);
      navigation.dispatch(StackActions.popToTop());
    });
  };

  useEffect(() => {
    getPrescription(patientId)
      .then((res) => {
        setData(res);
        setLoading(false);
        setLoaderMessage("Delivering medicines...");
      })
      .catch((err) => console.log(err));
    console.log(data);
  }, []);
  return (
    <View style={styles.container}>
      {!loading && data !== null ? (
        <>
          <ScrollView>
            <View style={styles.titleCard}>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>{data.name}</Text>
                <View style={styles.detailsContainer}>
                  <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>Age :</Text>
                    <Text style={styles.valueText}>{data.age} yrs</Text>
                  </View>
                  <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>Weight :</Text>
                    <Text style={styles.valueText}>{data.weight} kgs</Text>
                  </View>
                  <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>height :</Text>
                    <Text style={styles.valueText}>{data.height} ft</Text>
                  </View>
                  <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>Blood Group :</Text>
                    <Text style={styles.valueText}>{data.bloodGroup}ve</Text>
                  </View>
                </View>
              </View>
              <Image
                source={{
                  uri: `${data.photoURL}`,
                }}
                style={styles.thumnailImage}
              />
            </View>
            <Text style={[styles.titleText, { marginTop: "4%" }]}>
              Prescription
            </Text>
            <View style={styles.medicationContainer}>
              <View style={styles.counter}>
                <Text style={{ fontSize: 16, flex: 1 }}>DiseaseName</Text>
                <View style={styles.counterInput}>
                  <Text style={{ fontSize: 20 }}>{data.diseaseName}</Text>
                </View>
              </View>
              <View style={styles.counter}>
                <Text style={{ fontSize: 16, flex: 1 }}>Medication Period</Text>
                <View style={styles.counterInput}>
                  <Text style={{ fontSize: 20 }}>
                    {data.medicationPeriod} Days
                  </Text>
                </View>
              </View>
            </View>
            <Text style={[styles.titleText, { marginTop: "5%" }]}>
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
                { backgroundColor: "#90be6d", flex: 1 },
              ]}
              onPress={() => deliverPrescriptionForPatient()}
            >
              <Text style={{ fontSize: 20, color: "#fff" }}>Deliver</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#000" />
          <Text style={[styles.titleText, { fontSize: 16, marginTop: "4%" }]}>
            {loaderMessage}
          </Text>
        </View>
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
    marginTop: "3%",
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
    width: "100%",
  },
  counterInput: {
    flex: 1,
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
  titleCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {},
  detailsContainer: {
    marginTop: "15%",
  },
  categoryContainer: {
    flexDirection: "row",
  },
  categoryText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  valueText: {
    marginLeft: "3%",
    fontSize: 16,
    color: "#a39594",
  },
  thumnailImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: "center",
  },
});
