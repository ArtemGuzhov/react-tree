import React, { FC, useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { INode } from '../../types'
import Icon from '../../UI/Icon/Icon'
import Modal from '../../UI/Modal/Modal'

interface BranchProps {
  nodeChildren: Array<INode>
  id: string
  statusUpdateRoot: boolean
  statusUpdateChildren: boolean
  level: number
  setStatusUpdateChildren: () => void
  updateNodeState: (rootId: string, childrenStateUpdate: Array<INode>) => void
  updateChildrenState: (
    rootId: string,
    childrenStateUpdate: Array<INode>
  ) => void
  addNodeHandler: (rootId: string, childId: string, value: string) => void
  deleteNodeHandler: (rootId: string, childId: string) => void
  renameNodeHandler: (rootId: string, childId: string, value: string) => void
}

interface ChildProps {
  id: string
  name: string
  nodes: number
}

const Branch: FC<BranchProps> = ({
  nodeChildren,
  id,
  statusUpdateRoot,
  statusUpdateChildren,
  level,
  setStatusUpdateChildren,
  updateNodeState,
  updateChildrenState,
  addNodeHandler,
  deleteNodeHandler,
  renameNodeHandler,
}) => {
  const [children, setChildren] = useState(nodeChildren)

  const rootId = id
  level += 1

  const addNodeToChildren = (
    rootId: string,
    childId: string,
    value: string
  ) => {
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

  const deleteNodeFromChildren = (rootId: string, childId: string) => {
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

  const renameNodeFromChildren = (
    rootId: string,
    childId: string,
    value: string
  ) => {
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

  const updateChildren = (id: string, child: Array<INode>) => {
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

  const Child: FC<ChildProps> = ({ id, name, nodes }) => {
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
              level={level}
              setStatusUpdateChildren={setStatusUpdateChildren}
              updateNodeState={updateNodeState}
              updateChildrenState={updateChildren}
              addNodeHandler={addNodeToChildren}
              deleteNodeHandler={deleteNodeFromChildren}
              renameNodeHandler={renameNodeFromChildren}
            />
          </div>
        ))}
    </ul>
  )
}

export default Branch
