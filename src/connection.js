import axios from "axios";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.withCredentials = true;

export const client = axios.create({
    baseURL: "http://localhost:8000"
});


export async function getUser(userID) {
    let data = {"user_id": '', "username": '', "name": '', "surname": '', "title": ''}
    await client.get('/api/user/c/' + userID + '/')
        .then(function (response) {
            data = response.data
        })
        .catch(function () {
        });

    return data
}

export async function getUserProfile(userID) {
    let data = {"content_id": '', "user": '', "type": '', "content": '', "url": ''}
    await client.get('/api/user/c/' + userID + '/profile')
        .then(function (response) {
            data = response.data
        })
        .catch(function () {
        });
    return data
}

export async function getUserSocials(userID) {
    let data = {"social_id": '', "user": '', "type": '', "content": ''}
    await client.get('/api/user/c/' + userID + '/social')
        .then(function (response) {
            data = response.data
        })
        .catch(function () {
        });
    return data
}

export async function getSocial(contentID) {
    let data = {"social_id": '', "user": '', "type": '', "content": ''}
    await client.get('/api/get/social/' + contentID)
        .then(function (response) {
            data = response.data
        })
        .catch(function () {
        });
    return data
}


export async function login(data) {
    let payload = {"user": '', "status": '', "message":""}
    await client.post('/api/login/', {
        email: '', username: data.username, password: data.password
    })
        .then(function (response) {
            payload.user = response.data.user;
            payload.status = response.status
        })
        .catch(function (error) {
            payload.status = error.response.status
            payload.message = error.response.data.message
        });

    return payload
}

export async function getActiveUserId() {
    let data = {"user_id": ''}
    await client.get('/api/user/')
        .then(function (response) {
            data = response.data
        })
        .catch(function () {
        });
    return data
}


export async function getActiveUserDetails() {
    let data = {"user_id": '', "username": '', "name": '', "surname": '', "title": '', "profile": [], "social": []}

    await client.get('/api/user/')
        .then(function (response) {

            data.user_id = response.data.user_id
            data.username = response.data.username
            data.name = response.data.name
            data.surname = response.data.surname
            data.title = response.data.title

        })
        .catch(function () {
        });

    const fetchData = async () => {
        const profile = await getUserProfile(data.user_id);
        const social = await getUserSocials(data.user_id);

        data.profile = profile
        data.social = social

    }

    await fetchData()


    return data
}

export async function logout() {
    await client.get('/api/logout')
        .then(function () {

        })
        .catch(function () {
        });
}

export async function isSessionActive() {
    let data = {"status": ''}
    await client.get('/api/user/')
        .then(function (response) {
            data.status = response.status
        })
        .catch(function (error) {
            data.status = error.status
        });
    return data
}


export async function addSocial(payload, userID)
{
    await client.post('/api/user/add/social', {
        type: payload.type, url: payload.url, user: userID
    })
        .then(function (response) {
            return response.status
        })
        .catch(function (error) {
            return error.status
        });
}

export async function deleteSocial(contentID)
{
    await client.delete('/api/get/social/' + contentID)
        .then(function (response) {
            return response.status
        })
        .catch(function (error) {
            return error.status
        });
}

export async function updateSocial(payload, userID, contentID)
{
    console.log(payload)
    await client.put('/api/get/social/' + contentID, {
        type: payload.type, url: payload.url, user: userID
    })
        .then(function (response) {
            return response.status
        })
        .catch(function (error) {
            return error.status
        });
}


export async function getUserPhoto(userID)
{
    let data = {"image" : null}
    await client.get('/api/user/' + userID + '/photo')
        .then((response) => {
            data.image = response.data.image
        })
        .catch(() => {

        })
    return data
}

export async function changeUserPhoto(userID, data)
{
    console.log(data)
    data.user = userID
    await client.post('/api/user/' + userID + '/photo', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    return data
}


export async function getSocialTypes()
{
    let data = {"choices" : []}
    await client.get("/api/getchoices")
        .then((response) => {
            data.choices = response.data.choices
        })
        .catch(() => {

        })
    return data
}

export async function changePassword(data)
{
    await client.put("/api/user/change_pass", data)
        .then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
}

export async function updateProfileDetails(data, userID)
{
    console.log(data)
    await client.post("/api/user/" + userID + "/edit/details", data)
        .then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
}

export async function updateProfile(data, userID)
{
    console.log(data)
    await client.post("/api/user/" + userID + "/edit/profile", data)
        .then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
}
