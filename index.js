const express = require("express");
const app = express();
const axios = require("axios");

const thieves = [
  {
    name: "Mixilarder",
    id: 736381,
  },
  {
    name: "Hormonek",
    id: 1203171,
  },
  {
   name: "YurtsuzJohn",
   id: 9357603,
  },
  {
   name: "Kalu Zemun",
   id: 8373219,
  },
    {
   name: "Nemaanjaaa120",
   id: 4423008,
  },

];

const fetchBattles = async () => {
  const battles = [];
  const { data } = await axios.get(
    "https://service.erepublik.tools/api/v2/battle"
  );

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
