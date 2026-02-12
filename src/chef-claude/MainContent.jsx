import React from "react"
import IngredientList from "./IngredientsList";
import Recipe from "./Recipe";

import { getRecipeFromMistral } from "./ai";

export default function MainContent() {

    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [showLoader, setShowLoader] = React.useState(false)

    function addIngredient(formData) {
        const ingredient = formData.get("ingredient")
        if (!ingredient) return

        const exists = ingredients.some(item => item.toLowerCase() === ingredient.toLowerCase())
        if (!exists) {
            setIngredients(prevIngredients => [...prevIngredients, ingredient])
        }
    }

    async function getRecipe() {
        setShowLoader(true)

        try {
            const generatedRecipe = await getRecipeFromMistral(ingredients);
            setRecipe(generatedRecipe)
        } catch (error) {
            console.log(error)
        } finally {
            setShowLoader(false)
        }
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

                {ingredients.length > 0 && <IngredientList ingredients={ingredients} getRecipe={getRecipe} />}
                {showLoader && <div className="spinner"></div>}
                {recipe && <Recipe recipe={recipe} />}
            </div>
        </main>
    )
}
