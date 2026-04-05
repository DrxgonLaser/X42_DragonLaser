import { createContext, useContext, useState } from 'react'

const CursorContext = createContext({
  cursorVariant: 'default',
  cursorText: '',
  enterElement: () => {},
  leaveElement: () => {}
})

export function useCursor() {
  return useContext(CursorContext)
}

export function CursorProvider({ children }) {
  const [cursorVariant, setCursorVariant] = useState('default')
  const [cursorText, setCursorText] = useState('')

  const enterElement = (variant, text = '') => {
    setCursorVariant(variant)
    if (text) setCursorText(text)
  }

  const leaveElement = () => {
    setCursorVariant('default')
    setCursorText('')
  }

  return (
    <CursorContext.Provider value={{ cursorVariant, cursorText, enterElement, leaveElement }}>
      {children}
    </CursorContext.Provider>
  )
}
