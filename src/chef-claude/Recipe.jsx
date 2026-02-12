import React from 'react';
import ReactMarkDown from 'react-markdown'

export default function Recipe(props) {

    const [fullText, setFullText] = React.useState(props.recipe);
    const [visibleText, setVisibleText] = React.useState("");

    console.log(props.recipe)

    React.useEffect(() => {
        if (!fullText) return;

        let index = 0;
        setVisibleText("");

        const interval = setInterval(() => {
            if (index >= (fullText.length-1)) {
                clearInterval(interval);
                return;
            }

            setVisibleText(prev => prev + fullText[index]);
            index++;
        }, 0);

        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <section>
            <h2>Let’s make something delicious.</h2>
            <ReactMarkDown>{visibleText}</ReactMarkDown>
        </section>
    )
}
