import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { getPatientDetails } from "../apiClients/doctor";

export default function ProfileScreen({ navigation }) {
  const more = ">";
  const [data, setData] = useState(null);
  useEffect(() => {
    getPatientDetails()
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
          <View style={styles.diagnosisContainer}>
            <Text style={styles.titleText}>Recent Diagnosis</Text>
            <View style={styles.diagnosisCard}>
              <Text style={{ color: "#000" }}>{data.recent.date}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flex: 1,
                }}
              >
                <Text style={styles.titleText}>{data.recent.diseaseName}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.reportsContainer}>
            <View style={styles.reportHeader}>
              <Text style={styles.titleText}>Old Reports</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 30 }}>{more}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.reportBody}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {data.otherReports.map((item, index) => (
                <View style={styles.reportCard} key={index}>
                  <Text style={{ color: "#000" }}>{item.date}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      flex: 1,
                    }}
                  >
                    <Text style={styles.titleText}>{item.diseaseName}</Text>
                    <TouchableOpacity
                      style={[styles.button, { width: 60, height: 20 }]}
                    >
                      <Text style={[styles.buttonText, { fontSize: 14 }]}>
                        View
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate("PrescriptionScreen")}
          >
            <Text style={styles.fabText}>+ Add Prescription</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View
          style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#000" />
          <Text style={[styles.titleText, { fontSize: 16, marginTop: "4%" }]}>
            Fetching Patient Details
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
  titleCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {},
  titleText: {
    fontSize: 26,
    color: "#423E37",
  },
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
  diagnosisContainer: {
    marginTop: "20%",
  },
  diagnosisCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    height: 150,
    marginTop: "6%",
    padding: 10,
  },
  button: {
    backgroundColor: "#6E675F",
    width: 100,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  reportsContainer: {
    marginTop: "10%",
  },
  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reportBody: {
    marginTop: "6%",
  },
  reportCard: {
    width: 200,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
  },
  fab: {
    backgroundColor: "#e3b23c",
    borderRadius: 100,
    position: "absolute",
    bottom: 30,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    color: "#fff",
    fontSize: 22,
  },
});
