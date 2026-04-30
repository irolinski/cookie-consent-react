import styles from "./page.module.css";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <div className={styles.page}>
        <main className={styles.main}></main>
      </div>
    </React.Fragment>
  );
}
