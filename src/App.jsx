import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const priorities = [
	{ value: 'low', label: 'Low' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'high', label: 'High' },
]

function PriorityBadge({ value }) {
	const className = `priority ${value}`
	const text = value.charAt(0).toUpperCase() + value.slice(1)
	return <span className={className}>{text}</span>
}

function useTodos() {
	const [todos, setTodos] = useState([])

	function addTodo(text, priority) {
		if (!text.trim()) return
		setTodos((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				text: text.trim(),
				completed: false,
				priority,
			},
		])
	}

	function toggleTodo(id) {
		setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
	}

	function deleteTodo(id) {
		setTodos((prev) => prev.filter((t) => t.id !== id))
	}

	function updateTodo(id, updates) {
		setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
	}

	return { todos, addTodo, toggleTodo, deleteTodo, updateTodo }
}

function TodoItem({ todo, toggleTodo, deleteTodo, updateTodo }) {
	const [isEditing, setIsEditing] = useState(false)
	const [draft, setDraft] = useState(todo.text)
	const [draftPriority, setDraftPriority] = useState(todo.priority)

	function save() {
		const trimmed = draft.trim()
		if (!trimmed) return
		updateTodo(todo.id, { text: trimmed, priority: draftPriority })
		setIsEditing(false)
	}

	return (
		<li className="item">
			<input
				className="checkbox"
				type="checkbox"
				checked={todo.completed}
				onChange={() => toggleTodo(todo.id)}
			/>

			<div className="text">
				<div className="strikeWrap">
					<span style={{ opacity: todo.completed ? 0.6 : 1 }}>
						{isEditing ? (
							<input
								className="editInput"
								value={draft}
								onChange={(e) => setDraft(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') save()
									if (e.key === 'Escape') {
										setDraft(todo.text)
										setDraftPriority(todo.priority)
										setIsEditing(false)
									}
								}}
							/>
						) : (
							todo.text
						)}
					</span>
					<AnimatePresence>
						{todo.completed && (
							<motion.span
								className="strikeLine"
								initial={{ width: 0, opacity: 0 }}
								animate={{ width: '100%', opacity: 1 }}
								exit={{ width: 0, opacity: 0 }}
								transition={{ duration: 0.35, ease: 'easeOut' }}
							/>
						)}
					</AnimatePresence>
				</div>
				<div style={{ marginTop: 6 }}>
					{isEditing ? (
						<select
							className="select"
							value={draftPriority}
							onChange={(e) => setDraftPriority(e.target.value)}
						>
							{priorities.map((p) => (
								<option key={p.value} value={p.value}>
									{p.label}
								</option>
							))}
						</select>
					) : (
						<PriorityBadge value={todo.priority} />
					)}
				</div>
			</div>

			<div className="actions">
				{isEditing ? (
					<>
						<button className="button small" onClick={save}>Save</button>
						<button
							className="button small"
							onClick={() => {
								setDraft(todo.text)
								setDraftPriority(todo.priority)
								setIsEditing(false)
							}}
						>
							Cancel
						</button>
					</>
				) : (
					<>
						<button className="button small" onClick={() => setIsEditing(true)}>Edit</button>
						<button className="button small" onClick={() => deleteTodo(todo.id)}>Delete</button>
					</>
				)}
			</div>
		</li>
	)
}

/**
 * Root Todo application component that manages todo list state, new-item input (text and priority), and UI theme, and renders the form, controls, and animated list of todos.
 *
 * The component uses the useTodos hook for todo operations (add, toggle, update, delete), keeps local state for the new-task text and priority, and synchronizes the document's data-theme attribute with the selected theme. Submitting the form adds a new todo when input is non-empty.
 *
 * @returns {JSX.Element} A React element representing the Todo application UI.
 */
export default function App() {
	const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos()
	const [text, setText] = useState('')
	const [priority, setPriority] = useState('medium')
	const [theme, setTheme] = useState('dark')

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
	}, [theme])

	const canAdd = useMemo(() => text.trim().length > 0, [text])

	function submit(e) {
		e.preventDefault()
		if (!canAdd) return
		addTodo(text, priority)
		setText('')
		setPriority('medium')
	}

	return (
		<div className="container">
			<div className="card">
				<div className="header" style={{ marginBottom: 12 }}>
					<div style={{ flex: 1 }} />
					<button
						className="button small"
						type="button"
						onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
					>
						{theme === 'dark' ? 'Light mode' : 'Dark mode'}
					</button>
				</div>
				<form className="header" onSubmit={submit}>
					<input
						className="input"
						placeholder="Add a task..."
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<select className="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
						{priorities.map((p) => (
							<option key={p.value} value={p.value}>
								{p.label}
							</option>
						))}
					</select>
					<button className="button" type="submit" disabled={!canAdd}>
						Add
					</button>
				</form>
				<ul className="list">
					<AnimatePresence initial={false}>
						{todos.map((t) => (
							<motion.div
								key={t.id}
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -8 }}
								transition={{ duration: 0.2 }}
								layout
							>
								<TodoItem
									todo={t}
									toggleTodo={toggleTodo}
									deleteTodo={deleteTodo}
									updateTodo={updateTodo}
								/>
							</motion.div>
						))}
					</AnimatePresence>
				</ul>
			</div>
		</div>
	)
}