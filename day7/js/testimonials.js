class Testimonial {
    constructor(name, review, image) {
        this.name = name
        this.review = review
        this.image = image
    }

    html() {
        return `
            <div class="testimonial">
                <img src="${this.image}" class="profile-testimonial" />
                <p class="quote">"${this.review}"</p>
                <p class="author">- ${this.name}</p>
            </div>
        `
    }
}

const testimonial1 = new Testimonial("Surya Elidanto", "Mantap sekali jasanya!", "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
const testimonial2 = new Testimonial("Surya Elz", "Keren lah pokoknya!", "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
const testimonial3 = new Testimonial("ABC Company", "Wuhuu keren lah!", "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")

const testimonials = [testimonial1, testimonial2, testimonial3]

let testimonialHTML = ``
for (let index = 0; index < testimonials.length; index++) {
    testimonialHTML += testimonials[index].html()
}

document.getElementById("testimonials").innerHTML = testimonialHTML