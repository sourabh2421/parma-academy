import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const defaultTabs = [
  { label: 'Home', href: '/icse-school-in-ayodhya' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Admission', href: '/admission-ayodhya' },
  { label: 'Staff', href: '/staff' },
  { label: 'Fees', href: '/fees' },
  { label: 'Contact', href: '/contact-ayodhya' },
]

export const SlideTabs = ({ tabs = defaultTabs }) => {
  const location = useLocation()
  const navigate = useNavigate()

  // Find index of current route or default to 0
  const activeIndex = tabs.findIndex((tab) => tab.href === location.pathname)
  const [selected, setSelected] = useState(activeIndex >= 0 ? activeIndex : 0)

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })
  const tabsRef = useRef([])

  // Keep selected tab in sync with current URL location
  useEffect(() => {
    const newIdx = tabs.findIndex((tab) => tab.href === location.pathname)
    if (newIdx >= 0) {
      setSelected(newIdx)
    }
  }, [location.pathname, tabs])

  useLayoutEffect(() => {
    const selectedTab = tabsRef.current[selected]
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect()
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      })
    }
  }, [selected])

  const handleSelect = (index, href) => {
    setSelected(index)
    if (href) {
      navigate(href)
    }
  }

  return (
    <ul
      onMouseLeave={() => {
        const selectedTab = tabsRef.current[selected]
        if (selectedTab) {
          const { width } = selectedTab.getBoundingClientRect()
          setPosition({
            left: selectedTab.offsetLeft,
            width,
            opacity: 1,
          })
        }
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-emerald-600/30 bg-slate-100 p-1 dark:border-emerald-500/40 dark:bg-neutral-800"
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab.label}
          ref={(el) => (tabsRef.current[i] = el)}
          setPosition={setPosition}
          onClick={() => handleSelect(i, tab.href)}
        >
          {tab.label}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  )
}

const Tab = React.forwardRef(({ children, setPosition, onClick }, ref) => {
  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref?.current) return

        const { width } = ref.current.getBoundingClientRect()

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        })
      }}
      className="relative z-10 block cursor-pointer px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-900 mix-blend-difference dark:text-white sm:px-3 sm:py-1.5"
    >
      {children}
    </li>
  )
})
Tab.displayName = 'Tab'

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      transition={{
        type: 'spring',
        stiffness: 550,
        damping: 32,
        mass: 0.3,
      }}
      className="absolute z-0 h-6.5 rounded-full bg-emerald-600 dark:bg-emerald-500 sm:h-7.5"
    />
  )
}
