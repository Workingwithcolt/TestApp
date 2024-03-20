export const SchemaTypes = {
    Number: "numeric",
    String: "text",
    UUID: "UUID",
    KN_PAN: "KN_PAN",
    KN_PIN: "KN_PIN",
    KN_GSTIN: "KN_GSTIN",
    DATE: "date",
    radio: "radio",
    file: "file",
    EMAIL: "email",
    IMAGE: "image",
    ADHAR_CARD: "aadharCard",
    DROP_DOWN: "dropdown",
    headline: "Headline",
    PASSWORD: "password",
    Password: "password",
    STD_DROPDOWN: "standarddropdown",
    checkbox: "checkbox",
    DIV_DROPDOWN: "divisiondropdown",
    PHONE_NUMBER: "PHONE_NUMBER",
    IFSC_CODE: "IFSC_CODE",
    ESTD: "ESTD",
    UDISE: "UDISE",
    USER_LEVEL_DROPDOWN: "userleveldropdown",
    TextArea: "TextArea",
    Title: "title"
}

export const urlHead = 'https://test-app-backend-virid.vercel.app/'
export const users = "Users"
export const NODATA = "NoData"
export const JPG_CONTENT_TYPE = 'image/jpeg'
export const PNG_CONTENT_TYPE = 'image/png'
export const PDF_CONTENT_TYPE = "application/pdf"
export const INVALID_DATE = "Invalid Date"
export const Propertylist = {
    age: {
        name: "age",
        placeholder: "Enter Age",
        style: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
        type: SchemaTypes.Number
    },
    Username: {
        name: "username",
        placeholder: "Enter Full Name",
        style: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
        type: SchemaTypes.String
    },
    address: {
        name: "address",
        placeholder: "Address",
        style: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
        type: SchemaTypes.String
    },
    ProfilePicture: {
        name: "ProfilePicture",
        placeholder: "Profile Picture",
        style: {
            height: '30px',
            borderColor: 'gray',
            // borderWidth: '1px',
            marginTop: '10px'
        },
        type: SchemaTypes.file
    },
    Password: {
        name: "Password",
        placeholder: "Password",
        style: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
        type: SchemaTypes.String
    },
    email: {
        name: "email",
        placeholder: "email",
        style: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
        type: SchemaTypes.EMAIL
    },
}

export const Section1 = [
    Propertylist.Username,
    Propertylist.address,
    Propertylist.age,
]
