const historyList =
document.getElementById(
  'historyList'
);

const missions =
JSON.parse(
  localStorage.getItem(
    'missionHistory'
  )
) || [];

if(missions.length === 0){

  historyList.innerHTML = `

    <div class="empty-history">

      tidak ada aktivitas saat ini

    </div>

  `;

}

else{

  missions.forEach(item => {

    historyList.innerHTML += `

      <div class="history-item">

        <div>

          <h3>${item.title}</h3>

          <p>${item.desc}</p>

        </div>

        <div>

          <h2>
            +Rp${item.reward}
          </h2>

          <span>
            ${item.status}
          </span>

        </div>

      </div>

    `;

  });

}