export default function IngredientList(props) {

    const ingredientListItems = props.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)

    return (
        <section className="ingredient-list">
            <h2>Ingredients on hand:</h2>
            <ul>
                {ingredientListItems}
            </ul>

            {props.ingredients.length > 3 &&
                <div className="recipe-action-container">
                    <div className="recipe-action-text-container">
                        <p className="recipe-question">Ready for a recipe?</p>
                        <p className="recipe-question-description">Generate a recipe from your list of ingredients</p>
                    </div>
                    <div className="recipe-action-button-container">
                        <button className="recipe-generate-button" onClick={props.getRecipe}>Get a recipe</button>
                    </div>
                </div>}
        </section>
    )
}
