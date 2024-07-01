


const Notification = ({ notification }) => {
  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification != null) {
    return (
      <div style={style}>
        { notification }
      </div>
    )
  }
}


export default Notification
