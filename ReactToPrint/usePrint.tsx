import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import PrintableContainer from "."

export default function usePrint({ customHeader }: { customHeader?: () => React.ReactNode }) {
    const printRef = useRef()

    const handlePrint = useReactToPrint({
        contentRef: printRef
    })

    const Container = ({ children }: { children: React.ReactNode }) => {
        return <PrintableContainer ref={printRef} customHeader={customHeader}>
            {children}
        </PrintableContainer>
    }

    return {
        handlePrint,
        Container
    }
}
