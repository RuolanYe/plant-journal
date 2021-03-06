import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals} from '../features/goals/goalSlice'



function Gallery() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state)=>state.goals)

  let sortedGoals = [...goals].sort((a, b) => {
    if (a.eventDate > b.eventDate){
      return 1
    }
    return -1
  })


  useEffect(() => {
    if(isError){
      console.log(message)
    }

    if (!user){
      navigate('/login')
    }

    dispatch(getGoals())

  }, [user, navigate, isError,message, dispatch])

  if(isLoading){
    return <Spinner />
  }

  return <>
    <section className="heading">
    <h1>Welcome {user && user.name}</h1>
      <p>Photo Gallery</p>
    </section>
    
    <section className="content">
      {goals.length > 0 ? (
        <div>         
          {sortedGoals.map((goal) => (
            goal.articleImage ? (<GoalItem key={goal._id} goal={goal}/>):(<></>)            
          ))}
        </div>
      ):(
        <h3>You do not have any picture </h3>
      )}
    </section>
  </>
};

export default Gallery