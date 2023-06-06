export async function getPharmacyDetails(pharmacyId: string) {
  const res = await fetch(
    `https://assets.nimblerx.com/interviews/pharmacy/${pharmacyId}`
  );
  const pharmacyData = res.json();

  const [pharmacy] = await Promise.all([pharmacyData]);

  return pharmacy;
}

export async function getPharmacyIds() {
  const res = await fetch("https://assets.nimblerx.com/interviews/pharmacies");

  const pharmaciesData = res.json();

  const [pharmacies] = await Promise.all([pharmaciesData]);

  return pharmacies.pharmacies.map(
    (pharmacy: { name: string; pharmacyId: string }) => {
      return {
        params: {
          id: pharmacy.pharmacyId,
        },
      };
    }
  );
}

export async function getPharmacies() {
  const res = await fetch("https://assets.nimblerx.com/interviews/pharmacies");
  return res.json();
}
export async function getMedications() {
  const res = await fetch("https://assets.nimblerx.com/interviews/medications");
  return res.json();
}
