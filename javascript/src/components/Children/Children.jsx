import React, { useState } from 'react'
import { v4 } from 'uuid'
import Icon from '../../UI/Icon/Icon'
import Modal from '../../UI/Modal/Modal'

const Child = React.memo(function Child({
  child,
  rootId,
  level,
  deleteNode,
  setUpdate,
  renameNode,
  addNode,
  deleteHandler,
  renameHandler,
}) {
  const [showModal, setShowModal] = useState(false)
  const [variant, setVariant] = useState('')

  return (
    <li>
      <div className="row">
        <span className="name-node">{child.name}</span>
        {level !== 10 && (
          <Icon variant={'nodes'} nodes={child.children.length} />
        )}
        {child.children.length < 5 && level < 10 && (
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
      </div>

      <Children
        children={child.children}
        deleteHandler={deleteNode}
        rootId={child.id}
        setUpdate={setUpdate}
        renameHandler={renameNode}
        level={level}
      />

      {showModal && (
        <Modal
          variant={variant}
          close={() => setShowModal(false)}
          create={addNode}
          rootId={rootId}
          childId={child.id}
          execute={() => deleteHandler(rootId, child.id)}
          rename={renameHandler}
          name={child.name}
          type="child"
        />
      )}
    </li>
  )
})

const Children = React.memo(function Children({
  children,
  deleteHandler,
  rootId,
  setUpdate,
  renameHandler,
  level,
}) {
  level += 1

  const addNode = (rootId, value) => {
    children.forEach((child) => {
      if (child.id === rootId) {
        child.children.push({ id: v4(), name: value, children: [] })
        setUpdate()
      }
    })
  }

  const deleteNode = (rootId, childId) => {
    children.forEach((child) => {
      if (child.id === rootId) {
        child.children = child.children.filter((node) => node.id !== childId)
        setUpdate()
      }
    })
  }

  const renameNode = (rootId, childId, value) => {
    children.forEach((child) => {
      if (child.id === rootId) {
        child.children = child.children.map((node) => {
          if (node.id === childId) {
            return { ...node, name: value }
          } else {
            return node
          }
        })
        setUpdate()
      }
    })
  }

  return (
    <ul>
      {children.map((child) => {
        return (
          <Child
            key={child.id}
            child={child}
            rootId={rootId}
            level={level}
            deleteNode={deleteNode}
            setUpdate={setUpdate}
            renameNode={renameNode}
            addNode={addNode}
            deleteHandler={deleteHandler}
            renameHandler={renameHandler}
          />
        )
      })}
    </ul>
  )
})

export default Children
