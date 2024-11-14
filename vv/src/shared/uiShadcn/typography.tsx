import React from 'react';

interface Props {
    className?: string;
    children: string;
}

const TypographyH1: React.FC<Props> = ({className, children}) => {
    return (
      <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>
        {children}
      </h1>
    )
  }

  const TypographyH2: React.FC<Props> = ({className, children}) => {
    return (
      <h2 className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}>
        {children}
      </h2>
    )
  }

  const TypographyH3: React.FC<Props> = ({className, children}) => {
    return (
      <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>
        {children}
      </h3>
    )
  }
  

  const TypographyH4: React.FC<Props> = ({className, children}) => {
    return (
      <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>
        {children}
      </h4>
    )
  }
  

  const TypographyP: React.FC<Props> = ({className, children}) => {
    return (
      <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
       {children}
      </p>
    )
  }
  

  const TypographyBlockquote: React.FC<Props> = ({className, children}) => {
    return (
      <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>
        {children}
      </blockquote>
    )
  }
  

  const TypographyInlineCode: React.FC<Props> = ({className, children}) => {
    return (
      <code className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}>
        {children}
      </code>
    )
  }
  

  const TypographyLead: React.FC<Props> = ({className, children}) => {
    return (
      <p className={`text-xl text-muted-foreground ${className}`}>
        {children}
      </p>
    )
  }
  

  const TypographyLarge: React.FC<Props> = ({className, children}) => {
    return <div className={`text-lg font-semibold ${className}`}>{children}</div>
  }
  

  const TypographyMuted: React.FC<Props> = ({className, children}) => {
    return (
      <p className={`text-sm text-muted-foreground ${className}`}>{children}.</p>
    )
  }
  
  export { TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyP, TypographyLead, TypographyLarge, TypographyMuted, TypographyBlockquote, TypographyInlineCode}