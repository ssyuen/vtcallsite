export const isAuth = () => {
    return localStorage.getItem('LOGGED_IN') ? true : false
}

export const incrementSiteVisits = () => {
    if (window.localStorage.getItem('totalSiteVisits')) {
        console.log('incrementing site visits')
        let previousNumOfVisits = Number.parseInt(window.localStorage.getItem('totalSiteVisits')) + 1
        window.localStorage.setItem("totalSiteVisits", (previousNumOfVisits + 1).toString())
        

        setInterval(() => {
            console.log('here')
            previousNumOfVisits += 1
            window.localStorage.setItem("totalSiteVisits", (previousNumOfVisits).toString())
            console.log(window.localStorage.getItem('totalSiteVisits'))
        
        }, 5000);
    }
    else {
        console.log('setting total site visits')
        window.localStorage.setItem("totalSiteVisits", "1")
    }
    return localStorage.getItem('totalSiteVisits')
}