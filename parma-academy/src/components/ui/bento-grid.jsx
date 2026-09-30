import React from 'react'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoCard = ({ children, className, id }) => {
  return (
    <div
      id={id}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-emerald-500/30',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoTitle = ({ children, className }) => {
  if (!children) return null
  return (
    <h3
      className={cn(
        'text-xl font-bold tracking-tight text-slate-900 dark:text-white',
        className
      )}
    >
      {children}
    </h3>
  )
}

export const BentoDescription = ({ children, className }) => {
  if (!children) return null
  return (
    <p
      className={cn(
        'mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300',
        className
      )}
    >
      {children}
    </p>
  )
}

export const BentoContent = ({ children, className }) => {
  return <div className={cn('h-full w-full', className)}>{children}</div>
}
