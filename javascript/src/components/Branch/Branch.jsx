import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import Icon from '../../UI/Icon/Icon'
import Modal from '../../UI/Modal/Modal'

const Branch = ({
  nodeChildren,
  id,
  statusUpdateRoot,
  statusUpdateChildren,
  setStatusUpdateChildren,
  updateNodeState,
  updateChildrenState,
  addNodeHandler,
  deleteNodeHandler,
  renameNodeHandler,
  level,
}) => {
  const [children, setChildren] = useState(nodeChildren)

  level += 1

  const rootId = id

  const addNodeToChildren = (rootId, childId, value) => {
    setChildren([
      ...children.map((node) => {
        if (node.id === rootId) {
          return {
            ...node,
            children: [
              ...node.children.map((child) => {
                if (child.id === childId) {
                  return {
                    ...child,
                    children: [
                      ...child.children,
                      { id: v4(), name: value, children: [] },
                    ],
                  }
                } else {
                  return child
                }
              }),
            ],
          }
        } else {
          return node
        }
      }),
    ])
  }

  const deleteNodeFromChildren = (rootId, childId) => {
    setChildren([
      ...children.map((node) => {
        if (node.id === rootId) {
          return {
            ...node,
            children: [
              ...node.children.filter((child) => child.id !== childId),
            ],
          }
        } else {
          return node
        }
      }),
    ])
  }

  const renameNodeFromChildren = (rootId, childId, value) => {
    setChildren([
      ...children.map((node) => {
        if (node.id === rootId) {
          return {
            ...node,
            children: [
              ...node.children.map((child) => {
                if (child.id === childId) {
                  return {
                    ...child,
                    name: value,
                  }
                } else {
                  return child
                }
              }),
            ],
          }
        } else {
          return node
        }
      }),
    ])
  }

  const updateChildren = (id, child) => {
    setChildren([
      ...children.map((node) => {
        if (node.id === id) {
          return { ...node, children: child }
        } else {
          return node
        }
      }),
    ])
  }

  useEffect(() => {
    updateChildrenState(rootId, children)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  useEffect(() => {
    if (statusUpdateRoot) {
      setChildren(nodeChildren)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusUpdateRoot])

  useEffect(() => {
    if (statusUpdateChildren) {
      setChildren(nodeChildren)
      setStatusUpdateChildren()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusUpdateChildren])

  const Child = ({ id, name, nodes }) => {
    const [showModal, setShowModal] = useState(false)
    const [variant, setVariant] = useState('')

    return (
      <li>
        <span className="name-node">{name}</span>
        {level !== 10 && <Icon variant={'nodes'} nodes={nodes} />}
        {nodes < 5 && level < 10 && (
          <Icon
            variant={'create'}
            execute={() => {
              setVariant('root-create')
              setShowModal(true)
            }}
          />
        )}
        <Icon
          variant={'rename'}
          execute={() => {
            setVariant('rename')
            setShowModal(true)
          }}
        />
        <Icon
          variant={'delete'}
          execute={() => {
            setVariant('confirmation')
            setShowModal(true)
          }}
        />

        {showModal && (
          <Modal
            variant={variant}
            close={() => setShowModal(false)}
            create={addNodeHandler}
            rootId={rootId}
            childId={id}
            execute={() => deleteNodeHandler(rootId, id)}
            rename={renameNodeHandler}
            name={name}
          />
        )}
      </li>
    )
  }

  return (
    <ul>
      {children &&
        children.map((node) => (
          <div key={node.id}>
            <Child id={node.id} name={node.name} nodes={node.children.length} />
            <Branch
              nodeChildren={node.children}
              id={node.id}
              statusUpdateRoot={statusUpdateRoot}
              statusUpdateChildren={statusUpdateChildren}
              setStatusUpdateChildren={setStatusUpdateChildren}
              updateNodeState={updateNodeState}
              updateChildrenState={updateChildren}
              addNodeHandler={addNodeToChildren}
              deleteNodeHandler={deleteNodeFromChildren}
              renameNodeHandler={renameNodeFromChildren}
              level={level}
            />
          </div>
        ))}
    </ul>
  )
}

export default Branch
