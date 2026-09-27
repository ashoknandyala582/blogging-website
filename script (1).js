/* ================================================
   PAGE NAVIGATION
================================================ */

function showPage(pageId) {

    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.remove("active");

    });

    document.getElementById(pageId)
        .classList.add("active");

    window.scrollTo(0, 0);

    if(pageId === "blogs") {

        displayBlogs();

    }

    if(pageId === "bookings") {

        displayBookings();

    }
}


/* ================================================
   REGISTER
================================================ */

function registerUser() {

    let name =
        document.getElementById("registerName").value;

    let email =
        document.getElementById("registerEmail").value;

    let password =
        document.getElementById("registerPassword").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;


    if(password !== confirmPassword) {

        alert("Passwords do not match!");

        return;

    }


    let user = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "travelUser",
        JSON.stringify(user)
    );


    alert(
        "Registration successful! Please login."
    );


    showPage("login");

}


/* ================================================
   LOGIN
================================================ */

function loginUser() {

    let email =
        document.getElementById("loginEmail").value;

    let password =
        document.getElementById("loginPassword").value;


    let storedUser =
        localStorage.getItem("travelUser");


    if(!storedUser) {

        alert(
            "No account found. Please register first."
        );

        return;

    }


    let user =
        JSON.parse(storedUser);


    if(
        email === user.email &&
        password === user.password
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );


        alert(
            "Login successful! Welcome " +
            user.name
        );


        showPage("home");

    }

    else {

        alert(
            "Invalid email or password!"
        );

    }

}


/* ================================================
   BUS SEARCH
================================================ */

function searchBus() {

    let from =
        document.getElementById("fromCity").value;

    let to =
        document.getElementById("toCity").value;

    let date =
        document.getElementById("travelDate").value;


    if(from === "" || to === "" || date === "") {

        alert(
            "Please select From, To and Date."
        );

        return;

    }


    if(from === to) {

        alert(
            "From and To cities cannot be same."
        );

        return;

    }


    alert(
        "Searching buses from " +
        from +
        " to " +
        to +
        " on " +
        date
    );


    showPage("buses");

}


/* ================================================
   SELECT BUS
================================================ */

function selectBus(
    name,
    from,
    to,
    price
) {

    let bus = {

        name: name,

        from: from,

        to: to,

        price: price

    };


    localStorage.setItem(
        "selectedBus",
        JSON.stringify(bus)
    );


    document.getElementById(
        "selectedBus"
    ).innerHTML = `

        <div class="card">

            <h3>
                ${name}
            </h3>

            <p>
                📍 ${from} → ${to}
            </p>

            <p>
                💰 Price per seat:
                ₹${price}
            </p>

        </div>

    `;


    showPage("booking");

}


/* ================================================
   CONFIRM BOOKING
================================================ */

function confirmBooking() {

    let passengerName =
        document.getElementById(
            "passengerName"
        ).value;

    let age =
        document.getElementById(
            "passengerAge"
        ).value;

    let gender =
        document.getElementById(
            "gender"
        ).value;

    let seats =
        document.getElementById(
            "seatCount"
        ).value;


    if(
        passengerName === "" ||
        age === "" ||
        gender === ""
    ) {

        alert(
            "Please fill all passenger details."
        );

        return;

    }


    let bus =
        JSON.parse(
            localStorage.getItem(
                "selectedBus"
            )
        );


    let total =
        bus.price * seats;


    let booking = {

        passengerName: passengerName,

        age: age,

        gender: gender,

        seats: seats,

        busName: bus.name,

        from: bus.from,

        to: bus.to,

        price: total,

        date: new Date().toLocaleDateString()

    };


    let bookings =
        JSON.parse(
            localStorage.getItem(
                "bookings"
            )
        ) || [];


    bookings.push(booking);


    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );


    alert(
        "🎉 Booking confirmed successfully!"
    );


    showPage("bookings");

}


/* ================================================
   DISPLAY BOOKINGS
================================================ */

function displayBookings() {

    let container =
        document.getElementById(
            "bookingList"
        );


    let bookings =
        JSON.parse(
            localStorage.getItem(
                "bookings"
            )
        ) || [];


    if(bookings.length === 0) {

        container.innerHTML = `

            <div class="card">

                <h2>
                    No Bookings Yet
                </h2>

                <p>
                    Book your first bus with TravelGo.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    bookings.forEach(function(booking, index) {

        container.innerHTML += `

            <div class="booking-card">

                <h2>
                    🚌 ${booking.busName}
                </h2>

                <p>
                    📍 ${booking.from}
                    → ${booking.to}
                </p>

                <p>
                    👤 Passenger:
                    ${booking.passengerName}
                </p>

                <p>
                    🎂 Age:
                    ${booking.age}
                </p>

                <p>
                    💺 Seats:
                    ${booking.seats}
                </p>

                <p>
                    💰 Total:
                    ₹${booking.price}
                </p>

                <p>
                    📅 Booking Date:
                    ${booking.date}
                </p>

                <button
                    class="btn"
                    onclick="cancelBooking(${index})">

                    Cancel Booking

                </button>

            </div>

        `;

    });

}


/* ================================================
   CANCEL BOOKING
================================================ */

function cancelBooking(index) {

    let bookings =
        JSON.parse(
            localStorage.getItem(
                "bookings"
            )
        ) || [];


    bookings.splice(index, 1);


    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );


    alert(
        "Booking cancelled."
    );


    displayBookings();

}


/* ================================================
   DEFAULT BLOGS
================================================ */

let defaultBlogs = [

    {

        title: "Exploring Goa",

        destination: "Goa",

        image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",

        content:
        "Goa is famous for its beautiful beaches, amazing sunsets, local food and wonderful travel experiences."

    },


    {

        title: "Rajasthan Adventure",

        destination: "Rajasthan",

        image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245",

        content:
        "Rajasthan is famous for its forts, palaces, deserts and rich cultural heritage."

    },


    {

        title: "Kerala Journey",

        destination: "Kerala",

        image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",

        content:
        "Kerala is known for its peaceful backwaters, greenery and beautiful landscapes."

    }

];


/* ================================================
   CREATE BLOG
================================================ */

function createBlog() {

    let title =
        document.getElementById(
            "blogTitle"
        ).value;

    let destination =
        document.getElementById(
            "blogDestination"
        ).value;

    let image =
        document.getElementById(
            "blogImage"
        ).value;

    let content =
        document.getElementById(
            "blogContent"
        ).value;


    if(
        title === "" ||
        destination === "" ||
        content === ""
    ) {

        alert(
            "Please fill all required fields."
        );

        return;

    }


    let blog = {

        title: title,

        destination: destination,

        image: image,

        content: content

    };


    let blogs =
        JSON.parse(
            localStorage.getItem(
                "blogs"
            )
        ) || [];


    blogs.push(blog);


    localStorage.setItem(
        "blogs",
        JSON.stringify(blogs)
    );


    alert(
        "🎉 Blog published successfully!"
    );


    document.getElementById(
        "blogTitle"
    ).value = "";

    document.getElementById(
        "blogDestination"
    ).value = "";

    document.getElementById(
        "blogImage"
    ).value = "";

    document.getElementById(
        "blogContent"
    ).value = "";


    showPage("blogs");

}


/* ================================================
   DISPLAY BLOGS
================================================ */

function displayBlogs() {

    let container =
        document.getElementById(
            "blogList"
        );


    let userBlogs =
        JSON.parse(
            localStorage.getItem(
                "blogs"
            )
        ) || [];


    let allBlogs =
        defaultBlogs.concat(userBlogs);


    container.innerHTML = "";


    allBlogs.forEach(function(blog, index) {

        container.innerHTML += `

            <div class="card">

                <img
                    src="${blog.image ||
                    'https://images.unsplash.com/photo-1469474968028-56623f02e42e'}"
                    style="
                    width:100%;
                    height:180px;
                    object-fit:cover;
                    border-radius:8px;
                    "
                >

                <h3>
                    ${blog.title}
                </h3>

                <p>
                    📍 ${blog.destination}
                </p>

                <p>
                    ${blog.content.substring(0,100)}...
                </p>

                <button
                    class="btn"
                    onclick="readBlog(${index})">

                    Read More

                </button>

            </div>

        `;

    });

}


/* ================================================
   READ BLOG
================================================ */

function readBlog(index) {

    let userBlogs =
        JSON.parse(
            localStorage.getItem(
                "blogs"
            )
        ) || [];


    let allBlogs =
        defaultBlogs.concat(userBlogs);


    let blog =
        allBlogs[index];


    document.getElementById(
        "blogDetailContent"
    ).innerHTML = `

        <h1>
            ${blog.title}
        </h1>

        <h3>
            📍 ${blog.destination}
        </h3>

        <img
            src="${blog.image ||
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e'}"
        >

        <p>
            ${blog.content}
        </p>

        <button
            class="btn"
            onclick="showPage('blogs')">

            ← Back to Blogs

        </button>

    `;


    showPage("blogDetails");

}


/* ================================================
   LOAD BLOGS
================================================ */

displayBlogs();
