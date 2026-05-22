"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, ChevronDown, Menu, X, User } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { CartDrawer } from "@/components/CartDrawer"

interface NavSubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  isDropdown: boolean;
  dropdownType?: "lunettes" | "services" | "histoire" | "contact" | "rdv";
  subItems?: NavSubItem[];
}

const megaMenuChapters = [
  {
    image: "/images/fondation-2010.png",
    year: "2010",
    title: "La fondation",
    text: "Parfaite Vision ouvre ses portes dans la médina d'Essaouira, avec la passion de bien voir.",
  },
  {
    image: "/images/marques-2014.png",
    year: "2014",
    title: "Les grandes marques",
    text: "L'arrivée des collections Ray-Ban, Moscot, Dior et Tom Ford dans notre boutique.",
  },
  {
    image: "/images/digital-2018.png",
    year: "2018",
    title: "L'ère digitale",
    text: "L'atelier se modernise avec des équipements de pointe pour des mesures d'une précision absolue.",
  },
  {
    image: "/images/atelier-2022.png",
    year: "2022",
    title: "L'atelier",
    text: "Création de notre propre espace de personnalisation et de montage sur-mesure.",
  },
]

const navItems: NavItem[] = [
  {
    label: "Lunettes",
    href: "/lunettes",
    isDropdown: true,
    dropdownType: "lunettes",
    subItems: [
      { label: "Lunettes de vue", href: "/lunettes?category=vue" },
      { label: "Lunettes de soleil", href: "/lunettes?category=solaires" },
      { label: "Lentilles", href: "/lunettes?category=lentilles" },
      { label: "Lunettes enfant", href: "/lunettes?category=enfant" },
    ]
  },
  {
    label: "Services",
    href: "/#services",
    isDropdown: true,
    dropdownType: "services",
    subItems: [
      { label: "Examen de vue", href: "/#services" },
      { label: "Conseil personnalisé", href: "/#services" },
      { label: "Réparation", href: "/#services" },
    ]
  },
  {
    label: "Histoire",
    href: "/a-propos",
    isDropdown: true,
    dropdownType: "histoire",
    subItems: [
      { label: "2010 - La fondation", href: "/a-propos" },
      { label: "2014 - Les grandes marques", href: "/a-propos" },
      { label: "2018 - L'ère digitale", href: "/a-propos" },
      { label: "2022 - L'atelier", href: "/a-propos" },
    ]
  },
  {
    label: "Contact",
    href: "/contact",
    isDropdown: true,
    dropdownType: "contact",
    subItems: [
      { label: "Nous trouver", href: "/contact" },
      { label: "Horaires", href: "/contact" },
      { label: "Téléphone", href: "tel:+212524475555" },
    ]
  },
  {
    label: "RDV",
    href: "/rendez-vous",
    isDropdown: true,
    dropdownType: "rdv",
    subItems: [
      { label: "Prendre rendez-vous", href: "/rendez-vous" },
      { label: "Mes rendez-vous", href: "/rendez-vous" },
    ]
  }
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { setDrawerOpen, items } = useCart()
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-[100] bg-[#C8956B] h-20 transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl tracking-wide text-primary-foreground hover:opacity-90 transition-opacity">
          Parfaite Vision
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-stretch gap-8 h-full">
          {navItems.map((item) => {
            if (item.isDropdown) {
              return <HeaderDropdown key={item.label} item={item} />
            }
            return (
              <div key={item.label} className="h-full flex items-center">
                <Link
                  href={item.href}
                  className="relative text-sm text-primary-foreground uppercase tracking-wider font-medium py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.label}
                </Link>
              </div>
            )
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          <Link href="/compte" className="p-2 hover:opacity-70 transition-opacity" aria-label="Mon compte">
            <User className="w-5 h-5 text-primary-foreground" />
          </Link>

          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 hover:opacity-70 transition-opacity relative border-none bg-transparent cursor-pointer"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#B56E3A] text-white text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold select-none leading-none">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="p-2 hover:opacity-70 transition-opacity md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu principal"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-primary-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-primary-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#C8956B] border-t border-primary-foreground/10
          ${isMobileMenuOpen ? "max-h-[85vh] opacity-100 py-4" : "max-h-0 opacity-0 py-0 pointer-events-none"}`}
      >
        <div className="px-6 space-y-4">
          {navItems.map((item) => {
            if (item.isDropdown) {
              return (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              )
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-primary-foreground uppercase tracking-wider font-semibold text-sm border-b border-primary-foreground/10 last:border-b-0"
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
      <CartDrawer />
    </header>
  )
}

function HeaderDropdown({ item }: { item: NavItem }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined

    if (isHovered) {
      // 1. OPEN sequence: First open container, then stagger show text
      setIsOpen(true)
      timeoutId = setTimeout(() => {
        setShowText(true)
      }, 300) // matches container expand duration
    } else {
      // 2. CLOSE sequence: First hide text instantly, then collapse container
      setShowText(false)
      timeoutId = setTimeout(() => {
        setIsOpen(false)
      }, 100) // matches text fade duration
    }

    return () => clearTimeout(timeoutId)
  }, [isHovered])

  // 'histoire' (mega-menu) spans the full header width, so its wrapper must NOT be relative.
  const wrapperClass = item.dropdownType === "histoire"
    ? "h-full flex items-center"
    : "relative h-full flex items-center"

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={wrapperClass}
    >
      <Link
        href={item.href}
        onClick={() => setIsHovered(false)}
        className="flex items-center gap-1 text-sm text-primary-foreground uppercase tracking-wider font-medium py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300"
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ease-out ${isHovered ? "rotate-180" : ""}`} />
      </Link>

      {/* Lunettes Dropdown: w-[500px], 2x2 grid (renders 4 items) */}
      {item.dropdownType === "lunettes" && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 bg-background border border-border shadow-xl z-50 rounded-none overflow-hidden transition-all
            ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          style={{ transitionDuration: isOpen ? "300ms" : "200ms" }}
        >
          {/* Bridge overlay inside container */}
          <div className="absolute -top-10 left-0 right-0 h-10 bg-transparent" />
          <div
            className={`grid overflow-hidden transition-[grid-template-rows]
              ${isOpen
                ? "grid-rows-[1fr] ease-out duration-300"
                : "grid-rows-[0fr] ease-in duration-200"}`}
          >
            <div className="overflow-hidden w-[500px] p-8">
              <div className="grid grid-cols-2 gap-6">
                {item.subItems?.map((subItem, index) => {
                  const itemClass = `transition-all ${
                    showText
                      ? "opacity-100 translate-y-0 duration-[250ms] ease-out"
                      : "opacity-0 -translate-y-[15px] duration-[100ms] ease-in"
                  }`
                  const itemStyle = {
                    transitionDelay: showText ? `${index * 50}ms` : "0ms",
                  }
                  return (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      onClick={() => setIsHovered(false)}
                      className={`group block text-center py-6 border border-border hover:border-primary bg-background hover:bg-[#F5F3EE]/30 rounded-none ${itemClass}`}
                      style={itemStyle}
                    >
                      <span className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground/80 group-hover:text-primary transition-colors duration-300 font-sans">
                        {subItem.label}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Dropdown: w-[350px], vertical list */}
      {item.dropdownType === "services" && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 bg-background border border-border shadow-xl z-50 rounded-none overflow-hidden transition-all
            ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          style={{ transitionDuration: isOpen ? "300ms" : "200ms" }}
        >
          {/* Bridge overlay inside container */}
          <div className="absolute -top-10 left-0 right-0 h-10 bg-transparent" />
          <div
            className={`grid overflow-hidden transition-[grid-template-rows]
              ${isOpen
                ? "grid-rows-[1fr] ease-out duration-300"
                : "grid-rows-[0fr] ease-in duration-200"}`}
          >
            <div className="overflow-hidden w-[350px] p-8">
              <div className="flex flex-col space-y-4">
                {item.subItems?.map((subItem, index) => {
                  const itemClass = `transition-all ${
                    showText
                      ? "opacity-100 translate-y-0 duration-[250ms] ease-out"
                      : "opacity-0 -translate-y-[15px] duration-[100ms] ease-in"
                  }`
                  const itemStyle = {
                    transitionDelay: showText ? `${index * 50}ms` : "0ms",
                  }
                  return (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      onClick={() => setIsHovered(false)}
                      className={`group flex items-center justify-between py-3 border-b border-border/60 hover:border-primary ${itemClass}`}
                      style={itemStyle}
                    >
                      <span className="text-sm uppercase tracking-wider font-medium text-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1">
                        {subItem.label}
                      </span>
                      <span className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 font-serif">
                        →
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Histoire Dropdown: Centered Spanning mega-menu with images */}
      {item.dropdownType === "histoire" && (
        <div
          className={`absolute top-full left-0 right-0 w-full max-w-5xl mx-auto bg-background border border-border shadow-xl z-50 rounded-none overflow-hidden transition-all
            ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          style={{ transitionDuration: isOpen ? "300ms" : "200ms" }}
        >
          {/* Bridge overlay inside container */}
          <div className="absolute -top-10 left-0 right-0 h-10 bg-transparent" />
          <div
            className={`grid overflow-hidden transition-[grid-template-rows]
              ${isOpen
                ? "grid-rows-[1fr] ease-out duration-300"
                : "grid-rows-[0fr] ease-in duration-200"}`}
          >
            <div className="overflow-hidden p-10">
              <div className="grid grid-cols-4 gap-8">
                {megaMenuChapters.map((chapter, index) => {
                  const itemClass = `transition-all ${
                    showText
                      ? "opacity-100 translate-y-0 duration-[250ms] ease-out"
                      : "opacity-0 -translate-y-[15px] duration-[100ms] ease-in"
                  }`
                  const itemStyle = {
                    transitionDelay: showText ? `${index * 50}ms` : "0ms",
                  }
                  return (
                    <Link
                      key={chapter.year}
                      href="/a-propos"
                      onClick={() => setIsHovered(false)}
                      className={`group block space-y-3 ${itemClass}`}
                      style={itemStyle}
                    >
                      {/* Image Card with overflow-hidden and copper hover overlay */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted rounded-none">
                        <Image
                          src={chapter.image}
                          alt={chapter.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        {/* Subtle Copper Overlay */}
                        <div className="absolute inset-0 bg-[#B56E3A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      </div>
                      
                      {/* Text Details */}
                      <div className="space-y-1 text-left">
                        <span className="block text-[#B56E3A] font-serif text-lg font-medium">
                          {chapter.year}
                        </span>
                        <h4 className="font-serif text-base font-bold text-foreground group-hover:text-[#B56E3A] transition-colors duration-300">
                          {chapter.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {chapter.text}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Dropdown: w-[300px], vertical list */}
      {item.dropdownType === "contact" && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 bg-background border border-border shadow-xl z-50 rounded-none overflow-hidden transition-all
            ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          style={{ transitionDuration: isOpen ? "300ms" : "200ms" }}
        >
          {/* Bridge overlay inside container */}
          <div className="absolute -top-10 left-0 right-0 h-10 bg-transparent" />
          <div
            className={`grid overflow-hidden transition-[grid-template-rows]
              ${isOpen
                ? "grid-rows-[1fr] ease-out duration-300"
                : "grid-rows-[0fr] ease-in duration-200"}`}
          >
            <div className="overflow-hidden w-[300px] p-8">
              <div className="flex flex-col space-y-4">
                {item.subItems?.map((subItem, index) => {
                  const itemClass = `transition-all ${
                    showText
                      ? "opacity-100 translate-y-0 duration-[250ms] ease-out"
                      : "opacity-0 -translate-y-[15px] duration-[100ms] ease-in"
                  }`
                  const itemStyle = {
                    transitionDelay: showText ? `${index * 50}ms` : "0ms",
                  }
                  return (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      onClick={() => setIsHovered(false)}
                      className={`group flex items-center justify-between py-3 border-b border-border/60 hover:border-primary ${itemClass}`}
                      style={itemStyle}
                    >
                      <span className="text-sm uppercase tracking-wider font-medium text-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1">
                        {subItem.label}
                      </span>
                      <span className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 font-serif">
                        →
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RDV Dropdown: w-[300px], vertical list */}
      {item.dropdownType === "rdv" && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 bg-background border border-border shadow-xl z-50 rounded-none overflow-hidden transition-all
            ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          style={{ transitionDuration: isOpen ? "300ms" : "200ms" }}
        >
          {/* Bridge overlay inside container */}
          <div className="absolute -top-10 left-0 right-0 h-10 bg-transparent" />
          <div
            className={`grid overflow-hidden transition-[grid-template-rows]
              ${isOpen
                ? "grid-rows-[1fr] ease-out duration-300"
                : "grid-rows-[0fr] ease-in duration-200"}`}
          >
            <div className="overflow-hidden w-[300px] p-8">
              <div className="flex flex-col space-y-4">
                {item.subItems?.map((subItem, index) => {
                  const itemClass = `transition-all ${
                    showText
                      ? "opacity-100 translate-y-0 duration-[250ms] ease-out"
                      : "opacity-0 -translate-y-[15px] duration-[100ms] ease-in"
                  }`
                  const itemStyle = {
                    transitionDelay: showText ? `${index * 50}ms` : "0ms",
                  }
                  return (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      onClick={() => setIsHovered(false)}
                      className={`group flex items-center justify-between py-3 border-b border-border/60 hover:border-primary ${itemClass}`}
                      style={itemStyle}
                    >
                      <span className="text-sm uppercase tracking-wider font-medium text-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1">
                        {subItem.label}
                      </span>
                      <span className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 font-serif">
                        →
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MobileNavItem({
  item,
  onClose
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-primary-foreground/10 pb-3 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-primary-foreground uppercase tracking-wider font-semibold text-sm"
      >
        <span>{item.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out overflow-hidden
          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden pl-4 pr-2 pt-2 space-y-3">
          {/* Direct link option to the main section/page */}
          <Link
            href={item.href}
            onClick={onClose}
            className="block text-xs uppercase tracking-wider font-semibold text-primary-foreground/70 hover:text-primary-foreground py-1 border-b border-primary-foreground/5"
          >
            Découvrir {item.label}
          </Link>

          {item.dropdownType === "histoire" ? (
            megaMenuChapters.map((chapter) => (
              <Link
                key={chapter.title}
                href="/a-propos"
                onClick={onClose}
                className="block text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors py-1"
              >
                {chapter.year} - {chapter.title}
              </Link>
            ))
          ) : (
            item.subItems?.map((subItem) => (
              <Link
                key={subItem.label}
                href={subItem.href}
                onClick={onClose}
                className="block text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors py-1"
              >
                {subItem.label}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
