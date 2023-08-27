import React, { useEffect, useState } from "react";
import styles from "./Display.module.css";
import ItemDescription from "../ItemDescription/ItemDescription";

const LeftPage = ({ amazon }) => {
  let iniBooleans = {};

  useEffect(() => {
    for (let i = 0; i < amazon.length; i++) {
      for (let j = 0; j < amazon[i].length; j++) {
        for (let k = 0; k < amazon[i][j].length; k++) {
          iniBooleans[amazon[i][j][k].asin] = false;
        }
      }
    }
  }, [amazon]);

  const [showItemDescription, setShowItemDescription] = useState(iniBooleans);
  console.log(showItemDescription);
  return (
    <div className={styles.leftpage}>
      <div className={styles.logo}>
        <img src="../../logo.png" alt="Item Image" />
        <h2 className={styles.title}>Chat2Cart</h2>
      </div>
      <div className={styles.contentcontainer}>
        {amazon &&
          amazon?.map((query, queryInd) => {
            return (
              <div key={queryInd} className={styles.query}>
                {query?.map((keyword, keywordInd) => {
                  return (
                    <div key={keywordInd} className={styles.keyword}>
                      {keyword?.map((item, itemInd) => {
                        return (
                          <div key={itemInd} className={styles.item}>
                            <h1>{`${item.price}`}</h1>
                            <img src="https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288883.jpg?w=2000"></img>

                            <button
                              className={styles.button1}
                              onClick={() => {
                                setShowItemDescription({
                                  ...iniBooleans,
                                  [item.asin]: true,
                                });
                              }}
                            >
                              View Item Description
                            </button>
                            {showItemDescription[item.asin] && (
                              <ItemDescription
                                item={item}
                                iniBooleans={iniBooleans}
                                setShowItemDescription={setShowItemDescription}
                                ind={itemInd}
                                showItemDescription={showItemDescription}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      <div className={styles.blackblock}>
        <pre>
          © 2023. Revolutionizing your shopping experience. Through friendly
          chats, ChatGPT understands your product preferences and suggests top
          Amazon recommendations using our advanced recommendation system.
        </pre>
      </div>
    </div>
  );
};

export default LeftPage;
