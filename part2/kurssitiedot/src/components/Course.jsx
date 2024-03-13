const Course = ({course}) => {
    console.log(course)
    const Header = ({ course }) => <h1>{course}</h1>

    const Content = ({ parts }) => {
      
      return (
        <div>
          {parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
          )} 
          
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

export default Course