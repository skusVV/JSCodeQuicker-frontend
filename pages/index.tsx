import Head from 'next/head'
import React from 'react';
import styles from '@/styles/Home.module.css'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Paragraph } from "./Paragraph";

export default function Home() {
    const [value, setValue] = React.useState('');
    const [result, setResult] = React.useState('');
    const [coverInProgress, setCoverInProgress] = React.useState(false);
    const [simplifyInProgress, setSimplifyInProgress] = React.useState(false);
    const cover = async () => {
        setCoverInProgress(true);
        setResult('');
        const body = JSON.stringify({ content: decodeURIComponent(value), rulesType: 'testCoverage'});
        fetch('http://localhost:3003/api/v1/test-coverage', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
            .then((response) => response.json())
            .then((data) => {
                // setTimeout(() => {
                    setResult(data.content);
                    setCoverInProgress(false);
                // }, 4000)

            });
    }
    const simplify = () => {
        setSimplifyInProgress(true);
        setResult('');
        const body = JSON.stringify({ content: decodeURIComponent(value), rulesType: 'simplifyCode'});

        fetch('http://localhost:3003/api/v1/test-coverage', {
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
          <meta name="description" content="Our platform provides a comprehensive solution for testing and refactoring your Javascript code, with support for popular frameworks such as NodeJs, NestJs, Express, ReactJs, Angular, and Vuejs. Try it out today and improve the quality of your code!" />
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
                  "description": "Our platform provides a comprehensive solution for testing and refactoring your Javascript code, with support for popular frameworks such as NodeJs, NestJs, Express, ReactJs, Angular, and Vuejs. Try it out today and improve the quality of your code!",
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
          <div className={styles.editors}>
              <CodeMirror
                  style={{fontSize:  '14px', border: '1px solid #16A085', borderRight: 'none'}}
                  basicSetup={true}
                  value={value}
                  width={'800px'}
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
                  minHeight="500px"
                  height="auto"
                  extensions={[javascript({ typescript: false })]}
                  theme="light"
              />
              <div className={styles.buttonWrapper}>
                  <button className={styles.cover} onClick={cover} disabled={coverInProgress || simplifyInProgress}>Cover</button>
                  <button className={styles.simplify} onClick={simplify} disabled={coverInProgress || simplifyInProgress}>Simplify</button>
              </div>
          </div>
          <div className={styles.landing}>
              <h1>Test and Refactor Your Javascript Code with Ease - Automated Unit Testing and Refactoring Tools</h1>
              <h2>Overview</h2>
              <Paragraph defaultColor="#a3a4ad"
                         paragraphText="Looking to improve the quality of your Javascript code? Our website provides a comprehensive solution for testing and refactoring your code, with support for popular frameworks such as NodeJs, NestJs, Express, ReactJs, Angular, and Vuejs." />
              <h2>Features</h2>
              <h3>Automated Unit Testing</h3>
              <Paragraph defaultColor="#a3a4ad"
                         className={styles.right}
                         paragraphText="Our platform allows you to easily create and run automated unit tests for your Javascript code. With detailed test reports and code coverage analysis, you can quickly identify and fix bugs before they cause problems in production." />
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
                         paragraphText="By automating your testing and refactoring processes, you can save valuable time and money on manual testing and code reviews. With our platform, you can quickly identify and fix issues before they cause problems in production, minimizing downtime and reducing development costs." />
              <h3>Improve Code Quality</h3>
              <Paragraph defaultColor="#a3a4ad"
                         className={styles.right}
                         paragraphText="Our automated testing and refactoring tools help you improve the quality of your code. By increasing your code coverage and making your code more readable and maintainable, you can reduce bugs and errors, leading to a more stable and reliable application." />
              <h2>Get Started Today</h2>
              <Paragraph defaultColor="#a3a4ad"
                         className={styles}
                         paragraphText="Ready to take your Javascript code to the next level? Sign up for our platform today and start automating your testing and refactoring processes. With support for all popular frameworks and a user-friendly interface, our platform makes it easy to improve the quality of your code and deliver better applications. Try it out today!" />
              <Paragraph defaultColor="#a3a4ad"
                         className={styles}
                         paragraphText="Tags: automated testing, refactoring tools, unit testing, code coverage, popular frameworks, NodeJs, NestJs, Express, ReactJs, Angular, Vuejs, SEO-friendly, code analysis, code improvements, development costs, stability, reliability" />
          </div>
      </main>
    </>
  )
}
