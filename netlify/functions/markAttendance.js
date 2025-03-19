import db from "../../src/lib/firebase-admin"
export const handler = async(event)=>{//post
    try{
        //get userId, date, time, classId from body
        const {userId, date, time, classId} = JSON.parse(event.body)

        //get refrence to attendance node
        const ref = db.ref("attendence");
        const newRecRef=ref.push()
        await newRecRef.set({
            userId,
            date,
            time,
            classId,
        })
        //return a response
        return{
            statusCode:200,
            body:JSON.stringify({
                message:"Record added successfully",
            })
        }
    }catch(err){
        console.error(err)
        return{
            statusCode:500,
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(`Error adding record: ${err}`)
        }
    }
}