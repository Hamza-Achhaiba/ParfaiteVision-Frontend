import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  brand: string
  name: string
  price: number // unit price in MAD
  image: string
  quantity: number
  variant: string
}

interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  setDrawerOpen: (isOpen: boolean) => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [
        {
          id: "vue-moscot-miltzen",
          brand: "MOSCOT",
          name: "MILTZEN",
          price: 340, // 340 MAD * 2 = 680 MAD
          image: "/images/products/vue/moscot-zev-gold.jpg", // placeholder available image
          quantity: 2,
          variant: "Couleur: Écaille / Taille: 46"
        },
        {
          id: "vue-moscot-billik-brown",
          brand: "MOSCOT",
          name: "BILLIK",
          price: 340, // 340 MAD * 1 = 340 MAD
          image: "/images/products/vue/moscot-billik-brown.jpg", // placeholder available image
          quantity: 1,
          variant: "Couleur: Crystal / Taille: 47"
        }
      ],
      isDrawerOpen: false,
      addItem: (newItem) => set((state) => {
        const existingIndex = state.items.findIndex(
          (item) => item.id === newItem.id && item.variant === newItem.variant
        )
        if (existingIndex > -1) {
          const updatedItems = [...state.items]
          updatedItems[existingIndex].quantity += 1
          return { items: updatedItems }
        }
        return { items: [...state.items, { ...newItem, quantity: 1 }] }
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),
      updateQuantity: (id, delta) => set((state) => ({
        items: state.items.map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta
            return { ...item, quantity: Math.max(1, newQty) }
          }
          return item
        })
      })),
      clearCart: () => set({ items: [] }),
      setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen })
    }),
    {
      name: 'parfaite-vision-cart-storage',
      partialize: (state) => ({ items: state.items }) // only persist items array, not open/closed state
    }
  )
)
