const jokeEl = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

const displayLastJoke = () => {
    const lastJoke = localStorage.getItem('lastJoke');
    if (lastJoke) {
        jokeEl.innerHTML = lastJoke;
    }
};

const generateJoke = async () => {
    jokeEl.classList.add('loading');
    jokeEl.innerHTML = '';

    const config = {
        headers: { Accept: "application/json" },
    };

    try {
        const res = await fetch("https://icanhazdadjoke.com/", config);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await res.json();
        jokeEl.innerHTML = data.joke;
        localStorage.setItem('lastJoke', data.joke);
    } catch (error) {
        jokeEl.innerHTML = "Failed to fetch a joke, please try again later.";
        console.error("Fetch error: ", error);
    } finally {
        jokeEl.classList.remove('loading');
    }
};

document.addEventListener('DOMContentLoaded', displayLastJoke);
jokeBtn.addEventListener("click", generateJoke);

generateJoke();
