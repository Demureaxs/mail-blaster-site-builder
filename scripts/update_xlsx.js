const XLSX = require('xlsx');
const wb = XLSX.readFile('public/Locksmiths UK.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];

const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

console.log("Row count:", rows.length);

// Log row 229 (0-indexed, so row 230)
console.log("Row 230:", rows[229]);

// The new data from the user
const newRowData = [
  "Andrews Locksmith Co",
  "King's Ln, Beccles NR34 8TQ, Inggris Raya",
  "andrewslocksmith.co.uk",
  "+44 7966 693048",
  "", // Email empty
  "5", // Rating
  "52.6454468", // Lat
  "0.2994502", // Lng
  "google_maps_data_Locksmiths_Loddon_UK.xlsx", // Source file
  "andrews-locksmith-co" // Slug
];

// If it's not already updated, update it
if (rows[229] && rows[229][0] !== newRowData[0]) {
  console.log("Updating row 230...");
  rows[229] = newRowData;
  const newWs = XLSX.utils.aoa_to_sheet(rows);
  wb.Sheets[wb.SheetNames[0]] = newWs;
  XLSX.writeFile(wb, 'public/Locksmiths UK.xlsx');
  console.log("Updated!");
} else {
  console.log("Row 230 is already updated or differs from what we expect.", rows[229]);
}
