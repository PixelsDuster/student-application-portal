import DegreeCourseCard from "./DegreeCourseCard"

interface Props {
    courseList: any[]
}

function DegreeCourseList({ courseList }: Props) {
    return (
        <div className="row" id="DegreeCourseManagementPageListComponent">
            {courseList.map((course) => (
                <div key={course.id} className="col-md-4 d-flex">
                    <DegreeCourseCard
                        courseID={course.id}
                        courseName={course.name}
                        courseShortName={course.shortName}
                        universityName={course.universityName}
                        universityShortName={course.universityShortName}
                        departmentName={course.departmentName}
                        departmentShortName={course.departmentShortName}
                    />
                </div>
            ))}
        </div>
    )
}

export default DegreeCourseList