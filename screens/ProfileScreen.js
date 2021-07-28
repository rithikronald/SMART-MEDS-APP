import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export default function ProfileScreen({ navigation }) {
  const more = ">";
  return (
    <View style={styles.container}>
      <View style={styles.titleCard}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>D. Rose</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>Age :</Text>
              <Text style={styles.valueText}>45 yrs</Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>Weight :</Text>
              <Text style={styles.valueText}>65 kgs</Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>height :</Text>
              <Text style={styles.valueText}>5.4 ft</Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>Blood Group :</Text>
              <Text style={styles.valueText}>AB +ve</Text>
            </View>
          </View>
        </View>
        <Image
          source={{
            uri: "https://fnewshub.com/wp-content/uploads/2020/11/FB_IMG_1605666747087.jpg",
          }}
          style={styles.thumnailImage}
        />
      </View>
      <View style={styles.diagnosisContainer}>
        <Text style={styles.titleText}>Recent Diagnosis</Text>
        <View style={styles.diagnosisCard}>
          <Text style={{ color: "#000" }}>Date</Text>
          <Text style={styles.titleText}>Fever</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
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
          <View style={styles.reportCard}>
            <Text style={{ color: "#000" }}>Date</Text>
            <Text style={styles.titleText}>Fever</Text>
            <TouchableOpacity
              style={[styles.button, { width: 60, height: 20 }]}
            >
              <Text style={[styles.buttonText, { fontSize: 14 }]}>View</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reportCard}>
            <Text style={{ color: "#000" }}>Date</Text>
            <Text style={styles.titleText}>Fever</Text>
            <TouchableOpacity
              style={[styles.button, { width: 60, height: 20 }]}
            >
              <Text style={[styles.buttonText, { fontSize: 14 }]}>View</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reportCard}>
            <Text style={{ color: "#000" }}>Date</Text>
            <Text style={styles.titleText}>Fever</Text>
            <TouchableOpacity
              style={[styles.button, { width: 60, height: 20 }]}
            >
              <Text style={[styles.buttonText, { fontSize: 14 }]}>View</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("PrescriptionScreen")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
    width: "95%",
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
    width: 150,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
  },
  fab: {
    width: 50,
    height: 50,
    backgroundColor: "#e3b23c",
    borderRadius: 100,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  fabText: {
    color: "#fff",
    fontSize: 30,
  },
});
