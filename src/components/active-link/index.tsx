import { ReactElement, cloneElement } from 'react'
import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'

type Props = LinkProps & {
  children: ReactElement
  activeClassName: string
}

export function ActiveLink({ children, activeClassName, ...props }: Props) {
  const { asPath } = useRouter()

  const className = asPath === props.href ? activeClassName : ''

  return (
    <Link {...props}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  )
}
