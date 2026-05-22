'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Item = { n:string; p:number; qty:number; rubro:string }
type CarritoCtx = {
  items: Item[]
  addItem: (item: Omit<Item,'qty'>) => void
  updateItems: (items: Item[]) => void
  clearCarrito: () => void
  total: number
  cantidad: number
}

const Ctx = createContext<CarritoCtx>({items:[],addItem:()=>{},updateItems:()=>{},clearCarrito:()=>{},total:0,cantidad:0})

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([])
  const addItem = (item: Omit<Item,'qty'>) => {
    setItems(prev => {
      const ex = prev.find(x => x.n === item.n)
      if (ex) return prev.map(x => x.n === item.n ? {...x, qty: x.qty+1} : x)
      return [...prev, {...item, qty:1}]
    })
  }
  const updateItems = (items: Item[]) => setItems(items)
  const clearCarrito = () => setItems([])
  const total = items.reduce((a,i) => a+i.p*i.qty, 0)
  const cantidad = items.reduce((a,i) => a+i.qty, 0)
  return <Ctx.Provider value={{items,addItem,updateItems,clearCarrito,total,cantidad}}>{children}</Ctx.Provider>
}

export const useCarrito = () => useContext(Ctx)
