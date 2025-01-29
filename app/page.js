import styles from "./page.module.css";

export default function Home() {
  return (
      <div className={styles.page}>
        {/* <Events />
        <EventTypes /> */}
        <ol>
          <li>
            Get started by editing <code>app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
      </div>
  );
}
