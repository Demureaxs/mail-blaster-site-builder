const XLSX = require('xlsx');
const wb = XLSX.readFile('public/Locksmiths UK.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
console.log("Row 230:", rows[229]); // 0-indexed, so row 230 is index 229
