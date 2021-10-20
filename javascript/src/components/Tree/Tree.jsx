import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import Branch from '../Branch/Branch'
import Icon from '../../UI/Icon/Icon'
import Modal from '../../UI/Modal/Modal'
import '../../styles/List.css'
import Button from '../../UI/Button/Button'

const Tree = () => {
  const [nodes, setNodes] = useState([
    {
      id: v4(),
      name: 'mcc-tomsk.de',
      children: [],
    },
  ])

  const [statusUpdateRoot, setStatusUpdateRoot] = useState(false)
  const [statusUpdateChildren, setStatusUpdateChildren] = useState(false)
  const [showModal, setShowModal] = useState()
  const [variant, setVariant] = useState('')

  const addRootToNodes = (value) => {
    setNodes([...nodes, { id: v4(), name: value, children: [] }])
  }

  const deleteRootToNodes = (id) => {
    setNodes([...nodes.filter((node) => node.id !== id)])
  }

  const renameRootToNodes = (id, value) => {
    setNodes([
      ...nodes.map((node) => {
        if (node.id === id) {
          return { ...node, name: value }
        } else {
          return node
        }
      }),
    ])
  }

  const addChildrenToRoot = (rootId, value) => {
    setNodes((nodes) => [
      ...nodes.map((node) => {
        if (node.id === rootId) {
          return {
            ...node,
            children: [
              ...node.children,
              { id: v4(), name: value, children: [] },
            ],
          }
        } else {
          return node
        }
      }),
    ])

    setStatusUpdateChildren(true)
  }

  const addNodeToChildren = (rootId, childId, value) => {
    setNodes([
      ...nodes.map((node) => {
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
    setStatusUpdateChildren(true)
  }

  const deleteNodeFromChildren = (rootId, childId) => {
    setNodes([
      ...nodes.map((node) => {
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
    setStatusUpdateChildren(true)
  }

  const renameNodeFromChildren = (rootId, childId, value = 'Hello') => {
    setNodes([
      ...nodes.map((node) => {
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
    setStatusUpdateChildren(true)
  }

  const updateNodeState = (rootId, childrenStateUpdated) => {
    setNodes([
      ...nodes.map((node) => {
        if (node.id === rootId) {
          return {
            ...node,
            children: childrenStateUpdated,
          }
        } else {
          return node
        }
      }),
    ])
    setStatusUpdateRoot(false)
  }

  useEffect(() => {
    setStatusUpdateRoot(true)
  }, [nodes])

  const Root = ({ id, name, nodes }) => {
    const [showModal, setShowModal] = useState(false)
    const [variant, setVariant] = useState('')

    return (
      <li>
        <span className="name-node">{name}</span>
        <Icon variant={'nodes'} nodes={nodes} />
        {nodes < 5 && (
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
        {showModal && (
          <Modal
            variant={variant}
            rootId={id}
            rename={renameRootToNodes}
            name={name}
            create={addChildrenToRoot}
            close={() => setShowModal(false)}
          />
        )}
      </li>
    )
  }

  return (
    <div>
      <div style={{ height: '90vh', overflow: 'auto' }}>
        {nodes &&
          nodes.map((node) => (
            <ul key={node.id}>
              <Root
                id={node.id}
                name={node.name}
                nodes={node.children.length}
              />

              <Branch
                nodeChildren={node.children}
                id={node.id}
                updateNodeState={updateNodeState}
                updateChildrenState={updateNodeState}
                statusUpdateRoot={statusUpdateRoot}
                statusUpdateChildren={statusUpdateChildren}
                setStatusUpdateChildren={() => setStatusUpdateChildren(false)}
                addNodeHandler={addNodeToChildren}
                deleteNodeHandler={deleteNodeFromChildren}
                renameNodeHandler={renameNodeFromChildren}
                level={1}
              />
            </ul>
          ))}
        {showModal && (
          <Modal
            variant={variant}
            close={() => setShowModal(false)}
            create={addRootToNodes}
            del={deleteRootToNodes}
            list={nodes}
          />
        )}
      </div>
      <div style={{ height: '5vh' }}>
        <Button variant={'info'} execute={() => console.log(nodes)}>
          Console.log(TREE)
        </Button>
        <Button
          variant={'secondary'}
          execute={() => {
            setNodes([{ id: v4(), name: 'mcc-tomsk.de', children: [] }])
          }}
        >
          Reset tree state
        </Button>

        <Button
          variant={'danger'}
          execute={() => {
            setVariant('root-delete')
            setShowModal(true)
          }}
        >
          Remote the root from the tree
        </Button>
        {nodes.length <= 10 && (
          <Button
            variant={'success'}
            execute={() => {
              setVariant('root-create')
              setShowModal(true)
            }}
          >
            Add root to tree
          </Button>
        )}
      </div>
    </div>
  )
}

export default Tree
