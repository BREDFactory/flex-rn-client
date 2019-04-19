const fs = require("fs")
const request = require("request")
const fileName = process.argv[2]

function uploadToServer() {
    const options = {
        method: 'POST',
        url: `${process.env.UPLOAD_SERVER}/upload`,
        headers: {
            'Postman-Token': '256b3f2f-ec62-4f5c-9128-e2817015bac3',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },
        formData: {
            apk: {
                value: fs.createReadStream(`${process.env.PWD}/${fileName}`),
                options: {
                    filename: `${process.env.PWD}/${fileName}`,
                    contentType: null
                }
            }
        }
    }

    request(options, function (error, response, body) {
        if (error) {
            throw new Error(error)
            process.exit(1)
        }

        console.log(body)
        uploadToAppaloosa()
    })
}

function uploadToAppaloosa() {
    const options = {
        method: 'POST',
        url: `https://www.appaloosa-store.com/api/v2/${process.env.APPALOOSA_STORE_ID}/mobile_application_updates/upload`,
        qs: {
            api_key: process.env.APPALOOSA_API_KEY
        },
        headers: {
            'Postman-Token': '61c79b29-7113-4610-a83b-bb94cc67d71d',
            'cache-control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body: {
            mobile_application_update: {
                binary_path: `${process.env.UPLOAD_SERVER}/${fileName}`,
                screenshot1: '',
                screenshot2: '',
                screenshot3: '',
                screenshot4: '',
                screenshot5: '',
                banner: '',
                description: '',
                catchphrase: '',
                changelog: ''
            }
        },
        json: true
    }

    request(options, function (error, response, body) {
        if (error) {
            throw new Error(error)
            process.exit(1)
        }

        console.log(body)
    })
}

uploadToServer()