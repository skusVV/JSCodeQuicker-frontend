import Head from 'next/head'
import React, {Fragment, useState} from 'react';
import styles from '@/styles/Home.module.css'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const BANNER_MESSAGE = `
<p>JSCodeQuicker is presently in its Beta version, which means that its performance may not be up to par, and the responses may not be optimal. We apologize for any inconvenience this may cause, and we want to assure you that we are working tirelessly to improve the platform's performance. Our team is dedicated to ensuring that your experience with JSCodeQuicker is exceptional, and we are committed to providing you with the best possible service.</p>

<p>We understand that your feedback is crucial in helping us identify areas that require improvement, and we welcome any suggestions or concerns you may have. If you would like to share your thoughts with us, please do not hesitate to reach out to us via email at "jscodeQuicker@gmail.com." We value your input and appreciate your willingness to help us make JSCodeQuicker the best it can be. Thank you for your patience and understanding as we work towards achieving our goal of providing you with an unparalleled coding experience.</p>
`

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

export default function Home() {
    const [value, setValue] = React.useState('console.log(\'hello world!\');');
    const [result, setResult] = React.useState('');
    const [coverInProgress, setCoverInProgress] = React.useState(false);
    const [simplifyInProgress, setSimplifyInProgress] = React.useState(false);


    const simplify = () => {
        setSimplifyInProgress(true);
        setResult('');
        const body = JSON.stringify({ content: new Buffer(value), rulesType: 'simplifyCode'});

        fetch('/api/v1/test-coverage', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
            .then((response) => response.json())
            .then((data) => {
                setResult(data.content);
                setSimplifyInProgress(false);
            });
    }


  return (
    <>
      <Head>
        <title>Test and Refactor Your Javascript Code with Ease - Automated Unit Testing and Refactoring Tools</title>
          <meta name="keywords" content="refactoring tools, popular frameworks, NodeJs, NestJs, Express, ReactJs, Angular, Vuejs, code analysis, code improvements, development costs, stability, reliability"/>
          <meta name="description" content="Our platform provides a comprehensive solution for refactoring your Javascript code, with support for popular frameworks such as NodeJs, NestJs, Express, ReactJs, Angular, and Vuejs. Try it out today and improve the quality of your code!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/>

          <script type="application/ld+json" dangerouslySetInnerHTML={{
              __html: `
              {
                  "@context": "http://schema.org",
                  "@type": "Product",
                  "name": "Js Code Quicker - Automated Unit Testing and Refactoring Tools",
                  "description": "Our platform provides a comprehensive solution for refactoring your Javascript code, with support for popular frameworks such as NodeJs, NestJs, Express, ReactJs, Angular, and Vuejs. Try it out today and improve the quality of your code!",
                  "brand": {
                  "@type": "Brand",
                  "name": "Js Code Quicker"
                },
                  "offers": {
                  "@type": "Offer",
                  "price": "0.99",
                  "priceCurrency": "USD"
                }
              }
            `
          }}></script>
      </Head>
      <main className={styles.main}>

          <header className={styles.header}>
              JS<span style={{color: '#16A085', fontWeight: '900', letterSpacing: '2px'}}>Code</span>Quicker
          </header>
          <section className={styles.banner} dangerouslySetInnerHTML={{__html: BANNER_MESSAGE}} />
          <div className={styles.editors}>
              <CodeMirror
                  style={{fontSize:  '14px', border: '1px solid #16A085', borderRight: 'none'}}
                  basicSetup={true}
                  value={value}
                  width={'800px'}
                  minWidth={'800px'}
                  minHeight="500px"
                  height="100%"
                  extensions={[javascript({ typescript: false })]}
                  onChange={(val, viewUpdate) => {
                      setValue(val);
                  }}
                  theme="light"
              />
              <CodeMirror
                  editable={false}
                  style={{fontSize:  '14px', border: '1px solid #16A085'}}
                  basicSetup={true}
                  value={result}
                  width={'800px'}
                  minWidth={'800px'}
                  minHeight="500px"
                  height="100%"
                  extensions={[javascript({ typescript: false })]}
                  theme="light"
              />
              <div className={styles.buttonWrapper}>
                  {/*<button className={styles.cover} onClick={cover} disabled={coverInProgress || simplifyInProgress}>Cover</button>*/}
                  <button className={styles.simplify} onClick={simplify} disabled={coverInProgress || simplifyInProgress}>Refactor</button>
              </div>
          </div>
          <div className={styles.landing}>
              <h1>Test and Refactor Your Javascript Code with Ease - Automated Unit Testing and Refactoring Tools</h1>
              <h2>Overview</h2>
              <Paragraph defaultColor="#a3a4ad"
                         paragraphText="Looking to improve the quality of your Javascript code? Our website provides a comprehensive solution for testing and refactoring your code, with support for popular frameworks such as NodeJs, NestJs, Express, ReactJs, Angular, and Vuejs." />
              <h2>Features</h2>
              <h3>Refactoring Tools</h3>
              <Paragraph defaultColor="#a3a4ad"
                         className={styles.left}
                         paragraphText="Our refactoring tools help you improve the structure, readability, and maintainability of your code. With automated code analysis and suggestions for code improvements, you can easily refactor your code to make it more efficient and easier to maintain." />
              <h3>Support for Popular Frameworks</h3>
              <Paragraph defaultColor="#a3a4ad"
                         className={styles.right}
                         paragraphText="Our platform is designed to support all popular Javascript frameworks, making it easy to integrate into your existing projects. Whether you're working with NodeJs, NestJs, Express, ReactJs, Angular, Vuejs or any other framework, our platform has got you covered." />
              <h2>Benefits</h2>
              <h3>Save Time and Money</h3>
              <Paragraph defaultColor="#a3a4ad"
                         className={styles.left}
                         paragraphText="By automating your refactoring processes, you can save valuable time and money on manual testing and code reviews. With our platform, you can quickly identify and fix issues before they cause problems in production, minimizing downtime and reducing development costs." />
              <h3>Improve Code Quality</h3>
              <Paragraph defaultColor="#a3a4ad"
                         className={styles.right}
                         paragraphText="Our automated refactoring tools help you improve the quality of your code. By increasing your code coverage and making your code more readable and maintainable, you can reduce bugs and errors, leading to a more stable and reliable application." />
              <h2>Get Started Today</h2>
              <Paragraph defaultColor="#a3a4ad"
                         className={styles}
                         paragraphText="Ready to take your Javascript code to the next level? Sign up for our platform today and start automating your testing and refactoring processes. With support for all popular frameworks and a user-friendly interface, our platform makes it easy to improve the quality of your code and deliver better applications. Try it out today!" />
          </div>
      </main>
    </>
  )
}
