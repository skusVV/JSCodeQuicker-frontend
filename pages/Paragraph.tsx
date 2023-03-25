import { useState, Fragment } from 'react';

export const Paragraph =({ paragraphText, defaultColor, className }: any) => {
    const [highlightedWord, setHighlightedWord] = useState('');

    function handleMouseOver(event: any) {
        const word = event.target.textContent.trim();
        setHighlightedWord(word);
    }

    function handleMouseOut() {
        setHighlightedWord('');
    }

    const words = (paragraphText as any).split(' ');

    return (
        <p className={className}>
            {words.map((word: any, index: any) => (
                <Fragment key={index}>
          <span
              data-testid={`word-${index}`}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              style={{ backgroundColor: word === highlightedWord ? '#16A085' : 'transparent', color: word === highlightedWord ? '#ffffff' : defaultColor, borderRadius: '5px', cursor: 'pointer', transform: word === highlightedWord ? 'scale(1.05)' : 'scale(1)', display: 'inline-block' }}
          >
            {word}
          </span>{' '}
                </Fragment>
            ))}
        </p>
    );
}