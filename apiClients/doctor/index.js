const fakeApi = (callback) => setTimeout(callback, 2500);

/* 
GET /details/{patientId}
Scan QR code and fetch details of the patient
*/
export const getPatientDetails = (patientId) => {
  return new Promise((resolve, reject) =>
    fakeApi(() =>
      resolve({
        patientId,
        name: "D. Rose",
        photoURL:
          "https://fnewshub.com/wp-content/uploads/2020/11/FB_IMG_1605666747087.jpg",
        weight: 80,
        age: 38,
        height: 5.5,
        bloodGroup: "AB-",
        recent: {
          id: "1",
          diseaseName: "Cold",
          date: "12 Dec 2020",
        },
        // To put them in old reports horizontal list of cards at bottom.
        otherReports: [
          {
            id: "2",
            diseaseName: "Fever",
            date: "2 Nov 2020",
          },
          {
            id: "3",
            diseaseName: "Cold",
            date: "1 Jun 2020",
          },
          {
            id: "4",
            diseaseName: "Fever",
            date: "23 Jan 2020",
          },
        ],
      })
    )
  );
};

/* 
GET /history/{prescriptionId}
When the old reports card is clicked, the prescription is fetched from API.
*/
export const getPrescription = (prescriptionId, patientId) => {
  return new Promise((resolve, reject) =>
    fakeApi(() =>
      resolve({
        prescriptionId,
        patientId,
        diseaseName: "Cold",
        medicationPeriod: 3,
        medicines: [
          {
            name: "Paracetamol",
            // [Morning, Noon, Night]
            intakes: [true, false, true],
          },
          {
            name: "Naproxen",
            // [Morning, Noon, Night]
            intakes: [false, true, false],
          },
          {
            name: "Dextromethorphan",
            // [Morning, Noon, Night]
            intakes: [true, true, true],
          },
        ],
      })
    )
  );
};

/* 
POST /prescription/create
To create a new prescription.

request body 
{
    prescriptionId,
    patientId,
    diseaseName: "Cold",
    medicationPeriod: 3,
    medicines: [
        {
            name: "Paracetamol",
            intakes: [true, false, true],
        },
        {
            name: "Naproxen",
            intakes: [false, true, false],
        },
        {
            name: "Dextromethorphan",
            intakes: [true, true, true],
        },
    ],
}
 */
export const createPrescription = (prescription) => {
  return new Promise((resolve, reject) => fakeApi(resolve));
};
