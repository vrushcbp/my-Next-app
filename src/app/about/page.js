 async function takeTime(){
    await new Promise((resolve)=>{
        setTimeout(resolve,3000)
    })
    }
export default async function About(){
    await takeTime()
    return(
        <h1>This is About page</h1>
    )
}