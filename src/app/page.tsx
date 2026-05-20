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
        <h1 className={styles.title}>22:22 Keyring</h1>
        <p style={{ fontSize: 14, opacity: 0.7, textAlign: 'center', marginBottom: 12 }}>
          Select colors and text for your 3D keyring.
        </p>

        <UIControls />
      </aside>
    </main>
  );
}
