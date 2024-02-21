import { StyleSheet } from "react-native";

export default StyleSheet.create({
    button: {
        paddingHorizontal: 50,
        paddingVertical: 10,
        backgroundColor: '#0055cc',
        margin: 15,
        borderRadius:5,
        marginRight:15
    },
    buttonText:{
        fontWeight: 'bold',
        color: '#ffffff',
    },
    main: {
        flex: 1,
         alignItems: 'center'
        },
    scroll: {
        flex: 1,
        backgroundColor: 'white', 
        width: '100%',
        height:'100%'
    },
    scrollContainer: {
        alignItems: 'center',
        flex:1
    },
    videoView: {
        width: '100%', 
        height: 700
    },
    btnContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems:'center',
    },
    container:{
        flex:1,
        position:'absolute',
        bottom:20,
        
    },
    info: {backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff'},
    userContainer:{
        position:'absolute',
        flexDirection:'row'
    },
    userTextName:{
        backgroundColor:'white',
        padding:15,
        paddingTop:17,
        paddingBottom:17,
        margin:10,
        borderRadius:50,
        fontSize:15,
        fontWeight:'bold'
    },
    userText:{
        flex:2,
        textAlign:'right',
        margin:17,
        fontSize:20,
        fontWeight:'bold',
        color:'white'

    },
    
    imageLike:{
        width:50,
        height:50,
        position:'absolute',
        bottom:230,
        left:120,
        tintColor:'#dadae3'
    },
    imageDislike:{
        width:50,
        height:50,
        position:'absolute',
        bottom:150,
        left:120,
        tintColor:'#dadae3',
        
    },
    dislikeCount:{
        color:'white',
        color:'white',
        position:'absolute',
        bottom:120,
        left:145
    },
    likeCount:{
        color:'white',
        position:'absolute',
        bottom:290,
        left:145
    },
    headerText:{
        flex:1,
        marginVertical:300,
        fontSize:20,
        fontWeight:'bold'
    }



})
