import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import Icon from '../../UI/Icon/Icon'
import Modal from '../../UI/Modal/Modal'
import '../../styles/List.css'
import Button from '../../UI/Button/Button'
import Children from '../Children/Children'

const Root = React.memo(function Root({
  node,
  addChildrenHandler,
  renameNodeHandler,
  setStatusUpdate,
  renameChildren,
  deleteChildren,
  nodes,
}) {
  const [showModal, setShowModal] = useState(false)
  const [variant, setVariant] = useState('')

  return (
    <li>
      <div className="row">
        <span className="name-node">{node.name}</span>
        <Icon variant={'nodes'} nodes={node.children.length} />
        {node.children.length < 5 && (
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
            close={() => setShowModal(false)}
            rootId={node.id}
            name={node.name}
            create={addChildrenHandler}
            rename={renameNodeHandler}
            list={nodes}
            type="root"
          />
        )}
      </div>
      <Children
        children={node.children}
        setUpdate={() => setStatusUpdate(true)}
        rootId={node.id}
        deleteHandler={deleteChildren}
        renameHandler={renameChildren}
        level={0}
      />
    </li>
  )
})

const Tree = React.memo(function Tree() {
  const [showModal, setShowModal] = useState(false)
  const [variant, setVariant] = useState('')
  const [statusUpdate, setStatusUpdate] = useState(false)
  const [nodes, setNodes] = useState([
    {
      id: v4(),
      name: 'mcc-tomsk.de',
      children: [],
    },
  ])

  const addNodeHandler = (value) => {
    setNodes([
      ...nodes,
      {
        id: v4(),
        name: value,
        children: [],
      },
    ])
  }

  const deleteNodeHandler = (rootId) => {
    setNodes([...nodes.filter((node) => node.id !== rootId)])
  }

  const renameNodeHandler = (rootId, value) => {
    setNodes([
      ...nodes.map((node) => {
        if (node.id === rootId) {
          return { ...node, name: value }
        } else {
          return node
        }
      }),
    ])
  }

  const addChildrenHandler = (rootId, value) => {
    setNodes([
      ...nodes.map((node) => {
        if (node.id === rootId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: v4(),
                name: value,
                children: [],
              },
            ],
          }
        } else {
          return node
        }
      }),
    ])
  }

  const deleteChildren = (rootId, childId) => {
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
  }

  const renameChildren = (rootId, childId, value) => {
    setNodes([
      ...nodes.map((node) => {
        if (node.id === rootId) {
          return {
            ...node,
            children: [
              ...node.children.map((child) => {
                if (child.id === childId) {
                  return { ...child, name: value }
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

  useEffect(() => {
    if (statusUpdate) {
      setStatusUpdate(false)
    }
  }, [statusUpdate])

  return (
    <div>
      <div style={{ height: '90vh', overflow: 'auto' }}>
        {nodes.map((node) => (
          <Root
            key={node.id}
            node={node}
            addChildrenHandler={addChildrenHandler}
            renameNodeHandler={renameNodeHandler}
            setStatusUpdate={setStatusUpdate}
            renameChildren={renameChildren}
            deleteChildren={deleteChildren}
            nodes={nodes}
          />
        ))}
      </div>
      {showModal && (
        <Modal
          variant={variant}
          close={() => setShowModal(false)}
          create={addNodeHandler}
          del={deleteNodeHandler}
          list={nodes}
        />
      )}
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
})

export default Tree
