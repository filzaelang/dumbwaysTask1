const testimonialData = [
    {
        author: "Surya Elidanto",
        content: "Mantap sekali jasanya!",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 5,
    },
    {
        author: "Surya Elz",
        content: "Keren lah pokoknya!",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 5
    },
    {
        author: "Bambang",
        content: "Gak jelas bambang",
        image: "https://images.pexels.com/photos/8727490/pexels-photo-8727490.jpeg",
        rating: 1
    },
    {
        author: "ABC Company",
        content: "Wuhuu keren lah!",
        image: "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 4
    },
    {
        author: "Squidward Tenpoles",
        content: "Itu bukan seni, ini baru seni",
        image: "https://cdn.idntimes.com/content-images/community/2019/09/mtwjcve-d-54f55f671b653a99018976a6e447582a.jpg",
        rating: 2
    }
];

function html(item) {
    return `<div class="testimonial">
    <img src="${item.image}" class="profile-testimonial" />
    <p class="quote">"${item.content}"</p>
    <p class="author">- ${item.author}</p>
    <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
</div>`;
}


function allTestimonials() {
    let testimonialHTML = ``
    testimonialData.forEach((item) => {
        testimonialHTML += html(item)
    })

    document.getElementById("testimonials").innerHTML = testimonialHTML
}

// Menampilkan semua testimonial
allTestimonials()

// Menampilkan testimonial dengan rating tertentu
function filterTestimonials(rating) {
    let testimonialHTML = ``
    const testimonialFiltered = testimonialData.filter((item) => {
        return item.rating === rating
    })

    if (testimonialFiltered.length === 0) {
        testimonialHTML = `<h3> Data not found! </h3>`
    } else {
        testimonialFiltered.forEach((item) => {
            testimonialHTML += html(item)
        })
    }

    document.getElementById("testimonials").innerHTML = testimonialHTML
}
