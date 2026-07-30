const form = document.getElementById("searchForm");
const dateInput = document.getElementById("dateInput");
const result = document.getElementById("result");
const favourites = document.getElementById("favourites");

const apiKey = "DEMO_KEY";

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedDate = dateInput.value;

    if (!selectedDate) {
        alert("Please select a date.");
        return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (selectedDate > today) {
        alert("Please select a date that is not in the future.");
        return;
    }

    getAPOD(selectedDate);
});

async function getAPOD(date) {

    result.innerHTML = `
        <div class="loading">
            Loading...
        </div>
    `;

    try {

        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
        );

        const data = await response.json();

        displayAPOD(data);

    } catch (error) {

        result.innerHTML = `
            <div class="alert alert-danger">
                Unable to retrieve data from NASA.
            </div>
        `;

        console.error(error);
    }

}
function displayAPOD(data) {
    if (data.media_type !== "image") {
        result.innerHTML = `
            <div class="alert alert-warning">
                This APOD is a video, not an image.
            </div>
        `;
        return;
    }

    result.innerHTML = `
        <div class="apod-card">
            <h2>${data.title}</h2>

            <p><strong>Date:</strong> ${data.date}</p>

            <img
                src="${data.url}"
                alt="${data.title}"
                id="apodImage">

            <p>${data.explanation}</p>

            <button
                id="saveFavourite"
                class="btn btn-success favorite-btn">
                Save to Favourites
            </button>
        </div>
    `;

    document
        .getElementById("apodImage")
        .addEventListener("click", function () {
            window.open(data.hdurl || data.url, "_blank");
        });

    document
        .getElementById("saveFavourite")
        .addEventListener("click", function () {
            saveFavourite(data);
        });
}
function saveFavourite(data) {
    let saved = JSON.parse(localStorage.getItem("favourites")) || [];

    if (!saved.some(item => item.date === data.date)) {
        saved.push(data);
        localStorage.setItem("favourites", JSON.stringify(saved));
    }

    loadFavourites();
}

function loadFavourites() {
    let saved = JSON.parse(localStorage.getItem("favourites")) || [];

    favourites.innerHTML = "";

    saved.forEach(item => {
        favourites.innerHTML += `
            <div class="favorite-item">
                <h5>${item.title}</h5>

                <img
                    src="${item.url}"
                    alt="${item.title}">

                <br><br>

                <button
                    class="btn btn-danger delete-btn"
                    data-date="${item.date}">
                    Delete
                </button>
            </div>
        `;
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            deleteFavourite(this.dataset.date);
        });
    });
}

function deleteFavourite(date) {
    let saved = JSON.parse(localStorage.getItem("favourites")) || [];

    saved = saved.filter(item => item.date !== date);

    localStorage.setItem("favourites", JSON.stringify(saved));

    loadFavourites();
}

loadFavourites();