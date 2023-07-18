const quote_paragraph = document.getElementById('quote')
const author_paragraph = document.getElementById('author')
const generateButton = document.getElementById('generate')
const quoteContainer = document.getElementById('container');
const loader = document.getElementById('loader');   
const container_detail = document.getElementById('container-detail')
const show_detail = document.getElementById('show-detail')
const quote_place = document.getElementById('quote-place')


const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.style.visibility = "hidden";
};

const removeLoadingSpinner = () => {
    if (loader.hidden === false) {
        loader.hidden = true;
        quoteContainer.style.visibility = "visible";

    }
};
let author_slug = ''
const API_URL = 'https://api.quotable.io'
const getQuote = async () => {
    showLoadingSpinner();
    const response1 = await fetch(`${API_URL}/random`)
    const { authorSlug, ...data } = await response1.json()
    author_slug = authorSlug
    // const { authorSlug, ...quote } = await response1.json()
    try {
        quote_paragraph.textContent = data.content
        author_paragraph.textContent = data.author
        removeLoadingSpinner();

    } catch (e) {
        console.log(e)
    }

}

const showDetail = async () => {
    showLoadingSpinner();
    const response2 = await fetch(`${API_URL}/authors/slug/${author_slug}`);
    const author = await response2.json();
    try {
        show_detail.textContent = "Detail Author"
        quote_paragraph.hidden = true;
        author_paragraph.hidden = true;

        let container = document.createElement("div");
        container.classList.add("author-details");

        let nameElement = document.createElement("h2");
        nameElement.textContent = author.name;
        nameElement.classList.add("author-name");

        let descriptionElement = document.createElement("p");
        descriptionElement.textContent = author.description;
        descriptionElement.classList.add("author-description");

        let bioElement = document.createElement("p");
        bioElement.textContent = author.bio
        bioElement.classList.add("author-bio");

        container.appendChild(nameElement);
        container.appendChild(descriptionElement);
        container.appendChild(bioElement);

        quote_place.appendChild(container);

        show_detail.onclick = () => {
            window.open(`${author.link}`, "_blank");
        };

        generateButton.addEventListener("click", refreshPage);

        removeLoadingSpinner();
    } catch (e) {
        console.log(e);
    }
};

const refreshPage = () => {
    window.location.href = window.location.href;
};

generateButton.addEventListener("click", () => {
    getQuote()
})
show_detail.addEventListener("click", () => {
    if (show_detail.textContent !== "Detail Author") {
        showDetail()
    }
})

getQuote()


