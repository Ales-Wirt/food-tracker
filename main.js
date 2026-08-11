import FetchWrapper from "./fetch_wrapper.js";
import { capitalize, calculateCalories } from "./helpers.js";
import AppData from "./app-data.js";
import snackbar from "snackbar";
import { Chart } from "chart.js";
import 'snackbar/dist/snackbar.min.css';

const API = new FetchWrapper('https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/foodappapp');

const appData = new AppData();
const form = document.getElementById("create-form");
const list = document.getElementById("food-list");
const name = document.getElementById("create-name");
const carbs = document.getElementById("create-carbs");
const protein = document.getElementById("create-protein");
const fat = document.getElementById("create-fat");


let chartInstance = null;

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
        
        displayEntry(
            data.fields.name.stringValue,
            data.fields.carbs.integerValue,
            data.fields.protein.integerValue,
            data.fields.fat.integerValue
        );

        renderChart();

        form.reset();
    })
});

const init = () => {
    API.get("/?pageSize=100")
        .then(data => {
            data.documents?.forEach(doc => {
                const name = doc.fields.name.stringValue;
                const carbs = doc.fields.carbs.integerValue;
                const protein = doc.fields.protein.integerValue;
                const fat = doc.fields.fat.integerValue;
                const calories = calculateCalories(carbs, protein, fat);

                displayEntry(name, carbs, protein, fat);
            });

            renderChart();
        });
};

const displayEntry = (name, carbs, protein, fat) => {
    appData.addFood(carbs, protein, carbs);

    list.insertAdjacentHTML("beforeend",
        `<li class="carbs">
            <div>
                <h3 class="name">${capitalize(name)}</h3>
                <div class="calories">${calories} calories</div>
                <ul class="macros">
                    <li class="carbs"><div>Carbs</div><div class="value">${carbs}g</div></li>
                    <li class="protein"><div>Protein</div><div class="value">${protein}g</div></li>
                    <li class="fat"><div>Fat</div><div class="value">${fat}g</div></li>
                </ul>
            </div>
        </li>`
    );
};

const renderChart = () => {
    chartInstance?.destroy();

    const canvas = document.getElementById("app-chart").getContext("2d");

    chartInstance = new Chart(canvas, {
        type: "bar",
        data: {
            labels: [ "Carbs", "Protein", "Fat" ],
            datasets: [{
                label: "Macronutrients",
                data: [
                    appData.getTotalCarbs(),
                    appData.getTotalProtein(),
                    appData.getTotalFat()
                ],
                backgroundColor: [ "#25AEEE", "#FECD52", "#57D269" ]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
};

init();