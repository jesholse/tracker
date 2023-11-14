let input = document.getElementById("battlesFound");

const findUser = async (query) => {
  const targetBattles = [];
  input.innerHTML = "";
  const response = await fetch("/api");
  const battles = await response.json();
  if (response.ok) {
    for (let key in battles) {
      if (battles[key].inv_bh_id === parseInt(query)) {
        targetBattles.push({
          id: battles[key].battle_id,
          link: `https://www.erepublik.com/en/military/battlefield/${battles[key].battle_id}`,
          division: battles[key].division,
          damage: battles[key].inv_bh_damage,
        });
      }
      if (battles[key].def_bh_id === parseInt(query)) {
        targetBattles.push({
          id: battles[key].battle_id,
          link: `https://www.erepublik.com/en/military/battlefield/${battles[key].battle_id}`,
          division: battles[key].division,
          damage: battles[key].def_bh_damage,
        });
      }
    }
  }

  if (!response.ok) {
    console.log(response.message);
  }
  if (targetBattles.length === 0) {
    input.innerHTML += `<div style="margin-bottom: 0">No battles found</div>`;
  }
  targetBattles.map((battle) => {
    input.innerHTML += `<div><a class="text-primary" href='${battle.link}'>Battle ${battle.id}</a></div>`;
  });
};

export default findUser;
