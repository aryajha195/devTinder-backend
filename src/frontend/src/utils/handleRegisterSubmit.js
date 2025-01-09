
export const handleRegisterSubmit = async (user) => {
    const resp = await fetch("http://localhost:3000/signup", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(user)
    })
    console.log(resp.json())
}