import StatCard from "./StatCard";

const cgpa = 4.5
const assignment = 8
const courses = 6

function Dashboard(){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">            <StatCard
                title = "CGPA"
                value =  {cgpa}
            />
            <StatCard 
                title = "Assignment"
                value = {assignment}
            />
            <StatCard 
                title = "courses"
                value = {courses}
            />
        </div>


    )
}

export default Dashboard;