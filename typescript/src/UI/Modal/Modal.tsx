import React, { FC, useState } from 'react'
import { INode } from '../../types'
import styles from './Modal.module.css'

interface ModalProps {
  variant: string
  list?: Array<INode>
  rootId?: string
  childId?: string
  name?: string
  del?: (rootId: string, childId: string, value: string) => void | undefined
  close: () => void
  execute?: () => void | undefined
  rename?: (rootId: string, childId: string, value: string) => void | undefined
  create?: (rootId: string, childId: string, value: string) => void | undefined
}

interface ModalVariants {
  [key: string]: JSX.Element
}

const Modal: FC<ModalProps> = ({
  close,
  variant,
  list,
  create,
  del,
  rootId,
  childId,
  execute,
  name,
  rename,
}) => {
  const RootCreate = () => {
    const [value, setValue] = useState<string>('')

    const createHandler = () => {
      if (value.length !== 0) {
        if (rootId && !childId) {
          create!(rootId, value, '')
        } else if (rootId && childId) {
          create!(rootId, childId, value)
        } else {
          create!(value, '', '')
        }

        close()
      }
    }

    return (
      <div className={styles.modal}>
        <div className={styles.container}>
          <form>
            <div className={styles.row}>
              <label>Name</label>
              <input
                className={
                  value.length === 0 ? styles.validateInput : styles.input
                }
                type="text"
                placeholder="Enter node name..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.buttonSubmit} onClick={createHandler}>
                Create
              </label>
              <label className={styles.buttonCancel} onClick={close}>
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const RootDelete = () => {
    const [value, setValue] = useState<string>(list![0].id)

    const deleteHandler = () => {
      if (value.length !== 0) {
        del!(value, '', '')
        close()
      }
    }

    return (
      <div className={styles.modal}>
        <div className={styles.container}>
          <form>
            <div className={styles.row}>
              <label>Name</label>
              <select onChange={(e) => setValue(e.target.value)} value={value}>
                {list!.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.row}>
              <label className={styles.buttonDelete} onClick={deleteHandler}>
                Delete
              </label>
              <label className={styles.buttonCancel} onClick={close}>
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const Confirmation = () => {
    const executeHandler = () => {
      execute!()
    }

    return (
      <div className={styles.modal}>
        <div className={styles.container}>
          <form>
            <div className={styles.row}>
              <h3 className={styles.label}>Delete node?</h3>
            </div>
            <div className={styles.row}>
              <label className={styles.buttonDelete} onClick={executeHandler}>
                Yes
              </label>
              <label className={styles.buttonCancel} onClick={close}>
                No
              </label>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const Rename = () => {
    const [value, setValue] = useState<string>(name!)

    const renameHandler = () => {
      if (value.length !== 0) {
        if (rootId && !childId) {
          rename!(rootId, value, '')
        } else if (rootId && childId) {
          rename!(rootId, childId, value)
        } else {
          rename!(value, '', '')
        }

        close()
      }
    }
    return (
      <div className={styles.modal}>
        <div className={styles.container}>
          <form>
            <div className={styles.row}>
              <label>Name</label>
              <input
                className={
                  value.length === 0 ? styles.validateInput : styles.input
                }
                type="text"
                placeholder="Enter node name..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.buttonSubmit} onClick={renameHandler}>
                Edit
              </label>
              <label className={styles.buttonCancel} onClick={close}>
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const modalVariants: ModalVariants = {
    'root-create': <RootCreate />,
    'root-delete': <RootDelete />,
    confirmation: <Confirmation />,
    rename: <Rename />,
  }

  return <div className={styles.modalRoot}>{modalVariants[variant]}</div>
}

export default Modal
