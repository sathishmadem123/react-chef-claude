import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

export async function getRecipeFromMistral(ingredientsArr, apiKey, setToast) {

    const hf = new HfInference(apiKey)
    try {
        const ingredientsString = ingredientsArr.join(", ")
        const response = await hf.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
        showNofication("! Invalid Hugging-face API key", setToast)
    }
}

export function showNofication(message, setToast) {
    setToast({ show: true, message })

    setTimeout(() => {
        setToast(prevToast => ({ ...prevToast, show: false }))
    }, 3000)
}
