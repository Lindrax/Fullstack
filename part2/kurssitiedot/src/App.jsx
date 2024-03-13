
const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

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
      const Total = ({parts}) => {
        
        const sum = parts.reduce(
          (total, currentvalue) => {
            return(total += currentvalue.exercises)
          }, 0)
        return (
          <b> total of {sum} exercises</b>
        )
      }
      
        return(
          <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
          </div>
        )
        }
        
  return (
    <div>
        {courses.map(course =>
          <Course course={course}/>
          )}
    </div>
  )
}

export default App