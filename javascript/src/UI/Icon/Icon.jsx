import React from 'react'
import styles from './Icon.module.css'

const Icon = ({ variant, execute, nodes }) => {
  const Rename = () => {
    return (
      <svg
        className={styles.icon}
        id="Layer_1"
        version="1.1"
        viewBox="0 0 24 24"
      >
        <path d="M19.607,18.746c0,0.881-0.716,1.624-1.597,1.624H5.231c-0.881,0-1.597-0.743-1.597-1.624V5.967  c0-0.881,0.716-1.571,1.597-1.571h7.454V3.332H5.231c-1.468,0-2.662,1.168-2.662,2.636v12.778c0,1.468,1.194,2.688,2.662,2.688  h12.778c1.468,0,2.662-1.221,2.662-2.688v-7.428h-1.065V18.746z" />
        <path d="M20.807,3.17c-0.804-0.805-2.207-0.805-3.012,0l-7.143,7.143c-0.068,0.068-0.117,0.154-0.14,0.247L9.76,13.571  c-0.045,0.181,0.008,0.373,0.14,0.506c0.101,0.101,0.237,0.156,0.376,0.156c0.043,0,0.086-0.005,0.129-0.016l3.012-0.753  c0.094-0.023,0.179-0.072,0.247-0.14l7.143-7.143c0.402-0.402,0.624-0.937,0.624-1.506S21.21,3.572,20.807,3.17z M13.016,12.467  l-2.008,0.502l0.502-2.008l5.909-5.909l1.506,1.506L13.016,12.467z M20.054,5.428l-0.376,0.376l-1.506-1.506l0.376-0.376  c0.402-0.402,1.104-0.402,1.506,0c0.201,0.201,0.312,0.468,0.312,0.753C20.366,4.96,20.255,5.227,20.054,5.428z" />
      </svg>
    )
  }

  const Create = () => {
    return (
      <svg
        className={styles.icon}
        data-name="Layer 1"
        id="Layer_1"
        viewBox="0 0 32 32"
      >
        <title />
        <path d="M27.2,8.22H23.78V5.42A3.42,3.42,0,0,0,20.36,2H5.42A3.42,3.42,0,0,0,2,5.42V20.36a3.42,3.42,0,0,0,3.42,3.42h2.8V27.2A2.81,2.81,0,0,0,11,30H27.2A2.81,2.81,0,0,0,30,27.2V11A2.81,2.81,0,0,0,27.2,8.22ZM5.42,21.91a1.55,1.55,0,0,1-1.55-1.55V5.42A1.54,1.54,0,0,1,5.42,3.87H20.36a1.55,1.55,0,0,1,1.55,1.55v2.8H11A2.81,2.81,0,0,0,8.22,11V21.91ZM28.13,27.2a.93.93,0,0,1-.93.93H11a.93.93,0,0,1-.93-.93V11a.93.93,0,0,1,.93-.93H27.2a.93.93,0,0,1,.93.93Z" />
        <path d="M24.09,18.18H20v-4a.93.93,0,1,0-1.86,0v4h-4a.93.93,0,0,0,0,1.86h4v4.05a.93.93,0,1,0,1.86,0V20h4.05a.93.93,0,1,0,0-1.86Z" />
      </svg>
    )
  }

  const Delete = () => {
    return (
      <svg className={styles.icon} version="1.1" viewBox="0 0 20 20">
        <path d="M 6 1 L 6 4 L 7 4 L 7 2 L 18 2 L 18 13 L 16 13 L 16 14 L 19 14 L 19 1 L 6 1 z M 1 6 L 1 19 L 14 19 L 14 6 L 1 6 z M 2 7 L 13 7 L 13 18 L 2 18 L 2 7 z M 4 12 L 4 13 L 11 13 L 11 12 L 4 12 z " />
      </svg>
    )
  }

  const Nodes = () => {
    return (
      <div className={styles.row}>
        <span>{nodes}</span>
        <svg className={styles.icon} version="1.1" viewBox="0 0 128 128">
          <path
            d="M89.145,65.088c0.502,4.879,4.635,8.697,9.645,8.697c5.348,0,9.697-4.352,9.697-9.697  c0-5.346-4.352-9.696-9.697-9.696c-5.01,0-9.143,3.818-9.645,8.696H59.554V32.056c0-1.865,1.517-3.382,3.381-3.382h26.21  c0.502,4.878,4.635,8.695,9.645,8.695c5.348,0,9.697-4.35,9.697-9.697c0-5.347-4.352-9.697-9.697-9.697  c-5.01,0-9.145,3.819-9.645,8.699h-26.21c-2.967,0-5.381,2.414-5.381,5.382v31.033H38.855c-0.502-4.878-4.636-8.696-9.645-8.696  c-5.348,0-9.697,4.35-9.697,9.696s4.352,9.698,9.697,9.698c5.009,0,9.143-3.818,9.645-8.697h18.697v30.857  c0,2.967,2.414,5.381,5.381,5.381h26.209c0.502,4.879,4.637,8.697,9.646,8.697c5.347,0,9.696-4.352,9.696-9.697  c0-5.348-4.351-9.697-9.696-9.697c-5.009,0-9.144,3.818-9.646,8.697H62.935c-1.864,0-3.381-1.518-3.381-3.381V65.088H89.145z   M98.788,56.392c4.244,0,7.696,3.453,7.696,7.696c0,4.244-3.452,7.697-7.696,7.697s-7.696-3.453-7.696-7.697  C91.092,59.845,94.544,56.392,98.788,56.392z M98.788,19.975c4.244,0,7.696,3.453,7.696,7.697c0,4.244-3.452,7.697-7.696,7.697  c-3.904,0-7.13-2.924-7.623-6.695h0.151v-2h-0.152C91.656,22.901,94.883,19.975,98.788,19.975z M29.212,71.787  c-4.244,0-7.697-3.453-7.697-7.698c0-4.244,3.453-7.696,7.697-7.696s7.696,3.453,7.696,7.696  C36.908,68.332,33.456,71.787,29.212,71.787z M98.788,92.631c4.244,0,7.696,3.453,7.696,7.697s-3.452,7.695-7.696,7.695  c-3.904,0-7.131-2.926-7.624-6.695h0.152v-2h-0.152C91.657,95.555,94.884,92.631,98.788,92.631z"
            fill="#2BACE2"
          />
        </svg>
      </div>
    )
  }

  const iconVariants = {
    rename: <Rename />,
    create: <Create />,
    delete: <Delete />,
    nodes: <Nodes />,
  }

  return (
    <div
      className={variant === 'nodes' ? styles.containerNodes : styles.container}
      onClick={execute}
    >
      {iconVariants[variant]}
    </div>
  )
}

export default Icon