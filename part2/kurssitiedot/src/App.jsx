
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
    const Course = ({course}) => {
      console.log(course)
      const Header = ({ course }) => <h1>{course}</h1>

      const Content = ({ parts }) => {
        return (
          <div>
            {parts.map(part => <p>{part.name} {part.exercises}</p>)} 
          </div>
        )
        }
          
        return(
          <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
          </div>
        )
        }
        
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App