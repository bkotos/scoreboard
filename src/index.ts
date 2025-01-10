let score = 0
document.getElementById('btn-add-team1').onclick = () => {
    document.getElementById('score-team1').innerText = `${++score}`
}
document.getElementById('btn-subtract-team1').onclick = () => {
    document.getElementById('score-team1').innerText = `${--score}`
}
