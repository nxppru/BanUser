const axios = require('axios');
const fs = require('fs');
const {execSync} = require("child_process");

let token = JSON.parse(fs.readFileSync(`${process.env.QL_DIR}/config/auth.json`).toString())['token'];

let s  = execSync('netstat -tnlp|grep nginx').toString()
let port = s.match(/:(\d+)/)[1]

axios.get(`http://127.0.0.1:${port}/api/envs?searchValue=&t=${Date.now()}`, {
  headers: {
    'Authorization': `Bearer ${token}`,
  }
}).then(res => {
  for (let [index, env] of res.data.data.entries()) {
    if (env.name === 'JD_COOKIE') {
      console.log(`JD_COOKIE${index}`, env.value)
    }
  }
});
