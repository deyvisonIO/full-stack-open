export function Course({ course }) {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((t, i) => i.exercises + t, 0)} />
    </div>
  )
}

function Header({ course }) {
  return (
    <h1>{course}</h1>
  )
}

function Total({ sum }) {
  return (
    <p>Number of exercises {sum}</p>
  )
}

function Content({ parts }) {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </>
  )
}

function Part({ part }) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}
