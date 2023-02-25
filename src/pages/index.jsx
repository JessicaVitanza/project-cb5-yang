import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Login from "@/Login/Login";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { applicationContext } from "@/store/state";

import { BsPlayCircle } from "react-icons/bs";
import styles from "@/styles/Home.module.scss";

export default function Home({ dataArtist, dataTracks, dataAlbums }) {
  const { dispatch } = useContext(applicationContext);
  const router = useRouter();
  const [logged, setLogged] = useState(false);

  {
    useEffect(() => {
      if (localStorage.getItem("logged") != null) {
        setLogged(true);
      }
    }, []);

    useEffect(() => {
      if (router.asPath === "/#") {
        dispatch({ type: "active", payload: router.asPath });
      }
    }, [router.asPath]);

    return (
      <>
        <Head>
          <title>YANGIFY - Music Web App</title>
          <meta name="description" content="YANGIFY - Music Web App" />
          <meta name="author" content="Giulio Simone Floresta, Dario Purpi, Jessica Vitanza, Anastasia Tyurikova"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="../public/favicon.ico" />
        </Head>
        {logged ? (
          <main className={styles.main}>
            <div className={styles.Homepage}>
              <section className={styles.topContent}>
                <div className={styles.header}>
                  <Link href={"/top_artist"}>
                    <h2>Top Artists</h2>
                  </Link>

                  <Link href={"/top_artist"}>
                    <h5>See all</h5>
                  </Link>
                </div>

                <div className={styles.container_Content}>
                  {dataArtist?.data.map((artist) => (
                    <Link
                      href={`/single_artist/${artist.id}`}
                      as={`/single_artist/${artist.id}`}
                      key={artist.id}
                    >
                      <Image
                        src={artist.picture_big}
                        width={200}
                        height={200}
                        alt={artist.name}
                      />
                      <h5>{artist.name}</h5>
                    </Link>
                  ))}
                </div>
              </section>

              <section className={styles.topContent}>
                <div className={styles.header}>
                  <Link href={"/top_track"}>
                    <h2>Top Tracks</h2>
                  </Link>
                  <Link href={"/top_track"}>
                    <h5>See all</h5>
                  </Link>
                </div>
                <div className={styles.container_Content}>
                  {dataTracks?.data.map((track) => (
                    <div className={styles.contentTopTrack} key={track.id}>
                      <Link
                        href={`/single_track/${track.id}`}
                        as={`/single_track/${track.id}`}
                      >
                        <Image
                          src={track.album.cover_medium}
                          width={200}
                          height={200}
                          alt={track.title}
                        />
                        <BsPlayCircle className={styles.icon} />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.topContent}>
                <div className={styles.header}>
                  <Link href={"/top_album"}>
                    <h2>Top Albums</h2>
                  </Link>
                  <Link href={"/top_album"}>
                    <h5>See all</h5>
                  </Link>
                </div>
                <div className={styles.container_Content}>
                  {dataAlbums?.data.map((artist) => (
                    <Link
                      href={`/single_album/${artist.id}`}
                      as={`/single_album/${artist.id}`}
                      key={artist.id}
                    >
                      <Image
                        src={artist.cover_medium}
                        width={200}
                        height={200}
                        alt={artist.artist.name}
                        className={styles.imgTopAlbum}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </main>
        ) : null}
      </>
    );
  }
}

export async function getServerSideProps() {
  const resArtist = await fetch("https://api.deezer.com/chart/0/artists");
  const resTracks = await fetch("https://api.deezer.com/chart/0/tracks");
  const resAlbums = await fetch("https://api.deezer.com/chart/0/albums");

  const dataArtist = await resArtist.json();
  const dataTracks = await resTracks.json();
  const dataAlbums = await resAlbums.json();

  return {
    props: {
      dataArtist,
      dataTracks,
      dataAlbums,
    },
  };
}
