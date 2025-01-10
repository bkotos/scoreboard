{
    let score = 0
    document.getElementById('btn-add-team1').onclick = () => {
        document.getElementById('score-team1').innerText = `${++score}`
    }
    document.getElementById('btn-subtract-team1').onclick = () => {
        if (score > 0) document.getElementById('score-team1').innerText = `${--score}`
    }
}
{
    let score = 0
    document.getElementById('btn-add-team2').onclick = () => {
        document.getElementById('score-team2').innerText = `${++score}`
    }
    document.getElementById('btn-subtract-team2').onclick = () => {
        if (score > 0) document.getElementById('score-team2').innerText = `${--score}`
    }
}
