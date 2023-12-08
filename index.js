const express = require("express");
const app = express();
const axios = require("axios");

const thieves = [
  {
    name: "YurtsuzJohn",
    id: 9357603,
  },{
    name: "Kalu Zemun",
    id: 8373219,
  },{
    name: "Nemaanjaaa120",
    id: 4423008,
  },{
    name: "Dennisv2",
    id: 6719723,
  },{
    name: "YellowBoss is Pig",
    id: 4825703
  },{
    name: "MAHONI27",
    id: 1211319
  },{
    name: "Ivan Nedelchev7",
    id: 4228118
  },{
    name: "Shept",
    id: 4656103
  },{
    name: "pirospaprika",
    id: 1354135
  },{
    name: "YurtsuzJohn",
    id: 9357603
  },{
    name: "The Last Aviator",
    id: 2064778
  },{
    name: "Cristian Fontanella",
    id: 6984822
  },{
    name: "RPI08",
    id: 8439130
  },{
    name: "The.Special",
    id: 5319508
  },{
    name: "lesnydziadek",
    id: 4540388
  },{
    name: "Baron K",
    id: 4362472
  },{
    name: "bandi99",
    id: 4074730
  },{
    name: "M i r M i",
    id: 1530055
  },{
   name: "waivann",
   id: 5906702
  }
];

app.set("view engine", "pug");
app.listen(3001, (req, res) => {});
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static("public"));
app.get("/", async (req, res) => {
  const data = await fetchBattles();
  res.status(200).render("index", {
    title: "eRepublik thief tracker",
    battles: data,
    thieves: thieves,
  });
});

app.get("/api", async (req, res) => {
  const { data } = await axios.get(
    "https://service.erepublik.tools/api/v2/battle"
  );
  if (data) {
    res.send(data.battleZones);
  }
});

const fetchBattles = async () => {
  const battles = [];
  const { data } = await axios.get("https://service.erepublik.tools/api/v2/battle");

  thieves.map((thief) => {
    const t = {
      name: thief.name,
      battles: [],
    };
    for (let key in data.battleZones) {
      if (data.battleZones[key].inv_bh_id === thief.id) {
        t.battles.push({
          id: data.battleZones[key].battle_id,
          link: `https://www.erepublik.com/en/military/battlefield/${data.battleZones[key].battle_id}`,
          division: data.battleZones[key].division,
          damage: data.battleZones[key].inv_bh_damage,
        });
      }
      if (data.battleZones[key].def_bh_id === thief.id) {
        t.battles.push({
          id: data.battleZones[key].battle_id,
          link: `https://www.erepublik.com/en/military/battlefield/${data.battleZones[key].battle_id}`,
          division: data.battleZones[key].division,
          damage: data.battleZones[key].def_bh_damage,
        });
      }
    }
    if (t.battles.length === 0) {
      t.message = t.battles.length;
    }
    if (t.battles.length > 0) {
      t.message = t.battles.length;
      battles.push(t);
    }
  });
  console.log(battles);
  return battles;
};


