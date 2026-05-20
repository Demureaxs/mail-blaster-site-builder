const fs = require('fs');
const xlsx = require('xlsx');

// Haversine formula to calculate distance between two coordinates in km
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}

async function processFile(filename) {
  console.log(`Processing ${filename}...`);
  const cities = JSON.parse(fs.readFileSync('./gb-cities.json', 'utf8'));

  const wb = xlsx.readFile(filename);
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  
  // Read as array of arrays
  const rows = xlsx.utils.sheet_to_json(ws, { header: 1 });
  
  let processed = 0;
  
  // Columns:
  // 0: Name, 1: Address, 2: Website, 3: Phone, 4: Email, 5: Rating, 6: Lat, 7: Lng, 8: Source, 9: Slug, 10: Location (NEW)
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row[0]) continue; // Skip empty rows
    
    const lat = parseFloat(row[6]);
    const lng = parseFloat(row[7]);
    
    if (!isNaN(lat) && !isNaN(lng)) {
      let closestCity = null;
      let minDistance = Infinity;
      
      for (const city of cities) {
        const cLat = parseFloat(city.lat);
        const cLng = parseFloat(city.lng);
        const dist = getDistance(lat, lng, cLat, cLng);
        if (dist < minDistance) {
          minDistance = dist;
          closestCity = city;
        }
      }
      
      if (closestCity) {
        row[10] = closestCity.name; // Assign the nearest city name to column 10
        processed++;
      }
    }
  }

  // Write back to the same file (or a new file)
  const newWs = xlsx.utils.aoa_to_sheet(rows);
  wb.Sheets[sheetName] = newWs;
  
  xlsx.writeFile(wb, filename);
  console.log(`Successfully added city locations to ${processed} rows in ${filename}.`);
}

async function main() {
  await processFile('./public/Locksmiths UK.xlsx');
  await processFile('./public/plumbers_uk.xlsx');
}

main().catch(console.error);
