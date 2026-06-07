const map = L.map('map').setView([36.2,138.2],5);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:'© OpenStreetMap'
}).addTo(map);

const ranking = [
    "大阪府",
    "神奈川県",
    "愛知県",
    "兵庫県",
    "東京都",
    "福岡県",
    "千葉県",
    "埼玉県",
    "茨城県",
    "和歌山県"
];

const prefectures = {
    "大阪府":{
        lat:34.6937,
        lng:135.5023,
        wins:14,
        schools:["大阪桐蔭","PL学園","履正社"],
        ob:["中田翔","藤浪晋太郎","森友哉"]
    },

    "神奈川県":{
        lat:35.4437,
        lng:139.6380,
        wins:15,
        schools:["横浜","東海大相模","慶應義塾"],
        ob:["松坂大輔","筒香嘉智","近藤健介"]
    },

    "愛知県":{
        lat:35.1802,
        lng:136.9066,
        wins:8,
        schools:["中京大中京","東邦","愛工大名電"],
        ob:["堂林翔太","十亀剣"]
    },

    "兵庫県":{
        lat:34.6913,
        lng:135.1830,
        wins:13,
        schools:["報徳学園","東洋大姫路","神港学園"],
        ob:["田村伊知郎"]
    },

    "東京都":{
        lat:35.6762,
        lng:139.6503,
        wins:7,
        schools:["早実","帝京","関東一"],
        ob:["清宮幸太郎","荒木大輔"]
    },

    "福岡県":{
        lat:33.5902,
        lng:130.4017,
        wins:5,
        schools:["九州国際大付","西日本短大付","東筑"],
        ob:["新庄剛志"]
    },

    "千葉県":{
        lat:35.6074,
        lng:140.1065,
        wins:6,
        schools:["習志野","木更津総合","銚子商"],
        ob:["掛布雅之","福浦和也"]
    },

    "埼玉県":{
        lat:35.8617,
        lng:139.6455,
        wins:4,
        schools:["浦和学院","花咲徳栄","聖望学園"],
        ob:["若月健矢"]
    },

    "茨城県":{
        lat:36.3418,
        lng:140.4468,
        wins:1,
        schools:["常総学院","霞ヶ浦","明秀日立"],
        ob:["仁志敏久"]
    },

    "和歌山県":{
        lat:34.2260,
        lng:135.1675,
        wins:12,
        schools:["智辯和歌山","箕島","市和歌山"],
        ob:["西川遥輝"]
    }
};

const markers = {};

function getColor(pref){

    if(pref==="茨城県" || pref==="千葉県"){
        return "green";
    }

    const rank = ranking.indexOf(pref)+1;

    if(rank===1) return "gold";
    if(rank===2) return "silver";
    if(rank===3) return "#cd7f32";

    return "#2b7cff";
}

function showInfo(pref){


    const d = prefectures[pref];

    let schoolsHTML = "";
    let obHTML = "";

    for(let i = 0; i < d.schools.length; i++){
        schoolsHTML += "<li>" + d.schools[i] + "</li>";
    }

    for(let i = 0; i < d.ob.length; i++){
        obHTML += "<li>" + d.ob[i] + "</li>";
    }

    document.getElementById("prefInfo").innerHTML = `
        <h2>${pref}</h2>

        <p><strong>甲子園優勝回数</strong><br>${d.wins}回</p>

        <p><strong>主な代表校</strong></p>
        <ul>${schoolsHTML}</ul>

        <p><strong>有名OB</strong></p>
        <ul>${obHTML}</ul>
    `;
}

Object.keys(prefectures).forEach(pref=>{

    const d = prefectures[pref];

    const marker = L.circleMarker(
        [d.lat,d.lng],
        {
            radius:10,
            fillColor:getColor(pref),
            color:"#000",
            weight:1,
            fillOpacity:0.9
        }
    ).addTo(map);

    marker.bindPopup(`
        <b>${pref}</b><br>
        優勝回数：${d.wins}回
    `);

    marker.on("click",()=>{
        showInfo(pref);
    });

    markers[pref]=marker;
});

const rankingList =
document.getElementById("rankingList");

ranking.forEach((pref,index)=>{

    const div =
    document.createElement("div");

    let cls="rankNormal";

    if(index===0) cls="rank1";
    else if(index===1) cls="rank2";
    else if(index===2) cls="rank3";

    if(pref==="茨城県" || pref==="千葉県"){
        cls += " recommend";
    }

    div.className =
    `rank-item ${cls}`;

    div.textContent =
    `${index+1}位 ${pref}`;

    div.onclick=()=>{

        const d = prefectures[pref];

        map.flyTo(
            [d.lat,d.lng],
            8,
            {
                duration:1.5
            }
        );

        markers[pref].openPopup();

        showInfo(pref);
    };

    rankingList.appendChild(div);
});