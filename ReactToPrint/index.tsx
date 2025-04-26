import React from "react"
import styles from './printable.module.css'

const PrintableContainer = React.forwardRef(({ children,customHeader }: { children: React.ReactNode , customHeader?: () => React.ReactNode }, ref:any) => {
  return (
    <div ref={ref} className={styles.printable_container}>
      <div className={styles.printable} >
        {customHeader?.()}
      </div>
      {children}
    </div>
  )
})

export default PrintableContainer