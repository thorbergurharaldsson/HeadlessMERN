import { useState, useEffect } from "react";
import ClientOnlyPortal from "./ClientOnlyPortal";

import style from "../styles/components/LoadingScreen.module.scss";

export default function LoadingScreen({ loading }) {
  const [loadingClass, setLoadingClass] = useState();

  useEffect(() => {
    if (loading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [loading]);

  function hideLoading() {
    setLoadingClass(`${style.active}`);
    setTimeout(() => {
      setLoadingClass(null);
    }, 300);
  }

  function showLoading() {
    setLoadingClass(`${style.active}`);
    setTimeout(() => {
      setLoadingClass(`${style.active} ${style.visible}`);
    }, 10);
  }

  return (
    <ClientOnlyPortal selector="#loading-screen">
      <div className={`${style.background} ${loadingClass}`}>
        <span>
          <i>⏳</i>
        </span>
      </div>
      <style jsx>{`
        :global(body) {
          overflow: hidden;
        }
      `}</style>
    </ClientOnlyPortal>
  );
}
