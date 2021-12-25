const https = require('https');
const fs = require('fs');
const os = require('os');

const getClip = path => new Promise(res => {
  const options = {
    host: "app.bonsai.io",
    port: 443,
    path,
    method: 'GET'
  };
  const callback = response => {
    let str = '';
    response.setEncoding('utf8');
    response.on('data', chunk => {
      str += chunk;
    });
    response.on('end', () => {
      res(JSON.parse(str));
    });
  }
  https.request(options, callback).end();
});

const exportClip = async ({ key, exportsMap }) => {
  console.log('begin export');
  const filename = `${__dirname}/exports/${key}.json`;
  console.log('start fetch');
  const data = await getClip(exportsMap[key]);
  console.log('end fetch');
  console.log('start write');
  data.hits.hits.forEach(doc => {
    console.log(`item ${doc._id}`);
    fs.writeFileSync(filename, JSON.stringify({ index: { _index: doc._index, _id: doc._id } }) + os.EOL, { flag: 'a+' });
    fs.writeFileSync(filename, JSON.stringify(doc._source) + os.EOL, { flag: 'a+' });
  });
  console.log('end write');
  console.log('end export');
};

const main = () => {
  const exportsMap = {
    classified_ads: '/searchclips/DIp5LnPJKwg12rSRqZuB/export/cd65502c-4343-4c43-8407-7cfc44576c49.json',
    classified_types: '/searchclips/40cK3AypsdD9uMbNT5zH/export/736fbceb-a62a-4463-ac38-b653c3873b64.json',
    classified_profiles: '/searchclips/WJ7zLma1hAZYnTdi6S0C/export/2208c916-ced4-49e5-8c1b-fb9b5cbb430f.json',
    classified_vocabularies: '/searchclips/G0Uzwk4OWrXDiCsFdK5V/export/8697fa96-9995-45c6-be92-1bab04323478.json',
    classified_panelpages: '/searchclips/65QgMFrRnaf0VWZ8dGCA/export/86006a38-9f2c-417d-9021-90fbd66ab570.json'
  };
  exportClip({ key: 'classified_panelpages', exportsMap });
};

main();