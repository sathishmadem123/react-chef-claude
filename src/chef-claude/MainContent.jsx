import React from "react"
import IngredientList from "./IngredientsList";
import Recipe from "./Recipe";

import { getRecipeFromMistral, showNofication } from "./ai";

export default function MainContent() {

    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [showLoader, setShowLoader] = React.useState(false)
    const tokenInputReference = React.useRef(null)
    const [toast, setToast] = React.useState({
        show: false,
        message: ""
    })

    function addIngredient(formData) {
        const ingredient = formData.get("ingredient")
        if (!ingredient) return

        const exists = ingredients.some(item => item.toLowerCase() === ingredient.toLowerCase())
        if (!exists) {
            setIngredients(prevIngredients => [...prevIngredients, ingredient])
        }
    }

    async function getRecipe() {
        const apiKey = tokenInputReference.current.value;
        if (apiKey === null || apiKey === "") {
            showNofication("! Enter the Hugging-face API key", setToast)
            return;
        }

        setShowLoader(true)
        try {
            const generatedRecipe = await getRecipeFromMistral(ingredients, apiKey, setToast);
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
                {recipe && <Recipe recipe={recipe}/>}
            </div>
            <div className="token-container">
                <input
                    type="text"
                    id="token"
                    name="token"
                    ref={tokenInputReference}
                    placeholder="Paste the hugging-face API token"
                    className="token-input"
                />
            </div>

            {toast.show && <div className="toast-message">{toast.message}</div>}
        </main>
    )
}
