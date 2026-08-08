import FetchWrapper from "./fetch_wrapper.js";
import { capitalize, calculateCalories } from "./helpers.js";
import snackbar from "snackbar";
import 'snackbar/dist/snackbar.min.css';

const API = new FetchWrapper('https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/foodapp_aw3');

const form = document.getElementById("create-form");
const list = document.getElementById("food-list");
const name = document.getElementById("create-name");
const carbs = document.getElementById("create-carbs");
const protein = document.getElementById("create-protein");
const fat = document.getElementById("create-fat");

form.addEventListener("submit", async e => {
    e.preventDefault();

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
            snackbar.show("Failure")
            return;
        }
        
        snackbar.show("Success");
        
        list.insertAdjacentHTML(
            "beforeend",
            `<li class="card">
                <div>
                    <h3>${capitalize(name.value)}</h3>
                    <div class="calories">${calculateCalories(carbs.value, protein.value, fat.value)} calories</div>
                    <ul class="macros">
                        <li class="carbs"><div>Carbs</div><div class="value">${capitalize(carbs.value)}g</div></li>
                        <li class="protein"><div>Protein</div><div class="value">${capitalize(protein.value)}g</div></li>
                        <li class="fat"><div>Fat</div><div class="value">${capitalize(fat.value)}g</div></li>
                    </ul>
                </div>
            </li>`
        );

        form.reset();
    })
})