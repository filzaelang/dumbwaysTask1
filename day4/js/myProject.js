let dataProject = []
let dataTechnologies = []

function submitProject(event) {
    event.preventDefault()

    // Get all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Create an array to store the checked values
    const checkedValues = [];
    // Iterate over checkboxes
    checkboxes.forEach(checkbox => {
        // Check if the checkbox is checked
        if (checkbox.checked) {
            // Push the value to the array
            checkedValues.push(checkbox.value);
        }
    });

    // console.log("Checked Values:", checkedValues);

    let projectName = document.getElementById("projectName").value
    let startDate = document.getElementById("startDate").value
    let endDate = document.getElementById("endDate").value
    let description = document.getElementById("description").value
    let inputImage = document.getElementById("inputImage").files

    inputImage = URL.createObjectURL(inputImage[0])

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
        <div class="project-card">
            <!-- card -->
            <div class="project-card-image">
                <img src="${dataProject[index].image}">
            </div>
            <div class="project-card-title">
                <a href="projectDetail.html">${dataProject[index].title}</a>
            </div>
            <div class="project-card-durasi">
                <p>durasi : 1 bulan</p>
            </div><br>
            <div class="project-card-content">
                <p>${dataProject[index].description}</p>
            </div><br>
            <div class="project-card-icon-technologies">
                ${renderIcons(iconTechnologies)}
            </div><br>
            <div class="project-card-button">
                <button>edit</button>
                <button>delete</button>
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