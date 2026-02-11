import React from "react"
import IngredientList from "./IngredientsList";
import Recipe from "./Recipe";

export default function MainContent() {

    const [ingredients, setIngredients] = React.useState([]);
    const [recipeShown, setRecipeShown] = React.useState(false)

    function addIngredient(formData) {
        const ingredient = formData.get("ingredient")
        if (!ingredient) return

        const exists = ingredients.some(item => item.toLowerCase() === ingredient.toLowerCase())
        if (!exists) {
            setIngredients(prevIngredients => [...prevIngredients, ingredient])
            setRecipeShown(false)
        }
    }

    function getRecipe() {
        setRecipeShown(true)
    }   

    return (
        <main className="main-container">
            <div className="wrapper-container">
                <form className="ingredient-form" action={addIngredient}>
                    <input
                        type="text"
                        id="ingredient"
                        name="ingredient"
                        aria-label="Enter ingredient"
                        className="ingredient-input"
                        placeholder="e.g. oregano"
                    />

                    <button className="ingredient-add-button">+ Add ingredient</button>
                </form>

                {ingredients.length > 0 && <IngredientList ingredients={ingredients} getRecipe={getRecipe}/>}
                {recipeShown && <Recipe />}
            </div>
        </main>
    )
}