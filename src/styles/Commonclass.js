export const CommonClass = {
    textStyle: {
        flex: 1,
        color: '#000',
        // fontSize: 'calc(5px + 2vw)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    td: {
        border: '1px solid #000',
        padding: "8px"
    },
    th: {
        border: "1px solid #000",
        width: '25%',
        padding: '8px'
    },
    table: {
        borderCollapse: "collapse"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: "10px"
    },
    input: {
        // fontSize: " 16px",
        // fontSize: 'max(16px, 1em)',
        fontFamily: ' inherit',
        padding: '0.25em 0.5em',
        backgroundColor: ' #fff',
        border: '2px solid var(--input - border)',
        borderRadius: ' 4px'
    },
    sectionTitle: {
        // fontSize: '14px',
        paddingBottom: 0,
        textAlign: 'center',
        fontWeight: "bold"
    },
    Editbutton: {
        alignItems: 'center',
        backgroundColor: 'mediumblue',
        padding: 10,
        borderRadius: 5
    },
    chooseFile: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5
    },
    AddButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
        margin: '0 auto'
    },
    Downloadbutton: {
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
        height: '30%'
    },
    TextWrap: {
        textOverflow: 'ellipsis',

    },
    TextKey:{
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
        width:'50%'
    },
    Textvalue:{
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: '#bbe4e9',
        padding: 10,
        borderRadius: 5,
        width:'40%'
    },
    Texttitle:{
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: '#5585b5',
        padding: 10,
        borderRadius: 5,
        width:'40%'
    },
    welcomebutton:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 20,
        borderRadius: 5,
        margin: '0 auto'
    }
}