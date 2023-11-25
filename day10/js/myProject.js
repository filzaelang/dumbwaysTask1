let dataProject = []
let dataTechnologies = []

function submitProject(event) {
    event.preventDefault()

    let projectName = document.getElementById("projectName").value
    let startDate = document.getElementById("startDate").value
    let endDate = document.getElementById("endDate").value
    let description = document.getElementById("description").value
    let postAt = new Date()
    let inputImage = document.getElementById("inputImage").files

    inputImage = URL.createObjectURL(inputImage[0])

    // Get all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Create an array to store the checked values
    const checkedValues = [];
    // Iterate over checkboxes
    checkboxes.forEach(checkbox => {
        // Check if the checkbox is checked
        if (checkbox.checked) {
            // Push the value to the array // console.log("Checked Values:", checkedValues);
            checkedValues.push(checkbox.value);
        }
    });

    //get distance time
    // let startDate2 = endDate
    let startDateObject = new Date(startDate)
    let milisecondsStartDate = startDateObject.getTime()
    console.log(milisecondsStartDate)

    // let endDate2 = dataProject[index].endDate
    let endDateObject = new Date(endDate)
    let milisecondsEndDate = endDateObject.getTime()
    console.log(milisecondsEndDate)

    const distance = milisecondsEndDate - milisecondsStartDate

    const distanceYear = Math.floor(distance / 1000 / 60 / 60 / 24 / 30 / 12)
    const distanceMonth = Math.floor(distance / 1000 / 60 / 60 / 24 / 30)
    const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24)

    let distanceFinal = ``

    if (distanceYear > 0) {
        distanceFinal = `${distanceYear} tahun`
    } else if (distanceMonth > 0) {
        distanceFinal = `${distanceMonth} bulan`
    } else if (distanceDay > 0) {
        distanceFinal = `${distanceDay} hari`
    }

    if (projectName == "") {
        alert('Project Name cannot be empty')
    } else if (startDate == "") {
        alert('Start Date cannot be empty')
    } else if (endDate == "") {
        alert('End Date cannot be empty')
    } else if (description == "") {
        alert('Description cannot be empty')
    } else if (checkedValues == "") {
        alert('Technologies cannot be empty')
    } else if (inputImage == "") {
        alert('Image cannot be empty')
    } else {

        const project = {
            title: projectName,
            startDate: startDate,
            endDate: endDate,
            description: description,
            technologies: checkedValues,
            postAt: postAt,
            duration: distanceFinal,
            image: inputImage
        }

        // const iconTechnologies = {
        //     checkedValues
        // }

        dataProject.push(project)
        dataTechnologies.push(checkedValues)
        console.log("dataProject", dataProject)
        renderProject()
    }

}

function renderProject() {
    document.getElementById("card-content").innerHTML = ''
    for (let index = 0; index < dataProject.length; index++) {
        const iconTechnologies = dataProject[index].technologies || [];
        document.getElementById("card-content").innerHTML += `
        
        <div class="card project-card">
            <img src="${dataProject[index].image}" class="object-fit-cover" alt="..." style="height: 200px;">
            <div class="card-body">
                <h5 class="card-title" style="font-weight: bold;">${dataProject[index].title}</h5>
                <p class="card-text">durasi : ${dataProject[index].duration}</p>
                <p class="card-text">${dataProject[index].description}</p>
                <p style="font-size: large; font-weight: bold;">${renderIcons(iconTechnologies)}</p>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-outline-dark"
                        style="background-color: #111727; color: white; width: 90%; margin-right: 5%;">
                        edit
                    </button>
                    <button class="btn btn-outline-dark"
                        style="background-color: #111727; color: white; width: 90%; margin-left: 5%;">
                        delete
                    </button>
                </div>
            </div>
        </div>
        
        `
    }
}

function renderIcons(technologies) {
    let iconsHTML = '';

    // Add condition based on your requirements
    if (technologies.includes('NodeJs')) {
        iconsHTML += '<i class="fa-brands fa-node-js"></i>';
    }

    if (technologies.includes('ReactJs')) {
        iconsHTML += '<i class="fa-brands fa-react"></i>';
    }

    if (technologies.includes('NextJs' || 'TypeScript')) {
        iconsHTML += '<i class="fa-brands fa-square-js"></i>';
    }

    return iconsHTML;
}

setInterval(() => {
    renderProject()
}, 86400000)




    // function getFullTime(tanggal) {
    //     let d = new Date()

    //     console.log("minute", d.getMinutes())
    //     console.log("hours", d.getHours())
    //     console.log("day", d.getDay())
    //     console.log("date", d.getDate())
    //     console.log("month", d.getMonth())
    //     console.log("year", d.getFullYear())

    //     const monthList = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug",
    //         "Sep", "Oct", "Nov", "Dec"]

    //     let minutes = d.getMinutes()
    //     let hours = d.getHours()
    //     let day = d.getDay()
    //     let date = d.getDate()
    //     let month = d.getMonth()
    //     let year = d.getFullYear()

    //     if (hours <= 9) {
    //         hours = "0" + hours
    //     }

    //     if (minutes <= 9) {
    //         minutes = "0" + minutes
    //     }

    //     return `${date} ${monthList[month]} ${year} ${hours}:${minutes}`
    // }

    // function getDistanceTime() {
    //     let startDate2 = dataProject[index].startDate
    //     let startDateObject = new Date(startDate2)
    //     let milisecondsStartDate = startDateObject.getTime()
    //     console.log(milisecondsStartDate)

    //     let endDate2 = dataProject[index].endDate
    //     let endDateObject = new Date(endDate2)
    //     let milisecondsEndDate = endDateObject.getTime()
    //     console.log(milisecondsEndDate)

    //     const distance = milisecondsEndDate - milisecondsStartDate

    //     const distanceYear = Math.floor(distance / 1000 / 60 / 60 / 24 / 30 / 12)
    //     const distanceMonth = Math.floor(distance / 1000 / 60 / 60 / 24 / 30)
    //     const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24)

    //     if (distanceYear > 0) {
    //         return `${distanceYear} years`
    //     } else if (distanceMonth > 0) {
    //         return `${distanceMonth} months`
    //     } else if (distanceDay > 0) {
    //         return `${distanceDay} days`
    //     }

    // const timeNow = new Date().getTime()
    // const timePosted = 1699813904289
    // const timePosted = time
    //time


    // const distance = timeNow - timePosted
    // console.log("ini nilainya", distance)
    // const distanceYear = Math.floor(distance / 1000 / 60 / 60 / 24 / 30 / 12)
    // const distanceMonth = Math.floor(distance / 1000 / 60 / 60 / 24 / 30)
    // const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24)
    // const distanceHours = Math.floor(distance / 1000 / 60 / 60)
    // const distanceMinutes = Math.floor(distance / 1000 / 60)
    // const distanceSeconds = Math.floor(distance / 1000)

    // if (distanceYear > 0) {
    //     return `${distanceYear} years ago`
    // } else if (distanceMonth > 0) {
    //     return `${distanceMonth} months ago`
    // } else if (distanceDay > 0) {
    //     return `${distanceDay} days ago`
    // } else if (distanceHours > 0) {
    //     return `${distanceHours} hours ago`
    // } else if (distanceMinutes > 0) {
    //     return `${distanceMinutes} minutes ago`
    // } else {
    //     return `${distanceSeconds} seconds ago`
    // }
    // }


    // < div class="d-flex flex-column project-card" >
    //         < !--card -->
    //         <div class="d-flex justify-content-center">
    //             <img  src="${dataProject[index].image}">
    //         </div>
    //         <div class="project-card-title">
    //             <a href="projectDetail.html">${dataProject[index].title}</a>
    //         </div>
    //         <div class="project-card-durasi">
    //             <p>durasi :${dataProject[index].duration}</p>
    //         </div><br>
    //         <div class="project-card-content">
    //             <p>${dataProject[index].description}</p>
    //         </div><br>
    //         <div class="project-card-icon-technologies">
    //             ${renderIcons(iconTechnologies)}
    //         </div><br>
    //         <div class="project-card-button">
    //             <button>edit</button>
    //             <button>delete</button>
    //         </div>
    //     </div>