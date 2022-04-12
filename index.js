const top10 = document.querySelector(".top10")

fetch("https://alephium.ono.re/api/stats/addresses?top=10&human", {mode: 'cors'})
  .then(response => response.json())
  .then(data => renderTop10(data))
  .catch(error => console.log(error))


function renderTop10(data) {
  top10.innerHTML = ""  // clear placeholder entries

  function setsToHuman(sets) {
    return (sets / 1000000000000000000000000 ).toFixed(2)
  }

  for(let i = 0; i < 10; i++) {
    const humanBalance = setsToHuman(data.addresses[i].balance)
    const humanLocked = setsToHuman(data.addresses[i].locked)

    top10.innerHTML += `
    <div class="top10__entry">
      <div class="top10__number">${i+1}</div>
      <div class="top10__stats">
        <p class="top10__address">Address: <a href="https://explorer.alephium.org/#/addresses/${data.addresses[i].address}" target="__blank">${data.addresses[i].address.slice(0, 12)}...</a></p>
        <p class="top10__balance">Balance: <span class="bold">${humanBalance}M</span></p>
        <p class="top10__locked">Locked: ${humanLocked}</p>
      </div>
    </div>
    `
  }
}

function renderPlaceholderEntries() {
  for(let i = 0; i < 10; i++) {
    top10.innerHTML += `
    <div class="top10__entry"></div>
  `
  }
}

renderPlaceholderEntries()