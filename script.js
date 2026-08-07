import FetchWrapper from "./fetch_wrapper.js";

const API = new FetchWrapper('https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/foodapp_aw1/');
const form = document.getElementById("create-form");


form.addEventListener("submit", async e => {
    e.preventDefault();

    const name = document.getElementById("create-name");
    const carbs = document.getElementById("create-carbs");
    const protein = document.getElementById("create-protein");
    const fat = document.getElementById("create-fat");

    API.post("/", {
        fields: {
            name: { stringValue: name.value },
            carbs: { integerValue: carbs.value },
            protein: { integerValue: protein.value },
            fat: { integerValue: fat.value }
        }
    })
    .then(data => {
        if(data.error) {
            return;
        }

        console.log(data);
        name.value = "";
        carbs.value = "";
        protein.value = "";
        fat.value = "";
    })
})