function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

function Course({ course }) {
  return (
    <h1>{course}</h1>
  )
}

function Content({ parts }) {
  return (
    <>
      {parts.map(part => (
        <Part key={part.name} name={part.name} exercise={part.exercise} />
      ))}
    </>
  )
}

function Part({ name, exercise }) {
  return (
    <p>
      {name} {exercise}
    </p>
  )
}

function Total({ parts }) {
  return (
    <p>Number of exercises {parts.reduce((t, i) => t + i.exercises, 0)}</p>
  )
}

export default App
