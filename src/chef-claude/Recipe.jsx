import React from 'react';
import ReactMarkDown from 'react-markdown'

export default function Recipe(props) {

    // const [fullText, setFullText] = React.useState(props.recipe);
    const [visibleText, setVisibleText] = React.useState("");

    React.useEffect(() => {
        if (!props.recipe) return;

        let index = 0;
        setVisibleText("");

        const interval = setInterval(() => {
            if (index >= (props.recipe.length-1)) {
                clearInterval(interval);
                return;
            }

            setVisibleText(prev => prev + props.recipe[index]);
            index++;
        }, 0);

        return () => clearInterval(interval);
    }, [props.recipe]);

    return (
        <section>
            <h2>Let’s make something delicious.</h2>
            <ReactMarkDown>{visibleText}</ReactMarkDown>
        </section>
    )
}
