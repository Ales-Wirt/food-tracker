export default class AppData {
    constructor() {
        this.food = [];
    }

    addFood(cards, protein, fat) {
        return this.food.push({
            carbs: Number.parseInt(carbs, 10),
            protein: Number.parseInt(protein, 10),
            fat: Number.parseInt(fat, 10)
        });
    }

    getTotalCarbs() {
        return this.food.map(f => f.carbs).reduce((acc, curr) => acc + curr, 0);
    }

    getTotalProtein() {
        return this.food.map(f => f.protein).reduce((acc, curr) => acc + curr, 0);
    }

    getTotalFat() {
        return this.food.map(f => f.fat).reduce((acc, curr) => acc + curr, 0);
    }

    getTotalCalories() {
        return this.getTotalCarbs() * 4 +
            this.getTotalProtein() * 4 +
            this.getTotalFat() * 9;
    }
}