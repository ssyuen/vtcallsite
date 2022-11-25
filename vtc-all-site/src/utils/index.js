export const isAuth = () => {
    return true
    return localStorage.getItem('LOGGED_IN') ? true : false
}

export const incrementSiteVisits = () => {
    if (window.localStorage.getItem('totalSiteVisits')) {
        let previousNumOfVisits = Number.parseInt(window.localStorage.getItem('totalSiteVisits')) + 1
        window.localStorage.setItem("totalSiteVisits", (previousNumOfVisits + 1).toString())

        setInterval(() => {
            previousNumOfVisits += 1
            window.localStorage.setItem("totalSiteVisits", (previousNumOfVisits).toString())

        }, 5000);
    }
    else {
        window.localStorage.setItem("totalSiteVisits", "1")
    }
    return localStorage.getItem('totalSiteVisits')
}