import Link from "next/link";
import {useRouter} from "next/router";
import styles from "../../styles/Home.module.scss";
import Logo from "../logo/Logo";

export default function Layout({children}){
    const router = useRouter();
  
    return (
        <>
            <div className="wrapper">
                <nav className={styles.nav}>
                    <Link href="/">
                        <a className={styles.logo}><Logo/></a>
                    </Link>
                    <Link href="/accomodations">
                        <a className={router.pathname == "/accomodations" ? "active" : ""}>Accomodations</a>
                    </Link>
                    <Link href="/contact">
                        <a>Contact</a>
                    </Link>
                    <input placeholder="Search" className={styles.search}/>
                </nav>
                {children}
            </div>
            <footer className={styles.footer}>
                <div className={styles.footerDiv}>
                    <p>Holidaze</p>
                    <p>Copyright 2022</p>
                </div>
                <div>
                <Link href="adminLogin">
                    <a>Admin</a>
                </Link>
                </div>
            </footer>
        </>
    )
}

// const { pathname } = document.location;

// const adminLogin = a function;

// let adminLink = `<Link href="/admin" className="${pathname === "/admin" ? "active" : ""}">Log Out</Link>`


// export default function menu(){
//     const { pathname } = document.location;

//     const container = document.querySelector(".menu-container")

//     const username = getUser();

//     let logInLink = `<a href="login.html" class ="${pathname === "/login.html" ? "active" : ""}">Log in <a/>`;

//     if(username){
//         logInLink = `<span> Welcome ${username}!</span>`;
//     }

//     container.innerHTML = `<div class="menu">
//                                 <a href="/" class="${pathname === "/" ? "active" : ""}">Home</a>
//                                 ${logInLink}
//                             </div>`
// }