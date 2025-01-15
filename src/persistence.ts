const getFirstBurst = (storageId: number) => {
    return localStorage.getItem(`scoreboard-burst-first-${storageId}`)
}
