import styles from "./App.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useRef } from "react";
import Chat from "./Components/Chat/Chat";
import LeftPage from "./Components/Display/Display";
import History from "./Components/History/History";

function App() {
  // show history column
  const [showHistory, setShowHistory] = useState(false);
  const [amazon, setAmazon] = useState([
    // [
    //   [
    //     {
    //       url: "https://www.amazon.ca/",
    //       title: "Lovely Cat",
    //       description: "",
    //       asin: 0,
    //     },
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 1,
    //     },
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 2,
    //     },
    //   ],
    //   [
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 3,
    //     },
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 4,
    //     },
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 5,
    //     },
    //   ],
    //   [
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 6,
    //     },
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 7,
    //     },
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 8,
    //     },
    //   ],
    // ],
    // [
    //   [
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 9,
    //     },
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 10,
    //     },
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 11,
    //     },
    //   ],
    //   [
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 12,
    //     },
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 13,
    //     },
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 14,
    //     },
    //   ],
    //   [
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 15,
    //     },
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 16,
    //     },
    //     {
    //       url: "https://google.ca",
    //       title: "Cute Cat",
    //       description: "",
    //       asin: 17,
    //     },
    //   ],
    // ],
  ]);
  const [ebay, setEbay] = useState([]);
  const containerRef = useRef(null);
  const toggleHistory = () => {
    const gridTemplateColumns = window.getComputedStyle(
      containerRef.current
    ).gridTemplateColumns;
    // slide out
    if (gridTemplateColumns.slice(gridTemplateColumns.length - 4) === "10px") {
      setShowHistory(true);
      containerRef.current.style.gridTemplateColumns = "1fr 35% 250px";
      // slide in
    } else {
      setShowHistory(false);
      containerRef.current.style.gridTemplateColumns = "1fr 35% 10px";
    }
  };

  return (
    <div style={{ width: "100vw" }}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.display}>
          <LeftPage amazon={amazon} />
        </div>
        <div className={styles.chat}>
          <Chat
            amazon={amazon}
            setAmazon={setAmazon}
            ebay={ebay}
            setEbay={setEbay}
          />
        </div>
        <div className={styles.history}>
          <div className={styles.squareButton} onClick={toggleHistory}>
            {showHistory ? (
              <FaArrowRight color="white" />
            ) : (
              <FaArrowLeft color="white" />
            )}
          </div>
          <History />
        </div>
      </div>
    </div>
  );
}

export default App;
