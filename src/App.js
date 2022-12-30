import { Library } from "./components/Library/Library";
import { AppProvider } from "./App.context";

import styles from "./App.module.scss";

function App() {
  return (
    <AppProvider>
      <div className={styles.app}>
        <Library />
      </div>
    </AppProvider>
  );
}

export default App;
