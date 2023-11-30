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