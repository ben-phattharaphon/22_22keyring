import styles from "./page.module.css";
import KeyringCanvas from "@/components/KeyringCanvas";
import UIControls from "@/components/UIControls";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.canvasContainer}>
        <KeyringCanvas />
      </div>

      <aside className={`${styles.uiPanel} glass-panel`}>
        <div className={styles.dragHandle} />
        <h1 className={styles.title}>22:22 Keyring</h1>
        <p className={styles.description}>
          Select colors and text for your 3D keyring.
        </p>

        <UIControls />
      </aside>
    </main>
  );
}
