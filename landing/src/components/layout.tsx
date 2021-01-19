import React from "react"
import styles from "./layout.module.css"

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <div className={styles.layout}>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
