import Head from "next/head";
import Login from "@/Login/Login";
import { applicationContext, initialState } from "@/store/state";
import { useReducer } from "react";
import { loginReducer } from "@/store/loginReducer";

import styles from "@/styles/Home.module.scss";
import Prova from "@/components/Prova";
import SearchPage from "./searchPage";

export default function Home() {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  for (let i = 0; i < state.login.length; i++) {
    if (state.login[i].logged === false) {
      return (
        <applicationContext.Provider value={{ state, dispatch }}>
          <Login />
          <SearchPage />
        </applicationContext.Provider>
      );
    }
  }

  return (
    <>
      <Head>
        <title>project-cb5-yang</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <applicationContext.Provider value={{ state, dispatch }}>
          <Prova />
        </applicationContext.Provider>
      </main>
    </>
  );
}
