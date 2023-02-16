import Link from "next/link"
import Image from "next/image"
import { MdArrowBackIos } from 'react-icons/md';
import styles from "./top_album/styles.module.scss"
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const Top_Album = ({data}) => {

  return (
    <>
    < Header />
    <Link className={styles.Back} href={"/"}><MdArrowBackIos /> ALL ALBUMS</Link>
    <div className={styles.TopAlbum}>
       
        {data?.data
        .map((album) => (
            <div className={styles.container_Content}>
                <Image 
                src={album.cover_medium}
                width={200}
                height={200}
                alt={album.name}
                />
                <div className={styles.infoAlbum}>
                    <h2>{album.title}</h2>
                    <div className={styles.subInfoAlbum}>
                        <span>{album.artist.name}</span>
                        <span>Position: {album.position}</span>
                    </div>
                </div>
                <Link className={styles.seeAll} href={`/single_album/${album.id}`} as={`/single_album/${album.id}`}><span>See Details</span></Link>
            </div>
          ))}
    </div>
    < Navbar />
    </>
  )
}

export default Top_Album

export async function getServerSideProps() {
    const res = await fetch('https://api.deezer.com/chart/0/albums');
  
    const data = await res.json();
  
    return { 
      props: 
      { 
        data
      } 
    };
  }
  