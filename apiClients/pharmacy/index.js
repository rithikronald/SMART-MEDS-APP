const fakeApi = (callback) => setTimeout(callback, 2500);

/* 
GET /get-prescription/{patientId}
Scan QR code and fetch current prescription of the patient
*/
export const getPrescription = (patientId) => {
  return new Promise((resolve, reject) =>
    fakeApi(() =>
      resolve({
        prescriptionId,
        patientId,
        name: "D. Rose",
        photoURL:
          "https://fnewshub.com/wp-content/uploads/2020/11/FB_IMG_1605666747087.jpg",
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
POST /prescription/deliver
To indicate that prescription medicines are bought

request body 
{
    prescriptionId: prescriptionId
}
 */
export const deliverPrescription = (prescriptionId) => {
  return new Promise((resolve, reject) => fakeApi(resolve()));
};
