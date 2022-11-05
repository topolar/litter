import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button} from "@mui/material";
import {Layout} from "../components/layout/layout.component";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Litter Social</title>
        <meta name="description" content="Litter Social app experiment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          Helllo!
          <Button variant="contained">Text</Button>
      </main>
    </Layout>
  )
}
