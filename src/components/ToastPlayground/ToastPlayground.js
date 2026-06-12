import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf/ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");
  const [toasts, setToasts] = React.useState([]);

  function handleDismiss(id) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />

      <form
        className={styles.controlsWrapper}
        onSubmit={(event) => {
          event.preventDefault();

          const freshToasts = [
            ...toasts,
            { variant: variant, message: message, id: crypto.randomUUID() },
          ];

          setToasts(freshToasts);
          setMessage("");
          setVariant("notice");

          console.log(freshToasts);
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              let id = `variant-${option}`;
              return (
                <label htmlFor={id} key={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    checked={variant === option}
                    value={option}
                    onChange={(e) => {
                      setVariant(e.target.value);
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
