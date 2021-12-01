import Head from 'next/head'
import styles from './Layout.module.css'

const Layout = ({children, title = 'Rest Countries'}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>Rest Countries</header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Muhammad Azri @ BASF Coding Challenge</footer>
    </div>
  );
  
};

export default Layout;
