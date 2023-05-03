const fs = require('fs');
const Papa = require('papaparse');

const fileContent = fs.readFileSync('SampleInvestors.csv', 'utf8');

const results = Papa.parse(fileContent, { header: true });

const data = results.data;
console.log(data); // 输出转换后的数据
