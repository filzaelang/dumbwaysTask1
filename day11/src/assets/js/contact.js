function submitData() {
    const inputName = document.getElementById("inputName").value
    const inputEmail = document.getElementById("inputEmail").value
    const inputPhone = document.getElementById("inputPhone").value
    const inputSubject = document.getElementById("inputSubject").value
    const inputMessage = document.getElementById("inputMessage").value


    if (inputName == "") {
        alert('Nama harus diisi')
    } else if (inputEmail == "") {
        alert('Email harus diisi')
    } else if (inputPhone == "") {
        alert('Phone number harus diisi')
    } else if (inputSubject == "") {
        alert('Subject harus diisi')
    } else if (inputMessage == "") {
        alert('Message harus diisi')
    } else {

        console.log("name : ", inputName)
        console.log("email : ", inputEmail)
        console.log("phone : ", inputPhone)
        console.log("subject : ", inputSubject)
        console.log("message : ", inputMessage)

        let a = document.createElement('a')
        a.href = `mailto:${inputEmail}?subject=${inputSubject}&body=${inputMessage}`
        a.click()
    }
}