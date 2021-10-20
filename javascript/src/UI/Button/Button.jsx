import React from 'react'
import styles from './Button.module.css'

const Button = ({ variant, execute, children }) => {
  const SuccessButon = () => {
    return (
      <label className={styles.success} onClick={execute}>
        {children}
      </label>
    )
  }

  const InfoButon = () => {
    return (
      <label className={styles.info} onClick={execute}>
        {children}
      </label>
    )
  }

  const SecondaryButon = () => {
    return (
      <label className={styles.secondary} onClick={execute}>
        {children}
      </label>
    )
  }

  const DangerButon = () => {
    return (
      <label className={styles.danger} onClick={execute}>
        {children}
      </label>
    )
  }

  const buttonVariants = {
    success: <SuccessButon />,
    info: <InfoButon />,
    danger: <DangerButon />,
    secondary: <SecondaryButon />,
  }

  return buttonVariants[variant]
}

export default Button
